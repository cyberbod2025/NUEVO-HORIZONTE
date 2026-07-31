import {
  Brain,
  Code,
  Cpu,
  Database,
  FileCode,
  Layers,
  Rocket,
  Server,
  ShieldCheck,
  Target,
  Terminal,
  UserCheck,
} from 'lucide-react';

export const PHASES = [
  { id: 'fase-1', name: 'Fase 1: Fundamentos & Herramientas', weeks: 'Semanas 1–5', color: 'from-amber-500 to-orange-500' },
  { id: 'fase-2', name: 'Fase 2: Desarrollo Full-Stack', weeks: 'Semanas 6–11', color: 'from-blue-500 to-cyan-500' },
  { id: 'fase-3', name: 'Fase 3: Calidad, IA & DevOps', weeks: 'Semanas 12–16', color: 'from-purple-500 to-indigo-500' },
  { id: 'fase-4', name: 'Fase 4: Proyecto SASE & Inserción Laboral', weeks: 'Semanas 17–24', color: 'from-emerald-500 to-teal-500' },
];

export const MODULES = [
  {
    id: 'mod-1',
    phaseId: 'fase-1',
    week: 'Semanas 1–2',
    level: 1,
    title: '1. Fundamentos & Lógica Algorítmica',
    category: 'Fundamentos',
    hours: 40,
    icon: Brain,
    color: 'from-amber-500 to-orange-600',
    description: 'Entiende variables, condicionales, bucles y lógica estructurada antes de tocar frameworks.',
    concept: 'Un algoritmo es una secuencia ordenada de pasos. Las variables son contenedores con nombre en la memoria del sistema que almacenan datos para ser modificados o evaluados.',
    voiceAudioText: 'Bienvenido al Módulo 1. Aquí aprenderás lógica de programación. Un algoritmo es una serie de pasos ordenados. Las variables guardan información como números o texto en la memoria de la computadora.',
    visualizerType: 'memory',
    guidedExercise: {
      question: 'Completa la condición para verificar si una calificación en el sistema educativo es aprobatoria (mayor o igual a 6):',
      codeSnippet: 'let nota = 7;\nif (nota ___ 6) {\n  console.log("Aprobado");\n}',
      options: ['>=', '==', '<', '==='],
      correctAnswer: '>=',
      explanation: 'El operador >= (mayor o igual) permite evaluar si la nota alcanza la calificación mínima requerida.',
    },
    sandbox: {
      initialCode: `// Escribe una función que reciba la edad y retorne "Mayor de edad" o "Menor de edad"
function evaluarEdad(edad) {
  if (edad >= 18) {
    return "Mayor de edad";
  } else {
    return "Menor de edad";
  }
}

console.log("Hugo (25 años):", evaluarEdad(25));
console.log("Estudiante (15 años):", evaluarEdad(15));`,
      expectedOutput: 'Hugo (25 años): Mayor de edad',
      testCases: [
        { name: 'Evalúa correctamente edad >= 18', test: (out: string) => out.includes('Mayor de edad') },
      ],
    },
  },
  {
    id: 'mod-2',
    phaseId: 'fase-1',
    week: 'Semanas 2–3',
    level: 2,
    title: '2. JavaScript Moderno (ES6+) & Asincronía',
    category: 'JavaScript',
    hours: 60,
    icon: Code,
    color: 'from-yellow-400 to-amber-500',
    description: 'Funciones flecha, desestructuración, promesas, async/await y peticiones HTTP con fetch.',
    concept: 'Las Promesas y async/await gestionan tareas asíncronas (como pedir datos a un servidor remoto) evitando que la aplicación se bloquee mientras espera respuesta.',
    voiceAudioText: 'Módulo 2: JavaScript Moderno. Las operaciones asíncronas permiten a la aplicación consultar servidores sin congelar la pantalla del usuario. Usamos async y await para esperar respuestas limpiamente.',
    visualizerType: 'async',
    guidedExercise: {
      question: '¿Qué palabra clave pausará la ejecución de una función async hasta que la Promesa se resuelva?',
      codeSnippet: 'async function obtenerCalificaciones() {\n  const respuesta = ____ fetch("/api/sase/notas");\n  const datos = await respuesta.json();\n}',
      options: ['await', 'then', 'defer', 'wait'],
      correctAnswer: 'await',
      explanation: 'La instrucción `await` detiene la ejecución interna de la función asíncrona hasta recibir la respuesta.',
    },
    sandbox: {
      initialCode: `// Simulación de Promesa con async/await
async function obtenerEstudiante() {
  return { id: 101, nombre: "Profe Hugo", rol: "Desarrollador Junior" };
}

async function ejecutar() {
  const data = await obtenerEstudiante();
  console.log("Estudiante cargado:", data.nombre, "-", data.rol);
}

ejecutar();`,
      expectedOutput: 'Estudiante cargado: Profe Hugo - Desarrollador Junior',
      testCases: [
        { name: 'Extrae correctamente el nombre del estudiante', test: (out: string) => out.includes('Profe Hugo') },
      ],
    },
  },
  {
    id: 'mod-3',
    phaseId: 'fase-1',
    week: 'Semana 4',
    level: 3,
    title: '3. Terminal, Git & Conventional Commits',
    category: 'Herramientas',
    hours: 10,
    icon: Terminal,
    color: 'from-slate-600 to-slate-900',
    description: 'Línea de comandos, control de versiones Git, ramas y estándar de mensajes Conventional Commits.',
    concept: 'Git registra el historial de cambios en el código. Conventional Commits (feat:, fix:, docs:) estandariza los mensajes para mantener un repositorio limpio y profesional.',
    voiceAudioText: 'Módulo 3: Terminal y Git. Git es la máquina del tiempo de tu código. Guarda versiones mediante commits y ramas para trabajar sin miedo a romper la aplicación.',
    visualizerType: 'git',
    guidedExercise: {
      question: 'Según el estándar Conventional Commits, ¿qué prefijo usas para añadir una nueva funcionalidad?',
      codeSnippet: 'git commit -m "____: agregar módulo de autenticación con Supabase"',
      options: ['feat', 'fix', 'chore', 'refactor'],
      correctAnswer: 'feat',
      explanation: 'El prefijo `feat` proviene de feature (característica) e indica el lanzamiento de nueva funcionalidad.',
    },
    sandbox: {
      initialCode: `// Formateador de commits para Git
function formatearCommit(tipo, modulo, descripcion) {
  return \`${'${'}tipo}(${'${'}modulo}): ${'${'}descripcion}\`;
}

const mensaje = formatearCommit("feat", "sase-notas", "permitir registro de calificaciones");
console.log("Commit generado:", mensaje);`,
      expectedOutput: 'feat(sase-notas): permitir registro de calificaciones',
      testCases: [
        { name: 'Genera prefijo feat(sase-notas):', test: (out: string) => out.includes('feat(sase-notas):') },
      ],
    },
  },
  {
    id: 'mod-4',
    phaseId: 'fase-1',
    week: 'Semana 5',
    level: 4,
    title: '4. TypeScript Esencial & Tipado Estático',
    category: 'TypeScript',
    hours: 30,
    icon: FileCode,
    color: 'from-blue-500 to-blue-700',
    description: 'Superset de JS con tipado explícito, interfaces, genéricos y autocompletado seguro en el editor.',
    concept: 'TypeScript previene errores antes de ejecutar el código asegurando que cada variable u objeto contenga la estructura exacta declarada en sus interfaces.',
    voiceAudioText: 'Módulo 4: TypeScript. TypeScript agrega reglas de tipo a JavaScript. Detecta fallos de tipado mientras escribes código en lugar de cuando la app ya está en producción.',
    visualizerType: 'types',
    guidedExercise: {
      question: '¿Qué tipo primitivo usas en una interfaz de TypeScript para guardar el nombre de un alumno?',
      codeSnippet: 'interface Alumno {\n  id: number;\n  nombre: ______;\n  activo: boolean;\n}',
      options: ['string', 'String', 'text', 'varchar'],
      correctAnswer: 'string',
      explanation: 'En TypeScript el tipo primitivo estándar para cadenas de texto es `string` en minúscula.',
    },
    sandbox: {
      initialCode: `// Validación de tipos simulada
function validarDocente(docente) {
  if (typeof docente.nombre !== "string" || typeof docente.materias !== "number") {
    throw new Error("Error de tipo de datos");
  }
  return \`Docente ${'${'}docente.nombre} enseña ${'${'}docente.materias} materias.\`;
}

console.log(validarDocente({ nombre: "Profe Hugo", materias: 3 }));`,
      expectedOutput: 'Docente Profe Hugo enseña 3 materias.',
      testCases: [
        { name: 'Acepta datos válidos del docente', test: (out: string) => out.includes('Profe Hugo enseña 3 materias') },
      ],
    },
  },
  {
    id: 'mod-5',
    phaseId: 'fase-2',
    week: 'Semanas 6–7',
    level: 5,
    title: '5. React: Componentes, Props & useState',
    category: 'Frontend',
    hours: 50,
    icon: Layers,
    color: 'from-cyan-400 to-blue-500',
    description: 'JSX, componentes modulares, paso de props, re-renderizado reactivo y Hooks de estado.',
    concept: 'React actualiza la interfaz de usuario automáticamente en memoria (Virtual DOM) cada vez que el estado interno (`useState`) sufre una modificación.',
    voiceAudioText: 'Módulo 5: React Frontend. Con React construyes interfaces modulares como bloques de Lego. El hook useState se encarga de re-renderizar la pantalla cuando los datos cambian.',
    visualizerType: 'reactState',
    guidedExercise: {
      question: '¿Qué React Hook inicializa el estado interactivo dentro de un componente funcional?',
      codeSnippet: 'const [alumnos, setAlumnos] = _______([]);',
      options: ['useState', 'useEffect', 'useRef', 'createState'],
      correctAnswer: 'useState',
      explanation: '`useState` provee el valor del estado actual y la función actualizadora para re-renderizar la interfaz.',
    },
    sandbox: {
      initialCode: `// Simulación de componente reactivo
function ComponenteContador() {
  let contador = 0;
  function incrementar() {
    contador += 1;
    console.log("Estado React actualizado:", contador);
  }
  incrementar();
  incrementar();
}

ComponenteContador();`,
      expectedOutput: 'Estado React actualizado: 2',
      testCases: [
        { name: 'Aumenta el estado a 2', test: (out: string) => out.includes('Estado React actualizado: 2') },
      ],
    },
  },
  {
    id: 'mod-6',
    phaseId: 'fase-2',
    week: 'Semanas 8–9',
    level: 6,
    title: '6. Backend con Node.js & Express REST API',
    category: 'Backend',
    hours: 30,
    icon: Server,
    color: 'from-emerald-500 to-green-700',
    description: 'Servidores HTTP, rutas RESTful (GET, POST, PUT, DELETE), controladores y middleware JSON.',
    concept: 'Express en Node.js recibe peticiones del navegador cliente, procesa la lógica de negocio y responde con objetos JSON estructurados.',
    voiceAudioText: 'Módulo 6: Backend con Node.js y Express. Aquí construyes las APIs REST. Tu servidor escuchará peticiones HTTP del frontend y devolverá o guardará información.',
    visualizerType: 'api',
    guidedExercise: {
      question: '¿Qué método de Express configura una ruta para enviar datos JSON a los clientes en solicitudes HTTP GET?',
      codeSnippet: 'app.____("/api/sase/alumnos", (req, res) => {\n  res.json(alumnos);\n});',
      options: ['get', 'post', 'fetch', 'listen'],
      correctAnswer: 'get',
      explanation: 'El método `app.get` atiende las consultas de lectura realizadas mediante el protocolo HTTP GET.',
    },
    sandbox: {
      initialCode: `// Simulación de Servidor Express API
const app = {
  get: (ruta, handler) => {
    const req = {};
    const res = { json: (data) => console.log("HTTP 200 OK ->", JSON.stringify(data)) };
    handler(req, res);
  }
};

app.get("/api/sase/alumnos", (req, res) => {
  res.json([{ id: 1, nombre: "Hugo", promedio: 9.5 }]);
});`,
      expectedOutput: 'HTTP 200 OK -> [{"id":1,"nombre":"Hugo","promedio":9.5}]',
      testCases: [
        { name: 'Devuelve código 200 con JSON de alumnos', test: (out: string) => out.includes('HTTP 200 OK') },
      ],
    },
  },
  {
    id: 'mod-7',
    phaseId: 'fase-2',
    week: 'Semanas 10–11',
    level: 7,
    title: '7. Bases de Datos: SQL, Postgres & Supabase',
    category: 'Databases',
    hours: 40,
    icon: Database,
    color: 'from-teal-500 to-emerald-700',
    description: 'Esquema relacional, sintaxis SQL, Row Level Security (RLS) y cliente Supabase.',
    concept: 'PostgreSQL garantiza integridad en bases relacionales. Supabase actúa como Backend-as-a-Service agregando APIs instantáneas y reglas de seguridad RLS.',
    voiceAudioText: 'Módulo 7: Bases de Datos PostgreSQL y Supabase. Diseñarás las tablas del sistema SASE y asegurarás los datos usando políticas de seguridad Row Level Security.',
    visualizerType: 'db',
    guidedExercise: {
      question: '¿Qué comando SQL usas para obtener todos los campos de la tabla `calificaciones`?',
      codeSnippet: '______ * FROM calificaciones WHERE materia = "Matemáticas";',
      options: ['SELECT', 'GET', 'FETCH', 'QUERY'],
      correctAnswer: 'SELECT',
      explanation: '`SELECT` es la instrucción estándar en lenguajes SQL para extraer registros de la base de datos.',
    },
    sandbox: {
      initialCode: `// Simulación de Supabase Client SDK
const supabase = {
  from: (tabla) => ({
    select: (columnas) => ({
      eq: (campo, valor) => console.log(\`SQL Query: SELECT ${'${'}columnas} FROM ${'${'}tabla} WHERE ${'${'}campo} = '${'${'}valor}'\`)
    })
  })
};

supabase.from("incidencias").select("id, titulo, gravedad").eq("estado", "pendiente");`,
      expectedOutput: "SQL Query: SELECT id, titulo, gravedad FROM incidencias WHERE estado = 'pendiente'",
      testCases: [
        { name: 'Genera consulta SQL equivalente en Supabase', test: (out: string) => out.includes('SELECT id, titulo, gravedad FROM incidencias') },
      ],
    },
  },
  {
    id: 'mod-8',
    phaseId: 'fase-3',
    week: 'Semanas 12–13',
    level: 8,
    title: '8. Pruebas Automatizadas con Vitest & RTL',
    category: 'Testing',
    hours: 20,
    icon: ShieldCheck,
    color: 'from-purple-500 to-indigo-600',
    description: 'Tests unitarios, metodología Arrange-Act-Assert, simulación de mocks y garantía de calidad.',
    concept: 'Escribir pruebas automatizadas valida que las funciones clave sigan operando correctamente tras cada cambio, evitando regresiones en producción.',
    voiceAudioText: 'Módulo 8: Testing Automatizado con Vitest. La regla de oro de un desarrollador profesional es escribir pruebas. Con Vitest verificas que tu código funcione antes de lanzarlo.',
    visualizerType: 'testing',
    guidedExercise: {
      question: '¿Qué método de aserción en Vitest comprueba que dos valores primitivos sean exactamente iguales?',
      codeSnippet: 'test("calcula el promedio del alumno", () => {\n  expect(calcularPromedio([10, 8, 9])).____(9);\n});',
      options: ['toBe', 'toEqual', 'isEqual', 'assert'],
      correctAnswer: 'toBe',
      explanation: 'El método `toBe` compara la igualdad estricta (===) entre valores primitivos.',
    },
    sandbox: {
      initialCode: `// Suite de pruebas simplificada estilo Vitest
function expect(valorReal) {
  return {
    toBe: (valorEsperado) => {
      if (valorReal === valorEsperado) {
        console.log("✓ TEST PASS: La función retornó el valor esperado.");
      } else {
        console.log(\`✗ TEST FAIL: Se esperaba ${'${'}valorEsperado} pero dio ${'${'}valorReal}\`);
      }
    }
  };
}

function calcularPromedio(notas) {
  return notas.reduce((a, b) => a + b, 0) / notas.length;
}

// Ejecutar test
expect(calcularPromedio([10, 8, 9])).toBe(9);`,
      expectedOutput: '✓ TEST PASS: La función retornó el valor esperado.',
      testCases: [
        { name: 'Supera el test con estado PASS', test: (out: string) => out.includes('TEST PASS') },
      ],
    },
  },
  {
    id: 'mod-9',
    phaseId: 'fase-3',
    week: 'Semanas 14–15',
    level: 9,
    title: '9. IA Aplicada, Prompts & Integración LLM',
    category: 'IA',
    hours: 20,
    icon: Cpu,
    color: 'from-pink-500 to-rose-600',
    description: 'Técnica Chain-of-Thought, arquitectura RAG (Retrieval Augmented Generation) y APIs de Gemini/OpenAI.',
    concept: 'La ingeniería de prompts diseña instrucciones estructuradas para guiar modelos de IA hacia respuestas precisas y automatizar tareas de código.',
    voiceAudioText: 'Módulo 9: Inteligencia Artificial Aplicada. Aprenderás a integrar APIs de LLM en tu aplicación y utilizar la técnica de Cadena de Pensamiento para resolver problemas complejos.',
    visualizerType: 'ai',
    guidedExercise: {
      question: '¿Qué técnica de prompting solicita al modelo razonar paso a paso antes de dar su veredicto final?',
      codeSnippet: 'Prompt: "Primero explica el flujo de datos y _____ detecta la línea con error."',
      options: ['luego', 'nunca', 'evita', 'omitir'],
      correctAnswer: 'luego',
      explanation: 'La técnica Chain-of-Thought (Cadena de pensamiento) fragmenta el razonamiento en pasos lógicos secuenciales.',
    },
    sandbox: {
      initialCode: `// Simulación de llamada a API de Gemini / IA
function llamarAPI_IA(prompt, contexto) {
  console.log("Enviando prompt a Gemini con contexto SASE...");
  return \`Respuesta IA: Para ${'${'}contexto}, la solución es implementar la función: ${'${'}prompt}\`;
}

const resultado = llamarAPI_IA("Generar reporte de alumnos", "Sistema SASE Escolar");
console.log(resultado);`,
      expectedOutput: 'Respuesta IA: Para Sistema SASE Escolar',
      testCases: [
        { name: 'Retorna contexto Sistema SASE Escolar', test: (out: string) => out.includes('Sistema SASE Escolar') },
      ],
    },
  },
  {
    id: 'mod-10',
    phaseId: 'fase-3',
    week: 'Semana 16',
    level: 10,
    title: '10. DevOps, Pipelines CI/CD & OWASP Top 10',
    category: 'DevOps',
    hours: 20,
    icon: Rocket,
    color: 'from-indigo-600 to-violet-800',
    description: 'Workflows en GitHub Actions, contenedores Docker, despliegue en Vercel y seguridad web.',
    concept: 'CI/CD ejecuta pruebas e inspecciones de seguridad automáticamente en GitHub Actions antes de desplegar el código a producción.',
    voiceAudioText: 'Módulo 10: DevOps y Seguridad OWASP. Automatizarás tus despliegues a la nube con GitHub Actions y protegerás la app contra los 10 riesgos críticos de seguridad web.',
    visualizerType: 'devops',
    guidedExercise: {
      question: '¿En qué carpeta del repositorio de Git se configuran las acciones automatizadas de GitHub Actions?',
      codeSnippet: '.github/________/ci-cd.yml',
      options: ['workflows', 'actions', 'scripts', 'config'],
      correctAnswer: 'workflows',
      explanation: 'GitHub Actions busca archivos de configuración YAML dentro de la ruta `.github/workflows/`.',
    },
    sandbox: {
      initialCode: `// Simulación de Pipeline de Integración Continua (CI/CD)
function pipelineGitHubActions(commitId) {
  console.log("1. Checkout repositorio:", commitId);
  console.log("2. Ejecutando linter & Vitest suite...");
  console.log("3. Despliegue automático en Vercel: App SASE en línea!");
}

pipelineGitHubActions("feat(sase): release v1.0.0");`,
      expectedOutput: 'Despliegue automático en Vercel: App SASE en línea!',
      testCases: [
        { name: 'Pipelined completado con éxito', test: (out: string) => out.includes('Despliegue automático en Vercel') },
      ],
    },
  },
  {
    id: 'mod-11',
    phaseId: 'fase-4',
    week: 'Semanas 17–19',
    level: 11,
    title: '11. Proyecto Integrado: SASE Portfolio Full-Stack',
    category: 'Proyecto',
    hours: 40,
    icon: Target,
    color: 'from-emerald-500 to-teal-700',
    description: 'Sistema de Administración Escolar completo: expedientes, calificaciones, incidencias y autenticación.',
    concept: 'Integra React, Node.js y Supabase Postgres en una aplicación completa desplegada públicamente.',
    voiceAudioText: 'Módulo 11: Proyecto SASE Portfolio. Es hora de poner todo a prueba. Construirás el prototipo SASE completo aplicando la regla 70/30 para demostrar tus capacidades reales.',
    visualizerType: 'sase',
    guidedExercise: {
      question: '¿Cuál es la regla dorada de aprendizaje activo aplicada al desarrollar el Proyecto SASE?',
      codeSnippet: 'Regla __/__: 70% del tiempo escribiendo código propio y 30% consumiendo teoría.',
      options: ['70/30', '50/50', '90/10', '20/80'],
      correctAnswer: '70/30',
      explanation: 'La regla 70/30 asegura la máxima práctica activa frente al código real.',
    },
    sandbox: {
      initialCode: `// Arquitectura principal del Sistema SASE
const SistemaSASE = {
  moduloAlumnos: true,
  moduloCalificaciones: true,
  moduloIncidencias: true,
  autenticacionSupabase: true,
  desplegadoEnVercel: true,
  obtenerEstatus: function() {
    return "PROTOTIPO SASE OPERATIVO Y DESPLEGADO EN PRODUCCIÓN";
  }
};

console.log("Estatus SASE:", SistemaSASE.obtenerEstatus());`,
      expectedOutput: 'Estatus SASE: PROTOTIPO SASE OPERATIVO Y DESPLEGADO EN PRODUCCIÓN',
      testCases: [
        { name: 'Verifica estatus operativo en producción', test: (out: string) => out.includes('PROTOTIPO SASE OPERATIVO') },
      ],
    },
  },
  {
    id: 'mod-12',
    phaseId: 'fase-4',
    week: 'Semanas 20–24',
    level: 12,
    title: '12. Marca Personal, CV & Competencia Laboral',
    category: 'Empleabilidad',
    hours: 20,
    icon: UserCheck,
    color: 'from-amber-600 to-red-600',
    description: 'Optimización de LinkedIn, perfil de Upwork, CV de 1 página y simulaciones de entrevistas de trabajo.',
    concept: 'Aprender en público y documentar tu caso de estudio con métricas claras valida tu perfil ante reclutadores técnicos.',
    voiceAudioText: 'Módulo 12: Marca Personal e Inserción Laboral. Prepararemos tu perfil profesional de LinkedIn, Upwork y tu CV de una página para empezar a aplicar a vacantes como Desarrollador Junior.',
    visualizerType: 'career',
    guidedExercise: {
      question: '¿Qué sección del archivo README.md es esencial para que un reclutador pruebe tu proyecto en minutos?',
      codeSnippet: '# Nombre del Proyecto\n## Descripción\n## Instrucciones de __________ e Instalación',
      options: ['Ejecución', 'Privacidad', 'Pago', 'Licencia'],
      correctAnswer: 'Ejecución',
      explanation: 'Instrucciones claras de instalación y ejecución permiten evaluar tu aplicación de inmediato.',
    },
    sandbox: {
      initialCode: `// Auditoría de preparación para vacante Junior
const postulanteJunior = {
  nombre: "Profe Hugo",
  commitsEnGitHub: true,
  proyectoSASEDesplegado: true,
  linkedInActualizado: true,
  perfilUpworkListo: true,
  verificarCompetencia: function() {
    return (this.commitsEnGitHub && this.proyectoSASEDesplegado) 
      ? "¡LISTO PARA COMPETIR COMO DESARROLLADOR JUNIOR!" 
      : "En fase de desarrollo";
  }
};

console.log("Dictamen laboral:", postulanteJunior.verificarCompetencia());`,
      expectedOutput: 'Dictamen laboral: ¡LISTO PARA COMPETIR COMO DESARROLLADOR JUNIOR!',
      testCases: [
        { name: 'Confirma disponibilidad para aplicar como Junior', test: (out: string) => out.includes('LISTO PARA COMPETIR') },
      ],
    },
  },
];

export const CLI_CHALLENGES = [
  {
    id: 'cli-1',
    title: '1. Inicializar repositorio Git y primer Commit',
    description: 'Ejecuta los comandos para iniciar un repositorio local, añadir los cambios al área de preparación y realizar tu primer commit convencional.',
    targetCommands: ['git init', 'git add .', 'git commit -m "feat: commit inicial"'],
    hint: 'Prueba escribiendo: git init, luego git add . y después git commit -m "feat: commit inicial"',
  },
  {
    id: 'cli-2',
    title: '2. Ejecutar la Suite de Pruebas con Vitest',
    description: 'Simula el lanzamiento de tus pruebas unitarias automáticas mediante el gestor de paquetes npm.',
    targetCommands: ['npm test'],
    hint: 'Escribe: npm test o npx vitest para correr la suite.',
  },
  {
    id: 'cli-3',
    title: '3. Desplegar aplicación SASE a producción en Vercel',
    description: 'Lanza la CLI de Vercel para compilar y publicar el proyecto en la nube.',
    targetCommands: ['vercel --prod'],
    hint: 'Escribe: vercel --prod para simular el despliegue a la nube.',
  },
];

export const BADGES = [
  { id: 'b-1', name: '🐣 Primer Commit', desc: 'Completaste la Lógica Inicial', requiredMod: 0 },
  { id: 'b-2', name: '⚡ JS Async Master', desc: 'Dominaste Promesas y Fetch', requiredMod: 1 },
  { id: 'b-3', name: '🛠 Git Conventional', desc: 'Estandarizaste tus Commits', requiredMod: 2 },
  { id: 'b-4', name: '🔷 TypeScript Shield', desc: 'Agregaste Tipado Estático', requiredMod: 3 },
  { id: 'b-5', name: '⚛️ React Architect', desc: 'Construiste Interfaces Modulares', requiredMod: 4 },
  { id: 'b-6', name: '🟢 Node API Builder', desc: 'Creaste Endpoints RESTful', requiredMod: 5 },
  { id: 'b-7', name: '🛢 Postgres & RLS', desc: 'Aseguraste Bases de Datos', requiredMod: 6 },
  { id: 'b-8', name: '🔥 Full-Stack Junior', desc: 'SASE Portfolio Desplegado', requiredMod: 10 },
];
