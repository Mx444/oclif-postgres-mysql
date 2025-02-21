import { Command, Flags } from "@oclif/core";
import { backupMySQL, backupPostgres } from "../lib/backupFunctions";
import { logger } from "../utils/logger";

type SupportedDB = "mysql" | "postgres";

enum ExitCodes {
  Success = 0,
  InvalidDatabaseType = 1,
  BackupFailed = 2,
}

const backupHandlers: Record<SupportedDB, () => Promise<void>> = {
  mysql: backupMySQL,
  postgres: backupPostgres,
};

export default class Backup extends Command {
  static description = "Esegue il backup del database";

  static flags = {
    dbType: Flags.string({
      char: "d",
      description: "Tipo di database (mysql|postgres)",
      required: true,
      options: ["mysql", "postgres"],
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Backup);
    const dbType = flags.dbType.toLowerCase() as SupportedDB;

    try {
      if (!(dbType in backupHandlers)) {
        logger.error(`Tipo di database non supportato: ${flags.dbType}`);
        this.exit(ExitCodes.InvalidDatabaseType);
      }

      logger.info(`Avvio backup ${dbType.toUpperCase()}...`);
      await backupHandlers[dbType]();
      logger.success("Backup completato con successo!");
    } catch (error) {
      logger.error(
        `Errore durante il backup ${dbType.toUpperCase()}: ${error instanceof Error ? error.message : error}`,
      );
      this.exit(ExitCodes.BackupFailed);
    }
  }
}
