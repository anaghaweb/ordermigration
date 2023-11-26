import dotenv from 'dotenv';
import { Fetch_Credentials } from "./api.js";
import { retreive_region_id } from './regionid.js';

dotenv.config( { path: '../../.env' } );
export const Shipping_Options_ID_Generator = async ( countryCode ) => {

    try {
        const authToken = await Fetch_Credentials();
        const regionId = await retreive_region_id( countryCode );

        const response = await fetch( `${ process.env.MEDUSA_BACKEND_URL }/store/shipping-options?is_return=true`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ authToken }`,
            },

        } )
        if ( !response.ok ) {
            throw new Error( `Failed to fetch shipping option ID due to : ${ response.status }` );
        }
        const result = await response.json();
        const filteredOptions = result.shipping_options
            .filter( data => data.region_id === regionId )

        if ( filteredOptions.length === 0 ) {
            return null;
        }


        const lowestPriceOption = filteredOptions.reduce( ( minOption, option ) => {
            return option.price_incl_tax < minOption.price_incl_tax ? option : minOption;
        } );

        return lowestPriceOption.id;
    }
    catch ( error ) {
        console.error( `Failed to retreive shipping option due to : ${ error }` )
    }

}

