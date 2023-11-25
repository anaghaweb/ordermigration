import { client } from './medusa.js';
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

export const Fetch_Credentials = async () => {
    try {
        const { access_token } = await client.admin.auth.getToken( {
            email: process.env.CURRENT_USER_EMAIL,
            password: process.env.CURRENT_USER_PWD,
        } );

        return access_token;
    } catch ( error ) {
        console.error( "Error fetching credentials:", error );
        return null;
    }
};


