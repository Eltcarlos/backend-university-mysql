const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todas las matriculas
router.get('/matriculas', async (req, res) => {
  try {
    const [matriculas] = await db.promise().query('SELECT * FROM matriculas');
    res.redirect('/html/matriculas', { matriculas});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener matriculas' });
  }
});

// Crear una nueva matrícula
router.post('/matriculas', async (req, res) => {
  const { id_estudiante, id_asignatura } = req.body;
  try {
    await db.promise().query('INSERT INTO matriculas (id_estudiante, id_asignatura) VALUES (?, ?)', [id_estudiante, id_asignatura]);
    res.redirect('/html/matriculas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear matrícula' });
  }
});

// Actualizar una matrícula por ID
router.put('/matriculas/:id', async (req, res) => {
  const matriculaId = req.params.id;
  const { id_estudiante, id_asignatura } = req.body;
  try {
    await db.promise().query('UPDATE matriculas SET id_estudiante=?, id_asignatura=? WHERE id_matricula=?', [id_estudiante, id_asignatura, matriculaId]);
    res.redirect('/html/matriculas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar matrícula' });
  }
});

// Eliminar una matrícula por ID
router.delete('/matriculas/:id', async (req, res) => {
  const matriculaId = req.params.id;
  try {
    await db.promise().query('DELETE FROM matriculas WHERE id_matricula = ?', [matriculaId]);
    res.redirect('/html/matriculas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar matrícula' });
  }
});

module.exports = router;
