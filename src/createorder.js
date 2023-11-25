import axios from 'axios';
import fs from 'fs';
import { DATA_FROM_WOO } from './datafromwoo.js';
import { Fetch_Credentials } from './api.js';
import { retreive_region_id } from './regionid.js';
import { createShippingOption } from './shippingoptionsid.js';
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

const apiUrl = process.env.MEDUSA_BACKEND_URL;
const authToken = await Fetch_Credentials();
let counter = 0;
export const createOrder = async ( orderData ) => {
    try {
        for ( const order of orderData ) {

            const requestData = {
                email: order.billing.email,
                region_id: "reg_01HFRYVCG6RSTA2G62HAVA36VW",
                items: order.line_items.map( item => ( {
                    quantity: item.quantity,
                    variant_id: '',
                    unit_price: ( item.price * 100 ),
                    title: item.name,

                } ) ),

                billing_address: {
                    first_name: order.billing.first_name,
                    last_name: order.billing.last_name,
                    address_1: order.billing.address_1,
                    city: order.billing.city,
                    country_code: order.billing.country.toLowerCase(),
                    postal_code: order.billing.postcode,
                    province: order.billing.state,
                    phone: order.billing.phone,
                },
                shipping_address: {
                    first_name: order.shipping.first_name,
                    last_name: order.shipping.last_name,
                    address_1: order.shipping.address_1,
                    city: order.shipping.city,
                    country_code: order.shipping.country.toLowerCase(),
                    postal_code: order.shipping.postcode,
                    province: order.shipping.state,
                    phone: order.shipping.phone,
                },

                shipping_methods: [
                    {
                        option_id: "so_01HG419RP7W9356Y3GF3PTYHB9",
                    },
                ],
            };

            const response = await axios.post( `${ apiUrl }/admin/draft-orders`, requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ authToken }`,
                },
            } );
            counter++;
            // const filePath = `C:/Users/anagh/OneDrive/Desktop/MigrationData/draftOrder_${ order.id }.json`;
            // writeJsonToFile( filePath, response.data );

            console.log( `Draft order for Woocommerce Order No. ${ order.id } has been created` );

        }
    } catch ( error ) {
        console.error( error );
    }
    console.log( `${ counter } Draft Orders created in MedusaJS backend ` );
};

const writeJsonToFile = ( filePath, jsonData ) => {
    const jsonString = JSON.stringify( jsonData, null, 2 );
    fs.writeFile( filePath, jsonString, 'utf8', ( err ) => {
        if ( err ) {
            console.error( 'Error writing to file:', err );
        } else {
            console.log( 'JSON data has been written to the file successfully.' );
        }
    } );
};

// Get order data from WooCommerce
const orderData = await DATA_FROM_WOO();
// node createorder.js 
createOrder( orderData );
