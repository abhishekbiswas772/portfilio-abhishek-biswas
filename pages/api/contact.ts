import type { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from '../../lib/db'; // Adjust path if needed

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`\n[${new Date().toISOString()}] --- Received request ---`);
  
  if (req.method !== 'POST') {
    console.log(`[${new Date().toISOString()}] Method Not Allowed: ${req.method}`);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
  
  console.log(`[${new Date().toISOString()}] Request Method: POST`);

  const { name, email, message } = req.body;
  console.log(`[${new Date().toISOString()}] Received form data:`, { name, email, message: message ? '[Provided]' : '[Missing]' });

  if (!name || !email || !message) {
    console.log(`[${new Date().toISOString()}] Missing required fields.`);
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    console.log(`[${new Date().toISOString()}] Opening database connection...`);
    const db = await openDb();
    console.log(`[${new Date().toISOString()}] Database connection ready.`);

    // Prepare SQL statement for insertion
    const stmt = await db.prepare('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)');
    
    console.log(`[${new Date().toISOString()}] Inserting message into database...`);
    const result = await stmt.run(name, email, message);
    await stmt.finalize(); // Finalize the statement

    console.log(`[${new Date().toISOString()}] Message inserted successfully. Last ID: ${result.lastID}`);
    
    // Optionally close DB if needed, but often kept open in serverless
    // await closeDb(); 
    
    res.status(200).json({ message: 'Message saved successfully' });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] === DATABASE ERROR ===`);
    console.error('Detailed Error:', error);
    console.error(`[${new Date().toISOString()}] =====================`);
    
    res.status(500).json({ message: 'Failed to save message. Please check server logs.' });
  }
} 