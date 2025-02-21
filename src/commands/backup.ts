// src/commands/backup.ts
import { Command, Flags } from '@oclif/core';
import { backupMySQL, backupPostgres } from '../lib/backupFunctions';
import { logger } from '../utils/logger';

export default class Backup extends Command {
  static description = 'Esegue il backup del database';

  static flags = {
    dbType: Flags.string({ char: 'd', description: 'Tipo di database (mysql, postgres, ...)', required: true }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(Backup);

    if (flags.dbType === 'mysql') {
      await backupMySQL();
    } else if (flags.dbType === 'postgres') {
      await backupPostgres();
    } else {
      logger.error('Tipo di database non supportato al momento.');
      this.exit(1);
    }
  }
}
