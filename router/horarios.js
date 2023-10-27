const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todos los horarios
router.get('/horarios', async (req, res) => {
  try {
    const [horarios] = await db.promise().query('SELECT * FROM horarios');
    res.redirect('/html/horarios', {horarios});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
});

// Crear un nuevo horario
router.post('/horarios', async (req, res) => {
  const { id_asignatura, id_aula, dia, hora_inicio, hora_fin } = req.body;
  try {
    await db.promise().query('INSERT INTO horarios (id_asignatura, id_aula, dia, hora_inicio, hora_fin) VALUES (?, ?, ?, ?, ?)', [id_asignatura, id_aula, dia, hora_inicio, hora_fin]);
    res.redirect('/html/horarios',);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear horario' });
  }
});

// Actualizar un horario por ID
router.put('/horarios/:id', async (req, res) => {
  const horarioId = req.params.id;
  const { id_asignatura, id_aula, dia, hora_inicio, hora_fin } = req.body;
  try {
    await db.promise().query('UPDATE horarios SET id_asignatura=?, id_aula=?, dia=?, hora_inicio=?, hora_fin=? WHERE id_horario=?', [id_asignatura, id_aula, dia, hora_inicio, hora_fin, horarioId]);
    res.redirect('/html/horarios',);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar horario' });
  }
});

// Eliminar un horario por ID
router.delete('/horarios/:id', async (req, res) => {
  const horarioId = req.params.id;
  try {
    await db.promise().query('DELETE FROM horarios WHERE id_horario = ?', [horarioId]);
    res.redirect('/html/horarios',);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar horario' });
  }
});

module.exports = router;
