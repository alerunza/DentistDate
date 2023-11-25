const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Imposta il middleware per il parsing del corpo della richiesta in formato JSON
app.use(cors({
    origin: 'http://localhost:8080',
  }));

app.use(bodyParser.json());

// Imposta il database SQLite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('prenotazioni.db');

// Crea la tabella delle prenotazioni
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS prenotazioni (id INTEGER PRIMARY KEY, nome TEXT, cognome TEXT, email TEXT, data TEXT)');
});

// Definisci gli endpoint API qui...

app.post('/api/prenotazioni', (req, res) => {
    const { nome, cognome, email, data } = req.body;
    // Esegui la query per inserire i dati nel database
    db.run('INSERT INTO prenotazioni (nome, cognome, email, data) VALUES (?, ?, ?, ?)', [nome, cognome, email, data], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Errore durante l\'inserimento della prenotazione.' });
      }
      res.status(201).json({ message: 'Prenotazione inserita con successo' });
    });
});
  
// Creazione di un endpoint per l'accesso alle prenotazioni
app.get('/api/prenotazioni', (req, res) => {
    // Esegui una query per ottenere la lista delle prenotazioni dal database
    db.all('SELECT * FROM prenotazioni', (err, rows) => {
        if (err) {
        return res.status(500).json({ error: 'Errore durante il recupero delle prenotazioni.' });
        }
        res.json(rows);
    });
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});