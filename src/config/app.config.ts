import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environments: process.env.NODE_ENV,
}));

/* 
use registerAs
export const appConfig = () => {
  return {
    environments: process.env.NODE_ENV,
    database: {
      mode: process.env.ENV_MODE || 'PRODUCTION',
      type: process.env.DB_TYPE || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      load: process.env.DB_AUTO_LOAD === 'true' ? true : false,
      synchronize: process.env.SYNC === 'true' ? true : false,
    },
  };
};
*/
