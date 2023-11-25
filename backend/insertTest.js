const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('prenotazioni.db');

db.serialize(() => {
  db.run('INSERT INTO prenotazioni (nome, cognome, email, data) VALUES (?, ?, ?, ?)', ['Nome1', 'Cognome1', 'email1@example.com', '2023-01-01']);
  db.run('INSERT INTO prenotazioni (nome, cognome, email, data) VALUES (?, ?, ?, ?)', ['Nome2', 'Cognome2', 'email2@example.com', '2023-02-01']);
  db.run('INSERT INTO prenotazioni (nome, cognome, email, data) VALUES (?, ?, ?, ?)', ['Nome3', 'Cognome3', 'email3@example.com', '2023-03-01']);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Dati di prova inseriti con successo.');
});
