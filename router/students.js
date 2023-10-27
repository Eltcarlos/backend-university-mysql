const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todos los estudiantes
router.get('/estudiantes', async (req, res) => {
  try {
    const [estudiantes] = await db.promise().query('SELECT * FROM estudiantes');
    res.render('/html/estudiantes', { estudiantes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

// Crear un nuevo estudiante
router.post('/estudiantes', async (req, res) => {
  const { nom_estudiante, ape_estudiante, estrato, genero_estudiante, ciudad_nac, fecha_nac, direccion } = req.body;
  try {
    await db.promise().query('INSERT INTO estudiantes (nom_estudiante, ape_estudiante, estrato, genero_estudiante, ciudad_nac, fecha_nac, direccion) VALUES (?, ?, ?, ?, ?, ?, ?)', [nom_estudiante, ape_estudiante, estrato, genero_estudiante, ciudad_nac, fecha_nac, direccion]);
    res.redirect('/html/estudiantes'); // Redirigir de vuelta a la lista de estudiantes
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
});

// Editar un estudiante
router.put('/estudiantes/:id', async (req, res) => {
  const estudianteId = req.params.id;
  console.log(estudianteId)
  const { nom_estudiante, ape_estudiante, estrato, genero_estudiante, ciudad_nac, fecha_nac, direccion } = req.body;
  try {
    await db.promise().query('UPDATE estudiantes SET nom_estudiante=?, ape_estudiante=?, estrato=?, genero_estudiante=?, ciudad_nac=?, fecha_nac=?, direccion=? WHERE id_estudiante=?', [nom_estudiante, ape_estudiante, estrato, genero_estudiante, ciudad_nac, fecha_nac, direccion, estudianteId]);
    res.redirect('/html/estudiantes'); // Redirigir de vuelta a la lista de estudiantes
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
});

// Borrar un estudiante
router.delete('/estudiantes/:id', async (req, res) => {
  const estudianteId = req.params.id;
  try {
    await db.promise().query('DELETE FROM estudiantes WHERE id_estudiante = ?', [estudianteId]);
    const [estudiantes] = await db.promise().query('SELECT * FROM estudiantes');
    res.redirect('/html/estudiantes', ); // Redirigir de vuelta a la lista de estudiantes
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
});

module.exports = router;
