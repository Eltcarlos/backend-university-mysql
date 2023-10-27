const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todos los profesores
router.get('/profesores', async (req, res) => {
  try {
    const [profesores] = await db.promise().query('SELECT * FROM profesores');
    res.redirect('/html/programas', {profesores});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
});

// Crear un nuevo profesor
router.post('/profesores', async (req, res) => {
  const { nom_profesor, ape_profesor, titulo, genero_profesor, area } = req.body;
  try {
    await db.promise().query('INSERT INTO profesores (nom_profesor, ape_profesor, titulo, genero_profesor, area) VALUES (?, ?, ?, ?, ?)', [nom_profesor, ape_profesor, titulo, genero_profesor, area]);
    res.redirect('/html/profesores',);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear profesor' });
  }
});

// Actualizar un profesor por ID
router.put('/profesores/:id', async (req, res) => {
  const profesorId = req.params.id;
  const { nom_profesor, ape_profesor, titulo, genero_profesor, area } = req.body;
  try {
    await db.promise().query('UPDATE profesores SET nom_profesor=?, ape_profesor=?, titulo=?, genero_profesor=?, area=? WHERE id_profesor=?', [nom_profesor, ape_profesor, titulo, genero_profesor, area, profesorId]);
    res.redirect('/html/profesores',);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar profesor' });
  }
});

// Eliminar un profesor por ID
router.delete('/profesores/:id', async (req, res) => {
  const profesorId = req.params.id;
  try {
    await db.promise().query('DELETE FROM profesores WHERE id_profesor = ?', [profesorId]);
    res.redirect('/html/profesores',);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar profesor' });
  }
});

module.exports = router;
