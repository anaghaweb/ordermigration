import Medusa from "@medusajs/medusa-js";
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

export const client = new Medusa( {
  credentials: true,
  baseUrl: process.env.MEDUSA_BACKEND_URL,
  maxRetries: 3,
} );

