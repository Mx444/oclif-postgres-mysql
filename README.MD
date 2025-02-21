# 📦 db-backup-cli

**db-backup-cli** è una utility CLI scritta in TypeScript per il backup di database generici. Supporta attualmente MySQL e PostgreSQL.

## 🚀 Installazione

Per installare le dipendenze, eseguire:

```bash
npm install
```

## 🛠️ Utilizzo

Per eseguire il backup di un database, utilizzare il comando:

```bash
node dist/index.js backup --dbType <tipo-di-database>
npm run pg
npm run mysql
```

Sostituire `<tipo-di-database>` con `mysql` o `postgres`.

## ⚙️ Configurazione

Creare un file `.env` nella radice del progetto e aggiungere le seguenti variabili di ambiente:

```env
DB_USER=tuo_utente
DB_PASSWORD=tua_password
DB_HOST=localhost
DB_PORT=porta_database
DB_NAME=nome_database
```

## 📜 Script npm

- `build`: Compila il progetto TypeScript
- `start`: Avvia il progetto in modalità sviluppo
- `test`: Esegue i test con Jest

## 🧪 Test

Per eseguire i test, utilizzare:

```bash
npm test
```

## 📄 Licenza

Questo progetto è sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per maggiori dettagli.
