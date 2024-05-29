import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';

type Bindings = {
    DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/', (c) => {
    return c.json('Hello Hono!');
});

app.get('/posts', async (c) => {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(posts);
    return c.json(result);
});

app.post('/posts', async (c) => {
    const db = drizzle(c.env.DB);
    const { title, content } = await c.req.json();

    const result = await db
        .insert(posts)
        .values({ title, content })
        .returning();

    return c.json(result);
});

export default app;
