import { ArrowUp, Boxes, Braces, Brain, Code, Database, FileCode, GitBranch, GitCommit, Globe, Layers, Lock, Puzzle, RefreshCw, Server, Sliders, Terminal, Zap } from 'lucide-react';
import type { LessonV2 } from '../types/lesson';

/**
 * Piloto vertical del contrato v2 (ver docs/adr/0004-lesson-v2-pedagogical-contract.md).
 *
 * Lecciones reales, no de relleno, que demuestran la progresión
 * Comprender -> Aplicar -> Resolver de manera autónoma. Las 3 primeras cubren
 * variables/condicionales/funciones (territorio del módulo 1 legacy); las 3
 * siguientes cubren JS moderno y asincronía (territorio del módulo 2 legacy:
 * arrow functions, destructuring, template literals, promesas, async/await y
 * fetch); las 3 siguientes cubren terminal, Git y Conventional Commits
 * (territorio del módulo 3 legacy); las 3 siguientes cubren TypeScript
 * esencial (territorio del módulo 4 legacy); las 3 siguientes cubren React
 * esencial (territorio del módulo 5 legacy); y las 3 últimas cubren backend
 * con Node.js y Express (territorio del módulo 6 legacy: HTTP y REST, rutas
 * Express y CRUD); y las 3 últimas cubren bases de datos con SQL, Postgres y
 * Supabase (territorio del módulo 7 legacy: sintaxis SQL, relaciones entre
 * tablas y Row Level Security). El sandbox solo corre JavaScript (ver
 * `src/features/sandbox/`), así que los retos que dependen de herramientas,
 * TypeScript, React o Node/Express simulan en JS puro su comportamiento
 * observable, siguiendo el patrón de los módulos legacy. No sustituyen
 * `MODULES`; conviven con él hasta completar la migración del currículo.
 */
export const LESSONS_V2: LessonV2[] = [
  {
    schemaVersion: 2,
    id: 'lesson-v2-fundamentos-variables',
    moduleId: 'mod-1-v2',
    phaseId: 'fase-1',
    order: 1,
    title: 'V2.1 ¿Qué es una variable y por qué el código las necesita?',
    category: 'Fundamentos',
    summary: 'Comprende qué guarda una variable en memoria y por qué eso permite reutilizar código.',
    prerequisiteLessonIds: [],
    estimatedMinutes: 40,
    xpReward: 80,
    icon: Brain,
    color: 'from-amber-500 to-orange-600',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar qué es una variable y qué guarda en memoria.',
      'Distinguir un valor (dato) de una variable (el nombre que lo referencia).',
      'Predecir el valor de una variable después de una reasignación, leyendo el código de arriba hacia abajo.',
    ],
    concept: {
      explanationMarkdown:
        'Una variable es un nombre que tu programa usa para referirse a un dato guardado en memoria. Cuando escribes `let nota = 7;`, le pides a JavaScript que reserve espacio en memoria, guarde el número 7 ahí, y que puedas acceder a ese espacio usando el nombre `nota`. El valor puede cambiar (`nota = 9;`), pero el nombre sigue apuntando al mismo espacio: por eso se llama variable, no constante.',
      whyItMattersMarkdown:
        'Sin variables, cada programa tendría que repetir literalmente cada dato cada vez que lo usa. Las variables permiten que el mismo bloque de código funcione con datos distintos: la misma función `calcularPromedio` sirve para el alumno 1, el alumno 2, o los 30 de tu salón, solo cambiando qué valores le pasas.',
      realWorldContextMarkdown:
        'En un sistema como SASE, cuando un profesor captura una calificación en un formulario, ese número viaja del navegador al servidor guardado momentáneamente en variables: primero como texto que escribiste, después convertido a número, después dentro de un objeto que se guarda en la base de datos. Si en algún punto de ese camino la variable tiene el tipo equivocado (texto en vez de número), la calificación se guarda mal o la app truena.',
      narrationText:
        'Una variable es un nombre que apunta a un dato guardado en memoria. El valor puede cambiar con el tiempo, pero el nombre con el que lo llamas sigue siendo el mismo.',
    },
    examples: [
      {
        id: 'ejemplo-reasignacion',
        title: 'Una variable que cambia de valor',
        code: 'let intentos = 1;\nconsole.log(intentos); // 1\nintentos = intentos + 1;\nconsole.log(intentos); // 2',
        explanationMarkdown:
          'El nombre `intentos` nunca cambia, pero el valor que guarda sí. Cada `console.log` imprime el valor que la variable tiene EN ESE MOMENTO del código, no un valor fijo.',
      },
      {
        id: 'ejemplo-mismo-tipo',
        title: 'Dos variables, mismo tipo de dato, distinto valor',
        code: 'let calificacionAna = 8;\nlet calificacionLuis = 6;\nconsole.log(calificacionAna, calificacionLuis);',
        explanationMarkdown:
          'El mismo tipo de dato (`number`) puede vivir en variables distintas con nombres distintos. Esto es lo que te permite escribir una sola función que evalúe a cualquier alumno.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: 'Lee el código y predice qué imprime la SEGUNDA línea de `console.log`.',
        codeSnippet:
          'let racha = 3;\nconsole.log("Racha inicial:", racha);\nracha = racha + 2;\nconsole.log("Racha actualizada:", racha);',
        options: ['5', '3', '2', 'undefined'],
        correctAnswer: '5',
        hints: [
          '`racha = racha + 2` toma el valor actual de racha y le suma 2.',
          'El valor inicial de racha es 3. 3 + 2 = ?',
        ],
        explanationMarkdown:
          'Antes de la reasignación, racha vale 3. Después de `racha = racha + 2`, racha vale 5. El segundo console.log ya ocurre después del cambio.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown:
          '¿Cuál de estas líneas está DECLARANDO una variable nueva (la crea por primera vez) y no solo reasignando un valor?',
        codeSnippet: 'let xp = 0;\nxp = 100;\nlet nivel = 1;\nnivel = nivel + 1;',
        options: ['let xp = 0;', 'xp = 100;', 'nivel = nivel + 1;', 'Ninguna, todas reasignan'],
        correctAnswer: 'let xp = 0;',
        hints: [
          '`let` es la palabra clave que crea una variable nueva.',
          'Una línea sin `let` (ni `const`) está usando una variable que ya existe, no creándola.',
        ],
        explanationMarkdown:
          '`let xp = 0;` crea la variable. Las líneas sin `let` reasignan un valor a una variable que ya existía.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Este código tiene un bug típico de tipos. ¿Qué imprime `resultado`?',
        codeSnippet:
          'let calificacion = "8"; // viene de un formulario como texto\nlet resultado = calificacion + 1;\nconsole.log(resultado);',
        options: ['"81"', '9', 'Error', 'undefined'],
        correctAnswer: '"81"',
        hints: [
          'El operador `+` entre un texto y un número en JavaScript concatena (pega), no suma.',
          '"8" es texto (string), no el número 8.',
        ],
        explanationMarkdown:
          'Como `calificacion` es el texto "8" (no el número 8), `+` concatena y el resultado es el texto "81", no el número 9. Este es exactamente el tipo de bug silencioso que TypeScript (Módulo 4) existe para prevenir.',
      },
    ],
    challenge: {
      id: 'reto-variables',
      promptMarkdown:
        'Completa la función `describirAlumno` para que retorne el texto usando sus dos parámetros. Debe funcionar para cualquier alumno, no solo para el primero.',
      starterCode:
        'function describirAlumno(nombre, calificacion) {\n  // Retorna: "<nombre> obtuvo <calificacion> de calificación"\n  return "";\n}\n\nconsole.log(describirAlumno("Valeria", 9));\nconsole.log(describirAlumno("Marco", 5));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-valeria',
          type: 'stdoutIncludes',
          label: 'Valeria obtuvo 9 de calificación',
          value: 'Valeria obtuvo 9 de calificación',
          failureMessage: 'Revisa el caso de Valeria: falta construir el texto exacto usando las variables nombre y calificacion.',
        },
        {
          id: 'check-marco',
          type: 'stdoutIncludes',
          label: 'Marco obtuvo 5 de calificación',
          value: 'Marco obtuvo 5 de calificación',
          failureMessage: 'Revisa el caso de Marco: la función debe funcionar para cualquier alumno, no solo para el primero.',
        },
      ],
      hints: [
        'Usa una plantilla de texto: `${nombre} obtuvo ${calificacion} de calificación`.',
        'Recuerda usar comillas invertidas (backticks) para la plantilla de texto, no comillas normales.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar "Valeria obtuvo 9 de calificación" y "Marco obtuvo 5 de calificación".',
    },
    reflectionPromptMarkdown:
      'Antes de este bloque, ¿sabías explicar con tus propias palabras qué es una variable? Escribe una definición usando un ejemplo de tu salón de clases, no de programación.',
    masteryCriteria: [
      'Puedo predecir el valor de una variable después de una reasignación sin ejecutar el código.',
      'Distingo cuándo una línea declara una variable nueva y cuándo solo reasigna un valor.',
      'Reconozco cuándo un bug viene de mezclar texto y número (concatenación en vez de suma).',
      'Escribí una función que usa parámetros para producir resultados distintos según la entrada.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-fundamentos-condicionales',
    moduleId: 'mod-1-v2',
    phaseId: 'fase-1',
    order: 2,
    title: 'V2.2 Condicionales: decide con datos reales',
    category: 'Fundamentos',
    summary: 'Encadena if/else if/else en el orden correcto y combina condiciones con && y ||.',
    prerequisiteLessonIds: ['lesson-v2-fundamentos-variables'],
    estimatedMinutes: 55,
    xpReward: 100,
    icon: Sliders,
    color: 'from-blue-500 to-cyan-600',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Escribir condiciones con operadores relacionales (>, >=, <, <=, ===).',
      'Combinar condiciones con && y || y predecir su resultado.',
      'Construir una cadena if / else if / else que cubra todos los casos sin dejar huecos ni errores de orden.',
    ],
    concept: {
      explanationMarkdown:
        'Un condicional decide qué bloque de código se ejecuta según si una expresión es verdadera (`true`) o falsa (`false`). `if (condicion) { ... }` ejecuta el bloque solo cuando la condición es `true`; `else` cubre lo que sobra. Cuando hay más de dos casos, se encadenan con `else if`, y el orden importa: JavaScript evalúa de arriba hacia abajo y se detiene en el primer `if`/`else if` que sea verdadero.',
      whyItMattersMarkdown:
        'Casi cualquier regla de negocio real es un condicional: "¿el alumno aprobó?", "¿la calificación necesita un comentario del profesor?", "¿el usuario tiene permiso para editar esta incidencia?". Sin dominar condicionales con seguridad no puedes construir ninguna lógica real, sin importar cuántos frameworks conozcas.',
      realWorldContextMarkdown:
        'En SASE, cuando conviertes una calificación numérica a una categoría (Insuficiente/Suficiente/Bien/Excelente) para el boletín, estás encadenando condicionales. Un error de orden ahí (comparar ">= 6" antes que ">= 8") hace que alumnos con 9 aparezcan clasificados como "Suficiente". Es un bug común y silencioso: no truena la app, solo da resultados incorrectos.',
      narrationText:
        'Los condicionales encadenan decisiones. JavaScript evalúa de arriba hacia abajo y se queda con la primera condición verdadera, así que el orden de los umbrales importa.',
    },
    examples: [
      {
        id: 'ejemplo-orden-correcto',
        title: 'Cadena if/else if/else con orden correcto',
        code:
          'function categoria(nota) {\n  if (nota >= 9) return "Excelente";\n  else if (nota >= 8) return "Bien";\n  else if (nota >= 6) return "Suficiente";\n  else return "Insuficiente";\n}\nconsole.log(categoria(9.5)); // "Excelente"\nconsole.log(categoria(7));   // "Suficiente"',
        explanationMarkdown:
          'El orden va de mayor a menor umbral. Si pusieras primero "nota >= 6", cualquier nota de 6 en adelante entraría ahí y nunca llegaría a evaluar 8 o 9: ese es el bug del contexto real de arriba.',
      },
      {
        id: 'ejemplo-and',
        title: 'Combinar condiciones con &&',
        code:
          'function puedeCalificar(esProfesorTitular, materiaAsignada) {\n  return esProfesorTitular && materiaAsignada;\n}\nconsole.log(puedeCalificar(true, true));  // true\nconsole.log(puedeCalificar(true, false)); // false',
        explanationMarkdown:
          '`&&` exige que AMBAS condiciones sean verdaderas. Si cualquiera es falsa, el resultado completo es falso: así se protege que solo capture calificaciones el profesor correcto en la materia correcta.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué operador usarías para verificar que una calificación sea MAYOR o igual a 6 (aprobatoria)?',
        codeSnippet: 'if (nota ___ 6) { ... }',
        options: ['>=', '>', '==', '<='],
        correctAnswer: '>=',
        hints: ['Necesitas incluir el 6 exacto como aprobatorio.', "'Mayor o igual' se escribe con dos símbolos juntos."],
        explanationMarkdown: '`>=` incluye el valor límite: una nota de 6 exacto cuenta como aprobada.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Cuál es el resultado de esta expresión?',
        codeSnippet: 'console.log(5 > 3 && 2 > 8);',
        options: ['true', 'false', 'Error', 'undefined'],
        correctAnswer: 'false',
        hints: ['`&&` necesita que las DOS partes sean true.', '5 > 3 es true. 2 > 8 es false. true && false = ?'],
        explanationMarkdown: 'Con `&&`, basta que una parte sea false para que todo el resultado sea false.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Cuál es el resultado de esta expresión?',
        codeSnippet: 'console.log(5 > 3 || 2 > 8);',
        options: ['true', 'false', 'Error', 'undefined'],
        correctAnswer: 'true',
        hints: ['`||` solo necesita que UNA parte sea true.', '5 > 3 ya es true, así que...'],
        explanationMarkdown: 'Con `||`, basta que una parte sea true para que todo el resultado sea true.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'Este código clasifica mal algunas notas. ¿Cuál es el error?',
        codeSnippet:
          'function categoria(nota) {\n  if (nota >= 6) return "Suficiente";\n  else if (nota >= 8) return "Bien";\n  else if (nota >= 9) return "Excelente";\n  else return "Insuficiente";\n}',
        options: [
          'El orden de los umbrales está al revés (debería ir de mayor a menor)',
          'Falta un else',
          'El operador >= está mal usado',
          'El código no tiene ningún error',
        ],
        correctAnswer: 'El orden de los umbrales está al revés (debería ir de mayor a menor)',
        hints: [
          'Prueba mentalmente con nota = 9.5: ¿en qué rama entra primero?',
          'JavaScript se detiene en el PRIMER if/else if verdadero, de arriba hacia abajo.',
        ],
        explanationMarkdown:
          'Con nota = 9.5, la primera condición "nota >= 6" ya es true, así que la función regresa "Suficiente" y nunca llega a evaluar 8 o 9. Hay que ir de mayor a menor umbral.',
      },
      {
        id: 'guiado-5',
        order: 5,
        promptMarkdown: '¿Qué imprime este código?',
        codeSnippet:
          'let asistencia = 85;\nlet promedio = 7;\nif (asistencia >= 80 && promedio >= 6) {\n  console.log("Cumple criterios de acreditación");\n} else {\n  console.log("No cumple criterios");\n}',
        options: ['Cumple criterios de acreditación', 'No cumple criterios', 'Error', 'undefined'],
        correctAnswer: 'Cumple criterios de acreditación',
        hints: ['Evalúa cada condición por separado antes del &&.', '85 >= 80 es true. 7 >= 6 es true.'],
        explanationMarkdown: 'Ambas condiciones son verdaderas, así que `&&` da true y se ejecuta el bloque del if.',
      },
    ],
    challenge: {
      id: 'reto-condicionales',
      promptMarkdown:
        'Completa la función `categoria` para que clasifique correctamente CUALQUIER calificación de 0 a 10, en el orden correcto.',
      starterCode:
        'function categoria(nota) {\n  // >= 9  -> "Excelente"\n  // >= 8  -> "Bien"\n  // >= 6  -> "Suficiente"\n  // resto -> "Insuficiente"\n}\n\nconsole.log(categoria(9.5));\nconsole.log(categoria(8));\nconsole.log(categoria(6));\nconsole.log(categoria(4));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-excelente', type: 'stdoutIncludes', label: 'nota 9.5 -> Excelente', value: 'Excelente', failureMessage: 'La nota 9.5 debería clasificar como "Excelente".' },
        { id: 'check-bien', type: 'stdoutIncludes', label: 'nota 8 -> Bien', value: 'Bien', failureMessage: 'La nota 8 debería clasificar como "Bien".' },
        { id: 'check-suficiente', type: 'stdoutIncludes', label: 'nota 6 -> Suficiente', value: 'Suficiente', failureMessage: 'La nota 6 debería clasificar como "Suficiente".' },
        { id: 'check-insuficiente', type: 'stdoutIncludes', label: 'nota 4 -> Insuficiente', value: 'Insuficiente', failureMessage: 'La nota 4 debería clasificar como "Insuficiente".' },
      ],
      hints: [
        'Empieza por el umbral más alto (9) y ve bajando.',
        'Usa else if para encadenar los casos, y un else final para el resto.',
      ],
      expectedEvidenceMarkdown: 'La consola debe mostrar, en orden: Excelente, Bien, Suficiente, Insuficiente.',
    },
    reflectionPromptMarkdown:
      '¿En qué parte de tu trabajo docente (no de programación) usas una lógica parecida a un if/else if/else, una regla que depende de rangos o categorías? Descríbela en una frase.',
    masteryCriteria: [
      'Puedo elegir el operador relacional correcto para una condición dada.',
      'Predigo el resultado de && y || sin ejecutar el código.',
      'Detecto cuándo el ORDEN de una cadena if/else if está causando clasificaciones incorrectas.',
      'Escribí una función categoria() que clasifica correctamente los 4 casos de prueba.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-fundamentos-funcion-evaluadora',
    moduleId: 'mod-1-v2',
    phaseId: 'fase-1',
    order: 3,
    title: 'V2.3 Tu primera función evaluadora: construye y prueba código real',
    category: 'Fundamentos',
    summary: 'Escribe una función desde cero, corre tus propias pruebas y corrige tu lógica con la evidencia real.',
    prerequisiteLessonIds: ['lesson-v2-fundamentos-variables', 'lesson-v2-fundamentos-condicionales'],
    estimatedMinutes: 50,
    xpReward: 120,
    icon: Code,
    color: 'from-emerald-500 to-teal-600',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Escribir una función completa desde cero que reciba parámetros y retorne un resultado.',
      'Usar console.log estratégicamente para verificar el comportamiento de tu propio código.',
      'Leer un caso de prueba que falla y usarlo para corregir la lógica, no solo para memorizar la respuesta.',
    ],
    concept: {
      explanationMarkdown:
        'Hasta ahora resolviste condiciones ya escritas. Esta lección invierte el rol: tú escribes la función completa, decides los nombres, la estructura y el orden de las condiciones, y luego usas los resultados de la consola como retroalimentación para corregir tu propio razonamiento. Así trabaja un programador todos los días, no solo en el examen.',
      whyItMattersMarkdown:
        'Ningún empleador contrata a alguien por reconocer la respuesta correcta en un examen de opción múltiple. Contratan a alguien que, frente a un problema sin resolver, puede escribir una primera versión, probarla, ver qué falla y corregirla. Esa es exactamente la habilidad que esta lección practica.',
      realWorldContextMarkdown:
        'Este patrón (escribir función, correr, leer el error o el caso que falla, corregir) es literalmente el ciclo de trabajo diario de un desarrollador junior, en SASE o en cualquier empleo remoto al que te postules. Las pruebas automatizadas del Módulo 8 formalizan este mismo ciclo.',
      narrationText:
        'Ahora escribes la función completa tú mismo, la corres, lees lo que produjo tu propio código en consola y corriges tu lógica con esa evidencia.',
    },
    examples: [
      {
        id: 'ejemplo-ciclo',
        title: 'Ciclo completo: escribir, correr, corregir',
        code: 'function esAprobatoria(nota) {\n  return nota > 6; // primer intento\n}\nconsole.log(esAprobatoria(6)); // false, pero 6 debería aprobar',
        explanationMarkdown:
          'Este primer intento usa `>` en vez de `>=`, así que una nota exacta de 6 se marca como no aprobatoria. Ver ese resultado incorrecto en consola es la señal para corregir `>` por `>=`: no adivinaste el error, lo leíste en la salida.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown:
          'Vas a construir `evaluarAsistencia(diasAsistidos, diasTotales)`, que retorna true si el porcentaje de asistencia es de 80% o más. ¿Qué expresión calcula el porcentaje correctamente?',
        codeSnippet: 'let porcentaje = ___;',
        options: [
          '(diasAsistidos / diasTotales) * 100',
          'diasAsistidos / diasTotales',
          'diasTotales / diasAsistidos * 100',
          'diasAsistidos * diasTotales / 100',
        ],
        correctAnswer: '(diasAsistidos / diasTotales) * 100',
        hints: ['Un porcentaje siempre es (parte / total) * 100.', 'diasAsistidos es la parte; diasTotales es el total.'],
        explanationMarkdown: 'El porcentaje es la razón entre lo asistido y el total, multiplicado por 100.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: 'Con el porcentaje ya calculado, ¿qué condición corresponde a "asistencia de 80% o más"?',
        codeSnippet: 'return ___;',
        options: ['porcentaje >= 80', 'porcentaje > 80', 'porcentaje <= 80', 'porcentaje == 80'],
        correctAnswer: 'porcentaje >= 80',
        hints: ["'o más' incluye el valor exacto de 80."],
        explanationMarkdown: '`>=` incluye el 80% exacto como suficiente, tal como pide el enunciado.',
      },
    ],
    challenge: {
      id: 'reto-funcion-evaluadora',
      promptMarkdown:
        'Escribe, desde cero, la función `evaluarAlumno(nombre, nota, diasAsistidos, diasTotales)`. Debe retornar "<nombre>: APROBADO" si la nota es >= 6 Y la asistencia es >= 80%; en cualquier otro caso, "<nombre>: NO APROBADO". Pruébala con los dos casos de abajo, no los borres.',
      starterCode:
        'function evaluarAlumno(nombre, nota, diasAsistidos, diasTotales) {\n  // Combina: nota >= 6  Y  asistencia >= 80%\n}\n\nconsole.log(evaluarAlumno("Sofía", 8, 45, 50));  // nota ok, asistencia 90% -> APROBADO\nconsole.log(evaluarAlumno("Diego", 9, 30, 50));  // nota ok, asistencia 60% -> NO APROBADO',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-sofia',
          type: 'stdoutIncludes',
          label: 'Sofía: APROBADO',
          value: 'Sofía: APROBADO',
          failureMessage: 'Sofía tiene nota 8 y 90% de asistencia: debería aparecer como APROBADO.',
        },
        {
          id: 'check-diego',
          type: 'stdoutIncludes',
          label: 'Diego: NO APROBADO',
          value: 'Diego: NO APROBADO',
          failureMessage:
            'Diego tiene buena nota pero solo 60% de asistencia: la regla exige AMBAS condiciones, así que debe salir NO APROBADO.',
        },
      ],
      hints: [
        'Calcula el porcentaje de asistencia igual que en la práctica guiada: (diasAsistidos / diasTotales) * 100.',
        'Combina las dos condiciones con &&: ambas deben ser verdaderas para APROBADO.',
        'Usa una plantilla de texto: `${nombre}: APROBADO` o `${nombre}: NO APROBADO`.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar exactamente "Sofía: APROBADO" y "Diego: NO APROBADO". Si Diego sale como APROBADO, tu función solo está revisando la nota y falta combinar la condición de asistencia con &&.',
    },
    reflectionPromptMarkdown:
      'Cuando tu primer intento no pasó las pruebas, ¿qué información te dio la consola para corregirlo? Escribe qué leíste y qué cambiaste: ese hábito (leer la salida real, no adivinar) es la diferencia entre debuggear y tantear a ciegas.',
    masteryCriteria: [
      'Escribí una función completa desde cero, sin plantilla previa, que combina cálculo y condición.',
      'Usé && para exigir que dos condiciones se cumplan a la vez en una regla real.',
      'Cuando un caso de prueba falló, identifiqué CUÁL de las dos condiciones estaba mal, no solo que "algo" fallaba.',
      'Puedo explicar, en una frase, la diferencia entre "aprobar por nota" y "aprobar por nota Y asistencia".',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-js-arrow-destructuring',
    moduleId: 'mod-2-v2',
    phaseId: 'fase-1',
    order: 4,
    title: 'V2.4 Arrow functions, destructuring y template literals: escribir JS moderno legible',
    category: 'JavaScript',
    summary: 'Reescribe funciones y accesos a objetos con la sintaxis que vas a ver en el 90% del código moderno.',
    prerequisiteLessonIds: ['lesson-v2-fundamentos-funcion-evaluadora'],
    estimatedMinutes: 45,
    xpReward: 90,
    icon: Braces,
    color: 'from-yellow-400 to-amber-500',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Reescribir una función tradicional como arrow function y saber cuándo NO conviene hacerlo.',
      'Extraer valores de objetos con destructuring en vez de acceder propiedad por propiedad.',
      'Construir texto con template literals en vez de concatenación con +.',
    ],
    concept: {
      explanationMarkdown:
        'Una arrow function (`const suma = (a, b) => a + b;`) es una forma más corta de escribir una función. El destructuring (`const { nombre, nota } = alumno;`) extrae valores de un objeto directamente en variables, sin repetir `alumno.nombre` en cada línea. Los template literals (`` `Hola ${nombre}` ``) insertan variables dentro de un texto sin concatenar con `+`.',
      whyItMattersMarkdown:
        'Este trío es la sintaxis que vas a ver en el 90% del código JavaScript/React moderno que leas o escribas de aquí en adelante. Si no la lees con fluidez, cada línea de un proyecto real te va a tomar el triple de tiempo entender.',
      realWorldContextMarkdown:
        'Cuando en el Módulo 5 (React) veas `const { nombre, calificacion } = props;` al inicio de un componente, es exactamente el mismo destructuring que practicas aquí, solo que extrayendo de `props` en vez de un objeto cualquiera.',
      narrationText:
        'Arrow functions, destructuring y template literals son la sintaxis corta que domina el JavaScript moderno. Aprender a leerlas de corrido es la base para todo lo que sigue.',
    },
    examples: [
      {
        id: 'ejemplo-arrow',
        title: 'De función tradicional a arrow function',
        code: 'function sumar(a, b) {\n  return a + b;\n}\nconst sumarCorta = (a, b) => a + b;\nconsole.log(sumar(2, 3), sumarCorta(2, 3));',
        explanationMarkdown:
          'Ambas hacen lo mismo. La arrow function con una sola expresión de retorno no necesita ni `{ }` ni `return`: el valor después de `=>` se retorna automáticamente.',
      },
      {
        id: 'ejemplo-destructuring',
        title: 'Destructuring de un objeto',
        code: 'const alumno = { nombre: "Karla", nota: 9, grupo: "2B" };\nconst { nombre, nota } = alumno;\nconsole.log(`${nombre} tiene ${nota}`);',
        explanationMarkdown:
          'En vez de escribir `alumno.nombre` y `alumno.nota`, los extraemos una sola vez y usamos los nombres directamente. `grupo` se queda sin extraer porque no lo necesitamos.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué imprime este código?',
        codeSnippet: 'const doble = (n) => n * 2;\nconsole.log(doble(5));',
        options: ['10', '5', 'n * 2', 'Error'],
        correctAnswer: '10',
        hints: ['La arrow function retorna automáticamente el resultado de la expresión.', 'doble(5) sustituye n por 5: 5 * 2.'],
        explanationMarkdown: 'Como es una arrow function de una sola expresión, `n * 2` se retorna sin necesidad de escribir `return`.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué valor tiene la variable `ciudad` después de este código?',
        codeSnippet: 'const escuela = { nombre: "Secundaria 12", ciudad: "Puebla", turno: "matutino" };\nconst { ciudad } = escuela;',
        options: ['"Puebla"', '"Secundaria 12"', '"matutino"', 'undefined'],
        correctAnswer: '"Puebla"',
        hints: ['El nombre entre llaves debe coincidir EXACTAMENTE con la propiedad del objeto que quieres extraer.'],
        explanationMarkdown: '`{ ciudad }` extrae la propiedad `ciudad` del objeto `escuela` y la guarda en una variable con el mismo nombre.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Cuál de estas dos líneas usa un template literal?',
        codeSnippet: 'let nombre = "Iván";\n// A: console.log("Hola " + nombre + "!");\n// B: console.log(`Hola ${nombre}!`);',
        options: [
          'Solo B es un template literal, aunque A también funciona',
          'Solo A funciona, B tiene un error',
          'Ninguna funciona',
          'Ambas son template literals',
        ],
        correctAnswer: 'Solo B es un template literal, aunque A también funciona',
        hints: ['Un template literal usa backticks (comillas invertidas) y `${ }`, no comillas normales con +.'],
        explanationMarkdown:
          'A es concatenación clásica con `+` (válida pero más verbosa). B es un template literal: usa backticks y `${variable}` para insertar el valor directamente.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'Este código tiene un bug de destructuring. ¿Cuál es?',
        codeSnippet: 'const alumno = { nombre: "Diana", promedio: 8.5 };\nconst { Nombre, promedio } = alumno;\nconsole.log(Nombre);',
        options: [
          'El nombre de la propiedad debe coincidir exactamente: es "nombre", no "Nombre" (JS distingue mayúsculas)',
          'No se puede hacer destructuring de dos propiedades a la vez',
          'Falta el operador +',
          'El código no tiene ningún error',
        ],
        correctAnswer: 'El nombre de la propiedad debe coincidir exactamente: es "nombre", no "Nombre" (JS distingue mayúsculas)',
        hints: ['JavaScript distingue mayúsculas de minúsculas en los nombres.', 'La propiedad real en el objeto es `nombre` en minúsculas.'],
        explanationMarkdown:
          '`Nombre` (con mayúscula) no existe en el objeto, así que su valor es `undefined`. El destructuring debe coincidir exactamente con el nombre de la propiedad, letra por letra.',
      },
    ],
    challenge: {
      id: 'reto-arrow-destructuring',
      promptMarkdown:
        'Completa `resumenAlumno` usando el destructuring que ya viene en el parámetro y un template literal para el resultado. No uses concatenación con +.',
      starterCode:
        'function resumenAlumno({ nombre, nota, grupo }) {\n  // Retorna: "<nombre> (grupo <grupo>): <nota>"\n  return "";\n}\n\nconsole.log(resumenAlumno({ nombre: "Emilia", nota: 9, grupo: "3A" }));\nconsole.log(resumenAlumno({ nombre: "Bruno", nota: 6, grupo: "1C" }));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-emilia', type: 'stdoutIncludes', label: 'Emilia (grupo 3A): 9', value: 'Emilia (grupo 3A): 9', failureMessage: 'Revisa el caso de Emilia: falta construir el texto exacto con el template literal.' },
        { id: 'check-bruno', type: 'stdoutIncludes', label: 'Bruno (grupo 1C): 6', value: 'Bruno (grupo 1C): 6', failureMessage: 'Revisa el caso de Bruno: la función debe funcionar para cualquier alumno.' },
      ],
      hints: [
        'El parámetro ya viene destructurado: usa nombre, nota y grupo directamente, no `alumno.nombre`.',
        'Usa un template literal: `${nombre} (grupo ${grupo}): ${nota}`.',
      ],
      expectedEvidenceMarkdown: 'La consola debe mostrar "Emilia (grupo 3A): 9" y "Bruno (grupo 1C): 6".',
    },
    reflectionPromptMarkdown:
      'Busca, mentalmente o en algún ejemplo de código que hayas visto, una línea que use + para construir un texto con variables. ¿Cómo se vería con template literals?',
    masteryCriteria: [
      'Puedo convertir una función tradicional corta en arrow function y viceversa.',
      'Extraigo valores de un objeto con destructuring en vez de acceder propiedad por propiedad.',
      'Uso template literals en vez de concatenar con +.',
      'Detecto cuándo un destructuring falla por un nombre de propiedad que no coincide exactamente.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-js-promesas',
    moduleId: 'mod-2-v2',
    phaseId: 'fase-1',
    order: 5,
    title: 'V2.5 Promesas: modelar una tarea que tarda',
    category: 'JavaScript',
    summary: 'Entiende los 3 estados de una Promesa y predice cuándo se ejecuta .then() o .catch().',
    prerequisiteLessonIds: ['lesson-v2-js-arrow-destructuring'],
    estimatedMinutes: 50,
    xpReward: 100,
    icon: Zap,
    color: 'from-pink-500 to-rose-600',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar qué representa una Promesa y sus tres estados (pending, fulfilled, rejected).',
      'Leer una cadena .then()/.catch() y predecir el orden en que se ejecuta.',
      'Reconocer cuándo una tarea es asíncrona en la vida real, no solo en código.',
    ],
    concept: {
      explanationMarkdown:
        'Una Promesa es un objeto que representa el resultado de una tarea que TODAVÍA no terminó, pero que eventualmente terminará. Empieza en estado `pending`. Cuando la tarea termina bien, pasa a `fulfilled` y ejecuta lo que pusiste en `.then()`. Si falla, pasa a `rejected` y ejecuta `.catch()`.',
      whyItMattersMarkdown:
        'Cualquier operación que dependa de algo externo y lento (pedir datos a un servidor, leer un archivo, esperar una base de datos) no puede resolverse al instante. Si JavaScript se quedara congelado esperando, toda la página dejaría de responder. Las promesas son el mecanismo para decir "sigue haciendo otras cosas, y avísame cuando esto termine".',
      realWorldContextMarkdown:
        'Cuando SASE guarda una calificación, el navegador manda esa información al servidor y espera la confirmación: ese "esperar sin congelar la pantalla" es, por dentro, una Promesa. Si se rechaza (se cayó la conexión), el `.catch()` es lo que le muestra al profesor un error en vez de dejarlo pensando que sí se guardó.',
      narrationText:
        'Una promesa representa una tarea que todavía no termina. Pasa de pendiente a cumplida o rechazada, y then/catch reaccionan a cada caso.',
    },
    examples: [
      {
        id: 'ejemplo-resuelta',
        title: 'Una promesa que se resuelve',
        code: 'const tareaLenta = new Promise((resolve) => {\n  resolve("Calificación guardada");\n});\ntareaLenta.then((resultado) => console.log(resultado));',
        explanationMarkdown: '`resolve(...)` marca la promesa como cumplida con ese valor. `.then()` recibe ese valor cuando la promesa se resuelve.',
      },
      {
        id: 'ejemplo-catch',
        title: 'Encadenar y manejar el error',
        code: 'function guardarNota(nota) {\n  return new Promise((resolve, reject) => {\n    if (nota >= 0 && nota <= 10) resolve("Nota guardada: " + nota);\n    else reject("Nota fuera de rango");\n  });\n}\nguardarNota(15)\n  .then((msg) => console.log(msg))\n  .catch((err) => console.log("Error:", err));',
        explanationMarkdown: 'Como 15 no es una nota válida, la promesa se rechaza y el `.catch()` es el que se ejecuta, no el `.then()`.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Cuál es el estado de una promesa recién creada, antes de que termine su tarea?',
        options: ['pending', 'fulfilled', 'rejected', 'completed'],
        correctAnswer: 'pending',
        hints: ['pending significa "pendiente", ni éxito ni error todavía.'],
        explanationMarkdown: 'Toda promesa empieza en `pending` hasta que se llama a `resolve` (pasa a fulfilled) o `reject` (pasa a rejected).',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué imprime este código?',
        codeSnippet: 'Promise.resolve("listo").then((valor) => console.log(valor.toUpperCase()));',
        options: ['LISTO', 'listo', 'Error', 'undefined'],
        correctAnswer: 'LISTO',
        hints: ['`Promise.resolve(...)` crea una promesa ya cumplida con ese valor.', '.then() recibe "listo" y le aplica toUpperCase().'],
        explanationMarkdown: '`Promise.resolve("listo")` se cumple de inmediato con el valor "listo"; `.then` lo recibe y `toUpperCase()` lo pone en mayúsculas.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Qué bloque se ejecuta en este código?',
        codeSnippet:
          'function verificarEdad(edad) {\n  return new Promise((resolve, reject) => {\n    if (edad >= 18) resolve("Acceso permitido");\n    else reject("Acceso denegado: menor de edad");\n  });\n}\nverificarEdad(15).then((m) => console.log(m)).catch((e) => console.log(e));',
        options: ['.catch(), porque 15 no cumple la condición', '.then(), porque la promesa siempre se cumple', 'Ambos bloques se ejecutan', 'Ninguno, porque falta await'],
        correctAnswer: '.catch(), porque 15 no cumple la condición',
        hints: ['15 >= 18 es false, así que entra al else.'],
        explanationMarkdown: 'Como 15 no es mayor o igual a 18, se llama a `reject`, y solo el `.catch()` se ejecuta.',
      },
    ],
    challenge: {
      id: 'reto-promesas',
      promptMarkdown:
        'Completa `verificarAsistenciaMinima(diasAsistidos)`: debe devolver una Promesa que se resuelve con "Asistencia suficiente" si diasAsistidos >= 40, o se rechaza con "Asistencia insuficiente" si no.',
      starterCode:
        'function verificarAsistenciaMinima(diasAsistidos) {\n  return new Promise((resolve, reject) => {\n    // Completa la lógica aquí\n  });\n}\n\nverificarAsistenciaMinima(45).then((m) => console.log(m)).catch((e) => console.log(e));\nverificarAsistenciaMinima(20).then((m) => console.log(m)).catch((e) => console.log(e));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-suficiente', type: 'stdoutIncludes', label: '45 días -> Asistencia suficiente', value: 'Asistencia suficiente', failureMessage: 'Con 45 días de asistencia, la promesa debería resolverse con "Asistencia suficiente".' },
        { id: 'check-insuficiente', type: 'stdoutIncludes', label: '20 días -> Asistencia insuficiente', value: 'Asistencia insuficiente', failureMessage: 'Con 20 días de asistencia, la promesa debería rechazarse con "Asistencia insuficiente".' },
      ],
      hints: ['Usa un if/else dentro de la función que le pasas a `new Promise`.', 'resolve(...) para el caso que cumple; reject(...) para el que no.'],
      expectedEvidenceMarkdown: 'La consola debe mostrar "Asistencia suficiente" (45 días) y "Asistencia insuficiente" (20 días, vía catch).',
    },
    reflectionPromptMarkdown:
      'Piensa en una app que uses seguido (banco, redes sociales, correo). ¿Qué acción tuya dispara ahí una tarea que "tarda" y que la app tiene que esperar sin congelarse?',
    masteryCriteria: [
      'Explico los 3 estados de una promesa con mis propias palabras.',
      'Predigo si un .then() o un .catch() se ejecutará dado el código de una promesa.',
      'Escribí una función que retorna una promesa con resolve/reject según una condición.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-js-async-await',
    moduleId: 'mod-2-v2',
    phaseId: 'fase-1',
    order: 6,
    title: 'V2.6 async/await y fetch: consumir una API real sin bloquear la pantalla',
    category: 'JavaScript',
    summary: 'Reescribe promesas encadenadas como async/await y maneja errores de red con try/catch.',
    prerequisiteLessonIds: ['lesson-v2-js-promesas'],
    estimatedMinutes: 55,
    xpReward: 110,
    icon: Globe,
    color: 'from-indigo-500 to-purple-600',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Reescribir una cadena .then()/.catch() usando async/await.',
      'Usar try/catch para manejar errores en código async/await.',
      'Explicar qué hace fetch() y por qué su resultado hay que esperarlo dos veces (respuesta y luego .json()).',
    ],
    concept: {
      explanationMarkdown:
        '`async/await` es una forma más legible de trabajar con promesas: en vez de encadenar `.then()`, escribes el código como si fuera secuencial. Una función marcada `async` siempre retorna una promesa; dentro de ella, `await` pausa SOLO esa función (no toda la app) hasta que la promesa se resuelva o se rechace.',
      whyItMattersMarkdown:
        'Casi todo el código que trae datos de un servidor (login, cargar calificaciones, guardar una incidencia) se escribe hoy con async/await, no con `.then()` encadenados. Si no lo dominas, no puedes leer ni escribir la mayoría del código de un backend o frontend conectado a una API.',
      realWorldContextMarkdown:
        '`fetch("/api/sase/alumnos")` es exactamente cómo el navegador le pediría al servidor la lista de alumnos de SASE. La respuesta llega en dos pasos: primero los encabezados (`await fetch(...)`), y luego el cuerpo en formato JSON (`await respuesta.json()`); por eso siempre ves dos `await` seguidos en este patrón.',
      narrationText:
        'Async/await hace que el código asíncrono se lea de arriba hacia abajo, como código normal. Try/catch maneja los errores cuando la red o el servidor fallan.',
    },
    examples: [
      {
        id: 'ejemplo-then-vs-async',
        title: 'De .then() a async/await',
        code: '// Con .then()\nfunction cargarDatosThen() {\n  return fetch("/api/datos").then((r) => r.json());\n}\n\n// Con async/await (mismo resultado)\nasync function cargarDatosAwait() {\n  const r = await fetch("/api/datos");\n  return await r.json();\n}',
        explanationMarkdown: 'Ambas funciones hacen lo mismo. `async/await` se lee de arriba hacia abajo como código normal, sin anidar callbacks.',
      },
      {
        id: 'ejemplo-try-catch',
        title: 'Manejo de errores con try/catch',
        code: 'async function cargarAlumno(id) {\n  try {\n    const respuesta = await fetch(`/api/alumnos/${id}`);\n    const datos = await respuesta.json();\n    console.log("Alumno cargado:", datos.nombre);\n  } catch (error) {\n    console.log("No se pudo cargar el alumno:", error.message);\n  }\n}',
        explanationMarkdown: 'Si `fetch` o `.json()` fallan (sin internet, servidor caído), el `catch` captura el error en vez de tronar toda la aplicación.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué palabra clave pausa la ejecución de una función async hasta que la promesa se resuelva?',
        codeSnippet: 'async function cargar() {\n  const datos = ___ obtenerDatos();\n}',
        options: ['await', 'then', 'pause', 'defer'],
        correctAnswer: 'await',
        hints: ['Es la misma palabra que da nombre al patrón "async/await".'],
        explanationMarkdown: '`await` pausa la función async (sin bloquear el resto de la app) hasta que la promesa se resuelve.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué tipo de función SIEMPRE retorna una promesa, aunque dentro tengas un `return` normal?',
        options: ['Una función async', 'Una función normal (sin async)', 'Una arrow function', 'Ninguna'],
        correctAnswer: 'Una función async',
        hints: ['Por eso puedes usar `.then()` sobre el resultado de CUALQUIER función async.'],
        explanationMarkdown: 'Toda función declarada con `async` envuelve automáticamente su valor de retorno en una promesa.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Este código tiene un bug: si fetch falla, la app truena sin avisar nada útil. ¿Qué le falta?',
        codeSnippet: 'async function cargarNotas() {\n  const respuesta = await fetch("/api/notas");\n  const datos = await respuesta.json();\n  console.log(datos);\n}',
        options: ['Un bloque try/catch alrededor de los await', 'Un segundo await extra', 'Cambiar fetch por .then()', 'El código no tiene ningún error'],
        correctAnswer: 'Un bloque try/catch alrededor de los await',
        hints: ['Sin try/catch, un error dentro de una función async se pierde silenciosamente o rompe la promesa sin control.'],
        explanationMarkdown: 'Envolver los `await` en un `try { ... } catch (error) { ... }` permite reaccionar de forma controlada si la red falla o el servidor responde con error.',
      },
    ],
    challenge: {
      id: 'reto-async-await',
      promptMarkdown:
        'Completa `cargarPerfilAlumno(id)` con async/await y try/catch: si `obtenerAlumno(id)` tiene éxito, imprime "Perfil cargado: <nombre>"; si lanza un error, imprime "Error al cargar perfil: <mensaje>". No cambies `obtenerAlumno`.',
      starterCode:
        'function obtenerAlumno(id) {\n  return new Promise((resolve, reject) => {\n    if (id === 1) resolve({ nombre: "Renata" });\n    else reject(new Error("Alumno no encontrado"));\n  });\n}\n\nasync function cargarPerfilAlumno(id) {\n  // Usa await + try/catch aquí\n}\n\ncargarPerfilAlumno(1);\ncargarPerfilAlumno(99);',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-exito', type: 'stdoutIncludes', label: 'Perfil cargado: Renata', value: 'Perfil cargado: Renata', failureMessage: 'Para id 1, obtenerAlumno se resuelve: deberías imprimir "Perfil cargado: Renata".' },
        { id: 'check-error', type: 'stdoutIncludes', label: 'Error al cargar perfil: Alumno no encontrado', value: 'Error al cargar perfil: Alumno no encontrado', failureMessage: 'Para id 99, obtenerAlumno se rechaza: tu catch debe imprimir "Error al cargar perfil: Alumno no encontrado".' },
      ],
      hints: [
        'Dentro de un try, usa `const alumno = await obtenerAlumno(id);` y luego construye el mensaje con alumno.nombre.',
        'En el catch, el parámetro error trae `error.message` con el texto exacto.',
      ],
      expectedEvidenceMarkdown: 'La consola debe mostrar "Perfil cargado: Renata" y "Error al cargar perfil: Alumno no encontrado".',
    },
    reflectionPromptMarkdown:
      'Compara mentalmente el ejemplo con .then() y el mismo código con async/await de esta lección. ¿Cuál se te hace más fácil de leer de corrido, de arriba hacia abajo? Anota por qué.',
    masteryCriteria: [
      'Convierto una cadena .then()/.catch() a su equivalente con async/await.',
      'Uso try/catch para manejar errores dentro de una función async.',
      'Explico por qué fetch() necesita dos await seguidos (respuesta y luego .json()).',
      'Escribí una función async completa que maneja tanto el caso de éxito como el de error.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-git-staging-commit',
    moduleId: 'mod-3-v2',
    phaseId: 'fase-1',
    order: 7,
    title: 'V2.7 Git: directorio de trabajo, staging area y tu primer commit',
    category: 'Herramientas',
    summary: 'Entiende las tres zonas de Git y por qué un commit solo guarda lo que pasó por git add.',
    prerequisiteLessonIds: ['lesson-v2-js-async-await'],
    estimatedMinutes: 40,
    xpReward: 90,
    icon: Terminal,
    color: 'from-slate-600 to-slate-900',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar las tres zonas de Git: directorio de trabajo, staging area y repositorio (historial de commits).',
      'Distinguir qué hace `git add` (mover cambios al staging area) de qué hace `git commit` (guardar un snapshot permanente de lo que está en staging).',
      'Predecir qué archivos quedan incluidos en un commit cuando solo se agregó una parte de los cambios.',
    ],
    concept: {
      explanationMarkdown:
        'Git organiza tu proyecto en tres zonas. El **directorio de trabajo** son los archivos tal como los ves y editas ahora mismo. El **staging area** (o "índice") es una zona intermedia donde marcas exactamente qué cambios quieres incluir en el próximo commit, usando `git add <archivo>`. El **repositorio** es el historial permanente: `git commit -m "mensaje"` toma una fotografía (snapshot) de lo que está en staging en ese momento, no de todo el directorio de trabajo.',
      whyItMattersMarkdown:
        'Si no entiendes estas tres zonas, vas a tener commits que "no traen" cambios que sí hiciste (porque olvidaste el `git add`), o vas a incluir por accidente archivos que no querías compartir todavía. Separar edición de "qué se va a guardar" es lo que te permite hacer commits pequeños y precisos en vez de un solo commit gigante y confuso.',
      realWorldContextMarkdown:
        'En un proyecto como SASE, mientras trabajas en el módulo de calificaciones puedes tener modificados 5 archivos, pero solo 2 están listos para compartir con el equipo. `git add` te deja elegir esos 2 y dejar los otros 3 en el directorio de trabajo para seguir editándolos sin que aparezcan en el commit de hoy.',
      narrationText:
        'Git tiene tres zonas: directorio de trabajo, staging area y repositorio. Git add mueve cambios a staging. Git commit guarda permanentemente solo lo que está en staging, no todo lo que editaste.',
    },
    examples: [
      {
        id: 'ejemplo-flujo-basico',
        title: 'El flujo básico: editar, agregar, commitear',
        code: '# 1. Editas notas.js (directorio de trabajo)\n# 2. Lo marcas para el próximo commit\ngit add notas.js\n# 3. Guardas un snapshot permanente de lo que está en staging\ngit commit -m "feat: agregar calculo de promedio"',
        explanationMarkdown:
          'Cada paso mueve el cambio a la siguiente zona: primero existe solo en tu editor, luego se marca en staging, y solo hasta el `commit` queda guardado en el historial de Git.',
      },
      {
        id: 'ejemplo-add-parcial',
        title: 'Agregar solo una parte de los cambios',
        code: '# Modificaste notas.js Y alumnos.js, pero solo notas.js está listo\ngit add notas.js\ngit commit -m "feat: agregar validacion de notas"\n# alumnos.js sigue modificado, pero NO entró a este commit',
        explanationMarkdown:
          'El commit resultante solo contiene `notas.js`. `alumnos.js` sigue existiendo con tus cambios en el directorio de trabajo, listo para agregarse en un commit posterior.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué comando mueve cambios del directorio de trabajo al staging area?',
        codeSnippet: 'git ____ notas.js',
        options: ['add', 'commit', 'push', 'status'],
        correctAnswer: 'add',
        hints: ['"add" en inglés significa "agregar": agrega el cambio a la zona de staging.'],
        explanationMarkdown: '`git add <archivo>` marca ese archivo para que se incluya en el próximo commit.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown:
          'Modificaste 3 archivos, pero solo ejecutaste `git add archivo1.js` antes de hacer `git commit -m "..."`. ¿Cuántos archivos quedan incluidos en ese commit?',
        options: ['1', '2', '3', '0'],
        correctAnswer: '1',
        hints: ['`git commit` solo guarda lo que está en staging, no todo el directorio de trabajo.'],
        explanationMarkdown:
          'Solo `archivo1.js` pasó por `git add`, así que es el único que queda en el snapshot del commit. Los otros dos siguen modificados, esperando su propio `git add`.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Qué comando te muestra qué archivos están modificados, cuáles están en staging y cuáles Git no está siguiendo todavía?',
        options: ['git status', 'git log', 'git diff', 'git branch'],
        correctAnswer: 'git status',
        hints: ['Es el comando que más vas a usar para "orientarte" antes de hacer commit.'],
        explanationMarkdown: '`git status` resume el estado actual de las tres zonas para ese repositorio.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown:
          'Ejecutas `git commit -m "feat: nueva funcion"` sin haber corrido `git add` para tus cambios más recientes. ¿Qué pasa?',
        options: [
          'El commit no incluye esos cambios nuevos, porque nunca llegaron al staging area',
          'Git agrega automáticamente todos los cambios modificados',
          'El comando falla con un error de sintaxis',
          'No pasa nada distinto, el resultado es igual',
        ],
        correctAnswer: 'El commit no incluye esos cambios nuevos, porque nunca llegaron al staging area',
        hints: ['`git commit` solo toma una fotografía de lo que ya está en staging, nunca del directorio de trabajo directamente.'],
        explanationMarkdown:
          'Sin `git add`, esos cambios simplemente no forman parte del commit; siguen como modificaciones pendientes en el directorio de trabajo hasta que se agreguen explícitamente.',
      },
    ],
    challenge: {
      id: 'reto-git-staging-commit',
      promptMarkdown:
        'Completa `simularCommit(archivosEnStaging, mensaje)`: si el staging area está vacío, avisa que no hay nada que commitear; si tiene archivos, confirma el commit con el mensaje y el número de archivos incluidos.',
      starterCode:
        'function simularCommit(archivosEnStaging, mensaje) {\n  // Si no hay archivos en staging, retorna: "Nada que commitear: el staging area está vacío."\n  // Si hay archivos, retorna: "Commit realizado: <mensaje> (<N> archivo(s))" usando el mensaje real y el numero de archivos\n  return "";\n}\n\nconsole.log(simularCommit(["notas.js", "alumnos.js"], "feat: agregar modulo de notas"));\nconsole.log(simularCommit([], "feat: intento sin agregar nada"));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-commit-exitoso',
          type: 'stdoutIncludes',
          label: 'Commit con 2 archivos en staging',
          value: 'Commit realizado: "feat: agregar modulo de notas" (2 archivo(s))',
          failureMessage: 'Con 2 archivos en staging, el commit debe confirmarse mostrando el mensaje y el número exacto de archivos.',
        },
        {
          id: 'check-staging-vacio',
          type: 'stdoutIncludes',
          label: 'Staging vacío -> nada que commitear',
          value: 'Nada que commitear: el staging area está vacío.',
          failureMessage: 'Con el staging area vacío, no debe generarse un commit; hay que avisar que no hay nada que guardar.',
        },
      ],
      hints: [
        'Usa archivosEnStaging.length para decidir cuál de los dos mensajes mostrar.',
        'Construye el mensaje de éxito con un template literal: `Commit realizado: "${mensaje}" (${archivosEnStaging.length} archivo(s))`.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar el commit exitoso con 2 archivos y el mensaje exacto, y luego el aviso de staging vacío.',
    },
    reflectionPromptMarkdown:
      '¿Alguna vez perdiste (o casi pierdes) trabajo por no tener un sistema de versiones? Describe qué pasó o qué habría cambiado si hubieras tenido Git.',
    masteryCriteria: [
      'Explico las tres zonas de Git con mis propias palabras.',
      'Distingo qué hace git add de qué hace git commit.',
      'Predigo qué archivos quedan incluidos en un commit cuando solo se agregó una parte de los cambios.',
      'Escribí una función que refleja correctamente el comportamiento de commitear staging vacío vs. con archivos.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-git-ramas',
    moduleId: 'mod-3-v2',
    phaseId: 'fase-1',
    order: 8,
    title: 'V2.8 Ramas: trabajar en paralelo sin romper main',
    category: 'Herramientas',
    summary: 'Crea ramas para aislar trabajo en progreso y entiende qué pasa cuando dos ramas chocan al hacer merge.',
    prerequisiteLessonIds: ['lesson-v2-git-staging-commit'],
    estimatedMinutes: 45,
    xpReward: 100,
    icon: GitBranch,
    color: 'from-slate-500 to-zinc-800',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar qué es una rama y por qué aísla el trabajo en progreso del código estable en main.',
      'Usar `git checkout -b <rama>` para crear una rama nueva y cambiarte a ella.',
      'Predecir cuándo un merge entre dos ramas genera un conflicto que hay que resolver manualmente.',
    ],
    concept: {
      explanationMarkdown:
        'Una rama es una línea de trabajo independiente que parte de un punto del historial. `main` normalmente contiene el código estable; cuando empiezas una funcionalidad nueva, creas una rama (`git checkout -b feature-x`) para experimentar sin afectar `main`. Cuando la funcionalidad está lista, se junta de vuelta con `git merge feature-x` (estando parado en `main`).',
      whyItMattersMarkdown:
        'Sin ramas, cualquier cambio a medio terminar vive directamente en el código que todos usan, y un error rompe el proyecto para todo el equipo. Las ramas permiten que varias personas (o tú mismo, en varias tareas) trabajen en paralelo sin pisarse, y que `main` siempre se mantenga en un estado que funciona.',
      realWorldContextMarkdown:
        'En SASE, una persona podría trabajar en `feature-calificaciones` mientras otra corrige un bug urgente directamente sobre `main`. Ninguna de las dos ve el trabajo a medias de la otra hasta que hacen merge, así que el bug se puede arreglar y desplegar sin esperar a que la funcionalidad nueva esté terminada.',
      narrationText:
        'Una rama es una línea de trabajo independiente. Creas una rama para aislar una funcionalidad, y la juntas de vuelta a main con merge cuando está lista. Si dos ramas cambiaron la misma línea, Git marca un conflicto.',
    },
    examples: [
      {
        id: 'ejemplo-crear-rama',
        title: 'Crear una rama y volver a main',
        code: 'git checkout -b feature-calificaciones\n# ... trabajas y haces commits en esta rama ...\ngit checkout main\ngit merge feature-calificaciones',
        explanationMarkdown:
          '`checkout -b` crea la rama Y te cambia a ella en un solo paso. Los commits que hagas ahí no aparecen en `main` hasta que regreses a `main` y ejecutes `merge`.',
      },
      {
        id: 'ejemplo-conflicto',
        title: 'Cuándo aparece un conflicto de merge',
        code: '# Rama A cambió la línea 10 de notas.js\n# Rama B TAMBIÉN cambió la línea 10 de notas.js, de otra forma\ngit merge rama-b\n# CONFLICT (content): Merge conflict in notas.js',
        explanationMarkdown:
          'Git no puede decidir por sí solo cuál de las dos versiones de la línea 10 es la correcta, así que detiene el merge y te pide resolver el conflicto a mano.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué comando crea una rama nueva Y te cambia a ella en un solo paso?',
        codeSnippet: 'git ______ feature-calificaciones',
        options: ['checkout -b', 'branch', 'merge', 'commit -b'],
        correctAnswer: 'checkout -b',
        hints: ['`git branch <nombre>` solo crea la rama, pero no te mueve a ella.'],
        explanationMarkdown: '`git checkout -b <rama>` combina crear la rama y cambiarte a ella en un solo comando.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown:
          'Dos desarrolladores trabajan en ramas distintas (`feature-a` y `feature-b`) partiendo de `main`. Mientras ninguno hace merge, ¿los cambios de uno afectan al trabajo del otro?',
        options: [
          'No, cada rama es independiente hasta que alguien hace merge',
          'Sí, los cambios se sincronizan automáticamente entre ramas',
          'Solo si ambos modifican el mismo archivo',
          'Depende de si usan la misma computadora',
        ],
        correctAnswer: 'No, cada rama es independiente hasta que alguien hace merge',
        hints: ['Ese aislamiento es exactamente el propósito de las ramas.'],
        explanationMarkdown:
          'Cada rama tiene su propio historial de commits hasta que explícitamente se junta con otra mediante `merge`.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Estando parado en `main`, ¿qué comando junta de vuelta los cambios de la rama `feature-calificaciones`?',
        codeSnippet: 'git ______ feature-calificaciones',
        options: ['merge', 'add', 'branch', 'commit'],
        correctAnswer: 'merge',
        hints: ['Debes estar en la rama DESTINO (main) antes de ejecutar este comando.'],
        explanationMarkdown: '`git merge feature-calificaciones` incorpora los commits de esa rama al historial de la rama actual (`main`).',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: '¿Qué pasa si dos ramas modificaron la MISMA línea del mismo archivo y luego intentas hacer merge?',
        options: [
          'Git marca un conflicto de merge y te pide resolver manualmente qué versión dejar',
          'Git elige automáticamente los cambios de la rama más reciente',
          'El merge falla por completo y borra los cambios de ambas ramas',
          'No pasa nada: Git combina ambas versiones de la línea automáticamente',
        ],
        correctAnswer: 'Git marca un conflicto de merge y te pide resolver manualmente qué versión dejar',
        hints: ['Git es bueno combinando cambios en LÍNEAS DISTINTAS, no en la misma línea.'],
        explanationMarkdown:
          'Cuando el mismo lugar del archivo cambió en ambas ramas, Git no puede decidir cuál versión es correcta: detiene el merge, marca el conflicto en el archivo, y espera que la persona lo resuelva a mano.',
      },
    ],
    challenge: {
      id: 'reto-git-ramas',
      promptMarkdown:
        'Completa `crearRama(ramasExistentes, nuevaRama)`: si la rama ya existe, retorna un error; si no existe, confirma que se creó y que te cambiaste a ella.',
      starterCode:
        'function crearRama(ramasExistentes, nuevaRama) {\n  // Si nuevaRama ya esta en ramasExistentes, retorna: "Error: la rama <nuevaRama> ya existe."\n  // Si no esta, retorna: "Rama <nuevaRama> creada. Cambiaste a la nueva rama."\n  return "";\n}\n\nconsole.log(crearRama(["main"], "feature-calificaciones"));\nconsole.log(crearRama(["main", "feature-calificaciones"], "feature-calificaciones"));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-rama-nueva',
          type: 'stdoutIncludes',
          label: 'Rama nueva creada con éxito',
          value: 'Rama "feature-calificaciones" creada. Cambiaste a la nueva rama.',
          failureMessage: 'Cuando la rama no existe todavía, debe confirmarse su creación con el nombre exacto entre comillas.',
        },
        {
          id: 'check-rama-duplicada',
          type: 'stdoutIncludes',
          label: 'Rama duplicada -> error',
          value: 'Error: la rama "feature-calificaciones" ya existe.',
          failureMessage: 'Cuando la rama ya está en la lista de ramas existentes, debe rechazarse con un mensaje de error, no crearse de nuevo.',
        },
      ],
      hints: [
        'Usa ramasExistentes.includes(nuevaRama) para revisar si ya existe.',
        'Construye cada mensaje con un template literal que incluya el nombre real de la rama entre comillas dobles.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar primero la confirmación de creación de "feature-calificaciones", y luego el error al intentar crearla de nuevo.',
    },
    reflectionPromptMarkdown:
      'Si trabajaras en equipo sin ramas (todos commiteando directo a main), ¿qué problema concreto crees que aparecería primero?',
    masteryCriteria: [
      'Explico qué es una rama y por qué aísla trabajo en progreso.',
      'Sé qué comando crea una rama y cambia a ella en un solo paso.',
      'Predigo cuándo un merge entre ramas genera un conflicto que hay que resolver a mano.',
      'Escribí una función que distingue correctamente crear una rama nueva de un intento de rama duplicada.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-conventional-commits',
    moduleId: 'mod-3-v2',
    phaseId: 'fase-1',
    order: 9,
    title: 'V2.9 Conventional Commits: mensajes de commit que cuentan una historia',
    category: 'Herramientas',
    summary: 'Usa el estándar tipo(alcance): descripción para que el historial de commits sea legible y automatizable.',
    prerequisiteLessonIds: ['lesson-v2-git-ramas'],
    estimatedMinutes: 40,
    xpReward: 90,
    icon: GitCommit,
    color: 'from-zinc-600 to-neutral-900',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Elegir el prefijo correcto (feat, fix, docs, chore, refactor) según el tipo de cambio realizado.',
      'Escribir un mensaje de commit con el formato `tipo(alcance): descripción`.',
      'Detectar cuándo un mensaje de commit es demasiado vago para saber qué cambió sin abrir el diff.',
    ],
    concept: {
      explanationMarkdown:
        'Conventional Commits es un estándar para escribir mensajes de commit con formato `tipo(alcance): descripción`. El `tipo` dice QUÉ CLASE de cambio es (`feat` = funcionalidad nueva, `fix` = corrección de bug, `docs` = documentación, `chore` = tareas de mantenimiento, `refactor` = reordenar código sin cambiar su comportamiento). El `alcance` (opcional, entre paréntesis) dice EN QUÉ PARTE del proyecto ocurrió. La `descripción` es una frase corta en presente que explica el cambio.',
      whyItMattersMarkdown:
        'Un historial de commits con mensajes como "cambios", "arreglos", "asdf" es inútil seis meses después: nadie puede saber qué se hizo sin abrir cada commit uno por uno. Un historial con Conventional Commits se puede leer como una bitácora, e incluso generar automáticamente un changelog o decidir la siguiente versión del software.',
      realWorldContextMarkdown:
        'Los pipelines de CI/CD (Módulo 10) y las herramientas de release automático leen el prefijo (`feat`, `fix`, etc.) de cada commit para decidir si el próximo lanzamiento es una versión menor, un parche, o si necesita mencionarse en las notas de la versión.',
      narrationText:
        'Conventional Commits usa el formato tipo, entre paréntesis el alcance opcional, dos puntos y la descripción. El tipo dice qué clase de cambio es: funcionalidad nueva, corrección, documentación, mantenimiento o refactor.',
    },
    examples: [
      {
        id: 'ejemplo-feat',
        title: 'Un commit de funcionalidad nueva',
        code: 'git commit -m "feat(sase-notas): permitir registro de calificaciones"',
        explanationMarkdown:
          '`feat` indica que se agregó algo nuevo que el usuario puede usar; `(sase-notas)` acota el cambio a ese módulo del proyecto.',
      },
      {
        id: 'ejemplo-vago',
        title: 'Un mensaje que Conventional Commits NO aceptaría',
        code: 'git commit -m "arreglos varios"',
        explanationMarkdown:
          'No tiene tipo (¿fue un fix? ¿un feat?) ni describe qué se arregló específicamente. Seis meses después, este mensaje no le sirve a nadie del equipo.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué prefijo usarías para AGREGAR una funcionalidad nueva al sistema?',
        codeSnippet: 'git commit -m "____: agregar modulo de autenticacion"',
        options: ['feat', 'fix', 'chore', 'docs'],
        correctAnswer: 'feat',
        hints: ['"feat" viene de "feature" (funcionalidad).'],
        explanationMarkdown: '`feat` se usa cuando el commit introduce una capacidad nueva para quien usa el software.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué prefijo usarías para CORREGIR un bug que ya estaba reportado?',
        options: ['fix', 'feat', 'refactor', 'docs'],
        correctAnswer: 'fix',
        hints: ['"fix" significa "arreglar" o "corregir".'],
        explanationMarkdown: '`fix` marca un commit que corrige un comportamiento incorrecto existente, no que agrega algo nuevo.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Cuál es el formato correcto de un mensaje Conventional Commits con alcance?',
        options: [
          'tipo(alcance): descripción',
          'alcance(tipo): descripción',
          'descripción: tipo(alcance)',
          'tipo - alcance - descripción',
        ],
        correctAnswer: 'tipo(alcance): descripción',
        hints: ['El alcance va entre paréntesis, justo después del tipo, y antes de los dos puntos.'],
        explanationMarkdown: 'El orden fijo es tipo, alcance opcional entre paréntesis, dos puntos, y luego la descripción.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'Un compañero hizo `git commit -m "arreglos varios"`. ¿Qué problema tiene ese mensaje según Conventional Commits?',
        options: [
          'No usa ningún prefijo de tipo (feat/fix/etc.) y la descripción es demasiado vaga para saber qué cambió',
          'El mensaje es demasiado largo',
          'Le falta obligatoriamente el alcance entre paréntesis',
          'No tiene ningún problema',
        ],
        correctAnswer: 'No usa ningún prefijo de tipo (feat/fix/etc.) y la descripción es demasiado vaga para saber qué cambió',
        hints: ['El alcance es opcional, pero el tipo y una descripción clara no lo son.'],
        explanationMarkdown:
          'Sin tipo ni descripción específica, nadie puede saber si fue un feat, un fix, o qué parte del proyecto cambió sin abrir el commit completo.',
      },
    ],
    challenge: {
      id: 'reto-conventional-commits',
      promptMarkdown:
        'Completa `formatearCommit(tipo, alcance, descripcion)`: si el tipo no está en la lista de tipos válidos, retorna un error; si es válido, arma el mensaje con el formato tipo(alcance): descripción.',
      starterCode:
        'function formatearCommit(tipo, alcance, descripcion) {\n  const tiposValidos = ["feat", "fix", "docs", "chore", "refactor"];\n  // Si tipo no esta en tiposValidos, retorna: "Error: tipo de commit invalido: <tipo>"\n  // Si es valido, retorna el mensaje con el formato: tipo(alcance): descripcion\n  return "";\n}\n\nconsole.log(formatearCommit("feat", "sase-notas", "permitir registro de calificaciones"));\nconsole.log(formatearCommit("hotfix", "sase-notas", "corregir bug urgente"));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-tipo-valido',
          type: 'stdoutIncludes',
          label: 'feat(sase-notas): permitir registro de calificaciones',
          value: 'feat(sase-notas): permitir registro de calificaciones',
          failureMessage: 'Con un tipo válido, el mensaje debe armarse exactamente como tipo(alcance): descripcion.',
        },
        {
          id: 'check-tipo-invalido',
          type: 'stdoutIncludes',
          label: 'Tipo inválido -> error',
          value: 'Error: tipo de commit inválido: "hotfix"',
          failureMessage: '"hotfix" no está en la lista de tipos válidos: debe rechazarse con un mensaje de error, no formatearse como si fuera correcto.',
        },
      ],
      hints: [
        'Usa tiposValidos.includes(tipo) para validar antes de armar el mensaje.',
        'Para el caso válido, usa un template literal: `${tipo}(${alcance}): ${descripcion}`.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar el commit válido formateado correctamente, y luego el error para el tipo "hotfix".',
    },
    reflectionPromptMarkdown:
      'Revisa (mentalmente o de verdad) el último mensaje de commit que escribiste alguna vez, o uno que hayas visto. ¿Cumpliría el estándar Conventional Commits? ¿Cómo lo reescribirías?',
    masteryCriteria: [
      'Elijo el prefijo correcto (feat/fix/docs/chore/refactor) según el tipo de cambio.',
      'Escribo un mensaje de commit con el formato tipo(alcance): descripción.',
      'Detecto cuándo un mensaje de commit es demasiado vago para ser útil.',
      'Escribí una función que valida el tipo de commit contra una lista de tipos permitidos antes de formatear el mensaje.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-ts-tipos-basicos',
    moduleId: 'mod-4-v2',
    phaseId: 'fase-1',
    order: 10,
    title: 'V2.10 TypeScript: tipos básicos y por qué previenen errores antes de ejecutar',
    category: 'TypeScript',
    summary: 'Anota variables y parámetros con string, number y boolean, y entiende qué error evita cada uno.',
    prerequisiteLessonIds: ['lesson-v2-conventional-commits'],
    estimatedMinutes: 40,
    xpReward: 90,
    icon: FileCode,
    color: 'from-blue-500 to-blue-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Anotar variables y parámetros de función con los tipos primitivos string, number y boolean.',
      'Explicar la diferencia entre un error que TypeScript detecta al escribir código y uno que JavaScript solo revela al ejecutarlo.',
      'Leer un error de tipos y distinguir cuál tipo se esperaba y cuál se recibió realmente.',
    ],
    concept: {
      explanationMarkdown:
        'TypeScript es JavaScript con anotaciones de tipo opcionales. `let nota: number = 8;` le dice al editor que `nota` SIEMPRE debe contener un número; si en algún punto del código intentas asignarle un texto, TypeScript marca el error ahí mismo, antes de ejecutar nada. Los tres tipos primitivos más comunes son `string` (texto), `number` (números, sin distinguir enteros de decimales) y `boolean` (`true`/`false`).',
      whyItMattersMarkdown:
        'En JavaScript puro, el bug de `"8" + 1` dando `"81"` (Módulo 2) no se detecta hasta que ejecutas el código y ves el resultado incorrecto. En TypeScript, si declaras `calificacion: number`, ese mismo error se marca en el editor antes de correr el programa ni una sola vez: te ahorra encontrarlo hasta producción.',
      realWorldContextMarkdown:
        'En SASE, un formulario HTML siempre entrega los valores capturados como texto, aunque el campo sea "calificación". Si tu función espera `calificacion: number` y le llega un string sin convertir, TypeScript te avisa en el editor antes de que ese dato mal formado llegue a guardarse en la base de datos.',
      narrationText:
        'TypeScript agrega anotaciones de tipo a JavaScript. Declaras si una variable es texto, número o booleano, y el editor avisa de inmediato si intentas usarla con el tipo equivocado.',
    },
    examples: [
      {
        id: 'ejemplo-anotaciones',
        title: 'Anotar variables con su tipo',
        code: 'let nombre: string = "Valeria";\nlet calificacion: number = 9;\nlet activo: boolean = true;',
        explanationMarkdown:
          'Cada `: tipo` después del nombre de la variable es la anotación. TypeScript usa esa anotación para vigilar que el valor asignado siempre coincida.',
      },
      {
        id: 'ejemplo-error-tipos',
        title: 'Un error que TypeScript detecta antes de ejecutar',
        code: 'let calificacion: number = 9;\ncalificacion = "10"; // Error de TypeScript: Type "string" is not assignable to type "number".',
        explanationMarkdown:
          'JavaScript permitiría este cambio sin quejarse. TypeScript lo marca como error en el editor porque `calificacion` se declaró como `number`, no como `string`.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué anotación de tipo usarías para una variable que guarda el nombre de un alumno?',
        codeSnippet: 'let nombre: ______ = "Karla";',
        options: ['string', 'String', 'text', 'number'],
        correctAnswer: 'string',
        hints: ['El tipo primitivo de texto en TypeScript se escribe siempre en minúsculas.'],
        explanationMarkdown: '`string` (minúscula) es el tipo primitivo de TypeScript para texto.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué anotación usarías para una variable que guarda si un alumno está activo o no?',
        codeSnippet: 'let activo: ______ = true;',
        options: ['boolean', 'bool', 'string', 'number'],
        correctAnswer: 'boolean',
        hints: ['El tipo para true/false en TypeScript no es una abreviatura.'],
        explanationMarkdown: '`boolean` es el tipo primitivo que acepta únicamente `true` o `false`.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Este código tiene un error de TypeScript. ¿Cuál es?',
        codeSnippet: 'let edad: number = 20;\nedad = "veintiuno";',
        options: [
          'Se está asignando un string a una variable declarada como number',
          'El nombre de la variable es inválido',
          'Falta un punto y coma',
          'El código no tiene ningún error',
        ],
        correctAnswer: 'Se está asignando un string a una variable declarada como number',
        hints: ['Revisa la anotación original de `edad` y compárala con el nuevo valor.'],
        explanationMarkdown:
          '`edad` se declaró como `number`. Asignarle el texto "veintiuno" viola esa anotación, así que TypeScript marca error antes de ejecutar nada.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: '¿Cuál es la principal ventaja de declarar `calificacion: number` en vez de dejar que el tipo quede libre?',
        options: [
          'TypeScript marca en el editor cualquier intento de asignarle un valor que no sea número, antes de ejecutar el código',
          'El código se ejecuta más rápido en el navegador',
          'Permite usar más decimales que en JavaScript normal',
          'No hay ninguna ventaja real',
        ],
        correctAnswer: 'TypeScript marca en el editor cualquier intento de asignarle un valor que no sea número, antes de ejecutar el código',
        hints: ['Piensa en CUÁNDO se detecta el error: ¿al escribir el código o al ejecutarlo?'],
        explanationMarkdown:
          'La ventaja central de anotar tipos es detectar errores en el momento de escribir el código, no cuando ya está corriendo (o peor, en producción).',
      },
    ],
    challenge: {
      id: 'reto-ts-tipos-basicos',
      promptMarkdown:
        'El sandbox de este reto ejecuta JavaScript, no TypeScript, así que vas a simular en tiempo real la misma verificación que TypeScript haría en el editor. Completa `validarCalificacion(valor)`.',
      starterCode:
        'function validarCalificacion(valor) {\n  // Si typeof valor NO es "number", retorna: "Error de tipos: se esperaba number, se recibio <typeof valor>"\n  // Si es number, retorna: "Calificacion valida: <valor>"\n  return "";\n}\n\nconsole.log(validarCalificacion(9));\nconsole.log(validarCalificacion("9"));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-numero-valido',
          type: 'stdoutIncludes',
          label: 'Calificacion valida: 9',
          value: 'Calificacion valida: 9',
          failureMessage: 'Con un número real (9), la función debe confirmar que la calificación es válida.',
        },
        {
          id: 'check-tipo-invalido',
          type: 'stdoutIncludes',
          label: 'Error de tipos: se esperaba number, se recibio string',
          value: 'Error de tipos: se esperaba number, se recibio string',
          failureMessage: 'Con el string "9" (no el número 9), la función debe rechazarlo indicando el tipo real recibido con typeof.',
        },
      ],
      hints: [
        'Usa typeof valor para saber el tipo real en tiempo de ejecución.',
        'Construye el mensaje de error con un template literal que incluya typeof valor directamente.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar "Calificacion valida: 9" y luego el error de tipos indicando que se recibió string.',
    },
    reflectionPromptMarkdown:
      'Piensa en un formulario o sistema que uses seguido (no necesariamente de programación). ¿En qué parte un dato del tipo equivocado (texto en vez de número, por ejemplo) causaría un problema real?',
    masteryCriteria: [
      'Anoto variables con los tipos primitivos string, number y boolean.',
      'Explico la diferencia entre un error detectado al escribir código (TypeScript) y uno detectado solo al ejecutarlo (JavaScript).',
      'Leo un mensaje de error de tipos e identifico el tipo esperado frente al recibido.',
      'Escribí una función que valida el tipo de un valor en tiempo de ejecución, simulando lo que TypeScript hace en el editor.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-ts-interfaces',
    moduleId: 'mod-4-v2',
    phaseId: 'fase-1',
    order: 11,
    title: 'V2.11 Interfaces: describe la forma exacta de un objeto',
    category: 'TypeScript',
    summary: 'Define interfaces para objetos y detecta cuándo un objeto no cumple la forma esperada.',
    prerequisiteLessonIds: ['lesson-v2-ts-tipos-basicos'],
    estimatedMinutes: 45,
    xpReward: 100,
    icon: Boxes,
    color: 'from-blue-600 to-cyan-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Definir una interface que describa las propiedades y tipos exactos de un objeto.',
      'Distinguir una propiedad obligatoria de una opcional (marcada con `?`).',
      'Identificar por qué un objeto concreto no cumple una interface dada.',
    ],
    concept: {
      explanationMarkdown:
        'Una interface describe la FORMA exacta que debe tener un objeto: qué propiedades tiene, y de qué tipo es cada una. `interface Alumno { nombre: string; nota: number; }` no crea ningún dato; es un contrato que dice "cualquier objeto declarado como Alumno debe tener exactamente una propiedad `nombre` de tipo string y una propiedad `nota` de tipo number". Un signo `?` después del nombre de la propiedad (`grupo?: string`) la marca como opcional.',
      whyItMattersMarkdown:
        'Sin interfaces, cualquier función que reciba un objeto no tiene forma de garantizar que traiga las propiedades que espera hasta que el código truena en producción al acceder a una propiedad que resulta `undefined`. Con una interface, TypeScript avisa en el editor si construyes o le pasas a una función un objeto que no cumple la forma exacta.',
      realWorldContextMarkdown:
        'En React (Módulo 5) vas a escribir algo como `interface AlumnoCardProps { nombre: string; nota: number; }` para describir exactamente qué props espera un componente. Si alguien intenta usar ese componente sin pasarle `nota`, TypeScript lo marca como error antes de que la app se ejecute con un dato faltante.',
      narrationText:
        'Una interface describe la forma exacta de un objeto: qué propiedades tiene y de qué tipo es cada una. El signo de interrogación marca una propiedad como opcional.',
    },
    examples: [
      {
        id: 'ejemplo-interface-basica',
        title: 'Definir e implementar una interface',
        code: 'interface Alumno {\n  nombre: string;\n  nota: number;\n}\n\nconst valeria: Alumno = { nombre: "Valeria", nota: 9 };',
        explanationMarkdown:
          'El objeto `valeria` cumple la interface porque tiene exactamente las propiedades `nombre` (string) y `nota` (number) que la interface exige.',
      },
      {
        id: 'ejemplo-propiedad-opcional',
        title: 'Una propiedad opcional con ?',
        code: 'interface Alumno {\n  nombre: string;\n  nota: number;\n  grupo?: string;\n}\n\nconst diego: Alumno = { nombre: "Diego", nota: 7 }; // valido, grupo es opcional',
        explanationMarkdown:
          'Como `grupo` tiene `?`, un objeto Alumno es válido aunque no incluya esa propiedad. Sin el `?`, omitirla sería un error de TypeScript.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué palabra clave usa TypeScript para describir la forma que debe tener un objeto?',
        codeSnippet: '______ Alumno {\n  nombre: string;\n  nota: number;\n}',
        options: ['interface', 'class', 'type object', 'struct'],
        correctAnswer: 'interface',
        hints: ['Es la misma palabra que da título a esta lección.'],
        explanationMarkdown: '`interface` declara un contrato de forma para objetos; no crea ninguna instancia por sí sola.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: 'Dada esta interface, ¿cuál de estos objetos SÍ la cumple?',
        codeSnippet: 'interface Docente {\n  nombre: string;\n  materias: number;\n}',
        options: [
          '{ nombre: "Hugo", materias: 3 }',
          '{ nombre: "Hugo", materias: "3" }',
          '{ nombre: "Hugo" }',
          '{ materias: 3 }',
        ],
        correctAnswer: '{ nombre: "Hugo", materias: 3 }',
        hints: ['Revisa que AMBAS propiedades estén presentes y con el tipo exacto declarado.'],
        explanationMarkdown:
          'Las otras opciones fallan: una tiene `materias` como string, otra le falta `materias`, y otra le falta `nombre`.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Qué significa el símbolo `?` después del nombre de una propiedad en una interface?',
        options: [
          'La propiedad es opcional: el objeto es válido con o sin ella',
          'La propiedad acepta cualquier tipo de dato',
          'La propiedad es obligatoria y siempre de tipo boolean',
          'Es un error de sintaxis',
        ],
        correctAnswer: 'La propiedad es opcional: el objeto es válido con o sin ella',
        hints: ['Piensa en el ejemplo de `grupo?: string`.'],
        explanationMarkdown: 'El `?` marca la propiedad como opcional; sin él, la propiedad es obligatoria en todo objeto que use esa interface.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'Este código marca un error de TypeScript. ¿Cuál es la causa?',
        codeSnippet: 'interface Alumno {\n  nombre: string;\n  nota: number;\n}\n\nconst marco: Alumno = { nombre: "Marco" };',
        options: [
          'Falta la propiedad nota, que es obligatoria en la interface (no tiene ?)',
          'El nombre "Marco" está mal escrito',
          'Las interfaces no pueden usarse con const',
          'El código no tiene ningún error',
        ],
        correctAnswer: 'Falta la propiedad nota, que es obligatoria en la interface (no tiene ?)',
        hints: ['Compara las propiedades del objeto contra las que exige la interface.'],
        explanationMarkdown:
          '`nota` no tiene `?` en la interface, así que es obligatoria. El objeto `marco` la omite, por lo que no cumple la forma exigida.',
      },
    ],
    challenge: {
      id: 'reto-ts-interfaces',
      promptMarkdown:
        'Completa `cumpleInterfazAlumno(obj)`, que simula en tiempo de ejecución lo que TypeScript verificaría con la interface `{ nombre: string; nota: number }`.',
      starterCode:
        'function cumpleInterfazAlumno(obj) {\n  // Debe tener obj.nombre de tipo string Y obj.nota de tipo number\n  // Si cumple, retorna: "Objeto valido: cumple la interfaz Alumno"\n  // Si no cumple, retorna: "Objeto invalido: no cumple la interfaz Alumno"\n  return "";\n}\n\nconsole.log(cumpleInterfazAlumno({ nombre: "Valeria", nota: 9 }));\nconsole.log(cumpleInterfazAlumno({ nombre: "Marco" }));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-cumple',
          type: 'stdoutIncludes',
          label: 'Objeto valido: cumple la interfaz Alumno',
          value: 'Objeto valido: cumple la interfaz Alumno',
          failureMessage: 'Un objeto con nombre (string) y nota (number) debe confirmarse como válido.',
        },
        {
          id: 'check-no-cumple',
          type: 'stdoutIncludes',
          label: 'Objeto invalido: no cumple la interfaz Alumno',
          value: 'Objeto invalido: no cumple la interfaz Alumno',
          failureMessage: 'Un objeto al que le falta nota debe rechazarse como inválido, no tratarse como si cumpliera la interfaz.',
        },
      ],
      hints: [
        'Usa typeof obj.nombre === "string" && typeof obj.nota === "number".',
        'Si falta una propiedad, typeof de esa propiedad es "undefined", no el tipo esperado.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar que el objeto de Valeria es válido, y que el objeto de Marco (sin nota) es inválido.',
    },
    reflectionPromptMarkdown:
      'Piensa en un objeto que uses seguido en tu trabajo (un expediente, un formulario). ¿Qué propiedades serían obligatorias y cuáles opcionales si tuvieras que describirlo como una interface?',
    masteryCriteria: [
      'Defino una interface con las propiedades y tipos exactos de un objeto.',
      'Distingo una propiedad obligatoria de una opcional marcada con ?.',
      'Identifico por qué un objeto concreto no cumple una interface dada.',
      'Escribí una función que valida si un objeto cumple una forma específica en tiempo de ejecución.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-ts-funciones-genericos',
    moduleId: 'mod-4-v2',
    phaseId: 'fase-1',
    order: 12,
    title: 'V2.12 Funciones tipadas y genéricos básicos: reutilizar código sin perder los tipos',
    category: 'TypeScript',
    summary: 'Anota parámetros y retorno de funciones, y entiende para qué sirve un genérico como <T>.',
    prerequisiteLessonIds: ['lesson-v2-ts-interfaces'],
    estimatedMinutes: 50,
    xpReward: 110,
    icon: Puzzle,
    color: 'from-blue-600 to-indigo-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Anotar los parámetros y el tipo de retorno de una función.',
      'Explicar qué problema resuelve un genérico (`<T>`) frente a usar `any`.',
      'Predecir el tipo de retorno de una función genérica según el tipo del argumento que recibe.',
    ],
    concept: {
      explanationMarkdown:
        'Una función tipada anota tanto sus parámetros como su valor de retorno: `function sumar(a: number, b: number): number { return a + b; }`. Cuando una función debe funcionar con CUALQUIER tipo sin perder la información de ese tipo (por ejemplo, regresar el primer elemento de un arreglo, sea de strings o de números), se usa un genérico: `function primero<T>(arr: T[]): T { return arr[0]; }`. `T` es un marcador de tipo que TypeScript reemplaza automáticamente según lo que le pases.',
      whyItMattersMarkdown:
        'Sin genéricos, la alternativa es usar `any` (aceptar cualquier tipo) y perder toda la protección de TypeScript, o escribir una función distinta para cada tipo de dato. Los genéricos dan lo mejor de ambos mundos: una sola función reutilizable, y TypeScript sigue sabiendo el tipo exacto del resultado en cada llamada.',
      realWorldContextMarkdown:
        'Código real que verás pronto usa genéricos así: `useState<Alumno[]>([])` (Módulo 5) le dice a TypeScript que ese estado siempre será un arreglo de Alumno, y avisa si en algún punto intentas meter ahí un dato que no cumple esa forma.',
      narrationText:
        'Las funciones tipadas anotan parámetros y retorno. Los genéricos permiten que una función funcione con cualquier tipo sin perder la información de ese tipo, usando una letra como marcador, típicamente T.',
    },
    examples: [
      {
        id: 'ejemplo-funcion-tipada',
        title: 'Una función con parámetros y retorno tipados',
        code: 'function calcularPromedio(notas: number[]): number {\n  return notas.reduce((a, b) => a + b, 0) / notas.length;\n}',
        explanationMarkdown:
          '`notas: number[]` dice que el parámetro es un arreglo de números; `: number` después del paréntesis dice que la función siempre retorna un número.',
      },
      {
        id: 'ejemplo-generico',
        title: 'Una función genérica que preserva el tipo',
        code: 'function primero<T>(arr: T[]): T {\n  return arr[0];\n}\n\nconst n = primero([1, 2, 3]); // TypeScript sabe que n es number\nconst s = primero(["a", "b"]); // TypeScript sabe que s es string',
        explanationMarkdown:
          'La misma función `primero` funciona con arreglos de cualquier tipo, y TypeScript sigue sabiendo el tipo exacto del resultado en cada llamada, sin escribir una versión distinta para cada tipo.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué anotación indica que esta función retorna un number?',
        codeSnippet: 'function contarAlumnos(lista: string[])______ {\n  return lista.length;\n}',
        options: [': number', ': string[]', '-> number', 'return number'],
        correctAnswer: ': number',
        hints: ['El tipo de retorno se anota justo después de los paréntesis de parámetros, con dos puntos.'],
        explanationMarkdown: 'El tipo de retorno se escribe con `: tipo` inmediatamente después del paréntesis de parámetros.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué representa la `T` en `function primero<T>(arr: T[]): T`?',
        options: [
          'Un marcador de tipo que TypeScript reemplaza según lo que le pases a la función',
          'El nombre obligatorio de una variable',
          'Un error de sintaxis',
          'Un tipo específico llamado T que ya existe en TypeScript',
        ],
        correctAnswer: 'Un marcador de tipo que TypeScript reemplaza según lo que le pases a la función',
        hints: ['T no es un tipo fijo: cambia según el arreglo que le pases en cada llamada.'],
        explanationMarkdown: '`T` es un parámetro de tipo: TypeScript lo sustituye por el tipo real de los datos en cada llamada a la función.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Si llamas `primero<T>(arr: T[]): T` con un arreglo de strings, ¿qué tipo tiene el resultado?',
        codeSnippet: 'const resultado = primero(["Ana", "Luis"]);',
        options: ['string', 'number', 'any', 'T (sin resolver)'],
        correctAnswer: 'string',
        hints: ['TypeScript reemplaza T por el tipo de los elementos del arreglo que realmente le pasaste.'],
        explanationMarkdown: 'Como el arreglo es de strings, TypeScript resuelve `T` como `string` para esa llamada específica.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: '¿Cuál es la principal desventaja de usar `any` en vez de un genérico para esta misma función?',
        options: [
          'Se pierde toda la protección de tipos: TypeScript ya no puede avisar si usas mal el resultado',
          'any hace que la función sea más lenta en tiempo de ejecución',
          'any no permite reutilizar la función con distintos tipos',
          'No hay ninguna desventaja real',
        ],
        correctAnswer: 'Se pierde toda la protección de tipos: TypeScript ya no puede avisar si usas mal el resultado',
        hints: ['Con any, TypeScript deja de vigilar ese valor por completo, en cualquier punto del código.'],
        explanationMarkdown:
          '`any` desactiva la verificación de tipos para ese valor. Un genérico mantiene la reutilización SIN perder esa protección.',
      },
    ],
    challenge: {
      id: 'reto-ts-funciones-genericos',
      promptMarkdown:
        'Completa dos funciones que en TypeScript llevarían tipos, para practicar el mismo razonamiento en JavaScript: `promedioNotas(notas)` (equivalente tipado: `(notas: number[]): number`) y `primerElemento(arr)` (equivalente tipado: `<T>(arr: T[]): T`, debe funcionar igual de bien con números que con textos).',
      starterCode:
        'function promedioNotas(notas) {\n  // Equivalente tipado: (notas: number[]): number\n  return 0;\n}\n\nfunction primerElemento(arr) {\n  // Equivalente tipado: <T>(arr: T[]): T. Debe funcionar para CUALQUIER tipo de arreglo.\n  return undefined;\n}\n\nconsole.log("Promedio:", promedioNotas([8, 9, 7]));\nconsole.log("Primero (numeros):", primerElemento([10, 20, 30]));\nconsole.log("Primero (nombres):", primerElemento(["Ana", "Luis"]));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        {
          id: 'check-promedio',
          type: 'stdoutIncludes',
          label: 'Promedio: 8',
          value: 'Promedio: 8',
          failureMessage: 'promedioNotas([8, 9, 7]) debe calcular el promedio real (8), no un valor fijo.',
        },
        {
          id: 'check-primero-numeros',
          type: 'stdoutIncludes',
          label: 'Primero (numeros): 10',
          value: 'Primero (numeros): 10',
          failureMessage: 'primerElemento debe regresar el primer elemento real del arreglo de números (10).',
        },
        {
          id: 'check-primero-nombres',
          type: 'stdoutIncludes',
          label: 'Primero (nombres): Ana',
          value: 'Primero (nombres): Ana',
          failureMessage: 'La MISMA función primerElemento debe funcionar también con un arreglo de strings, regresando "Ana".',
        },
      ],
      hints: [
        'promedioNotas: usa reduce para sumar los valores y divide entre notas.length.',
        'primerElemento debe funcionar igual sin importar el tipo de dato del arreglo: usa arr[0] sin revisar de qué tipo son los elementos.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar el promedio (8), y luego el primer elemento correcto tanto para el arreglo de números como para el de nombres, usando la misma función.',
    },
    reflectionPromptMarkdown:
      'Piensa en una función que hayas escrito (o que podrías escribir) que hoy solo funciona con un tipo de dato. ¿Cómo la reescribirías para que funcione con cualquier tipo, sin perder su lógica?',
    masteryCriteria: [
      'Anoto parámetros y tipo de retorno de una función.',
      'Explico qué problema resuelve un genérico frente a usar any.',
      'Predigo el tipo de retorno de una función genérica según el argumento recibido.',
      'Escribí una función que se comporta de forma genérica: funciona igual de bien con distintos tipos de datos sin perder su lógica.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-react-props',
    moduleId: 'mod-5-v2',
    phaseId: 'fase-2',
    order: 13,
    title: 'V2.13 Componentes y props: pasar datos hacia abajo',
    category: 'Frontend',
    summary: 'Entiende cómo fluyen los datos de un componente padre a sus hijos mediante props de solo lectura.',
    prerequisiteLessonIds: ['lesson-v2-ts-funciones-genericos'],
    estimatedMinutes: 45,
    xpReward: 100,
    icon: Layers,
    color: 'from-cyan-400 to-blue-500',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar qué es un componente y por qué recibe datos mediante "props" en vez de variables globales.',
      'Leer un árbol de componentes y predecir qué props recibe cada uno.',
      'Distinguir cuándo un dato debe ser prop (viene de afuera) y cuándo debe ser estado interno.',
    ],
    concept: {
      explanationMarkdown:
        'Un componente de React es una función que recibe un objeto de entrada llamado `props` y retorna qué se debe mostrar. `props` son de solo lectura: el componente que las recibe nunca las modifica directamente, solo las usa. Los datos fluyen en una sola dirección: de un componente "padre" hacia sus componentes "hijos", igual que un director le pasa una instrucción a un coordinador, y el coordinador a un maestro: la instrucción fluye hacia abajo, no al revés.',
      whyItMattersMarkdown:
        'Todo lo que construyas en React (una tarjeta de alumno, una fila de tabla, un botón reutilizable) es un componente que recibe props. Si no entiendes el flujo de props, no puedes depurar por qué un dato "no llega" a donde lo necesitas: el bug más común de quien empieza con React.',
      realWorldContextMarkdown:
        'En una tabla de calificaciones de SASE, el componente `TablaAlumnos` no conoce los datos de cada alumno de antemano: los recibe como props desde un componente padre que sí los tiene (por ejemplo, después de consultarlos con fetch, como en la lección de async/await). Cada fila (`FilaAlumno`) recibe solo los datos de UN alumno vía props, no la lista completa.',
      narrationText:
        'Un componente recibe props de su padre y las usa de solo lectura. Los datos fluyen hacia abajo en el árbol de componentes, nunca al revés.',
    },
    examples: [
      {
        id: 'ejemplo-props-basico',
        title: 'Un componente que recibe props',
        code: 'function TarjetaAlumno(props) {\n  return `Tarjeta de: ${props.nombre} (${props.calificacion})`;\n}\nconsole.log(TarjetaAlumno({ nombre: "Iker", calificacion: 8 }));',
        explanationMarkdown:
          '`props` es un objeto normal. `props.nombre` y `props.calificacion` vienen de lo que le pasaron al llamar la función. Aquí simulamos con `console.log` lo que React haría al renderizar.',
      },
      {
        id: 'ejemplo-props-destructuring',
        title: 'Props con destructuring (el patrón que verás casi siempre)',
        code: 'function TarjetaAlumno({ nombre, calificacion }) {\n  return `Tarjeta de: ${nombre} (${calificacion})`;\n}\nconsole.log(TarjetaAlumno({ nombre: "Iker", calificacion: 8 }));',
        explanationMarkdown:
          'Es el mismo componente, pero usando el destructuring de la lección V2.4: extrae `nombre` y `calificacion` directamente del objeto props en la firma de la función.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué imprime este código?',
        codeSnippet: 'function Saludo({ nombre }) {\n  return `Hola, ${nombre}`;\n}\nconsole.log(Saludo({ nombre: "Camila" }));',
        options: ['Hola, Camila', 'Hola, undefined', 'Hola, nombre', 'Error'],
        correctAnswer: 'Hola, Camila',
        hints: ['El destructuring extrae la propiedad nombre del objeto que se pasó.'],
        explanationMarkdown: '`{ nombre }` extrae la propiedad `nombre` del objeto recibido, que aquí es "Camila".',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué debería pasar si un componente intenta modificar sus props directamente, así: `props.nombre = "Otro";`?',
        options: [
          'Nada debería modificar props directamente; React las trata como solo lectura',
          'Cambia el valor y React lo re-renderiza automáticamente',
          'Lanza un error de sintaxis',
          'Convierte el componente en useState',
        ],
        correctAnswer: 'Nada debería modificar props directamente; React las trata como solo lectura',
        hints: ['Props fluyen de padre a hijo; el hijo no debe reescribirlas.'],
        explanationMarkdown:
          'Las props son de solo lectura. Si un componente necesita un valor que cambia con el tiempo, ese valor debe ser estado (useState), no una prop modificada directamente.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown:
          'Dado este árbol: `App` renderiza `ListaAlumnos`, y `ListaAlumnos` renderiza varias `FilaAlumno`. ¿De dónde vienen los datos de cada `FilaAlumno`?',
        options: [
          'De las props que le pasa ListaAlumnos, un alumno a la vez',
          'De una variable global compartida',
          'FilaAlumno los pide directamente con fetch',
          'De props que le pasa App directamente, saltándose a ListaAlumnos',
        ],
        correctAnswer: 'De las props que le pasa ListaAlumnos, un alumno a la vez',
        hints: ['Los datos fluyen de padre inmediato a hijo inmediato, un nivel a la vez.'],
        explanationMarkdown:
          'ListaAlumnos recibe la lista completa (probablemente como prop desde App) y le pasa a cada FilaAlumno solo los datos de un alumno, vía props.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown:
          '¿Cuál de estos datos debería ser prop, y cuál estado interno (useState), en un componente `FormularioCalificacion`?',
        codeSnippet:
          '// A: el id del alumno que se está calificando (lo decide un componente de arriba)\n// B: el texto que el profesor está escribiendo en el input, mientras escribe',
        options: ['A es prop, B es estado', 'A es estado, B es prop', 'Ambos deberían ser props', 'Ambos deberían ser estado'],
        correctAnswer: 'A es prop, B es estado',
        hints: [
          'Pregúntate: ¿quién decide/controla ese dato? Si lo decide un componente de arriba, es prop. Si el propio componente lo controla mientras el usuario interactúa, es estado.',
        ],
        explanationMarkdown:
          'El id del alumno lo decide quién abrió el formulario (viene de afuera = prop). El texto que se está escribiendo lo controla el propio formulario mientras el usuario teclea (cambia internamente = estado).',
      },
    ],
    challenge: {
      id: 'reto-react-props',
      promptMarkdown:
        'Completa `filaAlumno({ nombre, nota })` para que retorne el texto de una fila, y `renderizarLista(alumnos)` para que junte todas las filas, simulando lo que React haría al mapear una lista de componentes.',
      starterCode:
        'function filaAlumno({ nombre, nota }) {\n  // Retorna: "<nombre>: <nota>"\n  return "";\n}\n\nfunction renderizarLista(alumnos) {\n  // Usa filaAlumno() para cada alumno y une los resultados con "\\n"\n  return "";\n}\n\nconsole.log(renderizarLista([\n  { nombre: "Mateo", nota: 8 },\n  { nombre: "Fernanda", nota: 10 },\n]));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-mateo', type: 'stdoutIncludes', label: 'Mateo: 8', value: 'Mateo: 8', failureMessage: 'Falta la fila de Mateo con el formato "Mateo: 8".' },
        { id: 'check-fernanda', type: 'stdoutIncludes', label: 'Fernanda: 10', value: 'Fernanda: 10', failureMessage: 'Falta la fila de Fernanda: renderizarLista debe recorrer TODOS los alumnos, no solo el primero.' },
      ],
      hints: [
        "renderizarLista puede usar `alumnos.map(filaAlumno).join('\\n')`.",
        'filaAlumno recibe props destructuradas, igual que en los ejemplos de arriba.',
      ],
      expectedEvidenceMarkdown: 'La consola debe mostrar "Mateo: 8" y "Fernanda: 10", cada uno en su línea.',
    },
    reflectionPromptMarkdown:
      'Piensa en una pantalla de una app que uses seguido con una lista repetida (mensajes de chat, productos, publicaciones). ¿Qué props crees que recibe cada elemento repetido de esa lista?',
    masteryCriteria: [
      'Explico qué es una prop y por qué es de solo lectura.',
      'Predigo qué props recibe un componente dado un árbol de componentes padre-hijo.',
      'Distingo cuándo un dato debe ser prop y cuándo debe ser estado interno.',
      'Escribí una función que simula renderizar una lista de componentes a partir de props.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-react-usestate',
    moduleId: 'mod-5-v2',
    phaseId: 'fase-2',
    order: 14,
    title: 'V2.14 useState: cuándo React vuelve a dibujar la pantalla',
    category: 'Frontend',
    summary: 'Descubre qué retorna useState y cuándo una actualización de estado dispara un nuevo render.',
    prerequisiteLessonIds: ['lesson-v2-react-props'],
    estimatedMinutes: 50,
    xpReward: 105,
    icon: RefreshCw,
    color: 'from-sky-500 to-indigo-500',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar qué hace useState y qué retorna (el valor actual y una función para actualizarlo).',
      'Predecir cuándo un cambio de estado causa un nuevo render y cuándo no.',
      'Reconocer el error de modificar el estado directamente en vez de usar la función setter.',
    ],
    concept: {
      explanationMarkdown:
        '`useState(valorInicial)` le da a un componente una "memoria" que sobrevive entre renders. Retorna un arreglo de 2 elementos: el valor ACTUAL del estado, y una función para actualizarlo (`const [contador, setContador] = useState(0);`). Cuando llamas a la función setter (`setContador(1)`), React vuelve a ejecutar el componente con el nuevo valor y actualiza lo que se ve en pantalla: eso es un "re-render".',
      whyItMattersMarkdown:
        'useState es el hook más usado en todo React. Cualquier cosa que cambie por interacción del usuario (un contador, un formulario, un filtro, un modal abierto/cerrado) se maneja con useState. Si no entiendes cuándo dispara un re-render, vas a escribir componentes que "no se actualizan" o que se actualizan de más.',
      realWorldContextMarkdown:
        'Cuando un profesor edita una calificación en un formulario de SASE, cada tecla que presiona actualiza el estado del input (useState) y React vuelve a dibujar ese campo con el nuevo valor. Solo cuando presiona "Guardar" ese valor, ya en estado, se manda al servidor.',
      narrationText:
        'useState le da memoria a un componente entre renders. Solo llamar a la función setter le avisa a React que debe volver a dibujar la pantalla.',
    },
    examples: [
      {
        id: 'ejemplo-usestate-simulado',
        title: 'useState básico (simulado)',
        code: 'function crearEstado(valorInicial) {\n  let valor = valorInicial;\n  const renders = [];\n  function set(nuevoValor) {\n    valor = nuevoValor;\n    renders.push(valor); // simula que React vuelve a "dibujar"\n  }\n  return { obtener: () => valor, set, renders };\n}\n\nconst contador = crearEstado(0);\ncontador.set(1);\ncontador.set(2);\nconsole.log("Valor final:", contador.obtener());\nconsole.log("Renders:", contador.renders);',
        explanationMarkdown:
          'Esta simulación imita el comportamiento observable de useState: cada `set(...)` es como una llamada al setter, y queda registrada como un "re-render" en el arreglo `renders`.',
      },
      {
        id: 'ejemplo-mutar-directo',
        title: 'El error común: mutar directamente',
        code: 'let contador = 0;\ncontador = contador + 1; // esto NO dispara un re-render en React real\n// En React real necesitarías: setContador(contador + 1);\nconsole.log("Esto cambia la variable, pero React nunca se entera.");',
        explanationMarkdown: 'Reasignar una variable normal no le avisa a React que algo cambió. Solo llamar a la función setter dispara un re-render.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué retorna useState(0)?',
        options: [
          'Un arreglo con [valorActual, funcionParaActualizar]',
          'Solo el valor actual',
          'Solo la función para actualizar',
          'Un objeto con { valor, set }',
        ],
        correctAnswer: 'Un arreglo con [valorActual, funcionParaActualizar]',
        hints: ['Por eso se usa destructuring de arreglo: const [x, setX] = useState(...)'],
        explanationMarkdown: 'useState siempre retorna un arreglo de 2 posiciones: el valor actual y la función setter, en ese orden.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Cuál de estas dos líneas SÍ dispara un nuevo render en React?',
        codeSnippet: '// A: contador = contador + 1;\n// B: setContador(contador + 1);',
        options: ['Solo B', 'Solo A', 'Ambas', 'Ninguna'],
        correctAnswer: 'Solo B',
        hints: ['Solo llamar a la función que devuelve useState le avisa a React que algo cambió.'],
        explanationMarkdown:
          'A reasigna una variable normal, invisible para React. B llama al setter, que es la única forma de decirle a React "vuelve a dibujar con este nuevo valor".',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown:
          'Si `setContador` se llama 3 veces seguidas dentro de la misma función con un valor nuevo cada vez, ¿qué termina mostrando React?',
        options: ['El valor final después de la última llamada', 'La suma de las 3 llamadas', 'Un error, no se puede llamar 2 veces seguidas', 'El valor inicial, sin cambios'],
        correctAnswer: 'El valor final después de la última llamada',
        hints: ['Piensa en la simulación del ejemplo: cada set() sobreescribe el valor anterior.'],
        explanationMarkdown: 'Cada llamada al setter actualiza el estado con ese valor. Lo que termina viéndose en pantalla es el resultado de la última actualización aplicada.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'Este componente simulado tiene un bug: el contador nunca cambia visualmente. ¿Cuál es?',
        codeSnippet:
          'function ComponenteContador() {\n  let contador = 0;\n  function incrementar() {\n    contador = contador + 1;\n    console.log("Contador interno:", contador);\n  }\n  incrementar();\n  incrementar();\n}',
        options: [
          'Usa una variable normal (let) en vez de useState, así que React nunca sabe que debe re-renderizar',
          'Le falta un console.log extra',
          'incrementar() está mal escrita',
          'El código no tiene ningún error',
        ],
        correctAnswer: 'Usa una variable normal (let) en vez de useState, así que React nunca sabe que debe re-renderizar',
        hints: ['La variable cambia "por dentro" de la función, pero React no se entera de cambios en variables normales entre renders.'],
        explanationMarkdown:
          'Sin useState, `contador` se reinicia a 0 cada vez que el componente se vuelve a ejecutar, y React nunca recibe la señal de "actualízate" porque nadie llamó a un setter.',
      },
    ],
    challenge: {
      id: 'reto-usestate',
      promptMarkdown:
        'Completa `crearContador(inicial)`: debe retornar `{ obtener, incrementar }`, donde `incrementar()` aumenta el valor en 1 cada vez que se llama, y `obtener()` siempre retorna el valor actual (simulando el par [valor, setValor] de useState).',
      starterCode:
        'function crearContador(inicial) {\n  // Completa: guarda el valor y expón obtener()/incrementar()\n}\n\nconst contador = crearContador(0);\ncontador.incrementar();\ncontador.incrementar();\ncontador.incrementar();\nconsole.log("Valor final:", contador.obtener());',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-valor-final', type: 'stdoutIncludes', label: 'Valor final: 3', value: 'Valor final: 3', failureMessage: 'Después de 3 llamadas a incrementar(), obtener() debería regresar 3.' },
      ],
      hints: [
        'Guarda el valor en una variable dentro de crearContador (closure), y que incrementar() la modifique.',
        'obtener() debe leer siempre el valor MÁS RECIENTE, no uno copiado al inicio.',
      ],
      expectedEvidenceMarkdown: 'La consola debe mostrar "Valor final: 3" después de 3 llamadas a incrementar().',
    },
    reflectionPromptMarkdown:
      'Con la lección anterior (props): ¿qué pasaría si alguien intentara usar una prop como si fuera estado, tratando de "incrementarla" directamente? ¿Por qué no funcionaría igual que con useState?',
    masteryCriteria: [
      'Explico qué retorna useState y en qué orden.',
      'Predigo si una línea de código dispara o no un nuevo render.',
      'Detecto el bug de usar una variable normal en vez de useState para algo que debería re-renderizar.',
      'Escribí una función que simula el comportamiento de useState con closures.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-react-levantar-estado',
    moduleId: 'mod-5-v2',
    phaseId: 'fase-2',
    order: 15,
    title: 'V2.15 Levantar el estado: comunicar dos componentes hermanos',
    category: 'Frontend',
    summary: 'Aplica el patrón de subir el estado al padre común cuando dos componentes hermanos deben compartir un dato.',
    prerequisiteLessonIds: ['lesson-v2-react-usestate'],
    estimatedMinutes: 50,
    xpReward: 110,
    icon: ArrowUp,
    color: 'from-blue-500 to-violet-600',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar por qué dos componentes "hermanos" no pueden compartir estado directamente entre sí.',
      'Aplicar el patrón de "levantar el estado" al padre común y pasarlo hacia abajo como props.',
      'Distinguir una función que se pasa como prop (para avisar) de un dato que se pasa como prop (para mostrar).',
    ],
    concept: {
      explanationMarkdown:
        'Cuando dos componentes "hermanos" (con el mismo padre) necesitan compartir o reaccionar al mismo dato, ese dato no puede vivir en ninguno de los dos por separado: tiene que vivir en su padre común, con `useState`. El padre le pasa el valor hacia abajo como prop a ambos hijos, y si un hijo necesita cambiarlo, el padre también le pasa una función (normalmente el setter) como prop, para que el hijo la llame.',
      whyItMattersMarkdown:
        'Este patrón, "levantar el estado" (lifting state up), es la solución de React para el 90% de los casos donde "un componente no se entera de lo que pasa en otro". Es de los conceptos que más cuesta a quien empieza, porque la solución es contraintuitiva: en vez de conectar los hermanos entre sí, subes el dato un nivel.',
      realWorldContextMarkdown:
        'En SASE, si un filtro (`FiltroGrupo`) y una tabla (`TablaAlumnos`) son hermanos dentro de `PantallaCalificaciones`, y seleccionar un grupo en el filtro debe actualizar lo que muestra la tabla, el grupo seleccionado tiene que vivir como estado en `PantallaCalificaciones` (el padre), no en `FiltroGrupo` ni en `TablaAlumnos` por separado.',
      narrationText:
        'Cuando dos componentes hermanos comparten un dato, ese dato sube al padre común como estado, y baja de nuevo a ambos hijos como props.',
    },
    examples: [
      {
        id: 'ejemplo-estado-en-padre',
        title: 'El estado vive en el padre, no en los hermanos',
        code: 'function crearPantalla() {\n  let grupoSeleccionado = "Todos";\n\n  function FiltroGrupo({ onCambiarGrupo }) {\n    return { simularClick: (grupo) => onCambiarGrupo(grupo) };\n  }\n\n  function TablaAlumnos({ grupo }) {\n    return `Mostrando alumnos del grupo: ${grupo}`;\n  }\n\n  const filtro = FiltroGrupo({ onCambiarGrupo: (grupo) => { grupoSeleccionado = grupo; } });\n  filtro.simularClick("2B");\n  return TablaAlumnos({ grupo: grupoSeleccionado });\n}\nconsole.log(crearPantalla());',
        explanationMarkdown:
          '`grupoSeleccionado` vive en el padre (`crearPantalla`). `FiltroGrupo` no guarda el grupo, solo AVISA al padre con la función `onCambiarGrupo` que recibió como prop. `TablaAlumnos` solo LEE el grupo actual que el padre le pasa.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: 'Dos componentes hermanos, `Buscador` y `ListaResultados`, necesitan compartir el texto que el usuario escribió. ¿Dónde debería vivir ese texto como estado?',
        options: [
          'En el componente padre común de ambos',
          'En Buscador únicamente',
          'En ListaResultados únicamente',
          'En cada uno por separado, sincronizados con useEffect',
        ],
        correctAnswer: 'En el componente padre común de ambos',
        hints: ['Los hermanos no pueden leerse el estado entre sí directamente.'],
        explanationMarkdown: 'Como ambos hermanos necesitan ese dato, tiene que "subir" al padre común, que se lo pasa a ambos como prop.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué tipo de prop le pasa el padre a un hijo para que ese hijo pueda AVISARLE que algo cambió, no solo para mostrar un dato?',
        options: ['Una función', 'Un string', 'Un número', 'Un booleano'],
        correctAnswer: 'Una función',
        hints: ['El hijo "llama" a esa prop cuando pasa algo, como un evento de click.'],
        explanationMarkdown: 'Pasar una función como prop (por ejemplo `onCambiarGrupo`) le da al hijo una forma de comunicarse hacia arriba, sin controlar el estado directamente.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'En el ejemplo de la Pantalla, ¿por qué `FiltroGrupo` no tiene su propio useState para `grupoSeleccionado`?',
        options: [
          'Porque otro componente hermano (TablaAlumnos) también necesita ese valor, así que debe vivir un nivel arriba',
          'Porque los filtros nunca usan useState',
          'Porque useState solo funciona en el componente raíz de la app',
          'Porque grupoSeleccionado es una prop, nunca puede ser estado en ningún lado',
        ],
        correctAnswer: 'Porque otro componente hermano (TablaAlumnos) también necesita ese valor, así que debe vivir un nivel arriba',
        hints: ['Si el dato solo lo usara FiltroGrupo, sí podría ser estado local ahí. El problema es que se COMPARTE.'],
        explanationMarkdown: 'La regla no es "los filtros nunca tienen estado propio"; es que un dato compartido entre hermanos debe vivir en el ancestro común, no duplicado en cada uno.',
      },
    ],
    challenge: {
      id: 'reto-levantar-estado',
      promptMarkdown:
        'Completa `crearPantallaCalificaciones()`: debe tener un estado `grupoSeleccionado` (inicial "Todos"), pasarlo a `resumenGrupo(grupo)` para mostrar el texto, y una función `seleccionarGrupo(nuevoGrupo)` que actualice el estado antes de volver a generar el resumen.',
      starterCode:
        'function resumenGrupo(grupo) {\n  return `Mostrando alumnos del grupo: ${grupo}`;\n}\n\nfunction crearPantallaCalificaciones() {\n  let grupoSeleccionado = "Todos";\n\n  function seleccionarGrupo(nuevoGrupo) {\n    // Completa: actualiza grupoSeleccionado\n  }\n\n  return { seleccionarGrupo, obtenerResumen: () => resumenGrupo(grupoSeleccionado) };\n}\n\nconst pantalla = crearPantallaCalificaciones();\nconsole.log(pantalla.obtenerResumen());\npantalla.seleccionarGrupo("3C");\nconsole.log(pantalla.obtenerResumen());',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-inicial', type: 'stdoutIncludes', label: 'Mostrando alumnos del grupo: Todos', value: 'Mostrando alumnos del grupo: Todos', failureMessage: 'Antes de seleccionar un grupo, el resumen debe mostrar "Todos".' },
        { id: 'check-actualizado', type: 'stdoutIncludes', label: 'Mostrando alumnos del grupo: 3C', value: 'Mostrando alumnos del grupo: 3C', failureMessage: 'Después de seleccionarGrupo("3C"), el resumen debe reflejar el nuevo grupo.' },
      ],
      hints: [
        'seleccionarGrupo debe reasignar la variable grupoSeleccionado (closure), igual que el setter simulado de la lección anterior.',
        'obtenerResumen debe leer el valor MÁS RECIENTE de grupoSeleccionado, no uno copiado antes.',
      ],
      expectedEvidenceMarkdown: 'La consola debe mostrar primero el resumen con "Todos" y después con "3C", reflejando el cambio de estado.',
    },
    reflectionPromptMarkdown:
      'Con las 3 lecciones de React (props, useState, levantar el estado), describe en 2-3 frases el flujo completo de datos en una pantalla con un filtro y una tabla: qué vive dónde, y quién le avisa a quién.',
    masteryCriteria: [
      'Explico por qué dos hermanos no pueden compartir estado directamente.',
      'Identifico cuándo un dato compartido debe "subir" al padre común.',
      'Distingo una prop-función (para avisar) de una prop-dato (para mostrar).',
      'Escribí un patrón completo de estado levantado: el padre guarda, pasa hacia abajo, y recibe avisos hacia arriba.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-backend-http-metodos',
    moduleId: 'mod-6-v2',
    phaseId: 'fase-2',
    order: 16,
    title: 'V2.16 HTTP y REST: el idioma entre el navegador y el servidor',
    category: 'Backend',
    summary: 'Entiende el modelo petición-respuesta de HTTP y cuándo usar GET, POST, PUT y DELETE.',
    prerequisiteLessonIds: ['lesson-v2-react-levantar-estado'],
    estimatedMinutes: 40,
    xpReward: 90,
    icon: Server,
    color: 'from-emerald-500 to-green-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar el modelo de petición y respuesta de HTTP.',
      'Elegir el método HTTP correcto (GET, POST, PUT, DELETE) para una operación dada.',
      'Interpretar los códigos de estado más comunes (200, 201, 404, 500) para saber qué pasó con una petición.',
    ],
    concept: {
      explanationMarkdown:
        'HTTP es el protocolo con el que el navegador (cliente) le habla a un servidor. Una petición tiene un método que describe la intención: `GET` (leer), `POST` (crear), `PUT` (actualizar) o `DELETE` (borrar). La respuesta trae un código de estado de tres dígitos: 200 (todo bien), 201 (creado), 404 (no encontrado) o 500 (error del servidor).',
      whyItMattersMarkdown:
        'Toda la web funciona con peticiones HTTP. Leer una API o la documentación de un backend se reduce a entender métodos, rutas y códigos de estado; sin ese vocabulario no puedes consumir ni construir un servicio.',
      realWorldContextMarkdown:
        'En SASE, cuando el frontend necesita la lista de alumnos manda un `GET /api/alumnos`; cuando un profesor registra una calificación manda un `POST`. Si la URL no existe, el servidor responde 404 y la app puede mostrar "no encontrado" en vez de inventar datos.',
      narrationText:
        'HTTP es el idioma entre el navegador y el servidor. GET lee, POST crea, PUT actualiza y DELETE borra. El servidor responde con un código que explica el resultado.',
    },
    examples: [
      {
        id: 'ejemplo-metodo-y-codigo',
        title: 'El método describe la intención; el código, el resultado',
        code:
          'GET /api/alumnos      -> leer la lista\nPOST /api/alumnos     -> crear un alumno nuevo\nPUT /api/alumnos/1    -> actualizar el alumno 1\nDELETE /api/alumnos/1 -> borrar el alumno 1\n\n200 OK        -> la petición funcionó\n201 Created   -> se creó un recurso\n404 Not Found -> no existe lo que pediste\n500 Internal Server Error -> falló el servidor',
        explanationMarkdown:
          'El método dice qué intención tienes con el recurso; el código de respuesta dice si esa intención se cumplió y cómo terminó.',
      },
      {
        id: 'ejemplo-leer-vs-crear',
        title: 'Dos peticiones distintas sobre el mismo recurso',
        code:
          '// Leer no cambia nada en el servidor\nGET /api/alumnos\n\n// Crear agrega un registro nuevo\nPOST /api/alumnos\n{ "nombre": "Valeria", "nota": 9 }',
        explanationMarkdown:
          '`GET` no debe cambiar datos. Cuando quieres agregar un registro, usas `POST` y envías sus datos en el cuerpo de la petición, normalmente como JSON.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: 'Quieres leer la lista de alumnos. ¿Qué método HTTP usas?',
        codeSnippet: '______ /api/alumnos',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 'GET',
        hints: ['La operación no crea, actualiza ni borra ningún dato.', 'El método de lectura empieza con G.'],
        explanationMarkdown: '`GET` solicita una representación del recurso sin modificarlo.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: 'Quieres registrar un alumno nuevo en el sistema. ¿Qué método usas?',
        options: ['POST', 'GET', 'PUT', 'DELETE'],
        correctAnswer: 'POST',
        hints: ['La operación crea un recurso que antes no existía.'],
        explanationMarkdown: '`POST` se usa para crear un recurso nuevo dentro de una colección.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'El servidor responde 404. ¿Qué significa?',
        options: ['El recurso que pediste no existe', 'Todo salió bien', 'El servidor falló internamente', 'Se creó un recurso'],
        correctAnswer: 'El recurso que pediste no existe',
        hints: ['404 es el código que aparece cuando una página o ruta no fue encontrada.'],
        explanationMarkdown: '`404 Not Found` indica que el servidor entendió la petición, pero no encontró el recurso solicitado.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'Quieres actualizar la calificación de un alumno que ya existe. ¿Qué método usas?',
        options: ['PUT', 'GET', 'POST', 'DELETE'],
        correctAnswer: 'PUT',
        hints: ['El recurso ya existe; no vas a crear otro ni a borrarlo.'],
        explanationMarkdown: '`PUT` representa la actualización de un recurso existente en este currículo.',
      },
    ],
    challenge: {
      id: 'reto-http-metodos',
      promptMarkdown:
        'Completa `simularPeticion(metodo, recursoExiste)` para que devuelva la línea de estado correcta según el método y si el recurso existe.',
      starterCode:
        'function simularPeticion(metodo, recursoExiste) {\n  // GET con recurso    -> "200 OK: recurso encontrado"\n  // GET sin recurso    -> "404 Not Found: recurso no existe"\n  // POST               -> "201 Created: recurso creado"\n  // DELETE con recurso -> "200 OK: recurso eliminado"\n  // DELETE sin recurso -> "404 Not Found: recurso no existe"\n  return "";\n}\n\nconsole.log(simularPeticion("GET", true));\nconsole.log(simularPeticion("GET", false));\nconsole.log(simularPeticion("POST", false));\nconsole.log(simularPeticion("DELETE", true));\nconsole.log(simularPeticion("DELETE", false));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-get-existe', type: 'stdoutIncludes', label: 'GET existente -> 200 OK', value: '200 OK: recurso encontrado', failureMessage: 'Un GET de un recurso existente debe responder "200 OK: recurso encontrado".' },
        { id: 'check-no-existe', type: 'stdoutIncludes', label: 'Recurso inexistente -> 404 Not Found', value: '404 Not Found: recurso no existe', failureMessage: 'Cuando el recurso no existe, GET y DELETE deben responder 404 Not Found.' },
        { id: 'check-post', type: 'stdoutIncludes', label: 'POST -> 201 Created', value: '201 Created: recurso creado', failureMessage: 'POST crea un recurso y debe responder "201 Created: recurso creado".' },
        { id: 'check-delete', type: 'stdoutIncludes', label: 'DELETE existente -> 200 OK', value: '200 OK: recurso eliminado', failureMessage: 'DELETE de un recurso existente debe confirmar que fue eliminado.' },
      ],
      hints: [
        'Resuelve primero el caso POST, que no depende de recursoExiste.',
        'Para GET y DELETE, revisa recursoExiste antes de construir la respuesta.',
        'GET encuentra; DELETE elimina. Ambos responden 404 cuando el recurso no existe.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar, en orden: "200 OK: recurso encontrado", "404 Not Found: recurso no existe", "201 Created: recurso creado", "200 OK: recurso eliminado" y otro 404 para el DELETE inexistente.',
    },
    reflectionPromptMarkdown:
      'Piensa en un formulario de tu trabajo (registro de una incidencia, alta de un alumno). ¿Qué método HTTP crees que usa esa app por debajo y qué significa el "cargando..." que ves?',
    masteryCriteria: [
      'Elijo el método HTTP correcto (GET, POST, PUT o DELETE) según la operación.',
      'Interpreto los códigos 200, 201, 404 y 500 sin buscar en la documentación.',
      'Sé que GET no debe modificar datos y que POST, PUT y DELETE sí pueden hacerlo.',
      'Escribí una función que decide la respuesta HTTP según el método y si el recurso existe.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-backend-express-rutas',
    moduleId: 'mod-6-v2',
    phaseId: 'fase-2',
    order: 17,
    title: 'V2.17 Express: rutas que responden JSON',
    category: 'Backend',
    summary: 'Registra rutas con app.get/app.post y responde datos con res.json(), igual que un servidor real de Node.',
    prerequisiteLessonIds: ['lesson-v2-backend-http-metodos'],
    estimatedMinutes: 50,
    xpReward: 105,
    icon: Server,
    color: 'from-emerald-500 to-green-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Registrar una ruta en Express con app.get/app.post y el orden correcto de sus argumentos.',
      'Explicar qué hace res.json() y por qué el frontend recibe JSON.',
      'Distinguir los argumentos req (petición) y res (respuesta) de un handler.',
    ],
    concept: {
      explanationMarkdown:
        'Express es un framework para construir servidores con Node.js. Para responder una ruta escribes `app.get("/ruta", (req, res) => { res.json(datos); });`. Express compara la petición entrante contra las rutas registradas: cuando el método y la ruta coinciden, ejecuta el handler. El handler recibe `req` (lo que mandó el cliente) y `res` (la respuesta que vas a devolver).',
      whyItMattersMarkdown:
        'Este patrón aparece en casi cualquier backend Node que vayas a leer o escribir. Si entiendes cómo se registra una ruta y qué hace `res.json()`, ya puedes construir el esqueleto de una API y seguir el flujo de una petición real.',
      realWorldContextMarkdown:
        'En el backend de SASE, `app.get("/api/alumnos", ...)` devuelve la lista de alumnos y `app.post("/api/calificaciones", ...)` recibe la calificación capturada en el frontend. El middleware `express.json()` convierte el cuerpo JSON en el objeto `req.body` antes de llegar al handler.',
      narrationText:
        'Express registra rutas con app.get y app.post. Cuando una petición coincide, ejecuta un handler que recibe req y res; res.json envía los datos al cliente como JSON.',
    },
    examples: [
      {
        id: 'ejemplo-ruta-get',
        title: 'La ruta Express más básica',
        code:
          'const express = require("express");\nconst app = express();\n\napp.get("/api/alumnos", (req, res) => {\n  res.json([{ id: 1, nombre: "Valeria" }]);\n});\n\napp.listen(3000);',
        explanationMarkdown:
          '`app.get` registra la ruta; el primer argumento es la URL y el segundo es el handler que se ejecuta cuando llega un GET. `res.json(...)` envía el arreglo como JSON.',
      },
      {
        id: 'ejemplo-middleware-json',
        title: 'Middleware para leer el cuerpo de la petición',
        code:
          'const express = require("express");\nconst app = express();\napp.use(express.json());\n\napp.post("/api/alumnos", (req, res) => {\n  const alumno = req.body;\n  res.json({ guardado: true, alumno });\n});',
        explanationMarkdown:
          '`app.use(express.json())` corre antes de los handlers y convierte el cuerpo JSON en un objeto disponible en `req.body`. Sin ese middleware, el handler no podría leer esos datos de esa forma.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué método de Express usas para registrar una ruta que responda a peticiones GET?',
        codeSnippet: 'app.____("/api/alumnos", handler);',
        options: ['get', 'getRequest', 'fetch', 'routeGet'],
        correctAnswer: 'get',
        hints: ['Express usa el nombre del método HTTP en minúsculas.'],
        explanationMarkdown: '`app.get(ruta, handler)` registra un handler para peticiones HTTP GET.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué método del objeto res convierte los datos a JSON y los manda al cliente?',
        codeSnippet: 'res.____(alumnos);',
        options: ['json', 'sendHtml', 'render', 'write'],
        correctAnswer: 'json',
        hints: ['El nombre del método coincide con el formato de respuesta.'],
        explanationMarkdown: '`res.json(datos)` serializa el valor a JSON y termina la respuesta HTTP.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Dónde están los datos enviados en el cuerpo de un POST después de usar express.json()?',
        options: ['req.body', 'req.query', 'res.body', 'req.params'],
        correctAnswer: 'req.body',
        hints: ['req representa la petición; body significa cuerpo.'],
        explanationMarkdown: 'El middleware deja el cuerpo ya convertido a objeto en `req.body`.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'En `(req, res) => { ... }`, ¿qué contiene cada argumento?',
        options: [
          'req es la petición entrante y res es la respuesta que vamos a enviar',
          'req es la respuesta y res es la petición',
          'Ambos son el mismo objeto',
          'req es la ruta y res es el método',
        ],
        correctAnswer: 'req es la petición entrante y res es la respuesta que vamos a enviar',
        hints: ['request = petición; response = respuesta.'],
        explanationMarkdown: '`req` permite leer lo que llegó; `res` permite construir y enviar lo que regresará al cliente.',
      },
    ],
    challenge: {
      id: 'reto-express-rutas',
      promptMarkdown:
        'Completa `procesar(metodo, ruta)` dentro de `crearRouter()` para simular un mini Express: busca la coincidencia por método y ruta, responde 404 si no existe y llama al handler correcto si existe.',
      starterCode:
        'function crearRouter() {\n  const rutas = [];\n\n  function guardar(metodo, ruta, handler) {\n    rutas.push({ metodo, ruta, handler });\n  }\n\n  function procesar(metodo, ruta) {\n    // 1. Busca en rutas la coincidencia por metodo Y ruta\n    // 2. Si no existe, imprime: "404 Not Found: ruta no registrada"\n    // 3. Si existe, crea res con un metodo json que imprima:\n    //    "200 OK: " + JSON.stringify(datos)\n    // 4. Llama al handler con {} como req y res como respuesta\n  }\n\n  return {\n    get: (ruta, handler) => guardar("GET", ruta, handler),\n    post: (ruta, handler) => guardar("POST", ruta, handler),\n    procesar,\n  };\n}\n\nconst app = crearRouter();\napp.get("/api/alumnos", (req, res) => res.json([{ id: 1, nombre: "Valeria" }]));\napp.post("/api/alumnos", (req, res) => res.json({ id: 2, nombre: "Marco" }));\n\napp.procesar("GET", "/api/alumnos");\napp.procesar("POST", "/api/alumnos");\napp.procesar("GET", "/api/incidencias");',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-get', type: 'stdoutIncludes', label: 'GET registrado -> JSON de Valeria', value: '200 OK: [{"id":1,"nombre":"Valeria"}]', failureMessage: 'El GET registrado debe ejecutar su handler y responder el arreglo de Valeria como JSON.' },
        { id: 'check-post', type: 'stdoutIncludes', label: 'POST registrado -> JSON de Marco', value: '200 OK: {"id":2,"nombre":"Marco"}', failureMessage: 'El POST registrado debe ejecutar un handler distinto y responder el objeto de Marco.' },
        { id: 'check-404', type: 'stdoutIncludes', label: 'Ruta no registrada -> 404', value: '404 Not Found: ruta no registrada', failureMessage: 'Una combinación de método y ruta no registrada debe responder 404.' },
      ],
      hints: [
        'Usa `rutas.find((item) => item.metodo === metodo && item.ruta === ruta)`.',
        'El objeto res solo necesita un método `json` que llame a console.log con JSON.stringify(datos).',
        'Cuando no hay coincidencia, imprime el 404 y usa return para no intentar ejecutar un handler inexistente.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar el JSON de Valeria para GET, el JSON de Marco para POST y "404 Not Found: ruta no registrada" para la ruta inexistente.',
    },
    reflectionPromptMarkdown:
      'El mini-router decide qué handler ejecutar según método y ruta. ¿Qué problema aparecería si el servidor solo comparara la URL e ignorara el método HTTP?',
    masteryCriteria: [
      'Registro una ruta con app.get/app.post y los argumentos en el orden correcto.',
      'Explico qué hace res.json() y por qué el frontend recibe JSON.',
      'Distingo req (petición) de res (respuesta) y sé dónde vive el cuerpo en req.body.',
      'Escribí un mini-router que despacha por método + ruta y responde 404 cuando no hay coincidencia.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-backend-api-crud',
    moduleId: 'mod-6-v2',
    phaseId: 'fase-2',
    order: 18,
    title: 'V2.18 CRUD: cuatro operaciones de una API REST',
    category: 'Backend',
    summary: 'Diseña e implementa las rutas para listar, consultar, crear, actualizar y borrar un recurso.',
    prerequisiteLessonIds: ['lesson-v2-backend-express-rutas'],
    estimatedMinutes: 55,
    xpReward: 110,
    icon: Server,
    color: 'from-emerald-500 to-green-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Relacionar las operaciones CRUD con su método y ruta REST.',
      'Explicar qué representa el parámetro de ruta :id y cuándo se usa.',
      'Implementar una función que ejecute el CRUD de un recurso en memoria.',
    ],
    concept: {
      explanationMarkdown:
        'CRUD significa Create, Read, Update y Delete: las cuatro operaciones que casi todo recurso de una API necesita. En REST, cada operación combina método y ruta: `GET /recurso` (leer todos), `GET /recurso/:id` (leer uno), `POST /recurso` (crear), `PUT /recurso/:id` (actualizar) y `DELETE /recurso/:id` (borrar). Los dos puntos en `:id` marcan un parámetro de ruta disponible en `req.params.id`.',
      whyItMattersMarkdown:
        'Diseñar rutas consistentes antes de escribir código diferencia una API mantenible de una colección de URLs improvisadas. También es una habilidad básica de entrevista backend: explicar cómo expondrías el CRUD de un recurso.',
      realWorldContextMarkdown:
        'El módulo de incidencias de SASE es un CRUD: listar incidencias, ver una, crearla, actualizar su estado y borrarla. La misma forma sirve para alumnos, calificaciones o cualquier otro recurso; solo cambia el nombre de la ruta y la lógica del controlador.',
      narrationText:
        'CRUD es crear, leer, actualizar y borrar. GET lee, POST crea, PUT actualiza y DELETE borra. El parámetro id de la ruta identifica el registro específico.',
    },
    examples: [
      {
        id: 'ejemplo-rutas-crud',
        title: 'Las rutas CRUD del recurso alumnos',
        code:
          'GET    /api/alumnos     -> leer todos\nGET    /api/alumnos/:id -> leer uno\nPOST   /api/alumnos     -> crear\nPUT    /api/alumnos/:id -> actualizar uno\nDELETE /api/alumnos/:id -> borrar uno',
        explanationMarkdown:
          'El patrón es igual para cualquier recurso: el nombre plural identifica la colección y `:id` señala el registro concreto.',
      },
      {
        id: 'ejemplo-controlador',
        title: 'Separar la ruta de la lógica',
        code:
          'function listarAlumnos(alumnos) {\n  return alumnos;\n}\n\napp.get("/api/alumnos", (req, res) => {\n  res.json(listarAlumnos(alumnos));\n});',
        explanationMarkdown:
          'La ruta traduce entre HTTP y tu lógica: lee `req`, llama al controlador y construye `res`. Separar la lógica permite probarla sin levantar un servidor real.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '¿Qué método y ruta usas para leer la lista completa de alumnos?',
        options: ['GET /api/alumnos', 'GET /api/alumnos/1', 'POST /api/alumnos', 'DELETE /api/alumnos'],
        correctAnswer: 'GET /api/alumnos',
        hints: ['Leer usa GET; la colección completa no lleva id.'],
        explanationMarkdown: '`GET /api/alumnos` representa la lectura de toda la colección.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué método y ruta leen solo al alumno con id 7?',
        options: ['GET /api/alumnos/7', 'GET /api/alumnos', 'POST /api/alumnos/7', 'DELETE /api/alumnos/7'],
        correctAnswer: 'GET /api/alumnos/7',
        hints: ['Leer usa GET; un registro específico agrega su id a la ruta.'],
        explanationMarkdown: 'El valor 7 ocupa el lugar del parámetro `:id` y señala un solo recurso.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: '¿Qué método usas para crear un alumno nuevo?',
        options: ['POST', 'GET', 'PUT', 'DELETE'],
        correctAnswer: 'POST',
        hints: ['Crear un recurso nuevo no necesita id todavía.'],
        explanationMarkdown: '`POST /api/alumnos` crea un miembro nuevo dentro de la colección.',
      },
      {
        id: 'guiado-4',
        order: 4,
        promptMarkdown: 'En `DELETE /api/alumnos/:id`, ¿qué reemplaza a :id cuando quieres borrar el alumno 3?',
        options: ['3', ':id', 'alumnos', 'DELETE'],
        correctAnswer: '3',
        hints: ['Los dos puntos marcan un espacio variable en la plantilla de la ruta.'],
        explanationMarkdown: 'La petición real sería `DELETE /api/alumnos/3`; Express expondría ese valor en `req.params.id`.',
      },
    ],
    challenge: {
      id: 'reto-api-crud',
      promptMarkdown:
        'Completa `crudAlumnos(alumnos, metodo, id, nombreNuevo)` para leer, crear, actualizar y borrar alumnos en memoria, incluyendo respuestas 404 cuando el id no existe.',
      starterCode:
        'function crudAlumnos(alumnos, metodo, id, nombreNuevo) {\n  if (metodo === "GET") {\n    // Sin id -> "Lista: <N> alumno(s)"\n    // Con id -> "Alumno <id>: <nombre>" o "404: no existe el alumno <id>"\n  }\n\n  if (metodo === "POST") {\n    // Agrega { id: alumnos.length + 1, nombre: nombreNuevo }\n    // y retorna "Alumno creado: <nombre> (id <nuevoId>)"\n  }\n\n  if (metodo === "PUT") {\n    // Actualiza el nombre por id; retorna "Alumno <id> actualizado: <nombreNuevo>"\n    // o "404: no existe el alumno <id>"\n  }\n\n  if (metodo === "DELETE") {\n    // Elimina por id; retorna "Alumno <id> eliminado"\n    // o "404: no existe el alumno <id>"\n  }\n\n  return "";\n}\n\nconst alumnos = [\n  { id: 1, nombre: "Valeria" },\n  { id: 2, nombre: "Sofía" },\n];\n\nconsole.log(crudAlumnos(alumnos, "GET", null, null));\nconsole.log(crudAlumnos(alumnos, "GET", 1, null));\nconsole.log(crudAlumnos(alumnos, "GET", 9, null));\nconsole.log(crudAlumnos(alumnos, "POST", null, "Marco"));\nconsole.log(crudAlumnos(alumnos, "PUT", 1, "Valeria Ruiz"));\nconsole.log(crudAlumnos(alumnos, "DELETE", 2, null));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-lista', type: 'stdoutIncludes', label: 'Lista: 2 alumno(s)', value: 'Lista: 2 alumno(s)', failureMessage: 'GET sin id debe contar los dos alumnos iniciales.' },
        { id: 'check-uno', type: 'stdoutIncludes', label: 'Alumno 1: Valeria', value: 'Alumno 1: Valeria', failureMessage: 'GET con id 1 debe encontrar y describir a Valeria.' },
        { id: 'check-no-encontrado', type: 'stdoutIncludes', label: 'Id inexistente -> 404', value: '404: no existe el alumno 9', failureMessage: 'GET con id 9 debe responder 404 porque ese alumno no existe.' },
        { id: 'check-creado', type: 'stdoutIncludes', label: 'Alumno creado: Marco (id 3)', value: 'Alumno creado: Marco (id 3)', failureMessage: 'POST debe agregar a Marco con el siguiente id disponible, que en este caso es 3.' },
        { id: 'check-actualizado', type: 'stdoutIncludes', label: 'Alumno 1 actualizado: Valeria Ruiz', value: 'Alumno 1 actualizado: Valeria Ruiz', failureMessage: 'PUT debe encontrar al alumno 1, actualizar su nombre y confirmar el nuevo valor.' },
        { id: 'check-eliminado', type: 'stdoutIncludes', label: 'Alumno 2 eliminado', value: 'Alumno 2 eliminado', failureMessage: 'DELETE con id 2 debe encontrar y eliminar ese registro.' },
      ],
      hints: [
        'Para GET con id usa `alumnos.find((alumno) => alumno.id === id)` y revisa si existe.',
        'En POST calcula el nuevo id antes de hacer `alumnos.push(nuevoAlumno)`.',
        'Para PUT usa `find`, cambia la propiedad nombre y retorna el mensaje con el valor nuevo.',
        'Para DELETE usa `findIndex` y, si el índice es válido, `alumnos.splice(indice, 1)`.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar, en orden: "Lista: 2 alumno(s)", "Alumno 1: Valeria", el 404 del id 9, "Alumno creado: Marco (id 3)", "Alumno 1 actualizado: Valeria Ruiz" y "Alumno 2 eliminado".',
    },
    reflectionPromptMarkdown:
      'Elige un recurso de tu trabajo docente (expediente, incidencia o calificación). Escribe sus rutas REST para listar, consultar uno, crear, actualizar y borrar.',
    masteryCriteria: [
      'Relaciono las operaciones CRUD con su método y ruta REST.',
      'Explico qué representa :id y cómo llega al controlador.',
      'Distingo la ruta HTTP del controlador que ejecuta la lógica.',
      'Escribí una función que ejecuta operaciones CRUD sobre un recurso en memoria y maneja ids inexistentes.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-db-sql-basico',
    moduleId: 'mod-7-v2',
    phaseId: 'fase-2',
    order: 19,
    title: 'V2.19 SQL básico: SELECT, WHERE e INSERT',
    category: 'Databases',
    summary: 'Lee y escribe consultas SQL simples sobre una tabla: seleccionar columnas, filtrar filas e insertar registros.',
    prerequisiteLessonIds: ['lesson-v2-backend-api-crud'],
    estimatedMinutes: 40,
    xpReward: 90,
    icon: Database,
    color: 'from-teal-500 to-emerald-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Escribir un `SELECT` con columnas específicas y una cláusula `WHERE`.',
      'Distinguir cuándo usar `SELECT` frente a `INSERT INTO`.',
      'Leer el resultado de una consulta como una tabla de filas y columnas.',
    ],
    concept: {
      explanationMarkdown:
        'SQL es el lenguaje para leer y escribir datos en una base de datos relacional. `SELECT columnas FROM tabla WHERE condicion` lee filas que cumplen una condición; `SELECT *` lee todas las columnas. `INSERT INTO tabla (columnas) VALUES (valores)` agrega una fila nueva.',
      whyItMattersMarkdown:
        'Casi cualquier backend real (incluido Supabase, que corre sobre PostgreSQL) termina traduciendo las peticiones HTTP en consultas SQL. Sin poder leer una consulta, no puedes verificar qué datos expone o modifica un endpoint.',
      realWorldContextMarkdown:
        'En SASE, cuando el frontend pide las calificaciones de un alumno, el backend ejecuta algo como `SELECT materia, nota FROM calificaciones WHERE alumno_id = 1`. Cuando un profesor captura una nota nueva, ejecuta un `INSERT INTO calificaciones (...)`.',
      narrationText:
        'SQL es el lenguaje para leer y escribir datos en una tabla. SELECT lee filas que cumplen una condición. INSERT INTO agrega una fila nueva.',
    },
    examples: [
      {
        id: 'ejemplo-select-where',
        title: 'Filtrar filas con WHERE',
        code:
          'SELECT nombre, promedio FROM alumnos WHERE promedio >= 8;\n\n-- Devuelve solo las filas donde promedio es 8 o más,\n-- mostrando únicamente las columnas nombre y promedio.',
        explanationMarkdown:
          '`WHERE` filtra qué filas se incluyen en el resultado; la lista después de `SELECT` decide qué columnas se muestran.',
      },
      {
        id: 'ejemplo-insert',
        title: 'Agregar una fila nueva',
        code:
          'INSERT INTO alumnos (nombre, promedio)\nVALUES (\'Marco\', 9.2);\n\n-- Crea una fila nueva en la tabla alumnos\n-- con esos dos valores.',
        explanationMarkdown:
          'El orden de las columnas en `(nombre, promedio)` debe coincidir con el orden de los valores en `VALUES (...)`.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: 'Quieres leer únicamente el nombre y el correo de todos los alumnos. ¿Qué instrucción usas?',
        codeSnippet: '______ nombre, correo FROM alumnos;',
        options: ['SELECT', 'INSERT', 'WHERE', 'FROM'],
        correctAnswer: 'SELECT',
        hints: ['Es la instrucción que lee datos de una tabla.'],
        explanationMarkdown: '`SELECT` seguido de columnas específicas lee solo esas columnas, no toda la fila.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: 'Quieres solo los alumnos cuyo `promedio` es menor a 6. ¿Qué cláusula agregas?',
        codeSnippet: 'SELECT * FROM alumnos ______ promedio < 6;',
        options: ['WHERE', 'SELECT', 'INSERT INTO', 'VALUES'],
        correctAnswer: 'WHERE',
        hints: ['Es la cláusula que filtra filas según una condición.'],
        explanationMarkdown: '`WHERE promedio < 6` limita el resultado a las filas que cumplen esa condición.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Quieres agregar un alumno nuevo a la tabla. ¿Qué instrucción usas?',
        options: ['INSERT INTO', 'SELECT', 'WHERE', 'DELETE'],
        correctAnswer: 'INSERT INTO',
        hints: ['Es la instrucción que crea una fila nueva, no la que lee.'],
        explanationMarkdown: '`INSERT INTO tabla (...) VALUES (...)` agrega una fila nueva a la tabla.',
      },
    ],
    challenge: {
      id: 'reto-sql-basico',
      promptMarkdown:
        'Completa `ejecutarSQL(tipo, tabla, condicion)` para que simule el texto de una consulta SQL según el tipo de operación.',
      starterCode:
        'function ejecutarSQL(tipo, tabla, condicion) {\n  // tipo "select-todo"   -> `SELECT * FROM <tabla>`\n  // tipo "select-filtro"  -> `SELECT * FROM <tabla> WHERE <condicion>`\n  // tipo "insert"         -> `INSERT INTO <tabla> VALUES (<condicion>)`\n  return "";\n}\n\nconsole.log(ejecutarSQL("select-todo", "alumnos", null));\nconsole.log(ejecutarSQL("select-filtro", "alumnos", "promedio >= 8"));\nconsole.log(ejecutarSQL("insert", "alumnos", "\'Marco\', 9.2"));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-select-todo', type: 'stdoutIncludes', label: 'SELECT * FROM alumnos', value: 'SELECT * FROM alumnos', failureMessage: '"select-todo" debe construir un SELECT sin WHERE sobre la tabla dada.' },
        { id: 'check-select-filtro', type: 'stdoutIncludes', label: 'SELECT * FROM alumnos WHERE promedio >= 8', value: 'SELECT * FROM alumnos WHERE promedio >= 8', failureMessage: '"select-filtro" debe agregar la cláusula WHERE con la condición recibida.' },
        { id: 'check-insert', type: 'stdoutIncludes', label: 'INSERT INTO alumnos VALUES (\'Marco\', 9.2)', value: "INSERT INTO alumnos VALUES ('Marco', 9.2)", failureMessage: '"insert" debe construir un INSERT INTO con los valores recibidos entre paréntesis.' },
      ],
      hints: [
        'Usa template literals para construir cada cadena de salida.',
        'El caso "select-todo" no debe incluir la palabra WHERE en ningún lado.',
        'El caso "insert" envuelve `condicion` entre paréntesis después de VALUES.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar tres líneas: el SELECT sin filtro, el SELECT con WHERE y el INSERT INTO con los valores de Marco.',
    },
    reflectionPromptMarkdown:
      'Piensa en una lista que consultas seguido en tu trabajo (asistencias, calificaciones). ¿Qué columnas pedirías con SELECT y qué condición pondrías en WHERE?',
    masteryCriteria: [
      'Escribo un SELECT con columnas específicas y una cláusula WHERE.',
      'Distingo cuándo usar SELECT frente a INSERT INTO.',
      'Leo el resultado de una consulta como filas y columnas.',
      'Escribí una función que construye el texto de tres tipos de consulta SQL.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-db-relaciones',
    moduleId: 'mod-7-v2',
    phaseId: 'fase-2',
    order: 20,
    title: 'V2.20 Tablas relacionadas: claves foráneas y JOIN conceptual',
    category: 'Databases',
    summary: 'Entiende cómo dos tablas se relacionan mediante una clave foránea y qué hace un JOIN al combinarlas.',
    prerequisiteLessonIds: ['lesson-v2-db-sql-basico'],
    estimatedMinutes: 40,
    xpReward: 90,
    icon: Database,
    color: 'from-teal-500 to-emerald-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Explicar qué es una clave foránea y qué relación describe entre dos tablas.',
      'Predecir el resultado de combinar dos tablas relacionadas por su clave foránea.',
      'Reconocer cuándo un dato debería vivir en su propia tabla en vez de repetirse.',
    ],
    concept: {
      explanationMarkdown:
        'Una base de datos relacional separa la información en tablas para no repetirla. Una **clave foránea** es una columna en una tabla que guarda el id de una fila de otra tabla, y así las conecta. Un `JOIN` combina filas de dos tablas relacionadas usando esa clave.',
      whyItMattersMarkdown:
        'Si guardaras el nombre completo del alumno en cada fila de calificaciones, un cambio de nombre requeriría actualizar cientos de filas. Con una clave foránea, el nombre vive una sola vez en `alumnos` y todo lo demás solo referencia su id.',
      realWorldContextMarkdown:
        'En SASE, la tabla `calificaciones` no repite el nombre del alumno: guarda `alumno_id`, una clave foránea hacia `alumnos`. Para mostrar "Valeria: 9.5" en la pantalla, el backend combina ambas tablas por ese id.',
      narrationText:
        'Una clave foránea conecta una fila de una tabla con una fila de otra. Un JOIN combina ambas tablas usando esa conexión.',
    },
    examples: [
      {
        id: 'ejemplo-clave-foranea',
        title: 'Dos tablas conectadas por un id',
        code:
          'alumnos:      { id: 1, nombre: "Valeria" }\ncalificaciones: { id: 10, alumno_id: 1, materia: "Mate", nota: 9.5 }\n\n-- alumno_id es la clave foránea:\n-- apunta al id de una fila en alumnos.',
        explanationMarkdown:
          '`alumno_id` no repite el nombre; solo guarda el id de la fila correspondiente en `alumnos`. La conexión se resuelve al combinar ambas tablas.',
      },
      {
        id: 'ejemplo-join-conceptual',
        title: 'Qué hace un JOIN',
        code:
          'SELECT alumnos.nombre, calificaciones.materia, calificaciones.nota\nFROM calificaciones\nJOIN alumnos ON calificaciones.alumno_id = alumnos.id;\n\n-- Resultado: "Valeria | Mate | 9.5"',
        explanationMarkdown:
          'El `JOIN` empareja cada fila de `calificaciones` con la fila de `alumnos` cuyo `id` coincide con `alumno_id`, y el resultado combina columnas de ambas tablas.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: 'La tabla `calificaciones` tiene una columna `alumno_id` que apunta al `id` de un alumno. ¿Cómo se llama ese tipo de columna?',
        options: ['Clave foránea', 'Clave primaria', 'Índice', 'Vista'],
        correctAnswer: 'Clave foránea',
        hints: ['Es la columna que conecta una tabla con otra, no la que identifica de forma única a la propia fila.'],
        explanationMarkdown: 'Una clave foránea guarda el id de una fila de otra tabla, estableciendo la relación entre ambas.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: 'Quieres una tabla que combine el nombre del alumno con cada una de sus calificaciones. ¿Qué operación SQL usas?',
        options: ['JOIN', 'INSERT', 'WHERE', 'DELETE'],
        correctAnswer: 'JOIN',
        hints: ['Es la operación que combina filas de dos tablas relacionadas.'],
        explanationMarkdown: '`JOIN` combina filas de dos tablas usando la clave foránea como punto de conexión.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Guardas el nombre completo del alumno en cada fila de calificaciones, repetido muchas veces. ¿Qué problema causa esto?',
        options: ['Un cambio de nombre requiere actualizar todas las filas repetidas', 'La consulta se vuelve más rápida', 'No se necesita clave foránea', 'No causa ningún problema'],
        correctAnswer: 'Un cambio de nombre requiere actualizar todas las filas repetidas',
        hints: ['Piensa qué pasa si el alumno corrige su nombre y hay 50 calificaciones guardadas.'],
        explanationMarkdown: 'Repetir datos que pueden cambiar obliga a actualizarlos en todos los lugares donde se repitieron; una clave foránea evita ese problema.',
      },
    ],
    challenge: {
      id: 'reto-join-conceptual',
      promptMarkdown:
        'Completa `combinarTablas(alumnos, calificaciones)` para que devuelva un arreglo de strings `"<nombre>: <materia> <nota>"`, uno por cada calificación, resolviendo `alumno_id` contra la tabla `alumnos` (simula un JOIN).',
      starterCode:
        'function combinarTablas(alumnos, calificaciones) {\n  // Por cada calificación, busca en alumnos el que tenga id === alumno_id\n  // y arma "<nombre>: <materia> <nota>"\n  return [];\n}\n\nconst alumnos = [\n  { id: 1, nombre: "Valeria" },\n  { id: 2, nombre: "Sofía" },\n];\nconst calificaciones = [\n  { alumno_id: 1, materia: "Mate", nota: 9.5 },\n  { alumno_id: 2, materia: "Historia", nota: 8 },\n  { alumno_id: 1, materia: "Ciencias", nota: 10 },\n];\n\nconsole.log(combinarTablas(alumnos, calificaciones).join("\\n"));',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-fila-1', type: 'stdoutIncludes', label: 'Valeria: Mate 9.5', value: 'Valeria: Mate 9.5', failureMessage: 'La primera calificación (alumno_id 1, Mate) debe resolverse a "Valeria: Mate 9.5".' },
        { id: 'check-fila-2', type: 'stdoutIncludes', label: 'Sofía: Historia 8', value: 'Sofía: Historia 8', failureMessage: 'La segunda calificación (alumno_id 2, Historia) debe resolverse a "Sofía: Historia 8".' },
        { id: 'check-fila-3', type: 'stdoutIncludes', label: 'Valeria: Ciencias 10', value: 'Valeria: Ciencias 10', failureMessage: 'La tercera calificación (alumno_id 1, Ciencias) debe resolverse a "Valeria: Ciencias 10".' },
      ],
      hints: [
        'Usa `.map()` sobre `calificaciones` y, dentro, `.find()` sobre `alumnos` para localizar el nombre.',
        'La clave que conecta ambas tablas es `alumno_id` (en calificaciones) contra `id` (en alumnos).',
        'Arma cada string con un template literal: `${alumno.nombre}: ${calificacion.materia} ${calificacion.nota}`.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar tres líneas, una por calificación, con el nombre del alumno correcto resuelto desde la tabla `alumnos`.',
    },
    reflectionPromptMarkdown:
      'En tu trabajo, ¿qué dos listas separadas (por ejemplo alumnos y asistencias) tendrías que combinar para responder "¿cuántas faltas tiene Valeria?"? ¿Qué columna las conectaría?',
    masteryCriteria: [
      'Explico qué es una clave foránea y qué relación describe.',
      'Predigo el resultado de combinar dos tablas relacionadas.',
      'Reconozco cuándo un dato debería vivir en su propia tabla en vez de repetirse.',
      'Escribí una función que simula un JOIN resolviendo una clave foránea contra otra tabla.',
    ],
  },
  {
    schemaVersion: 2,
    id: 'lesson-v2-db-supabase-rls',
    moduleId: 'mod-7-v2',
    phaseId: 'fase-2',
    order: 21,
    title: 'V2.21 Supabase y Row Level Security',
    category: 'Databases',
    summary: 'Usa el cliente de Supabase para leer datos y entiende qué protege una política de Row Level Security.',
    prerequisiteLessonIds: ['lesson-v2-db-relaciones'],
    estimatedMinutes: 40,
    xpReward: 90,
    icon: Lock,
    color: 'from-teal-500 to-emerald-700',
    week: 'Piloto v2',
    hours: 1,
    learningObjectives: [
      'Leer una consulta encadenada del cliente de Supabase (`from`, `select`, `eq`) y saber qué SQL representa.',
      'Explicar qué es Row Level Security (RLS) y qué problema resuelve.',
      'Reconocer cuándo una tabla sin RLS es un riesgo de seguridad, no solo un detalle técnico.',
    ],
    concept: {
      explanationMarkdown:
        'Supabase es un backend-as-a-service que expone una base de datos PostgreSQL a través de un cliente JavaScript: `supabase.from("tabla").select("columnas").eq("campo", valor)` arma, por debajo, una consulta SQL equivalente a `SELECT columnas FROM tabla WHERE campo = valor`. Row Level Security (RLS) es un conjunto de reglas que Postgres aplica **por fila**, decidiendo qué filas puede ver o modificar cada usuario según quién está autenticado.',
      whyItMattersMarkdown:
        'Sin RLS, cualquier persona con la URL pública del proyecto podría leer o modificar filas de otros usuarios. RLS mueve esa protección a la base de datos misma, no solo al código del frontend, que un usuario podría manipular.',
      realWorldContextMarkdown:
        'En SASE, una política de RLS en `calificaciones` podría decir "un alumno solo puede leer filas donde `alumno_id` sea igual a su propio id de sesión" — así, aunque dos alumnos usen el mismo cliente Supabase, cada uno solo ve lo suyo.',
      narrationText:
        'El cliente de Supabase arma consultas SQL con from, select y eq. Row Level Security decide, fila por fila, qué puede ver o modificar cada usuario dentro de la base de datos.',
    },
    examples: [
      {
        id: 'ejemplo-cliente-supabase',
        title: 'El cliente traduce a SQL por debajo',
        code:
          'supabase\n  .from("calificaciones")\n  .select("materia, nota")\n  .eq("alumno_id", 1);\n\n-- Equivale a:\n-- SELECT materia, nota FROM calificaciones WHERE alumno_id = 1;',
        explanationMarkdown:
          'Cada método encadenado corresponde a una parte de la consulta SQL: `from` es la tabla, `select` las columnas, `eq` el filtro de igualdad en `WHERE`.',
      },
      {
        id: 'ejemplo-rls',
        title: 'Sin RLS vs. con RLS',
        code:
          '-- Sin RLS: cualquiera con la URL pública puede leer TODAS las filas.\n\n-- Con RLS activo y una política:\n-- "el usuario solo ve filas donde alumno_id = auth.uid()"\n-- la misma consulta SOLO devuelve las filas del alumno autenticado.',
        explanationMarkdown:
          'La política de RLS no cambia el código del cliente; cambia qué filas devuelve Postgres para ese usuario específico, sin importar qué pida el cliente.',
      },
    ],
    guidedPractice: [
      {
        id: 'guiado-1',
        order: 1,
        promptMarkdown: '`supabase.from("alumnos").select("nombre").eq("id", 3)` es equivalente a qué SQL?',
        options: [
          'SELECT nombre FROM alumnos WHERE id = 3',
          'INSERT INTO alumnos (nombre) VALUES (3)',
          'SELECT * FROM alumnos',
          'DELETE FROM alumnos WHERE id = 3',
        ],
        correctAnswer: 'SELECT nombre FROM alumnos WHERE id = 3',
        hints: ['`from` es la tabla, `select` las columnas, `eq` el filtro de igualdad.'],
        explanationMarkdown: 'El encadenamiento `from/select/eq` arma un SELECT con columnas específicas y una condición WHERE de igualdad.',
      },
      {
        id: 'guiado-2',
        order: 2,
        promptMarkdown: '¿Qué decide una política de Row Level Security?',
        options: [
          'Qué filas puede ver o modificar cada usuario',
          'Qué tan rápido responde una consulta',
          'Qué columnas existen en la tabla',
          'Cuántas tablas tiene la base de datos',
        ],
        correctAnswer: 'Qué filas puede ver o modificar cada usuario',
        hints: ['El nombre lo dice: seguridad a nivel de fila.'],
        explanationMarkdown: 'RLS aplica reglas por fila dentro de la base de datos, independientes de lo que pida el código del cliente.',
      },
      {
        id: 'guiado-3',
        order: 3,
        promptMarkdown: 'Una tabla de calificaciones queda pública, sin ninguna política de RLS activada. ¿Qué riesgo real describe mejor esta situación?',
        options: [
          'Cualquiera con la URL pública podría leer las calificaciones de todos los alumnos',
          'La tabla dejaría de aceptar nuevas filas',
          'Las consultas SQL dejarían de funcionar',
          'No hay ningún riesgo si la URL no se comparte',
        ],
        correctAnswer: 'Cualquiera con la URL pública podría leer las calificaciones de todos los alumnos',
        hints: ['RLS es la única capa dentro de la base de datos que restringe por fila; sin ella, la clave pública del proyecto es suficiente para leer todo.'],
        explanationMarkdown: 'Sin RLS, la clave pública (`anon key`) del proyecto es suficiente para leer o escribir cualquier fila de una tabla expuesta, sin importar de quién sean los datos.',
      },
    ],
    challenge: {
      id: 'reto-rls-simulado',
      promptMarkdown:
        'Completa `leerConRLS(filas, usuarioId, rlsActivo)` para simular cómo Row Level Security filtra el resultado de una consulta.',
      starterCode:
        'function leerConRLS(filas, usuarioId, rlsActivo) {\n  // Si rlsActivo es false, devuelve TODAS las filas (sin protección).\n  // Si rlsActivo es true, devuelve solo las filas donde fila.alumno_id === usuarioId.\n  return [];\n}\n\nconst calificaciones = [\n  { alumno_id: 1, materia: "Mate", nota: 9.5 },\n  { alumno_id: 2, materia: "Historia", nota: 8 },\n  { alumno_id: 1, materia: "Ciencias", nota: 10 },\n];\n\nconsole.log("Sin RLS:", leerConRLS(calificaciones, 1, false).length);\nconsole.log("Con RLS:", leerConRLS(calificaciones, 1, true).length);',
      language: 'javascript',
      timeoutMs: 2000,
      checks: [
        { id: 'check-sin-rls', type: 'stdoutIncludes', label: 'Sin RLS: 3', value: 'Sin RLS: 3', failureMessage: 'Con rlsActivo en false, deben devolverse las 3 filas sin ningún filtro.' },
        { id: 'check-con-rls', type: 'stdoutIncludes', label: 'Con RLS: 2', value: 'Con RLS: 2', failureMessage: 'Con rlsActivo en true y usuarioId 1, solo deben contarse las 2 filas donde alumno_id es 1.' },
      ],
      hints: [
        'Si `rlsActivo` es false, retorna `filas` tal cual, sin filtrar.',
        'Si `rlsActivo` es true, usa `.filter()` comparando `fila.alumno_id` contra `usuarioId`.',
      ],
      expectedEvidenceMarkdown:
        'La consola debe mostrar "Sin RLS: 3" (todas las filas) y "Con RLS: 2" (solo las del usuario 1).',
    },
    reflectionPromptMarkdown:
      'Si SASE guardara las calificaciones en Supabase sin RLS, ¿qué política escribirías primero y para qué tabla? Descríbela en una frase, sin código.',
    masteryCriteria: [
      'Leo una consulta encadenada del cliente de Supabase y sé qué SQL representa.',
      'Explico qué es Row Level Security y qué problema resuelve.',
      'Reconozco por qué una tabla sin RLS es un riesgo de seguridad real, no un detalle menor.',
      'Escribí una función que simula cómo RLS filtra filas según el usuario y si la política está activa.',
    ],
  },
];
