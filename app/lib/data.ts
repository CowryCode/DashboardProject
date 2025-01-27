import { sql } from '@vercel/postgres';
import {
  CustomersTableType,
  InvoiceForm,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // const data = await sql<Revenue>`SELECT * FROM revenue`;
    // // console.log('Data fetch completed after 3 seconds.');
    // return data.rows;

    // MY CODE TO SIMULATE DB FETCH
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const revenue = [ { month: "Jan", revenue: 100 }, 
      { month: "Feb", revenue: 1200 }, 
      { month: "Mar", revenue: 4550 }, 
      { month: "Apr", revenue: 3800 }, 
      { month: "May", revenue: 2000 }, 
      { month: "Jun", revenue: 4170 }, 
      { month: "Jul", revenue: 4140 }, 
      { month: "Aug", revenue: 2130 }, 
      { month: "Sept", revenue: 3160 }, 
      { month: "Oct", revenue: 1190 }, 
      { month: "Nov", revenue: 4110 }, 
      { month: "Dec", revenue: 4220 }, ]
    
      console.log('Data fetch completed after 3 seconds.');


    return revenue;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    // const data = await sql<LatestInvoiceRaw>`
    //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   ORDER BY invoices.date DESC
    //   LIMIT 5`;

    // const latestInvoices = data.rows.map((invoice) => ({
    //   ...invoice,
    //   amount: formatCurrency(invoice.amount),
    // }));
    //return latestInvoices;


    // MY CODE TO SIMULATE API CALL 
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const data = [ 
      { id: 101, 
        amount: 250.75, 
        name: "John Doe", 
        image_url: "/customers/amy-burns.png", 
        email: "john.doe@example.com",}, 
      { id: 102, 
        amount: 120.50, 
        name: "Jane Smith", 
        image_url: "/customers/balazs-orban.png", 
        email: "jane.smith@example.com", }, 
      { id: 103, amount: 310.00, name: "Michael Brown",
        image_url: "/customers/delba-de-oliveira.png", 
        email: "michael.brown@example.com", },
      { id: 104, amount: 85.99, name: "Emily White", 
        image_url: "/customers/evil-rabbit.png", 
        email: "emily.white@example.com", }, 
      { id: 105, amount: 450.00, name: "David Johnson", 
        image_url: "/customers/lee-robinson.png", 
        email: "david.johnson@example.com", }, ];
      // const latestInvoices = data.map((invoice) => ({
      //   ...invoice,
      //   amount: formatCurrency(invoice.amount),
      // }));

      const latestInvoices = data.map((invoice) => ({ id: String(invoice.id), name: String(invoice.name), image_url: String(invoice.image_url), email: String(invoice.email), amount: String(invoice.amount.toFixed(2)),}));

      return latestInvoices;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    // const data = await Promise.all([
    //   invoiceCountPromise,
    //   customerCountPromise,
    //   invoiceStatusPromise,
    // ]);

    // const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    // const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    // const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    // const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');\

    // MY OWN CODE
    const numberOfInvoices = 15;
    const numberOfCustomers = 8;
    const totalPaidInvoices = formatCurrency(100106.36);
    const totalPendingInvoices = formatCurrency(100339.11);

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
 // const offset = (currentPage - 1) * ITEMS_PER_PAGE;
   console.log(query)
   console.log(currentPage)
  try {
    // const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     customers.name,
    //     customers.email,
    //     customers.image_url
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    //   LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;
    //return invoices.rows;

    // MY CODE TO SIMULATE API CALL 
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const queryResponse = [
      {
        id: "1",
        amount: "250.75",
        date: "2025-01-15",
        status: "Paid",
        name: "John Doe",
        email: "john.doe@example.com",
        image_url: "/customers/amy-burns.png",
      },
      {
        id: "2",
        amount: "120.50",
        date: "2025-01-10",
        status: "Pending",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        image_url: "/customers/balazs-orban.png",
      },
      {
        id: "3",
        amount: "310.00",
        date: "2025-01-08",
        status: "Overdue",
        name: "Michael Brown",
        email: "michael.brown@example.com",
        image_url: "/customers/delba-de-oliveira.png",
      },
      {
        id: "4",
        amount: "85.99",
        date: "2025-01-05",
        status: "Paid",
        name: "Emily White",
        email: "emily.white@example.com",
        image_url: "/customers/evil-rabbit.png",
      },
      {
        id: "5",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/lee-robinson.png",
      },
      {
        id: "6",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/michael-novotny.png",
      },
      {
        id: "7",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/michael-novotny.png",
      },
      {
        id: "8",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/michael-novotny.png",
      },
      {
        id: "9",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/michael-novotny.png",
      },
      {
        id: "10",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/michael-novotny.png",
      },
      {
        id: "11",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/michael-novotny.png",
      },
      {
        id: "12",
        amount: "450.00",
        date: "2025-01-02",
        status: "Pending",
        name: "David Johnson",
        email: "david.johnson@example.com",
        image_url: "/customers/michael-novotny.png",
      },
    ];

    const invoicesTable = queryResponse.map((invoice, index) => ({
      id: String(invoice.id),
      customer_id: `CUST00${index + 1}`, 
      name: String(invoice.name),
      email: String(invoice.email),
      image_url: String(invoice.image_url),
      date: String(invoice.date),
      amount: parseFloat(invoice.amount), 
      status: invoice.status.toLowerCase() === "paid" ? "paid" : "pending", 
    }))
    return invoicesTable;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    // const data = await sql<InvoiceForm>`
    //   SELECT
    //     invoices.id,
    //     invoices.customer_id,
    //     invoices.amount,
    //     invoices.status
    //   FROM invoices
    //   WHERE invoices.id = ${id};
    // `;

    // const invoice = data.rows.map((invoice) => ({
    //   ...invoice,
    //   // Convert amount from cents to dollars
    //   amount: invoice.amount / 100,
    // }));
    //return invoice[0];

    console.log(id)

    const sampleInvoiceForms: InvoiceForm[] = [
      {
        id: "1",
        customer_id: "CUST001",
        amount: 250.75,
        status: "paid",
      },
      {
        id: "2",
        customer_id: "CUST002",
        amount: 120.5,
        status: "pending",
      },
      {
        id: "3",
        customer_id: "CUST003",
        amount: 310.0,
        status: "paid",
      },
      {
        id: "4",
        customer_id: "CUST004",
        amount: 85.99,
        status: "pending",
      },
      {
        id: "5",
        customer_id: "CUST005",
        amount: 450.0,
        status: "paid",
      },
    ];
    const firstInvoice = sampleInvoiceForms[3];
    return firstInvoice;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    // const data = await sql<CustomerField>`
    //   SELECT
    //     id,
    //     name
    //   FROM customers
    //   ORDER BY name ASC
    // `;
    // const customers = data.rows;
    // return customers;

    const queryResponse = [
      { id: "CUST001", name: "Alice Brown" },
      { id: "CUST002", name: "Bob Smith" },
      { id: "CUST003", name: "Charlie Johnson" },
      { id: "CUST004", name: "Diana White" },
      { id: "CUST005", name: "Ethan Davis" },
    ];

    const customers = queryResponse.map((customer) => ({
      id: String(customer.id), 
      name: String(customer.name), 
    }));
    
    return customers;

  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
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
