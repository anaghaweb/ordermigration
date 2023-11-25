import { client } from './medusa.js';
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

export const retreive_region_id = async ( data ) => {
    try {

        const { regions } = await client.regions.list();
        let result;
        for ( const region of regions ) {
            for ( const country of region.countries ) {
                if ( data === country.iso_2.toLowerCase() ) {
                    result = region.id;
                    break;
                }
            }
        }

        return result;
    } catch ( error ) {
        console.error( "Error fetching regions:", error );
        return null;
    }
};

