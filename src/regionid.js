import { client } from './medusa.js';

export const retreive_region_id = async ( data ) => {
    try {

        const { regions } = await client.regions.list();

        let result;

        for ( const region of regions ) {

            for ( const country of region.countries ) {
                if ( data === country.iso_2.toLowerCase() ) {
                    result = country.region_id;

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
