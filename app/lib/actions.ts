'use server';
import { z } from 'zod';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
    
    // const rawFormData = {
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status'),
    //   };

    // VALIDATING INPUT
    const FormSchema = z.object({
        id: z.string(),
        customerId: z.string({invalid_type_error: 'Please select a customer.',}),
        amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
        status: z.enum(['pending', 'paid'], {invalid_type_error: 'Please select an invoice status.', }),
        date: z.string(),
    });
    const CreateInvoice = FormSchema.omit({ id: true, date: true });

   // const { customerId, amount, status } = CreateInvoice.parse({
      const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });

      console.log(validatedFields)

      // If form validation fails, return errors early. Otherwise, continue.
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
      }

       // Prepare data for insertion into the database
        const { customerId, amount, status } = validatedFields.data;
        const amountInCents = amount * 100;
        const date = new Date().toISOString().split('T')[0];
     // INSERT INTO DB
      try {
          await sql`
          INSERT INTO invoices (customer_id, amount, status, date)
          VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
          `;
      } catch (error) {
          // If a database error occurs, return a more specific error.
          return {
            message: 'Database Error: Failed to Create Invoice.',
          };
      }



    // REVALIDATE CACHE
    // Once the database has been updated, the /dashboard/invoices path will be revalidated, and fresh data will be fetched from the server.
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}



export async function updateInvoice(
  id: string, 
  prevState: State,
  formData: FormData
 ) {
    // VALIDATING INPUT
    const FormSchema = z.object({
        id: z.string({invalid_type_error: 'Please select a customer.',}),
        customerId: z.string(),
        amount: z.coerce.number().gt(0, { message: 'Please enter an amount greater than $0.' }),
        status: z.enum(['pending', 'paid'], {  invalid_type_error: 'Please select an invoice status.',
        }),
        date: z.string(),
    });
    // Use Zod to update the expected types
    const UpdateInvoice = FormSchema.omit({ id: true, date: true });
    //const { customerId, amount, status } = UpdateInvoice.parse({
    const validatedFields = UpdateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
      };
    }
   
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    try {
      await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Invoice.' };
    }
   

   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  export async function deleteInvoice(id: string) {
    //throw new Error('Failed to Delete Invoice');
    // await sql`DELETE FROM invoices WHERE id = ${id}`;

    // After Deleting, We Revalidate To Refresh Fetched Content
    console.log('DELETE BUTTON CLICKED . . . ');
    revalidatePath('/dashboard/invoices');
  }