import { Braces, Brain, Code, Globe, Sliders, Zap } from 'lucide-react';
import type { LessonV2 } from '../types/lesson';

/**
 * Piloto vertical del contrato v2 (ver docs/adr/0004-lesson-v2-pedagogical-contract.md).
 *
 * Lecciones reales, no de relleno, que demuestran la progresión
 * Comprender -> Aplicar -> Resolver de manera autónoma. Las 3 primeras cubren
 * variables/condicionales/funciones (territorio del módulo 1 legacy); las 3
 * siguientes (agregadas en la microtarea de seguimiento) cubren JS moderno y
 * asincronía (territorio del módulo 2 legacy: arrow functions, destructuring,
 * template literals, promesas, async/await y fetch). No sustituyen `MODULES`;
 * conviven con él mientras se valida el contrato antes de migrar el resto del
 * currículo.
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
];
