import development from './development';
import production from './production';
import test from './test';

interface CouchDbConfig {
  url: string;
  name: string;
}

interface AppConfig {
  environment: string;
  database: {
    couchDb: CouchDbConfig;
  };
  port: number;
}

const env = process.env.NODE_ENV || 'development';

const configMap: { [key: string]: AppConfig } = {
  development,
  production,
  test,
};

const config: AppConfig = configMap[env];

export default config;
