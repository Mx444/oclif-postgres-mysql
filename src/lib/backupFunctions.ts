// src/lib/backupFunctions.ts
import { exec } from "child_process";
import util from "util";
import path from "path";
import { config } from "../config";
import { logger } from "../utils/logger";

const execAsync = util.promisify(exec);

export async function backupMySQL(): Promise<void> {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = config;

  if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
    logger.error("Configurazione del database incompleta.");
    process.exit(1);
  }

  const timestamp: string = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile: string = path.join(process.cwd(), `backup-${DB_NAME}-${timestamp}.sql`);
  const command = `mysqldump -u ${DB_USER} -p${DB_PASSWORD} -h ${DB_HOST} -P ${DB_PORT} ${DB_NAME} > ${backupFile}`;

  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      logger.error(`Stderr: ${stderr}`);
    }
    logger.info(`Backup completato: ${backupFile}`);
  } catch (error) {
    logger.error(`Errore durante il backup: ${(error as Error).message}`);
  }
}

export async function backupPostgres(): Promise<void> {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = config;

  if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
    logger.error("Configurazione del database incompleta.");
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(process.cwd(), `backup-${DB_NAME}-${timestamp}.sql`);
  const command = `pg_dump -U ${DB_USER} -h ${DB_HOST} -p ${DB_PORT} ${DB_NAME} > ${backupFile}`;

  try {
    const env = { ...process.env, PGPASSWORD: DB_PASSWORD };
    const { stdout, stderr } = await execAsync(command, { env });
    if (stderr) {
      logger.error(`Stderr: ${stderr}`);
    }
    logger.info(`Backup completato: ${backupFile}`);
  } catch (error) {
    logger.error(`Errore durante il backup: ${(error as Error).message}`);
  }
}
