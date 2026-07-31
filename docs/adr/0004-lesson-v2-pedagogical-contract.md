# ADR 0004: Lesson v2 Pedagogical Contract

- Status: Accepted (piloto vertical, no migración masiva)
- Date: 2026-07-30

## Context

El producto actual ("CodeBrain DevAcademy") tiene 12 módulos v1 (`src/data/curriculum.ts`), cada uno con exactamente **una** pregunta de opción múltiple (`guidedExercise`) y **un** reto de sandbox con un solo caso de prueba basado en `output.includes(...)`. La retroalimentación es un texto fijo que no depende de lo que el estudiante escribió. El simulador de PowerShell reconoce ~6 comandos por coincidencia exacta de texto.

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

## Alternatives considered

- Migrar los 12 módulos completos al contrato v2 de una vez: rechazado para esta iteración por alcance explícito (riesgo alto, sin validación previa del contrato con contenido real).
- Añadir Zod para validar `LessonV2` en runtime: pospuesto; el volumen de contenido (15 lecciones totales) no lo justifica todavía y el archivo de datos ya es TypeScript tipado, no JSON externo sin verificar.
- Ramificar `LessonView` por versión (`if (lesson.schemaVersion === 1) ... else ...`): rechazado porque duplica la vista y reintroduce el riesgo de que v1 y v2 diverjan visualmente; el adaptador que normaliza a una sola forma es más simple de mantener y de probar.
