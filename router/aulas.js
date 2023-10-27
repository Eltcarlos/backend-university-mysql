const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todas las aulas
router.get('/aulas', async (req, res) => {
  try {
    const [aulas] = await db.promise().query('SELECT * FROM aulas');
    res.redirect('/html/aulas', {aulas}); // Redirigir de vuelta a la lista de estudiantes
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener aulas' });
  }
});

// Crear una nueva aula
router.post('/aulas', async (req, res) => {
  const { nom_aula, ubicacion, capacidad, tipo } = req.body;
  try {
    await db.promise().query('INSERT INTO aulas (nom_aula, ubicacion, capacidad, tipo) VALUES (?, ?, ?, ?)', [nom_aula, ubicacion, capacidad, tipo]);
    res.redirect("/html/aulas")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear aula' });
  }
});

// Actualizar un aula por ID
router.put('/aulas/:id', async (req, res) => {
  const aulaId = req.params.id;
  const { nom_aula, ubicacion, capacidad, tipo } = req.body;
  try {
    await db.promise().query('UPDATE aulas SET nom_aula=?, ubicacion=?, capacidad=?, tipo=? WHERE id_aula=?', [nom_aula, ubicacion, capacidad, tipo, aulaId]);
    res.redirect("/html/aulas")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar aula' });
  }
});

// Eliminar un aula por ID
router.delete('/aulas/:id', async (req, res) => {
  const aulaId = req.params.id;
  try {
    await db.promise().query('DELETE FROM aulas WHERE id_aula = ?', [aulaId]);
    res.redirect("/html/aulas")
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar aula' });
  }
});

module.exports = router;
