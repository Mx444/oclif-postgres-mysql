# 📦 db-backup-cli

<p align="center">
  <img src="https://icons.veryicon.com/png/o/internet--web/2022-alibaba-cloud-product-icon-cloud/cbs-database-backup.png" alt="DB Logo" width="200" >
</p>

A TypeScript CLI utility for database backups. Currently supports MySQL and PostgreSQL databases.

## 🚀 Installation

To install dependencies, run:

```bash
npm install
```

## 🔨 Build

Compile the TypeScript code:

```bash
npm run build
```

## 🛠️ Usage

You can run the CLI in several ways:

### Using the CLI directly

```bash
node dist/index.js backup --dbType <database-type>
```

Replace `<database-type>` with either `mysql` or `postgres`.

### Using npm scripts

```bash
npm run pg    # For PostgreSQL backup
npm run mysql # For MySQL backup
```

## ⚙️ Configuration

Create a `.env` file in the project root with the following environment variables:

```env
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=database_port
DB_NAME=database_name
```

## 🧩 Project Structure

```
src/
├── commands/       # CLI commands
│   └── backup.ts   # Backup command implementation
├── config/         # Configuration
│   └── index.ts    # Environment variables setup
├── index.ts        # Main entry point
├── lib/            # Core functionality
│   └── backupFunctions.ts  # Database backup implementations
└── utils/
    └── logger.ts   # Logging utilities
```

## 🔍 Features

- **Multiple Database Support**: Backup both MySQL and PostgreSQL databases
- **Timestamped Backups**: Each backup file includes a timestamp
- **Error Handling**: Comprehensive error handling with appropriate exit codes
- **Logging**: Detailed logging of backup operations

## 📋 Exit Codes

- `0`: Success
- `1`: Invalid database type
- `2`: Backup operation failed

## 🧪 Testing

To run tests:

```bash
npm test
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.