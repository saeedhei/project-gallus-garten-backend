import { build } from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, cpSync } from 'fs';
import pkg from 'esbuild-node-externals';
const nodeExternals = pkg.default;

if (!existsSync('dist')) {
  mkdirSync('dist');
}

copyFileSync('.env.production', './dist/.env.production');
copyFileSync('src/users.json', './dist/users.json');
cpSync('src/views', './dist/views', { recursive: true });
cpSync('src/public', './dist/public', { recursive: true });

build({
  entryPoints: ['src/bin/www.ts'],
  bundle: true,
  platform: 'node',
  outdir: 'dist',
  sourcemap: false,
  format: 'esm',
  plugins: [nodeExternals()],
}).catch(() => process.exit(1));
