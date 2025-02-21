// src/lib/backupFunctions.ts
import { exec } from "child_process";
import util from "util";
import path from "path";
import { config } from "../config";
import { logger } from "../utils/logger";

const execAsync = util.promisify(exec);

async function performBackup(command: string, backupFile: string, env?: NodeJS.ProcessEnv): Promise<void> {
  try {
    const { stderr } = await execAsync(command, { env });
    if (stderr) {
      logger.error(`Stderr: ${stderr}`);
    }
    logger.info(`Backup completato: ${backupFile}`);
  } catch (error) {
    logger.error(`Errore durante il backup: ${(error as Error).message}`);
    throw error;
  }
}

export async function backupMySQL(): Promise<void> {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = config;

  if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
    const errorMessage = "Configurazione del database incompleta.";
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const timestamp: string = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile: string = path.join(process.cwd(), `backup-${DB_NAME}-${timestamp}.sql`);
  const command = `mysqldump -u ${DB_USER} -p${DB_PASSWORD} -h ${DB_HOST} -P ${DB_PORT} ${DB_NAME} > ${backupFile}`;

  await performBackup(command, backupFile);
}

export async function backupPostgres(): Promise<void> {
  const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = config;

  if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
    const errorMessage = "Configurazione del database incompleta.";
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupFile = path.join(process.cwd(), `backup-${DB_NAME}-${timestamp}.sql`);
  const command = `pg_dump -U ${DB_USER} -h ${DB_HOST} -p ${DB_PORT} ${DB_NAME} > ${backupFile}`;
  const env = { ...process.env, PGPASSWORD: DB_PASSWORD };

  await performBackup(command, backupFile, env);
}
