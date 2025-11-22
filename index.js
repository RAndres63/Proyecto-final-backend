const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente 🚀");
});


// --- Datos simulados (se pueden migrar a MongoDB) ---

let juegos = [
  { id: 1, titulo: "Solitario", url: "https://solitarios-online.com/" },
  { id: 2, titulo: "Pacman", url: "https://www.pacmangratis.net/" },
  { id: 3, titulo: "Tetris", url: "https://tetrismania.net/" },
  { id: 4, titulo: "Agario", url: "https://agar.io//" }
];

let reseñas = {
  1: [], // Reseñas para solitario
  2: [], // Reseñas para pacman
  3: [], // Reseñas para tetris
  4: [], // Reseñas para agario
};

// ---- RUTAS ----

// Obtener todos los juegos
// Obtener un juego por ID
app.get("/api/juegos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const juego = juegos.find(j => j.id === id);

  if (!juego) {
    return res.status(404).json({ error: "Juego no encontrado" });
  }

  res.json(juego);
});



// Obtener reseñas de un juego
app.get("/api/juegos/:id/reseñas", (req, res) => {
  const id = req.params.id;
  res.json(reseñas[id] || []);
});

// Crear una reseña (solo estrellas)
app.post("/api/juegos/:id/reseñas", (req, res) => {
  const id = req.params.id;
  const { estrellas } = req.body;

  if (!estrellas || estrellas < 1 || estrellas > 5) {
    return res.status(400).json({ error: "La reseña debe ser un número entre 1 y 5 estrellas" });
  }

  const nuevaReseña = { estrellas, fecha: new Date() };

  reseñas[id].push(nuevaReseña);

  res.json({ mensaje: "Reseña agregada", reseña: nuevaReseña });
});


// Servidor
app.listen(4000, () => {
  console.log("Backend corriendo en http://localhost:4000");
});
