# Cloudflare Workers scaffolding con Hono y Drizzle

1. Instalación de paquetes.

```bash
bun i
```

2. Crea una base de datos D1 y rellena los datos `database_name` y `database_id` del archivo `wrangler.toml`.

```bash
bunx wrangler d1 create <db_name>
```

3. Edita el esquema de base de datos `src/db/schema.ts` y genera la migración.

```bash
bun run db:generate
```

4. Aplica la migración en el entorno local (usa el nombre del archivo de migración generado).

```bash
bunx wrangler d1 execute <db_name> --local --file=./drizzle/migrations/<migration_name>.sql
```

5. Si todo ha ido bien, ejecuta la migración en la base de datos remota (sustituye --local por --remote).

```bash
bunx wrangler d1 execute <db_name> --remote --file=./drizzle/migrations/<migration_name>.sql
```

6. Despliega el Cloudflare Worker en producción.

```bash
bun run deploy
```
