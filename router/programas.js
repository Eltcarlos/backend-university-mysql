const { Router } = require("express");
const db = require('../database/config');

const router = Router();

// Obtener todos los programas
router.get('/programas', async (req, res) => {
  try {
    const [programas] = await db.promise().query('SELECT * FROM programas');
    res.redirect('/html/programas', {programas});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener programas' });
  }
});

// Crear un nuevo programa
router.post('/programas', async (req, res) => {
  const { programa, facultad } = req.body;
  try {
    await db.promise().query('INSERT INTO programas (programa, facultad) VALUES (?, ?)', [programa, facultad]);
    res.redirect('/html/programas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear programa' });
  }
});

// Actualizar un programa por ID
router.put('/programas/:id', async (req, res) => {
  const programaId = req.params.id;
  const { programa, facultad } = req.body;
  try {
    await db.promise().query('UPDATE programas SET programa=?, facultad=? WHERE id_programa=?', [programa, facultad, programaId]);
    res.redirect('/html/programas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar programa' });
  }
});

// Eliminar un programa por ID
router.delete('/programas/:id', async (req, res) => {
  const programaId = req.params.id;
  try {
    await db.promise().query('DELETE FROM programas WHERE id_programa = ?', [programaId]);
    res.json({ message: 'Programa eliminado exitosamente' });
    res.redirect('/html/programas');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar programa' });
  }
});

module.exports = router;
