import type { FinalChallenge, LessonV2 } from '../types/lesson';

type ChallengePatch = Pick<FinalChallenge, 'starterCode' | 'checks' | 'expectedEvidenceMarkdown'>;

const CHALLENGE_PATCHES: Record<string, ChallengePatch> = {
  'lesson-v2-backend-http-metodos': {
    starterCode:
      'function simularPeticion(metodo, recursoExiste) {\n  // GET con recurso       -> "GET 200 OK: recurso encontrado"\n  // GET sin recurso       -> "GET 404 Not Found: recurso no existe"\n  // POST                  -> "POST 201 Created: recurso creado"\n  // PUT con recurso       -> "PUT 200 OK: recurso actualizado"\n  // PUT sin recurso       -> "PUT 404 Not Found: recurso no existe"\n  // DELETE con recurso    -> "DELETE 200 OK: recurso eliminado"\n  // DELETE sin recurso    -> "DELETE 404 Not Found: recurso no existe"\n  return "";\n}\n\nconsole.log(simularPeticion("GET", true));\nconsole.log(simularPeticion("GET", false));\nconsole.log(simularPeticion("POST", false));\nconsole.log(simularPeticion("PUT", true));\nconsole.log(simularPeticion("PUT", false));\nconsole.log(simularPeticion("DELETE", true));\nconsole.log(simularPeticion("DELETE", false));',
    checks: [
      { id: 'check-get-existe', type: 'stdoutIncludes', label: 'GET existente -> 200', value: 'GET 200 OK: recurso encontrado', failureMessage: 'GET con recurso existente debe responder con su propio 200.' },
      { id: 'check-get-no-existe', type: 'stdoutIncludes', label: 'GET inexistente -> 404', value: 'GET 404 Not Found: recurso no existe', failureMessage: 'GET sin recurso debe producir un 404 identificable como GET.' },
      { id: 'check-post', type: 'stdoutIncludes', label: 'POST -> 201', value: 'POST 201 Created: recurso creado', failureMessage: 'POST debe crear el recurso y responder 201.' },
      { id: 'check-put-existe', type: 'stdoutIncludes', label: 'PUT existente -> 200', value: 'PUT 200 OK: recurso actualizado', failureMessage: 'PUT con recurso existente debe actualizarlo y responder 200.' },
      { id: 'check-put-no-existe', type: 'stdoutIncludes', label: 'PUT inexistente -> 404', value: 'PUT 404 Not Found: recurso no existe', failureMessage: 'PUT sin recurso debe producir su propio 404.' },
      { id: 'check-delete-existe', type: 'stdoutIncludes', label: 'DELETE existente -> 200', value: 'DELETE 200 OK: recurso eliminado', failureMessage: 'DELETE con recurso existente debe confirmar la eliminación.' },
      { id: 'check-delete-no-existe', type: 'stdoutIncludes', label: 'DELETE inexistente -> 404', value: 'DELETE 404 Not Found: recurso no existe', failureMessage: 'DELETE sin recurso debe producir un 404 independiente del caso GET.' },
    ],
    expectedEvidenceMarkdown:
      'La consola debe mostrar siete líneas distintas: GET con 200 y 404, POST con 201, PUT con 200 y 404, y DELETE con 200 y 404.',
  },

  'lesson-v2-backend-api-crud': {
    starterCode:
      'function crudAlumnos(alumnos, metodo, id, nombreNuevo) {\n  if (metodo === "GET") {\n    // Sin id -> "Lista: <N> alumno(s)"\n    // Con id -> "Alumno <id>: <nombre>" o "404: no existe el alumno <id>"\n  }\n\n  if (metodo === "POST") {\n    // Agrega { id: alumnos.length + 1, nombre: nombreNuevo }\n    // y retorna "Alumno creado: <nombre> (id <nuevoId>)"\n  }\n\n  if (metodo === "PUT") {\n    // Actualiza por id o retorna "404: no existe el alumno <id>"\n  }\n\n  if (metodo === "DELETE") {\n    // Elimina por id o retorna "404: no existe el alumno <id>"\n  }\n\n  return "";\n}\n\nconst alumnos = [\n  { id: 1, nombre: "Valeria" },\n  { id: 2, nombre: "Sofía" },\n];\n\nconsole.log(crudAlumnos(alumnos, "GET", null, null));\nconsole.log(crudAlumnos(alumnos, "GET", 1, null));\nconsole.log(crudAlumnos(alumnos, "GET", 9, null));\nconsole.log(crudAlumnos(alumnos, "POST", null, "Marco"));\nconsole.log(crudAlumnos(alumnos, "PUT", 1, "Valeria Ruiz"));\nconsole.log(crudAlumnos(alumnos, "PUT", 99, "Nadie"));\nconsole.log(crudAlumnos(alumnos, "DELETE", 2, null));\nconsole.log(crudAlumnos(alumnos, "DELETE", 98, null));',
    checks: [
      { id: 'check-lista', type: 'stdoutIncludes', label: 'Lista inicial', value: 'Lista: 2 alumno(s)', failureMessage: 'GET sin id debe contar los dos alumnos iniciales.' },
      { id: 'check-uno', type: 'stdoutIncludes', label: 'GET existente', value: 'Alumno 1: Valeria', failureMessage: 'GET con id 1 debe encontrar a Valeria.' },
      { id: 'check-get-404', type: 'stdoutIncludes', label: 'GET inexistente', value: '404: no existe el alumno 9', failureMessage: 'GET con id 9 debe responder 404.' },
      { id: 'check-creado', type: 'stdoutIncludes', label: 'POST', value: 'Alumno creado: Marco (id 3)', failureMessage: 'POST debe crear a Marco con id 3.' },
      { id: 'check-actualizado', type: 'stdoutIncludes', label: 'PUT existente', value: 'Alumno 1 actualizado: Valeria Ruiz', failureMessage: 'PUT debe actualizar al alumno 1.' },
      { id: 'check-put-404', type: 'stdoutIncludes', label: 'PUT inexistente', value: '404: no existe el alumno 99', failureMessage: 'PUT debe validar también ids inexistentes.' },
      { id: 'check-eliminado', type: 'stdoutIncludes', label: 'DELETE existente', value: 'Alumno 2 eliminado', failureMessage: 'DELETE debe eliminar al alumno 2.' },
      { id: 'check-delete-404', type: 'stdoutIncludes', label: 'DELETE inexistente', value: '404: no existe el alumno 98', failureMessage: 'DELETE debe validar también ids inexistentes.' },
    ],
    expectedEvidenceMarkdown:
      'La consola debe cubrir lista, GET existente e inexistente, POST, PUT existente e inexistente, y DELETE existente e inexistente.',
  },

  'lesson-v2-db-sql-basico': {
    starterCode:
      'function ejecutarSQL(tipo, tabla, condicion) {\n  // tipo "select-todo"    -> `SELECT * FROM <tabla>`\n  // tipo "select-filtro"  -> `SELECT * FROM <tabla> WHERE <condicion>`\n  // tipo "insert"         -> `INSERT INTO <tabla> VALUES (<condicion>)`\n  return "";\n}\n\nconsole.log(ejecutarSQL("select-todo", "alumnos", null));\nconsole.log(ejecutarSQL("select-filtro", "alumnos", "promedio >= 8"));\nconsole.log(ejecutarSQL("insert", "alumnos", "\'Marco\', 9.2"));',
    checks: [
      {
        id: 'check-salida-sql-completa',
        type: 'stdoutEquals',
        label: 'Tres consultas SQL completas y en orden',
        value: "SELECT * FROM alumnos\nSELECT * FROM alumnos WHERE promedio >= 8\nINSERT INTO alumnos VALUES ('Marco', 9.2)",
        failureMessage: 'La salida debe incluir las tres consultas completas, en líneas separadas y en el orden indicado.',
      },
    ],
    expectedEvidenceMarkdown:
      'La consola debe contener exactamente tres líneas: SELECT sin filtro, SELECT con WHERE e INSERT.',
  },

  'lesson-v2-db-supabase-rls': {
    starterCode:
      'function leerConRLS(filas, usuarioId, rlsActivo) {\n  // Sin RLS devuelve todas las filas.\n  // Con RLS devuelve solo fila.alumno_id === usuarioId.\n  return [];\n}\n\nconst calificaciones = [\n  { alumno_id: 1, materia: "Mate", nota: 9.5 },\n  { alumno_id: 2, materia: "Historia", nota: 8 },\n  { alumno_id: 1, materia: "Ciencias", nota: 10 },\n];\n\nconst describir = (filas) => filas.map((fila) => `${fila.alumno_id}:${fila.materia}`).join("|");\nconsole.log("Sin RLS:", describir(leerConRLS(calificaciones, 1, false)));\nconsole.log("Usuario 1:", describir(leerConRLS(calificaciones, 1, true)));\nconsole.log("Usuario 2:", describir(leerConRLS(calificaciones, 2, true)));',
    checks: [
      {
        id: 'check-identidades-rls',
        type: 'stdoutEquals',
        label: 'RLS conserva las filas correctas para cada usuario',
        value: 'Sin RLS: 1:Mate|2:Historia|1:Ciencias\nUsuario 1: 1:Mate|1:Ciencias\nUsuario 2: 2:Historia',
        failureMessage: 'No basta devolver la cantidad correcta: deben sobrevivir las filas que pertenecen al usuario solicitado.',
      },
    ],
    expectedEvidenceMarkdown:
      'Sin RLS aparecen las tres filas; con RLS el usuario 1 ve Mate y Ciencias, y el usuario 2 solo Historia.',
  },

  'lesson-v2-ia-prompts': {
    starterCode:
      'function construirPrompt(rol, contexto, tarea, restriccion) {\n  // Retorna cuatro líneas: Rol, Contexto, Tarea y Restriccion.\n  return "";\n}\n\nconsole.log(construirPrompt("analista escolar", "grupo 3A", "resumir asistencia", "no inventar datos"));',
    checks: [
      { id: 'check-rol', type: 'stdoutIncludes', label: 'Rol explícito', value: 'Rol: analista escolar', failureMessage: 'El prompt debe declarar el rol.' },
      { id: 'check-contexto', type: 'stdoutIncludes', label: 'Contexto explícito', value: 'Contexto: grupo 3A', failureMessage: 'El prompt debe declarar el contexto.' },
      { id: 'check-tarea', type: 'stdoutIncludes', label: 'Tarea explícita', value: 'Tarea: resumir asistencia', failureMessage: 'El prompt debe incluir la tarea concreta, no solo rol, contexto y restricción.' },
      { id: 'check-restriccion', type: 'stdoutIncludes', label: 'Restricción explícita', value: 'Restriccion: no inventar datos', failureMessage: 'El prompt debe incluir la restricción de no inventar datos.' },
    ],
    expectedEvidenceMarkdown: 'La consola debe mostrar las cuatro secciones: Rol, Contexto, Tarea y Restriccion.',
  },

  'lesson-v2-ia-rag': {
    starterCode:
      'function recuperarContexto(documentos, palabraClave) {\n  // Devuelve los textos que incluyan palabraClave sin distinguir mayúsculas.\n  return [];\n}\n\nconst documentos = ["Reglamento: asistencia mínima 80%.", "Guía: las calificaciones van de 0 a 10.", "Aviso: reunión docente el viernes."];\nconsole.log("minúsculas:", recuperarContexto(documentos, "asistencia").join(" | "));\nconsole.log("mayúsculas:", recuperarContexto(documentos, "ASISTENCIA").join(" | "));',
    checks: [
      { id: 'check-minusculas', type: 'stdoutIncludes', label: 'Recuperación con minúsculas', value: 'minúsculas: Reglamento: asistencia mínima 80%.', failureMessage: 'Debe recuperar el reglamento con la palabra en minúsculas.' },
      { id: 'check-mayusculas', type: 'stdoutIncludes', label: 'Recuperación sin distinguir mayúsculas', value: 'mayúsculas: Reglamento: asistencia mínima 80%.', failureMessage: 'La búsqueda debe funcionar también con la palabra clave en mayúsculas.' },
    ],
    expectedEvidenceMarkdown:
      'Las búsquedas con "asistencia" y "ASISTENCIA" deben recuperar exactamente el mismo fragmento autorizado.',
  },

  'lesson-v2-ia-api-segura': {
    starterCode:
      'function normalizarRespuestaMentor(respuesta) {\n  // Solo acepta estado "ok" y sugerencia string cuyo trim no esté vacío.\n  // En cualquier otro caso retorna "Error controlado: respuesta no válida".\n  return "";\n}\n\nconsole.log("Válida:", normalizarRespuestaMentor({ estado: "ok", sugerencia: "Prueba el caso límite de 6." }));\nconsole.log("Vacía:", normalizarRespuestaMentor({ estado: "ok", sugerencia: "" }));\nconsole.log("Estado error:", normalizarRespuestaMentor({ estado: "error", sugerencia: "Texto engañoso" }));\nconsole.log("Solo espacios:", normalizarRespuestaMentor({ estado: "ok", sugerencia: "   " }));\nconsole.log("Tipo inválido:", normalizarRespuestaMentor({ estado: "ok", sugerencia: 123 }));',
    checks: [
      { id: 'check-valida', type: 'stdoutIncludes', label: 'Respuesta válida', value: 'Válida: Sugerencia: Prueba el caso límite de 6.', failureMessage: 'La respuesta válida debe normalizarse como sugerencia.' },
      { id: 'check-vacia', type: 'stdoutIncludes', label: 'Sugerencia vacía rechazada', value: 'Vacía: Error controlado: respuesta no válida', failureMessage: 'Una sugerencia vacía debe rechazarse.' },
      { id: 'check-estado-error', type: 'stdoutIncludes', label: 'Estado error rechazado', value: 'Estado error: Error controlado: respuesta no válida', failureMessage: 'Una respuesta con estado error debe rechazarse aunque incluya texto.' },
      { id: 'check-espacios', type: 'stdoutIncludes', label: 'Solo espacios rechazados', value: 'Solo espacios: Error controlado: respuesta no válida', failureMessage: 'Una sugerencia con solo espacios debe rechazarse usando trim().' },
      { id: 'check-tipo', type: 'stdoutIncludes', label: 'Tipo no string rechazado', value: 'Tipo inválido: Error controlado: respuesta no válida', failureMessage: 'Una sugerencia que no sea string debe rechazarse sin lanzar una excepción.' },
    ],
    expectedEvidenceMarkdown:
      'La consola debe aceptar un único caso válido y rechazar por separado vacío, estado error, espacios y tipo no string.',
  },
};

/**
 * Aplica correcciones de revisión sin mutar el currículo base.
 * La capa de normalización consume el resultado, de modo que la UI y el
 * evaluador reciben los retos endurecidos mientras el contenido monolítico se
 * migra gradualmente a archivos por módulo.
 */
export function applyLessonReviewFixes(lesson: LessonV2): LessonV2 {
  const patch = CHALLENGE_PATCHES[lesson.id];
  if (!patch) return lesson;

  return {
    ...lesson,
    challenge: {
      ...lesson.challenge,
      ...patch,
    },
  };
}
