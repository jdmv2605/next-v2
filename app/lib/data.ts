import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  DuennoField
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;
    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, duennos.nombre as name, duennos.imagen_url as image_url, duennos.email, invoices.id
      FROM invoices
      JOIN duennos ON invoices.customer_id = duennos.id
      ORDER BY invoices.date DESC
      LIMIT 5
    `;
    console.log('📊 FACTURAS MÁS RECIENTES:', data);

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM duennos`;
    const invoiceStatusPromise = sql`
      SELECT 
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
      FROM invoices
    `;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        duennos.nombre as name,
        duennos.email,
        duennos.imagen_url as image_url
      FROM invoices
      JOIN duennos ON invoices.customer_id = duennos.id
      WHERE
        duennos.nombre ILIKE ${`%${query}%`} OR
        duennos.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
       ORDER BY invoices.date DESC, invoices.id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM invoices
      JOIN duennos ON invoices.customer_id = duennos.id
      WHERE
        duennos.nombre ILIKE ${`%${query}%`} OR
        duennos.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id}
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      amount: invoice.amount / 100,
    }));

    console.log(invoice);
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        nombre as name,
        email,
        imagen_url as image_url
      FROM duennos
      ORDER BY nombre ASC
    `;

    console.log('📊 CLIENTES ENCONTRADOS:', customers);
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
      SELECT
        duennos.id,
        duennos.nombre as name,
        duennos.email,
        duennos.imagen_url as image_url,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM duennos
      LEFT JOIN invoices ON duennos.id = invoices.customer_id
      WHERE
        duennos.nombre ILIKE ${`%${query}%`} OR
        duennos.email ILIKE ${`%${query}%`}
      GROUP BY duennos.id, duennos.nombre, duennos.email, duennos.imagen_url
      ORDER BY duennos.nombre ASC
    `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchDuennos() {
  try {
    const duennos = await sql<DuennoField[]>`
      SELECT 
        id, 
        nombre as name, 
        email, 
        imagen_url as image_url
      FROM duennos
      ORDER BY nombre ASC
    `;
    console.log('📊 DUEÑOS ENCONTRADOS:', duennos);
    return duennos;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch duennos.');
  }
}

export async function fetchFilteredDuennos(query: string) {
  try {
    const data = await sql`
      SELECT
        duennos.id,
        duennos.nombre,
        duennos.telefono,
        duennos.email,
        duennos.direccion,
        duennos.imagen_url,
        COUNT(invoices.id) AS total_servicios,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pendiente,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_completado
      FROM duennos
      LEFT JOIN invoices ON duennos.id = invoices.customer_id
      WHERE
        duennos.nombre ILIKE ${`%${query}%`} OR
        duennos.email ILIKE ${`%${query}%`} OR
        duennos.telefono ILIKE ${`%${query}%`}
      GROUP BY duennos.id, duennos.nombre, duennos.telefono, duennos.email, duennos.direccion, duennos.imagen_url
      ORDER BY duennos.nombre ASC
    `;

    const duennos = data.map((duenno) => ({
      ...duenno,
      total_pendiente: formatCurrency(duenno.total_pendiente || 0),
      total_completado: formatCurrency(duenno.total_completado || 0),
    }));

    return duennos;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch duennos table.');
  }
}

export async function fetchDuennosForInvoices(): Promise<DuennoField[]> {
  try {
    const data = await sql<DuennoField[]>`
      SELECT
        id,
        nombre as name,
        email,
        imagen_url as image_url
      FROM duennos
      ORDER BY nombre ASC
    `;
    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch duennos for invoices.');
  }
}
export async function fetchFilteredInvoicesWithDuennos(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        duennos.nombre as name,
        duennos.email,
        duennos.imagen_url as image_url
      FROM invoices
      JOIN duennos ON invoices.customer_id = duennos.id
      WHERE
        duennos.nombre ILIKE ${`%${query}%`} OR
        duennos.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC, invoices.id DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices with duennos.');
  }
}

export async function fetchInvoicesPagesWithDuennos(query: string) {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM invoices
      JOIN duennos ON invoices.customer_id = duennos.id
      WHERE
        duennos.nombre ILIKE ${`%${query}%`} OR
        duennos.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices with duennos.');
  }
}

export async function fetchLatestServices() {
  try {
    const data = await sql`
      SELECT 
        invoices.amount, 
        duennos.nombre as name, 
        duennos.imagen_url as image_url, 
        duennos.email,
        invoices.id
      FROM invoices 
      JOIN duennos ON invoices.customer_id = duennos.id
      ORDER BY invoices.date DESC 
      LIMIT 5
    `;

    const latestServices = data.map((service) => ({
      ...service,
      amount: formatCurrency(service.amount),
    }));
    return latestServices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest services.');
  }
}

export async function fetchRevenueChartData() {
  try {
    const data = await sql`
      SELECT 
        TO_CHAR(invoices.date, 'YYYY-MM') as month,
        SUM(invoices.amount) as revenue
      FROM invoices
      WHERE invoices.status = 'paid'
      GROUP BY TO_CHAR(invoices.date, 'YYYY-MM')
      ORDER BY month ASC
      LIMIT 12
    `;

    return data.map(row => ({
      month: row.month,
      revenue: Number(row.revenue) || 0
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue chart data.');
  }
}