import type { APIRoute } from 'astro';
import pg from 'pg';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return new Response(JSON.stringify({ error: 'Name and phone are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const databaseUrl = import.meta.env.DATABASE_URL;

    if (!databaseUrl) {
      console.log('Contact form submission (no DB):', { name, phone, message });
      return new Response(JSON.stringify({ success: true, fallback: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = new pg.Client({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    });

    await client.connect();
    await client.query(
      'INSERT INTO contacts (name, phone, message) VALUES ($1, $2, $3)',
      [name, phone, message || '']
    );
    await client.end();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
