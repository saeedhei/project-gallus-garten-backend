import { build } from 'esbuild';
import { copyFileSync, existsSync, mkdirSync, cpSync } from 'fs';
import pkg from 'esbuild-node-externals';
const nodeExternals = pkg.default;
import fg from 'fast-glob';

if (!existsSync('dist')) {
  mkdirSync('dist');
}

copyFileSync('.env.production', './dist/.env.production');
copyFileSync('src/users.json', './dist/users.json');
cpSync('src/views', './dist/views', { recursive: true });
cpSync('src/public', './dist/public', { recursive: true });

const entryPoints = await fg('src/**/*.ts');

build({
  entryPoints,
  bundle: false,
  platform: 'node',
  outdir: 'dist',
  outbase: 'src',
  sourcemap: false,
  format: 'esm',
  plugins: [nodeExternals()],
})
  .then(() => console.log('Build completed'))
  .catch(() => process.exit(1));
