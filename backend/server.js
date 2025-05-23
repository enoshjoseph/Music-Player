const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "musicplayer",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
// Route to fetch all songs
app.get('/get-songs', (req, res) => {
  const sql = 'SELECT * FROM songs';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching songs' });
    }

    // Map song data to include the full URL for the file paths
    const songs = results.map(song => ({
      ...song,
      song_file: `http://localhost:8081/uploads/${song.song_file}`,
      cover_photo: `http://localhost:8081/uploads/${song.cover_photo}`,
    }));

    res.json(songs);
  });
});


// Signup route
app.post("/signup", (req, res) => {
  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error inserting data", error: err });
    }
    res.status(201).json(data);
  });
});
const songs = [
  {
    name: 'Song 1',
    description: 'This is the description of Song 1',
    coverImage: 'https://path/to/cover1.jpg',
    audioUrl: 'https://path/to/song1.mp3',
  },
  {
    name: 'Song 2',
    description: 'This is the description of Song 2',
    coverImage: 'https://path/to/cover2.jpg',
    audioUrl: 'https://path/to/song2.mp3',
  },
  // Add more songs here
];

app.get('/api/songs', (req, res) => {
  res.json(songs);
});
// Add song route
app.post("/add-song", upload.fields([{ name: "songFile" }, { name: "coverPhoto" }]), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded Files:", req.files);

  const { songName, description } = req.body;
  const userId = 1; // Hardcoded user ID for now
  const songFile = req.files?.["songFile"]?.[0]?.filename;
  const coverPhoto = req.files?.["coverPhoto"]?.[0]?.filename;

  if (!songName || !description || !songFile || !coverPhoto) {
      return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
      INSERT INTO songs (song_name, description, song_file, cover_photo, user_id)
      VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [songName, description, songFile, coverPhoto, userId], (err, result) => {
      if (err) {
          console.error("Error inserting song:", err);
          return res.status(500).json({ message: "Error inserting song into the database." });
      }
      res.status(200).json({ message: "Song added successfully!", songId: result.insertId });
  });
});


// Login route
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error querying database", error: err });
    }
    if (data.length > 0) {
      return res.status(200).json("success");
    } else {
      return res.status(401).json("fail");
    }
  });
});
