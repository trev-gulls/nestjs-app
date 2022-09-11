import { Module } from '@nestjs/common';

import { SqliteModule } from './sqlite.module';

@Module({
  imports: [SqliteModule],
  exports: [SqliteModule],
})
export class DatabaseModule {}
