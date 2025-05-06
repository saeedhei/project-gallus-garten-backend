export type AppConfig = {
  port: string | number;
  dbHost?: string;
  dbPort?: string;
  dbUser?: string;
  dbPass?: string;
  dbName?: string;
  gallusAdminUser?: string;
  gallusAdminPassword?: string;
  jwtSecret?: string;
  smtpHost?: string;
  smtpPort?: string | number;
};
