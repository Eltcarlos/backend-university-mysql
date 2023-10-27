const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todas las asignaturas
router.get('/asignaturas', async (req, res) => {
  try {
    const [asignaturas] = await db.promise().query('SELECT * FROM asignaturas');
    res.redirect('/html/asignaturas', {asignaturas});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener asignaturas' });
  }
});

// Crear una nueva asignatura
router.post('/asignaturas', async (req, res) => {
  const { id_profesor, id_programa, nom_asignatura, creditos } = req.body;
  try {
    await db.promise().query('INSERT INTO asignaturas (id_profesor, id_programa, nom_asignatura, creditos) VALUES (?, ?, ?, ?)', [id_profesor, id_programa, nom_asignatura, creditos]);
    res.redirect('/html/asignaturas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear asignatura' });
  }
});

// Actualizar una asignatura por ID
router.put('/asignaturas/:id', async (req, res) => {
  const asignaturaId = req.params.id;
  const { id_profesor, id_programa, nom_asignatura, creditos } = req.body;
  try {
    await db.promise().query('UPDATE asignaturas SET id_profesor=?, id_programa=?, nom_asignatura=?, creditos=? WHERE id_asignatura=?', [id_profesor, id_programa, nom_asignatura, creditos, asignaturaId]);
    res.redirect('/html/asignaturas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar asignatura' });
  }
});

// Eliminar una asignatura por ID
router.delete('/asignaturas/:id', async (req, res) => {
  const asignaturaId = req.params.id;
  try {
    await db.promise().query('DELETE FROM asignaturas WHERE id_asignatura = ?', [asignaturaId]);
    res.redirect('/html/asignaturas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar asignatura' });
  }
});

module.exports = router;
