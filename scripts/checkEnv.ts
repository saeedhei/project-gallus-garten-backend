import '../src/core/config/index.js';

const requiredEnvKeys = [
  'PORT',
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'GALLUS_ADMIN_USER',
  'GALLUS_ADMIN_PASSWORD',
  'JWT_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
];

const missingKeys = requiredEnvKeys.filter((key) => !process.env[key]);

if (missingKeys.length > 0) {
  console.error(`🚨 Missing environment variables: ${missingKeys.join(', ')}`);
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set.');
}
