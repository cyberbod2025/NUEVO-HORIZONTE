import { describe, expect, it } from 'vitest';
import { LESSONS_V2 } from '../data/lessonsV2';
import type { NormalizedLesson } from '../types/lesson';
import { normalizeLesson } from './lessonAdapter';
import { allChecksPassed } from './sandboxChecks';

function reviewedLesson(id: string): NormalizedLesson {
  const lesson = LESSONS_V2.find((candidate) => candidate.id === id);
  if (!lesson) throw new Error(`Lección no encontrada: ${id}`);
  return normalizeLesson(lesson);
}

describe('correcciones de revisión Codex — evaluadores de módulos 6, 7 y 9', () => {
  it('exige un 404 independiente para DELETE, no reutiliza el 404 de GET', () => {
    const lesson = reviewedLesson('lesson-v2-backend-http-metodos');
    const incompleta = [
      'GET 200 OK: recurso encontrado',
      'GET 404 Not Found: recurso no existe',
      'POST 201 Created: recurso creado',
      'PUT 200 OK: recurso actualizado',
      'PUT 404 Not Found: recurso no existe',
      'DELETE 200 OK: recurso eliminado',
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, incompleta)).toBe(false);
  });

  it('ejercita PUT tanto con recurso existente como inexistente', () => {
    const lesson = reviewedLesson('lesson-v2-backend-http-metodos');
    expect(lesson.challenge.starterCode).toContain('simularPeticion("PUT", true)');
    expect(lesson.challenge.starterCode).toContain('simularPeticion("PUT", false)');

    const sinPut = [
      'GET 200 OK: recurso encontrado',
      'GET 404 Not Found: recurso no existe',
      'POST 201 Created: recurso creado',
      'DELETE 200 OK: recurso eliminado',
      'DELETE 404 Not Found: recurso no existe',
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, sinPut)).toBe(false);
  });

  it('CRUD exige los 404 de PUT y DELETE, no solo el de GET', () => {
    const lesson = reviewedLesson('lesson-v2-backend-api-crud');
    expect(lesson.challenge.starterCode).toContain('crudAlumnos(alumnos, "PUT", 99');
    expect(lesson.challenge.starterCode).toContain('crudAlumnos(alumnos, "DELETE", 98');

    const soloCasosOriginales = [
      'Lista: 2 alumno(s)',
      'Alumno 1: Valeria',
      '404: no existe el alumno 9',
      'Alumno creado: Marco (id 3)',
      'Alumno 1 actualizado: Valeria Ruiz',
      'Alumno 2 eliminado',
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, soloCasosOriginales)).toBe(false);
  });

  it('SQL no acepta el SELECT filtrado como sustituto del SELECT sin filtro', () => {
    const lesson = reviewedLesson('lesson-v2-db-sql-basico');
    const sinSelectTodo = [
      'SELECT * FROM alumnos WHERE promedio >= 8',
      "INSERT INTO alumnos VALUES ('Marco', 9.2)",
    ].join('\n');
    const completa = [
      'SELECT * FROM alumnos',
      'SELECT * FROM alumnos WHERE promedio >= 8',
      "INSERT INTO alumnos VALUES ('Marco', 9.2)",
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, sinSelectTodo)).toBe(false);
    expect(allChecksPassed(lesson.challenge.checks, completa)).toBe(true);
  });

  it('RLS comprueba las identidades de las filas, no únicamente su cantidad', () => {
    const lesson = reviewedLesson('lesson-v2-db-supabase-rls');
    const soloCantidades = 'Sin RLS: 3\nCon RLS: 2';
    const identidadesCorrectas = [
      'Sin RLS: 1:Mate|2:Historia|1:Ciencias',
      'Usuario 1: 1:Mate|1:Ciencias',
      'Usuario 2: 2:Historia',
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, soloCantidades)).toBe(false);
    expect(allChecksPassed(lesson.challenge.checks, identidadesCorrectas)).toBe(true);
  });

  it('el prompt estructurado no se completa si falta la Tarea', () => {
    const lesson = reviewedLesson('lesson-v2-ia-prompts');
    const sinTarea = [
      'Rol: analista escolar',
      'Contexto: grupo 3A',
      'Restriccion: no inventar datos',
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, sinTarea)).toBe(false);
    expect(lesson.challenge.checks.some((check) => check.value === 'Tarea: resumir asistencia')).toBe(true);
  });

  it('RAG exige que la recuperación ignore mayúsculas y minúsculas', () => {
    const lesson = reviewedLesson('lesson-v2-ia-rag');
    const soloMinusculas = 'minúsculas: Reglamento: asistencia mínima 80%.';
    const ambosCasos = [
      'minúsculas: Reglamento: asistencia mínima 80%.',
      'mayúsculas: Reglamento: asistencia mínima 80%.',
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, soloMinusculas)).toBe(false);
    expect(allChecksPassed(lesson.challenge.checks, ambosCasos)).toBe(true);
  });

  it('la respuesta del mentor rechaza estado error, espacios y tipos no string por separado', () => {
    const lesson = reviewedLesson('lesson-v2-ia-api-segura');
    const validacionInsuficiente = [
      'Válida: Sugerencia: Prueba el caso límite de 6.',
      'Vacía: Error controlado: respuesta no válida',
    ].join('\n');
    const validacionCompleta = [
      'Válida: Sugerencia: Prueba el caso límite de 6.',
      'Vacía: Error controlado: respuesta no válida',
      'Estado error: Error controlado: respuesta no válida',
      'Solo espacios: Error controlado: respuesta no válida',
      'Tipo inválido: Error controlado: respuesta no válida',
    ].join('\n');

    expect(allChecksPassed(lesson.challenge.checks, validacionInsuficiente)).toBe(false);
    expect(allChecksPassed(lesson.challenge.checks, validacionCompleta)).toBe(true);
  });
});
