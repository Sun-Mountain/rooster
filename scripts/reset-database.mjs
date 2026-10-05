import 'dotenv/config';
import { spawnSync } from 'node:child_process';

const productionMarkers = [process.env.APP_ENV, process.env.NODE_ENV]
  .filter(Boolean)
  .map((value) => value.toLowerCase());

if (productionMarkers.some((value) => value === 'production' || value === 'prod')) {
  process.stderr.write('Database reset blocked in a production environment.\n');
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  process.stderr.write('Database reset blocked: DATABASE_URL is not set.\n');
  process.exit(1);
}

let databaseHost;
try {
  databaseHost = new URL(process.env.DATABASE_URL).hostname.toLowerCase();
} catch {
  process.stderr.write('Database reset blocked: DATABASE_URL is not a valid URL.\n');
  process.exit(1);
}

const localDatabaseHosts = new Set(['localhost', '127.0.0.1', '::1', '[::1]', 'db']);
if (!localDatabaseHosts.has(databaseHost)) {
  process.stderr.write(`Database reset blocked for non-local database host: ${databaseHost}\n`);
  process.exit(1);
}

const command = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const result = spawnSync(command, ['exec', 'prisma', 'migrate', 'reset'], {
  stdio: 'inherit',
});

if (result.error) {
  process.stderr.write(`Failed to start Prisma reset: ${result.error.message}\n`);
  process.exit(1);
}

process.exit(result.status ?? 1);