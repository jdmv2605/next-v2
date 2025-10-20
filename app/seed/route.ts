const bcrypt = require('bcrypt');
const { db } = require('@vercel/postgres');
const { invoices, customers, revenue, users } = require('./placeholder-data');

// Paso 2: datos de ejemplo para la nueva tabla "duenos"
const duenos = [
  { id: '1', nombre: 'Juan Pérez', telefono: '3001234567', direccion: 'Calle 10 #5-20' },
  { id: '2', nombre: 'María López', telefono: '3109876543', direccion: 'Carrera 15 #8-40' },
  { id: '3', nombre: 'Carlos Gómez', telefono: '3015558888', direccion: 'Av. Central 22-15' },
];

// SEED USERS
async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;
    console.log('✅ Tabla "users" creada');

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    console.log(`✅ Insertados ${users.length} usuarios`);
  } catch (error) {
    console.error('❌ Error en seedUsers:', error);
    throw error;
  }
}

// SEED CUSTOMERS
async function seedCustomers(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;
    console.log('✅ Tabla "customers" creada');

    for (const c of customers) {
      await client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${c.id}, ${c.name}, ${c.email}, ${c.image_url})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    console.log(`✅ Insertados ${customers.length} clientes`);
  } catch (error) {
    console.error('❌ Error en seedCustomers:', error);
    throw error;
  }
}

// SEED INVOICES
async function seedInvoices(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;
    console.log('✅ Tabla "invoices" creada');

    for (const inv of invoices) {
      await client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${inv.customer_id}, ${inv.amount}, ${inv.status}, ${inv.date})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    console.log(`✅ Insertadas ${invoices.length} facturas`);
  } catch (error) {
    console.error('❌ Error en seedInvoices:', error);
    throw error;
  }
}

// SEED REVENUE
async function seedRevenue(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;
    console.log('✅ Tabla "revenue" creada');

    for (const r of revenue) {
      await client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${r.month}, ${r.revenue})
        ON CONFLICT (month) DO NOTHING;
      `;
    }

    console.log(`✅ Insertados ${revenue.length} registros de revenue`);
  } catch (error) {
    console.error('❌ Error en seedRevenue:', error);
    throw error;
  }
}

// 🆕 SEED DUENOS (NUEVA TABLA)
async function seedDuenos(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS duenos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        telefono VARCHAR(20),
        direccion VARCHAR(255)
      );
    `;
    console.log('✅ Tabla "duenos" creada');

    for (const d of duenos) {
      await client.sql`
        INSERT INTO duenos (nombre, telefono, direccion)
        VALUES (${d.nombre}, ${d.telefono}, ${d.direccion})
        ON CONFLICT DO NOTHING;
      `;
    }

    console.log(`✅ Insertados ${duenos.length} dueños`);
  } catch (error) {
    console.error('❌ Error en seedDuenos:', error);
    throw error;
  }
}

// MAIN
async function main() {
  const client = await db.connect();

  console.log('🌱 Iniciando seed...');
  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);
  await seedDuenos(client); // 👈 aquí agregamos el paso 2 correctamente

  await client.end();
  console.log('✅ Seed completado con éxito');
}

main().catch((err) => {
  console.error('❌ Error al ejecutar el seed:', err);
});
