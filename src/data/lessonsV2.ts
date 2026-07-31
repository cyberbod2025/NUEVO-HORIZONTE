import { Brain, Code, Sliders } from 'lucide-react';
import type { LessonV2 } from '../types/lesson';

/**
 * Piloto vertical del contrato v2 (ver docs/adr/0004-lesson-v2-pedagogical-contract.md).
 *
 * Tres lecciones reales, no de relleno, que demuestran la progresión
 * Comprender -> Aplicar -> Resolver de manera autónoma sobre el mismo tema
 * (condicionales y variables), profundizando lo que hoy es un único módulo con
 * una sola pregunta. No sustituyen `MODULES`; conviven con él mientras se valida
 * el contrato antes de migrar el resto del currículo.
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
];
