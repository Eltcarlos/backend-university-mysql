const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todos los grupos
router.get('/grupos', async (req, res) => {
  try {
    const [grupos] = await db.promise().query('SELECT * FROM grupos');
    res.redirect('/html/grupos', {grupos});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener grupos' });
  }
});

// Crear un nuevo grupo
router.post('/grupos', async (req, res) => {
  const { id_profesor, id_asignatura, grupo, num_estudiantes } = req.body;
  try {
    await db.promise().query('INSERT INTO grupos (id_profesor, id_asignatura, grupo, num_estudiantes) VALUES (?, ?, ?, ?)', [id_profesor, id_asignatura, grupo, num_estudiantes]);
    res.redirect('/html/grupos');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear grupo' });
  }
});

// Actualizar un grupo por ID
router.put('/grupos/:id', async (req, res) => {
  const grupoId = req.params.id;
  const { id_profesor, id_asignatura, grupo, num_estudiantes } = req.body;
  try {
    await db.promise().query('UPDATE grupos SET id_profesor=?, id_asignatura=?, grupo=?, num_estudiantes=? WHERE id_grupo=?', [id_profesor, id_asignatura, grupo, num_estudiantes, grupoId]);
    res.redirect('/html/grupos');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar grupo' });
  }
});

// Eliminar un grupo por ID
router.delete('/grupos/:id', async (req, res) => {
  const grupoId = req.params.id;
  try {
    await db.promise().query('DELETE FROM grupos WHERE id_grupo = ?', [grupoId]);
    res.redirect('/html/grupos');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar grupo' });
  }
});

module.exports = router;
