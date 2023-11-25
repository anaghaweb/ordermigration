import axios from 'axios';
import { Fetch_Credentials } from './api.js';
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

const AUTH_TOKEN = await Fetch_Credentials();

async function fetchDraftOrderIds() {
    try {
        const response = await axios.get( `${ process.env.MEDUSA_BACKEND_URL }/admin/draft-orders`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ AUTH_TOKEN }`,
            },
        } );

        const { draft_orders } = response.data;
        return draft_orders.map( order => order.id );
    } catch ( error ) {
        console.error( error );
        throw error;  // Re-throw the error to handle it outside this function
    }
}

async function deleteDraftOrders( ids ) {
    for ( const id of ids ) {
        try {
            const response = await axios.delete( `http://localhost:9000/admin/draft-orders/${ id }`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ AUTH_TOKEN }`,
                },
            } );

            const { id: deletedId, object, deleted } = response.data;
            console.log( `Draft order with ID ${ deletedId } deleted: ${ deleted }` );
        } catch ( error ) {
            console.error( `Error deleting draft order with ID ${ id }:`, error );
        }
    }
}

async function main() {
    try {
        const draftOrderIds = await fetchDraftOrderIds();
        // console.log( 'Fetched draft order IDs:', draftOrderIds );

        if ( draftOrderIds.length > 0 ) {
            await deleteDraftOrders( draftOrderIds );
            console.log( 'All draft orders deleted successfully.' );
        } else {
            console.log( 'No draft orders to delete.' );
        }
    } catch ( error ) {
        console.error( 'An error occurred:', error );
    }
}

// Call the main function
main();
