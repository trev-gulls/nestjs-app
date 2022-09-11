import { SequelizeModule } from '@nestjs/sequelize';

export const SqliteModule = SequelizeModule.forRoot({
  dialect: 'sqlite',
  storage: 'data/database.sqlite',
  repositoryMode: true,
  autoLoadModels: true,
  synchronize: true,
});
