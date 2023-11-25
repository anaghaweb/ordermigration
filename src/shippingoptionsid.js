import { client } from './medusa.js';
import { Fetch_Credentials } from "./api.js";
import { retreive_region_id } from "./regionid.js";
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

export const createShippingOption = async ( value ) => {
    try {
        const authToken = await Fetch_Credentials();
        const regionid = await retreive_region_id( value );
        const response = await fetch( `${ process.env.MEDUSA_BACKEND_URL }/admin/shipping-options`, {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ authToken }`
            },
            body: JSON.stringify( {
                name: "PostFake",
                region_id: regionid,
                provider_id: "manual",
                price_type: "flat_rate",
                data: {},
                amount: 0,
            } ),
        } );

        if ( !response.ok ) {
            throw new Error( `Failed to create shipping option. Status: ${ response.status }` );
        }
        const { shipping_option } = await response.json();
        return shipping_option.id
    } catch ( error ) {
        console.error( "Error creating shipping option:", error.message );
    }
};

