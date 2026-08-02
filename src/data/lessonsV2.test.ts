import { describe, expect, it } from 'vitest';
import { LESSONS_V2 } from './lessonsV2';

describe('LESSONS_V2 — cumplimiento del contrato pedagógico v2', () => {
  it('define las 27 lecciones piloto que cubren los módulos legacy 1 a 9', () => {
    expect(LESSONS_V2).toHaveLength(27);
  });

  it('tiene ids únicos y orden secuencial 1 a 27', () => {
    const ids = LESSONS_V2.map((lesson) => lesson.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(LESSONS_V2.map((lesson) => lesson.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
  });

  it('cada lección declara schemaVersion 2 y los campos mínimos del contrato', () => {
    for (const lesson of LESSONS_V2) {
      expect(lesson.schemaVersion).toBe(2);
      expect(lesson.title.length).toBeGreaterThan(0);
      expect(lesson.summary.length).toBeGreaterThan(0);
      expect(lesson.learningObjectives.length).toBeGreaterThan(0);
      expect(lesson.concept.explanationMarkdown.length).toBeGreaterThan(0);
      expect(lesson.guidedPractice.length).toBeGreaterThan(0);
      expect(lesson.challenge.checks.length).toBeGreaterThan(0);
      expect(lesson.reflectionPromptMarkdown.length).toBeGreaterThan(0);
      expect(lesson.masteryCriteria.length).toBeGreaterThan(0);
    }
  });

  it('cada lección explica por qué importa y dónde se usa en la realidad (queja explícita atendida)', () => {
    for (const lesson of LESSONS_V2) {
      expect(lesson.concept.whyItMattersMarkdown.length).toBeGreaterThan(0);
      expect(lesson.concept.realWorldContextMarkdown.length).toBeGreaterThan(0);
    }
  });

  it('cada paso guiado tiene su respuesta correcta entre las opciones ofrecidas', () => {
    for (const lesson of LESSONS_V2) {
      for (const step of lesson.guidedPractice) {
        expect(step.options).toContain(step.correctAnswer);
        expect(step.explanationMarkdown.length).toBeGreaterThan(0);
      }
    }
  });

  it('la lección 2 (condicionales) tiene varios pasos guiados, no solo uno (fija la queja de profundidad)', () => {
    const condicionales = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-fundamentos-condicionales');
    expect(condicionales?.guidedPractice.length).toBeGreaterThan(1);
  });

  it('los checks de tipo stdoutIncludes/stdoutEquals siempre traen un value definido', () => {
    for (const lesson of LESSONS_V2) {
      for (const check of lesson.challenge.checks) {
        if (check.type === 'stdoutIncludes' || check.type === 'stdoutEquals') {
          expect(check.value).toBeDefined();
        }
        expect(check.label.length).toBeGreaterThan(0);
        expect(check.failureMessage.length).toBeGreaterThan(0);
      }
    }
  });

  it('las prerrequisitos declarados apuntan a ids que existen dentro del propio piloto', () => {
    const allIds = new Set(LESSONS_V2.map((lesson) => lesson.id));
    for (const lesson of LESSONS_V2) {
      for (const prerequisiteId of lesson.prerequisiteLessonIds) {
        expect(allIds.has(prerequisiteId)).toBe(true);
      }
    }
  });

  it('demuestra progresión: la lección 3 depende de la 1 y la 2 (comprender -> aplicar -> resolver)', () => {
    const [variables, condicionales, funcionEvaluadora] = LESSONS_V2;
    expect(funcionEvaluadora.prerequisiteLessonIds).toEqual(
      expect.arrayContaining([variables.id, condicionales.id]),
    );
  });

  it('las 3 lecciones de JS moderno/async encadenan sus prerrequisitos en orden (4 -> 5 -> 6)', () => {
    const arrowDestructuring = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-js-arrow-destructuring');
    const promesas = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-js-promesas');
    const asyncAwait = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-js-async-await');

    expect(promesas?.prerequisiteLessonIds).toEqual([arrowDestructuring?.id]);
    expect(asyncAwait?.prerequisiteLessonIds).toEqual([promesas?.id]);
  });

  it('la lección de promesas cubre los 3 estados y no depende de fetch real (sin red en las pruebas)', () => {
    const promesas = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-js-promesas');
    expect(promesas?.challenge.starterCode).toContain('new Promise');
    expect(promesas?.challenge.checks.length).toBeGreaterThanOrEqual(2);
  });

  it('la lección de async/await exige manejar tanto éxito como error (try/catch real)', () => {
    const asyncAwait = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-js-async-await');
    const checkLabels = asyncAwait?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels.some((label) => label.includes('cargado'))).toBe(true);
    expect(checkLabels.some((label) => label.toLowerCase().includes('error'))).toBe(true);
  });

  it('las 3 lecciones de Git/Conventional Commits encadenan sus prerrequisitos en orden (7 -> 8 -> 9), continuando desde JS async', () => {
    const asyncAwait = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-js-async-await');
    const stagingCommit = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-git-staging-commit');
    const ramas = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-git-ramas');
    const conventionalCommits = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-conventional-commits');

    expect(stagingCommit?.prerequisiteLessonIds).toEqual([asyncAwait?.id]);
    expect(ramas?.prerequisiteLessonIds).toEqual([stagingCommit?.id]);
    expect(conventionalCommits?.prerequisiteLessonIds).toEqual([ramas?.id]);
  });

  it('la lección de staging/commit distingue commitear staging vacío de commitear con archivos', () => {
    const stagingCommit = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-git-staging-commit');
    expect(stagingCommit?.challenge.starterCode).toContain('archivosEnStaging');
    expect(stagingCommit?.challenge.checks.length).toBeGreaterThanOrEqual(2);
  });

  it('la lección de ramas distingue crear una rama nueva de un intento de rama duplicada', () => {
    const ramas = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-git-ramas');
    const checkLabels = ramas?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels.some((label) => label.toLowerCase().includes('nueva'))).toBe(true);
    expect(checkLabels.some((label) => label.toLowerCase().includes('duplicada'))).toBe(true);
  });

  it('la lección de Conventional Commits valida el tipo de commit contra una lista de tipos permitidos', () => {
    const conventionalCommits = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-conventional-commits');
    expect(conventionalCommits?.challenge.starterCode).toContain('tiposValidos');
    const checkLabels = conventionalCommits?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels.some((label) => label.toLowerCase().includes('inválido'))).toBe(true);
  });

  it('las 3 lecciones de TypeScript encadenan sus prerrequisitos en orden (10 -> 11 -> 12), continuando desde Conventional Commits', () => {
    const conventionalCommits = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-conventional-commits');
    const tiposBasicos = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-tipos-basicos');
    const interfaces = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-interfaces');
    const funcionesGenericos = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-funciones-genericos');

    expect(tiposBasicos?.prerequisiteLessonIds).toEqual([conventionalCommits?.id]);
    expect(interfaces?.prerequisiteLessonIds).toEqual([tiposBasicos?.id]);
    expect(funcionesGenericos?.prerequisiteLessonIds).toEqual([interfaces?.id]);
  });

  it('la lección de tipos básicos simula en JS la verificación de tipos que haría TypeScript (typeof)', () => {
    const tiposBasicos = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-tipos-basicos');
    expect(tiposBasicos?.challenge.starterCode).toContain('typeof valor');
    const checkLabels = tiposBasicos?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels.some((label) => label.toLowerCase().includes('error de tipos'))).toBe(true);
  });

  it('la lección de interfaces distingue un objeto que cumple la forma de uno que no la cumple', () => {
    const interfaces = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-interfaces');
    const checkLabels = interfaces?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels.some((label) => label.toLowerCase().includes('valido:'))).toBe(true);
    expect(checkLabels.some((label) => label.toLowerCase().includes('invalido:'))).toBe(true);
  });

  it('la lección de funciones/genéricos exige que la misma función funcione con números y con strings', () => {
    const funcionesGenericos = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-funciones-genericos');
    expect(funcionesGenericos?.challenge.checks.length).toBeGreaterThanOrEqual(3);
    const checkLabels = funcionesGenericos?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels.some((label) => label.includes('numeros'))).toBe(true);
    expect(checkLabels.some((label) => label.includes('nombres'))).toBe(true);
  });

  it('las 3 lecciones de React encadenan sus prerrequisitos en orden (13 -> 14 -> 15), continuando desde funciones/genéricos', () => {
    const funcionesGenericos = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ts-funciones-genericos');
    const props = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-props');
    const useState = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-usestate');
    const levantarEstado = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-levantar-estado');

    expect(props?.prerequisiteLessonIds).toEqual([funcionesGenericos?.id]);
    expect(useState?.prerequisiteLessonIds).toEqual([props?.id]);
    expect(levantarEstado?.prerequisiteLessonIds).toEqual([useState?.id]);
  });

  it('la lección de props exige recorrer TODA la lista, no solo el primer elemento', () => {
    const props = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-props');
    const checkLabels = props?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels).toEqual(['Mateo: 8', 'Fernanda: 10']);
  });

  it('la lección de useState verifica el valor final tras varias llamadas al "setter" simulado', () => {
    const useState = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-usestate');
    expect(useState?.challenge.starterCode).toContain('incrementar');
    expect(useState?.challenge.checks.some((check) => check.label.includes('3'))).toBe(true);
  });

  it('la lección de levantar el estado verifica tanto el valor inicial como el actualizado (el padre re-render a ambos hijos)', () => {
    const levantarEstado = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-levantar-estado');
    const checkLabels = levantarEstado?.challenge.checks.map((check) => check.label) ?? [];
    expect(checkLabels.some((label) => label.includes('Todos'))).toBe(true);
    expect(checkLabels.some((label) => label.includes('3C'))).toBe(true);
  });

  it('ninguna de las 3 lecciones de React depende de un DOM/JSX real: el sandbox solo ejecuta JS', () => {
    // Nota: no se valida con una regexp "sin < seguido de letra" porque los
    // comentarios de starterCode usan `<nombre>` como notación de placeholder
    // (ver reto de props), lo cual daría un falso positivo de "JSX". La
    // garantía real es que el runner (`runCode.ts`) solo evalúa JavaScript.
    const idsReact = ['lesson-v2-react-props', 'lesson-v2-react-usestate', 'lesson-v2-react-levantar-estado'];
    for (const id of idsReact) {
      const lesson = LESSONS_V2.find((l) => l.id === id);
      expect(lesson?.challenge.language).toBe('javascript');
      expect(lesson?.challenge.starterCode).not.toMatch(/<\/[A-Za-z]|\/>/); // sin cierre de etiqueta JSX
    }
  });

  it('las 3 lecciones de Backend encadenan sus prerrequisitos en orden (16 -> 17 -> 18), continuando desde React', () => {
    const levantarEstado = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-react-levantar-estado');
    const httpMetodos = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-http-metodos');
    const expressRutas = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-express-rutas');
    const apiCrud = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-api-crud');

    expect(httpMetodos?.moduleId).toBe('mod-6-v2');
    expect(expressRutas?.moduleId).toBe('mod-6-v2');
    expect(apiCrud?.moduleId).toBe('mod-6-v2');
    expect(httpMetodos?.prerequisiteLessonIds).toEqual([levantarEstado?.id]);
    expect(expressRutas?.prerequisiteLessonIds).toEqual([httpMetodos?.id]);
    expect(apiCrud?.prerequisiteLessonIds).toEqual([expressRutas?.id]);
  });

  it('la lección de HTTP cubre métodos REST y respuestas 200, 201 y 404', () => {
    const httpMetodos = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-http-metodos');
    const checkValues = httpMetodos?.challenge.checks.map((check) => check.value) ?? [];

    expect(httpMetodos?.guidedPractice.map((step) => step.correctAnswer)).toEqual(['GET', 'POST', 'El recurso que pediste no existe', 'PUT']);
    expect(checkValues.some((value) => value?.includes('200 OK'))).toBe(true);
    expect(checkValues.some((value) => value?.includes('201 Created'))).toBe(true);
    expect(checkValues.some((value) => value?.includes('404 Not Found'))).toBe(true);
  });

  it('la lección de Express simula el despacho por método + ruta y el caso 404 sin usar Node real', () => {
    const expressRutas = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-express-rutas');
    const checkLabels = expressRutas?.challenge.checks.map((check) => check.label) ?? [];

    expect(expressRutas?.challenge.language).toBe('javascript');
    expect(expressRutas?.challenge.starterCode).toContain('const rutas = []');
    expect(expressRutas?.challenge.starterCode).toContain('guardar("GET"');
    expect(expressRutas?.challenge.starterCode).toContain('JSON.stringify');
    expect(checkLabels.some((label) => label.includes('GET'))).toBe(true);
    expect(checkLabels.some((label) => label.includes('POST'))).toBe(true);
    expect(checkLabels.some((label) => label.includes('404'))).toBe(true);
  });

  it('la lección de CRUD verifica lista, consulta individual, alta, baja y recurso inexistente', () => {
    const apiCrud = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-api-crud');
    const checkValues = apiCrud?.challenge.checks.map((check) => check.value) ?? [];

    expect(checkValues).toEqual(expect.arrayContaining([
      'Lista: 2 alumno(s)',
      'Alumno 1: Valeria',
      '404: no existe el alumno 9',
      'Alumno creado: Marco (id 3)',
      'Alumno 1 actualizado: Valeria Ruiz',
      'Alumno 2 eliminado',
    ]));
  });

  it('las 3 lecciones de bases de datos encadenan sus prerrequisitos en orden (19 -> 20 -> 21), continuando desde Backend', () => {
    const apiCrud = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-backend-api-crud');
    const sqlBasico = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-db-sql-basico');
    const relaciones = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-db-relaciones');
    const supabaseRls = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-db-supabase-rls');

    expect(sqlBasico?.moduleId).toBe('mod-7-v2');
    expect(relaciones?.moduleId).toBe('mod-7-v2');
    expect(supabaseRls?.moduleId).toBe('mod-7-v2');
    expect(sqlBasico?.prerequisiteLessonIds).toEqual([apiCrud?.id]);
    expect(relaciones?.prerequisiteLessonIds).toEqual([sqlBasico?.id]);
    expect(supabaseRls?.prerequisiteLessonIds).toEqual([relaciones?.id]);
  });

  it('la lección de SQL básico distingue SELECT sin filtro, SELECT con WHERE e INSERT INTO', () => {
    const sqlBasico = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-db-sql-basico');
    const checkValues = sqlBasico?.challenge.checks.map((check) => check.value) ?? [];

    expect(checkValues).toEqual(expect.arrayContaining([
      'SELECT * FROM alumnos',
      'SELECT * FROM alumnos WHERE promedio >= 8',
      "INSERT INTO alumnos VALUES ('Marco', 9.2)",
    ]));
  });

  it('la lección de relaciones simula un JOIN resolviendo alumno_id contra la tabla de alumnos', () => {
    const relaciones = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-db-relaciones');
    expect(relaciones?.challenge.starterCode).toContain('alumno_id');
    const checkValues = relaciones?.challenge.checks.map((check) => check.value) ?? [];
    expect(checkValues).toEqual(expect.arrayContaining(['Valeria: Mate 9.5', 'Sofía: Historia 8', 'Valeria: Ciencias 10']));
  });

  it('la lección de Supabase/RLS verifica el comportamiento con y sin la política activa, no solo el caso feliz', () => {
    const supabaseRls = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-db-supabase-rls');
    const checkValues = supabaseRls?.challenge.checks.map((check) => check.value) ?? [];
    expect(checkValues).toEqual(expect.arrayContaining(['Sin RLS: 3', 'Con RLS: 2']));
    expect(supabaseRls?.reflectionPromptMarkdown.toLowerCase()).toContain('rls');
  });

  it('ninguna de las 3 lecciones de bases de datos requiere una conexión Postgres/Supabase real: solo simulan en JS', () => {
    const idsDb = ['lesson-v2-db-sql-basico', 'lesson-v2-db-relaciones', 'lesson-v2-db-supabase-rls'];
    for (const id of idsDb) {
      const lesson = LESSONS_V2.find((l) => l.id === id);
      expect(lesson?.challenge.language).toBe('javascript');
    }
  });

  it('las 3 lecciones de Testing encadenan sus prerrequisitos en orden (22 -> 23 -> 24), continuando desde bases de datos', () => {
    const supabaseRls = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-db-supabase-rls');
    const aaa = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-testing-aaa');
    const casosLimite = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-testing-casos-limite');
    const mocksRtl = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-testing-mocks-rtl');

    expect(aaa?.moduleId).toBe('mod-8-v2');
    expect(casosLimite?.moduleId).toBe('mod-8-v2');
    expect(mocksRtl?.moduleId).toBe('mod-8-v2');
    expect(aaa?.prerequisiteLessonIds).toEqual([supabaseRls?.id]);
    expect(casosLimite?.prerequisiteLessonIds).toEqual([aaa?.id]);
    expect(mocksRtl?.prerequisiteLessonIds).toEqual([casosLimite?.id]);
  });

  it('la lección de AAA distingue dos PASS de un FAIL que muestra esperado y recibido', () => {
    const aaa = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-testing-aaa');
    const checkValues = aaa?.challenge.checks.map((check) => check.value) ?? [];

    expect(aaa?.guidedPractice.map((step) => step.correctAnswer)).toEqual(['Arrange', 'Act', 'toBe', 'El comportamiento real ya no coincide con la regla esperada y hay que revisar el caso']);
    expect(checkValues).toEqual(expect.arrayContaining([
      'PASS: promedio exacto',
      'PASS: limite aprobatorio',
      'FAIL: caso que falla (esperado true, recibido false)',
    ]));
  });

  it('la lección de casos límite cubre valores inválidos, ambos lados del límite y el máximo válido', () => {
    const casosLimite = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-testing-casos-limite');
    const checkValues = casosLimite?.challenge.checks.map((check) => check.value) ?? [];

    expect(checkValues).toEqual(expect.arrayContaining([
      '-1 -> Error: nota fuera de rango',
      '5 -> NO APROBADO',
      '6 -> APROBADO',
      '10 -> APROBADO',
      '11 -> Error: nota fuera de rango',
    ]));
  });

  it('la lección de mocks cubre la respuesta y el error sin requerir red ni un render React real', () => {
    const mocksRtl = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-testing-mocks-rtl');
    const checkValues = mocksRtl?.challenge.checks.map((check) => check.value) ?? [];

    expect(mocksRtl?.challenge.language).toBe('javascript');
    expect(mocksRtl?.challenge.starterCode).toContain('clienteExitoso');
    expect(mocksRtl?.challenge.starterCode).toContain('clienteConError');
    expect(checkValues).toEqual(expect.arrayContaining(['Cargado: Valeria', 'Error controlado: Sin conexión']));
    expect(mocksRtl?.concept.explanationMarkdown).toContain('getByRole');
  });

  it('las 3 lecciones de IA encadenan 25 -> 26 -> 27 y no requieren un proveedor real', () => {
    const mocks = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-testing-mocks-rtl');
    const prompts = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ia-prompts');
    const rag = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ia-rag');
    const api = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ia-api-segura');
    expect(prompts?.prerequisiteLessonIds).toEqual([mocks?.id]);
    expect(rag?.prerequisiteLessonIds).toEqual([prompts?.id]);
    expect(api?.prerequisiteLessonIds).toEqual([rag?.id]);
    expect([prompts, rag, api].every((lesson) => lesson?.challenge.language === 'javascript')).toBe(true);
  });

  it('la IA cubre restricción, recuperación mínima y respuesta validada', () => {
    const prompts = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ia-prompts');
    const rag = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ia-rag');
    const api = LESSONS_V2.find((lesson) => lesson.id === 'lesson-v2-ia-api-segura');
    expect(prompts?.challenge.checks.some((check) => check.value?.includes('no inventar datos'))).toBe(true);
    expect(rag?.challenge.checks.some((check) => check.value?.includes('asistencia mínima'))).toBe(true);
    expect(api?.challenge.checks.map((check) => check.value)).toEqual(expect.arrayContaining(['Sugerencia: Prueba el caso límite de 6.', 'Error controlado: respuesta no válida']));
  });
});
