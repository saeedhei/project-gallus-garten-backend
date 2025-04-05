export default {
  port: process.env.PORT || 4000,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  gallusAdminUser: process.env.GALLUS_ADMIN_USER,
  gallusAdminPassword: process.env.GALLUS_ADMIN_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
};
