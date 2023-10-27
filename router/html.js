const { Router } = require("express");
const db = require('../database/config');

const router = Router();


// En tu controlador
router.get('/estudiantes', async (req, res) => {
    try {
      const [estudiantes] = await db.promise().query('SELECT * FROM estudiantes');
      res.render('getUser', { estudiantes }); // Pasar la variable estudiantes a la vista
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
  });
 
  
  router.get('/edit/estudiante/:id', async (req, res) => {
    const estudianteId = req.params.id;
    try {
      const [estudiantes] = await db
        .promise()
        .query('SELECT * FROM estudiantes WHERE id_estudiante = ?', [estudianteId]);
  
      if (estudiantes.length === 0) {
        // Manejar el caso en el que no se encontró un estudiante con ese ID.
        res.status(404).json({ error: 'Estudiante no encontrado' });
        return;
      }
  
      // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
      const estudiante = estudiantes[0];
  
      res.render('editUser', { estudiante }); // Pasar el objeto del estudiante a la vista
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
  });

// En tu controlador
router.get('/aulas', async (req, res) => {
  try {
    const [aulas] = await db.promise().query('SELECT * FROM aulas');
    res.render('getAulas', { aulas }); // Pasar la variable aulas a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener aulas' });
  }
});

router.get('/edit/aula/:id', async (req, res) => {
  const aulaId = req.params.id;
  try {
    const [aulas] = await db
      .promise()
      .query('SELECT * FROM aulas WHERE id_aula = ?', [aulaId]);

    if (aulas.length === 0) {
      // Manejar el caso en el que no se encontró un aula con ese ID.
      res.status(404).json({ error: 'Aula no encontrada' });
      return;
    }

    // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
    const aula = aulas[0];

    res.render('editAulas', { aula }); // Pasar el objeto del aula a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener aulas' });
  }
});

// En tu controlador
router.get('/programas', async (req, res) => {
  try {
    const [programas] = await db.promise().query('SELECT * FROM programas');
    res.render('getPrograma', { programas }); // Pasar la variable programas a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener programas' });
  }
});

router.get('/edit/programa/:id', async (req, res) => {
  const programaId = req.params.id;
  try {
    const [programas] = await db
      .promise()
      .query('SELECT * FROM programas WHERE id_programa = ?', [programaId]);

    if (programas.length === 0) {
      // Manejar el caso en el que no se encontró un programa con ese ID.
      res.status(404).json({ error: 'Programa no encontrado' });
      return;
    }

    // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
    const programa = programas[0];

    res.render('editPrograma', { programa }); // Pasar el objeto del programa a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener programas' });
  }
});


// Ruta para mostrar la lista de profesores
router.get('/profesores', async (req, res) => {
  try {
    const [profesores] = await db.promise().query('SELECT * FROM profesores');
    res.render('getProfesor', { profesores }); // Pasar la variable profesores a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});

// Ruta para editar un profesor
router.get('/edit/profesor/:id', async (req, res) => {
  const profesorId = req.params.id;
  try {
    const [profesores] = await db
      .promise()
      .query('SELECT * FROM profesores WHERE id_profesor = ?', [profesorId]);

    if (profesores.length === 0) {
      // Manejar el caso en el que no se encontró un profesor con ese ID.
      res.status(404).json({ error: 'Profesor no encontrado' });
      return;
    }

    // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
    const profesor = profesores[0];

    res.render('editProfesor', { profesor }); // Pasar el objeto del profesor a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});


// Ruta para mostrar la lista de Asignaturas
router.get('/asignaturas', async (req, res) => {
  try {
    // Obtener la lista de asignaturas
    const [asignaturas] = await db.promise().query('SELECT * FROM asignaturas');

    // Obtener la lista de programas
    const [programas] = await db.promise().query('SELECT id_programa, programa FROM programas');

    // Obtener la lista de profesores
    const [profesores] = await db.promise().query('SELECT id_profesor, CONCAT(nom_profesor, " ", ape_profesor) AS nombre_profesor FROM profesores');

    res.render('getAsignatura', { asignaturas, programas, profesores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener asignaturas' });
  }
});


router.get('/edit/asignatura/:id', async (req, res) => {
  const profesorId = req.params.id;
  try {
    // Obtener la lista de asignaturas
    const [asignaturas] = await db.promise().query('SELECT * FROM asignaturas');

    // Obtener la lista de programas
    const [programas] = await db.promise().query('SELECT id_programa, programa FROM programas');

    // Obtener la lista de profesores
    const [profesores] = await db.promise().query('SELECT id_profesor, CONCAT(nom_profesor, " ", ape_profesor) AS nombre_profesor FROM profesores');

    if (asignaturas.length === 0) {
      // Manejar el caso en el que no se encontró un profesor con ese ID.
      res.status(404).json({ error: 'asignaturas no encontrado' });
      return;
    }

    // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
    const asignatura = asignaturas[0];

    res.render('editAsignatura', { asignatura, programas, profesores }); // Pasar el objeto del profesor a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Asignaturas' });
  }
});


// Ruta para mostrar la lista de grupos
router.get('/grupos', async (req, res) => {
  try {
    // Obtener la lista de grupos

    // Obtener la lista de programas
  const [asignaturas] = await db.promise().query('SELECT id_asignatura, nom_asignatura FROM asignaturas');


    const [grupos] = await db.promise().query('SELECT * FROM grupos');
    // Obtener la lista de profesores
    const [profesores] = await db.promise().query('SELECT id_profesor, CONCAT(nom_profesor, " ", ape_profesor) AS nombre_profesor FROM profesores');

    res.render('getGrupo', { grupos, profesores, asignaturas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener grupos' });
  }
});

router.get('/edit/grupo/:id', async (req, res) => {
  const grupoId = req.params.id;
  try {
    // Obtener la lista de grupos
    const [grupos] = await db.promise().query('SELECT * FROM grupos WHERE id_grupo = ?', [grupoId]);

    // Obtener la lista de asignaturas
    const [asignaturas] = await db.promise().query('SELECT id_asignatura, nom_asignatura FROM asignaturas');

    // Obtener la lista de profesores
    const [profesores] = await db.promise().query('SELECT id_profesor, CONCAT(nom_profesor, " ", ape_profesor) AS nombre_profesor FROM profesores');

    if (grupos.length === 0) {
      // Manejar el caso en el que no se encontró un grupo con ese ID.
      res.status(404).json({ error: 'Grupo no encontrado' });
      return;
    }

    // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
    const grupo = grupos[0];

    res.render('editGrupo', { grupo, asignaturas, profesores }); // Pasar el objeto del grupo a la vista
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Grupo' });
  }
});

// Ruta para mostrar la lista de horarios
router.get('/horarios', async (req, res) => {
  try {
    // Obtener la lista de horarios
    const [horarios] = await db.promise().query('SELECT * FROM horarios');

    // Obtener la lista de asignaturas
    const [asignaturas] = await db.promise().query('SELECT id_asignatura, nom_asignatura FROM asignaturas');

    // Obtener la lista de aulas
    const [aulas] = await db.promise().query('SELECT id_aula, nom_aula FROM aulas');

    res.render('getHorario', { horarios, asignaturas, aulas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
});

// Ruta para mostrar el formulario de edición de horario
router.get('/edit/horario/:id', async (req, res) => {
  const horarioId = req.params.id;
  try {
    // Obtener el horario por su ID
    const [horarios] = await db.promise().query('SELECT * FROM horarios WHERE id_horario = ?', [horarioId]);

    // Obtener la lista de asignaturas
    const [asignaturas] = await db.promise().query('SELECT id_asignatura, nom_asignatura FROM asignaturas');

    // Obtener la lista de aulas
    const [aulas] = await db.promise().query('SELECT id_aula, nom_aula FROM aulas');

    if (horarios.length === 0) {
      // Manejar el caso en el que no se encontró un horario con ese ID.
      res.status(404).json({ error: 'Horario no encontrado' });
      return;
    }

    // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
    const horario = horarios[0];

    res.render('editHorario', { horario, asignaturas, aulas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Horario' });
  }
});

// Ruta para mostrar la lista de matrículas
router.get('/matriculas', async (req, res) => {
  try {
    // Obtener la lista de matrículas
    const [matriculas] = await db.promise().query('SELECT * FROM matriculas');

    // Obtener la lista de estudiantes
    const [estudiantes] = await db.promise().query('SELECT id_estudiante, nom_estudiante FROM estudiantes');

    // Obtener la lista de asignaturas
    const [asignaturas] = await db.promise().query('SELECT id_asignatura, nom_asignatura FROM asignaturas');

    res.render('getMatricula', { matriculas, estudiantes, asignaturas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener matrículas' });
  }
});

// Ruta para mostrar el formulario de edición de matrícula
router.get('/edit/matricula/:id', async (req, res) => {
  const matriculaId = req.params.id;
  try {
    // Obtener la matrícula por su ID
    const [matriculas] = await db.promise().query('SELECT * FROM matriculas WHERE id_matricula = ?', [matriculaId]);

    // Obtener la lista de estudiantes
    const [estudiantes] = await db.promise().query('SELECT id_estudiante, nom_estudiante FROM estudiantes');

    // Obtener la lista de asignaturas
    const [asignaturas] = await db.promise().query('SELECT id_asignatura, nom_asignatura FROM asignaturas');

    if (matriculas.length === 0) {
      // Manejar el caso en el que no se encontró una matrícula con ese ID.
      res.status(404).json({ error: 'Matrícula no encontrada' });
      return;
    }

    // La consulta devuelve un arreglo, por lo que tomamos el primer elemento (debería ser único)
    const matricula = matriculas[0];

    res.render('editMatricula', { matricula, estudiantes, asignaturas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener Matrícula' });
  }
});


router.get('/panel', async (req, res) => {
  try {
    // Realizar la consulta SQL para obtener la información
    const [result] = await db.promise().query(
      `SELECT
        e.*,
        m.id_matricula,
        a.*,
        h.*,
        au.*,
        p.*,
        g.*
      FROM estudiantes e
      INNER JOIN matriculas m ON e.id_estudiante = m.id_estudiante
      INNER JOIN asignaturas a ON m.id_asignatura = a.id_asignatura
      INNER JOIN horarios h ON a.id_asignatura = h.id_asignatura
      INNER JOIN aulas au ON h.id_aula = au.id_aula
      INNER JOIN programas p ON a.id_programa = p.id_programa
      INNER JOIN grupos g ON a.id_asignatura = g.id_asignatura
      INNER JOIN profesores pr ON a.id_profesor = pr.id_profesor;`
    );

    // Renderizar la vista y pasar los resultados a la plantilla
    res.render('getTableAdmin', { data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la información' });
  }
});


module.exports = router