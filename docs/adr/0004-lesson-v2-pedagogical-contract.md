# ADR 0004: Lesson v2 Pedagogical Contract

- Status: Accepted (piloto vertical, no migración masiva)
- Date: 2026-07-30

## Context

El producto actual ("Nuevo Horizonte") tiene 12 módulos v1 (`src/data/curriculum.ts`), cada uno con exactamente **una** pregunta de opción múltiple (`guidedExercise`) y **un** reto de sandbox con un solo caso de prueba basado en `output.includes(...)`. La retroalimentación es un texto fijo que no depende de lo que el estudiante escribió. El simulador de PowerShell reconoce ~6 comandos por coincidencia exacta de texto.

Esto no sostiene el objetivo del producto: llevar a un adulto de novato a competitivo para empleo junior/senior remoto, al estilo Brilliant (muchas micro-preguntas encadenadas, pistas progresivas, contexto de uso real, criterios explícitos de dominio). Un único módulo de 40-60 horas con una sola pregunta es profundidad de trivia, no de dominio.

Ya existe en `docs/architecture.md` y `docs/examples/module.example.json` un diseño más amplio para V2 (currículo serializable por JSON, Supabase, RLS, mentor IA) con un roadmap de 12 semanas. Esa migración masiva y esas piezas de backend están fuera de alcance de esta iteración: aquí solo se define y prueba el contrato pedagógico de una lección, con una implementación vertical de 3 lecciones reales, sin tocar Supabase, autenticación, mentor IA, RAG, telemetría externa ni el currículo completo.

## Decision

Definir un contrato tipado `LessonV2` (`src/types/lesson.ts`) como la unidad atómica de contenido, más fina que el "módulo" v1: varios objetivos de aprendizaje, ejemplos con contexto de uso real, **varios** pasos de práctica guiada (cada uno con pistas progresivas), un reto final con **varios** checks declarativos, una pregunta de reflexión y criterios de dominio explícitos.

Los nombres de campo siguen, donde es razonable, el esquema JSON de `docs/examples/module.example.json` (`schemaVersion`, `learningObjectives`, `estimatedMinutes`, `sandbox` → `checks[].type: 'stdoutIncludes'`, etc.) para no contradecir la migración completa a currículo servido por JSON que ya describe `docs/architecture.md`. `guidedExercise` singular se convierte en `guidedPractice: GuidedStep[]` porque "un ejercicio guiado por pasos" (con pistas progresivas) es exactamente la brecha que se corrige.

**No se migran los 12 módulos existentes.** En vez de eso, `src/domain/lessonAdapter.ts` normaliza en memoria cualquier módulo v1 al mismo contrato v2 (`normalizeLesson`), rellenando con valores por defecto explícitos y seguros los campos que v1 no tiene (ejemplos vacíos, pistas vacías, contexto de uso real vacío, `xpReward: 100` igual al valor histórico). `App.tsx` y `LessonView` consumen exclusivamente la forma normalizada (`NormalizedLesson`); nunca ramifican por versión. Esto significa que los 12 módulos v1 siguen funcionando sin ningún cambio en `curriculum.ts`, y que el progreso guardado en `localStorage` (claves `codebrain_*`, indexadas por `module.id`) sigue siendo válido porque el adaptador conserva el `id` original.

Se implementan 3 lecciones v2 reales (`src/data/lessonsV2.ts`) sobre el mismo tema que el módulo 1 (variables, condicionales, función evaluadora), demostrando la progresión Comprender → Aplicar → Resolver de manera autónoma:

1. `lesson-v2-fundamentos-variables` — conceptual, con ejemplos y una práctica guiada corta.
2. `lesson-v2-fundamentos-condicionales` — 5 pasos guiados con pistas progresivas (la brecha de "una sola pregunta" queda resuelta aquí de forma directa y medible).
3. `lesson-v2-fundamentos-funcion-evaluadora` — reto autónomo con función completa desde cero y 2 checks declarativos independientes.

Se añaden en `TimelineView` como una sección "Piloto v2" separada de los 12 módulos existentes, con su propia regla de desbloqueo secuencial (reutilizando `isModuleUnlocked`), para que sea visitable y evaluable sin alterar la ruta principal.

`LessonView` se actualiza para mostrar las 9 secciones pedagógicas pedidas (qué aprenderé, explicación, ejemplo, práctica guiada, editor/actividad, reto final, evidencia esperada, reflexión, criterio de dominio) dentro de las mismas 3 pestañas visuales que ya existían (Observar / Guiado / Autónomo), sin rediseño visual general. Las secciones opcionales (contexto de uso real, ejemplos, reflexión, criterios de dominio) solo se renderizan cuando el contenido no está vacío, así los módulos v1 adaptados no muestran huecos.

No se usa Zod ni ninguna librería de validación de esquema: TypeScript (`strict: false` ya en `tsconfig.json`) más los adaptadores y las pruebas de contrato (`lessonsV2.test.ts`) son suficientes para el volumen actual (3 lecciones nuevas + 12 adaptadas). Se revisará si el volumen crece a decenas de lecciones autoría-por-terceros.

## Consequences

- El código de retroalimentación mejora de binario ("Pasó"/"Pendiente" para todos los checks a la vez) a evaluación por check individual con mensaje de falla específico (`src/domain/sandboxChecks.ts`), calculado en vivo con la salida real del sandbox.
- `App.tsx` gana un estado adicional (`guidedStepIndex`, `rewardedGuidedStepIds`) para soportar práctica guiada de varios pasos; se retira el visualizador estático de un solo tipo (`visualizerType`/`visStep`) en favor de la sección de ejemplos real, que sí varía por lección.
- Los 12 módulos v1 no ganan pistas progresivas, ejemplos ni contexto de uso real todavía: siguen viéndose como antes, solo que pasando por el adaptador. Migrarlos uno por uno (o en lote) es la siguiente decisión de alcance, no esta.
- El progreso guardado en `localStorage` de una sesión anterior sigue siendo válido sin migración de datos.
- Deuda conocida: `SandboxCheck.type: 'custom'` (usado solo por el adaptador v1) no es serializable a JSON puro; si el currículo migra a JSON remoto, los módulos v1 tendrán que reescribirse a `stdoutIncludes`/`stdoutEquals` en ese momento, no antes.

## Verification

- `npx tsc --noEmit`: sin errores.
- `npx vitest run` (incluye `--coverage`): 6 archivos de prueba, 36 pruebas, todas en verde. Cobertura de los archivos nuevos: `lessonAdapter.ts` 100%, `lessonsV2.ts` 100%, `sandboxChecks.ts` 92.8% stmts.
- `npm run build`: compila y genera `dist/` sin errores (advertencia preexistente de tamaño de chunk de Monaco, no introducida por este cambio).
- `npm audit`: 0 vulnerabilidades.
- `npx playwright install chromium` / `npm run test:e2e`: **bloqueado por la política de red del entorno de verificación** (`cdn.playwright.dev` fuera de la lista blanca), no por el código. El flujo e2e existente (`e2e/onboarding.spec.ts`) depende de las cadenas literales `'Editor de Código JS / Sandbox'`, `'Ejecutar Código'`, `'3. Autónomo (70/30)'` y `'¡Módulo Superado! Has ganado +100 XP.'`; las tres primeras se preservaron sin cambios en `LessonView.tsx`, y la última se generó dinámicamente como `` `Has ganado +${lesson.xpReward} XP.` `` — para el módulo 1 (`xpReward: 100` por el adaptador) produce el mismo texto exacto. Pendiente: correr `npm run test:e2e` en un entorno con acceso de red para confirmarlo de forma directa (ver siguiente microtarea recomendada en el reporte final).

## Update — seguimiento del mismo día (módulo 2)

Tras validar el contrato y el piloto de 3 lecciones, se migró el territorio del módulo 2 legacy (JavaScript Moderno & Asincronía) a 3 lecciones v2 más, en el mismo `src/data/lessonsV2.ts` y sin cambios de código en `LessonView`/`TimelineView` (la sección "Piloto v2" y el adaptador ya eran genéricos sobre el tamaño del arreglo):

4. `lesson-v2-js-arrow-destructuring` — arrow functions, destructuring, template literals (4 pasos guiados).
5. `lesson-v2-js-promesas` — estados de una Promesa, `.then()`/`.catch()` (3 pasos guiados).
6. `lesson-v2-js-async-await` — async/await, try/catch, patrón `fetch` (3 pasos guiados).

`prerequisiteLessonIds` encadena 4→5→6 y 3→4, manteniendo la progresión Comprender→Aplicar→Resolver también entre lecciones de distintos temas. El módulo 2 legacy en `curriculum.ts` sigue sin tocarse. Verificación repetida completa (`tsc`, `vitest --coverage`, `build`, `audit`) en verde; ver el reporte de esta iteración para el detalle exacto de comandos y resultados.

## Update — seguimiento (módulo 3)

Se migró el territorio del módulo 3 legacy (Terminal, Git & Conventional Commits) a 3 lecciones v2 más, mismo archivo `src/data/lessonsV2.ts`, sin cambios de código en `LessonView`/`TimelineView`/`lessonAdapter.ts`:

7. `lesson-v2-git-staging-commit` — las tres zonas de Git (directorio de trabajo, staging area, repositorio), `git add` vs. `git commit` (4 pasos guiados).
8. `lesson-v2-git-ramas` — ramas, `git checkout -b`, `git merge` y conflictos de merge (4 pasos guiados).
9. `lesson-v2-conventional-commits` — estándar `tipo(alcance): descripción`, validación del tipo contra una lista permitida (4 pasos guiados).

Como el sandbox del contrato v2 solo ejecuta JavaScript (no un shell real), los retos finales de estas 3 lecciones son simulaciones en JS del comportamiento de Git (`simularCommit`, `crearRama`, `formatearCommit`) en vez de comandos reales, siguiendo el mismo patrón que ya usaba el sandbox del módulo 3 legacy en `curriculum.ts` (`formatearCommit`). `prerequisiteLessonIds` encadena 7→8→9, y la lección 7 depende de `lesson-v2-js-async-await` (lección 6), manteniendo una sola cadena de desbloqueo secuencial a lo largo de las 9 lecciones piloto. El módulo 3 legacy en `curriculum.ts` sigue sin tocarse. Verificación repetida completa (`tsc --noEmit`, `vitest run --coverage`, `npm run build`, `npm audit`) en verde: 46 pruebas (antes 40), `lessonsV2.ts` sigue al 100% de cobertura, 0 vulnerabilidades.

## Update — seguimiento (módulo 4)

Se migró el territorio del módulo 4 legacy (TypeScript Esencial & Tipado Estático) a 3 lecciones v2 más, mismo archivo `src/data/lessonsV2.ts`, sin cambios de código en `LessonView`/`TimelineView`/`lessonAdapter.ts`:

10. `lesson-v2-ts-tipos-basicos` — anotaciones de tipo primitivas (`string`/`number`/`boolean`) y por qué TypeScript detecta errores antes de ejecutar (4 pasos guiados).
11. `lesson-v2-ts-interfaces` — `interface` para describir la forma de un objeto, propiedades opcionales con `?` (4 pasos guiados).
12. `lesson-v2-ts-funciones-genericos` — parámetros/retorno tipados y genéricos básicos (`<T>`) frente a `any` (4 pasos guiados).

El sandbox de ejecución solo corre JavaScript, no TypeScript, así que los tres retos finales simulan EN TIEMPO DE EJECUCIÓN, con `typeof`, la misma verificación que TypeScript haría en el editor (`validarCalificacion`, `cumpleInterfazAlumno`, y un par `promedioNotas`/`primerElemento` que ejercita el mismo razonamiento genérico) — mismo patrón que ya usaba el sandbox del módulo 4 legacy (`validarDocente` en `curriculum.ts`). `prerequisiteLessonIds` encadena 10→11→12, y la lección 10 depende de `lesson-v2-conventional-commits` (lección 9), preservando una sola cadena de desbloqueo secuencial a lo largo de las 12 lecciones piloto. El módulo 4 legacy en `curriculum.ts` sigue sin tocarse.

Nota de proceso: en un primer intento, las 3 lecciones nuevas se insertaron por error entre `lesson-v2-git-ramas` (orden 8) y `lesson-v2-conventional-commits` (orden 9) en vez de al final del arreglo, lo que rompió la prueba de orden secuencial (`vitest` lo detectó de inmediato). Se corrigió reordenando los bloques del archivo antes de repetir la verificación completa. Verificación final en verde: 52 pruebas (antes 46), `lessonsV2.ts` sigue al 100% de cobertura, `npm run build` y `npm audit` sin hallazgos.

## Update — seguimiento (módulo 5)

Se migró el territorio del módulo 5 legacy (React: Componentes, Props & useState) a 3 lecciones v2 más, mismo archivo `src/data/lessonsV2.ts`, sin cambios de código en `LessonView`/`TimelineView`/`lessonAdapter.ts`:

13. `lesson-v2-react-props` — qué es un componente, flujo de props de solo lectura de padre a hijo (4 pasos guiados).
14. `lesson-v2-react-usestate` — qué retorna `useState`, cuándo un cambio dispara un nuevo render (4 pasos guiados).
15. `lesson-v2-react-levantar-estado` — el patrón "lifting state up" para que dos componentes hermanos compartan un dato (3 pasos guiados).

Restricción de diseño explícita: el sandbox del contrato v2 (igual que el del módulo 5 legacy) solo ejecuta JavaScript plano en un Worker, sin DOM ni transformación JSX — no hay forma de "renderizar" un componente React real. Las 3 lecciones simulan el comportamiento OBSERVABLE de props/useState/lifting-state-up con funciones y closures (`crearEstado`, `crearContador`, `crearPantallaCalificaciones`), el mismo patrón que ya validaron los módulos 3 (Git simulado) y 4 (TypeScript simulado con `typeof`). La prueba `lessonsV2.test.ts` ("ninguna de las 3 lecciones de React depende de un DOM/JSX real") deja esta restricción explícita y verificada, no solo documentada.

`prerequisiteLessonIds` encadena 13→14→15, y la lección 13 depende de `lesson-v2-ts-funciones-genericos` (lección 12), preservando una sola cadena de desbloqueo secuencial a lo largo de las 15 lecciones piloto. El módulo 5 legacy en `curriculum.ts` sigue sin tocarse.

Evidencia de verificación, con el conteo explícito para no confundir estados:

| Momento | Pruebas | Referencia |
|---|---|---|
| Antes de las lecciones 13–15 (estado posterior al módulo 4) | **52** | ver "Update — seguimiento (módulo 4)" arriba |
| Después de las lecciones 13–15 | **59** | esta sección |

Las 52 pruebas del bloque anterior siguen siendo el registro correcto de aquel momento y no se reescriben. Las 7 pruebas nuevas cubren las tres lecciones de React, incluida la que verifica que ninguna depende de un DOM/JSX real.

Verificación de esta iteración, ejecutada de forma independiente y no tomada del reporte previo: `npx tsc --noEmit` sin errores, `vitest run` con 59 pruebas en 6 archivos, `npm run build` exitoso. Re-ejecutada el 2026-07-31 antes de commitear (`669b73a`), con el mismo resultado.

## Update — seguimiento (módulo 6)

Se migró el territorio del módulo 6 legacy (Backend con Node.js & Express REST API) a 3 lecciones v2 más, en `src/data/lessonsV2.ts`, sin tocar `curriculum.ts`, `LessonView`, `TimelineView` ni `lessonAdapter.ts`:

16. `lesson-v2-backend-http-metodos` — modelo petición/respuesta, métodos GET/POST/PUT/DELETE y códigos 200/201/404/500 (4 pasos guiados).
17. `lesson-v2-backend-express-rutas` — registro de rutas con `app.get`/`app.post`, `req`/`res`, `res.json()` y middleware JSON (4 pasos guiados).
18. `lesson-v2-backend-api-crud` — rutas y lógica CRUD, parámetro `:id`, separación ruta/controlador y casos 404 (4 pasos guiados).

El sandbox solo ejecuta JavaScript en un Worker, no un proceso Node ni un servidor HTTP real. Los retos simulan el comportamiento observable: selección de respuestas HTTP, despacho de handlers por método + ruta y CRUD sobre un arreglo en memoria. Es el mismo límite ya aplicado a Git, TypeScript y React: practicar la lógica verificable sin afirmar que se levantó infraestructura que el sandbox no ofrece.

`prerequisiteLessonIds` encadena 16→17→18; la lección 16 depende de `lesson-v2-react-levantar-estado` (lección 15). Así se conserva una sola cadena secuencial a lo largo de las 18 lecciones v2. El módulo 6 legacy permanece intacto en `curriculum.ts`, conforme a D-005.

Evidencia de esta iteración: `npx tsc --noEmit` sin errores, `npx vitest run --coverage` con **65 pruebas en 6 archivos** (antes 59) y `lessonsV2.ts` al 100 % de cobertura, y `npm run build` exitoso. El build conserva la advertencia preexistente de tamaño de chunks de Monaco; no introduce un error de compilación.

## Update — seguimiento (módulo 7)

Se migró el territorio del módulo 7 legacy (Bases de Datos: SQL, Postgres & Supabase) a 3 lecciones v2 más, en `src/data/lessonsV2.ts`, sin tocar `curriculum.ts`, `LessonView`, `TimelineView` ni `lessonAdapter.ts`:

19. `lesson-v2-db-sql-basico` — `SELECT`/`WHERE`/`INSERT INTO`, distinguir lectura de escritura (3 pasos guiados).
20. `lesson-v2-db-relaciones` — claves foráneas y `JOIN` conceptual entre dos tablas relacionadas (3 pasos guiados).
21. `lesson-v2-db-supabase-rls` — cliente de Supabase (`from`/`select`/`eq`) como equivalente de una consulta SQL, y qué protege una política de Row Level Security (3 pasos guiados).

Nota de alcance importante: esta lección **enseña el concepto de Supabase y RLS como contenido curricular** (simulado en JS puro, sin conexión real), no abre el frente de infraestructura Supabase para la propia app. D-005 sigue vigente: no hay cliente de Supabase real, credenciales ni backend configurados en el producto — solo currículo sobre SQL/Postgres/RLS, igual que el módulo 6 enseñó HTTP/Express sin levantar un servidor real.

`prerequisiteLessonIds` encadena 19→20→21; la lección 19 depende de `lesson-v2-backend-api-crud` (lección 18). Así se conserva una sola cadena secuencial a lo largo de las 21 lecciones v2. El módulo 7 legacy permanece intacto en `curriculum.ts`, conforme a D-005.

Evidencia de esta iteración: `npx tsc --noEmit` sin errores, `npx vitest run --coverage` con **70 pruebas en 6 archivos** (antes 65), y `npm run build` exitoso. El build conserva la advertencia preexistente de tamaño de chunks de Monaco; no introduce un error de compilación.

## Update — seguimiento (módulo 8)

Se migró el territorio del módulo 8 legacy (Pruebas Automatizadas con Vitest & RTL) a 3 lecciones v2 más, en `src/data/lessonsV2.ts`, sin tocar `curriculum.ts`, `LessonView`, `TimelineView` ni `lessonAdapter.ts`:

22. `lesson-v2-testing-aaa` — prueba unitaria, patrón Arrange-Act-Assert, `expect(...).toBe(...)` y lectura de un FAIL (4 pasos guiados).
23. `lesson-v2-testing-casos-limite` — caso feliz, valores límite, entradas inválidas y pruebas de regresión (4 pasos guiados).
24. `lesson-v2-testing-mocks-rtl` — mocks de éxito/error y consultas accesibles de React Testing Library con `getByRole` (4 pasos guiados).

El sandbox solo ejecuta JavaScript en un Worker: no instala Vitest, no carga React Testing Library, no renderiza JSX y no accede a la red. Los ejemplos muestran la sintaxis real de esas herramientas para enseñar a leerla; los retos ejecutables simulan un runner de aserciones, límites de una regla y una dependencia inyectada que responde o falla. Así se verifica el razonamiento de pruebas sin presentar esa simulación como una suite o interfaz React reales.

`prerequisiteLessonIds` encadena 22→23→24; la lección 22 depende de `lesson-v2-db-supabase-rls` (lección 21). Así se conserva una sola cadena secuencial a lo largo de las 24 lecciones v2. El módulo 8 legacy permanece intacto en `curriculum.ts`, conforme a D-005.

Evidencia de esta iteración: `npx tsc --noEmit` sin errores, `npx vitest run --coverage` con **74 pruebas en 6 archivos** (antes 70) y `lessonsV2.ts` al 100 % de cobertura, y `npm run build` exitoso. El build conserva la advertencia preexistente de tamaño de chunks de Monaco; no introduce un error de compilación.

## Alternatives considered

- Migrar los 12 módulos completos al contrato v2 de una vez: rechazado para esta iteración por alcance explícito (riesgo alto, sin validación previa del contrato con contenido real).
- Añadir Zod para validar `LessonV2` en runtime: pospuesto; el volumen de contenido (15 lecciones totales) no lo justifica todavía y el archivo de datos ya es TypeScript tipado, no JSON externo sin verificar.
- Ramificar `LessonView` por versión (`if (lesson.schemaVersion === 1) ... else ...`): rechazado porque duplica la vista y reintroduce el riesgo de que v1 y v2 diverjan visualmente; el adaptador que normaliza a una sola forma es más simple de mantener y de probar.
