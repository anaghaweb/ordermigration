import { request } from "./woocommerce.js";
import fs from "fs/promises";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

export const DATA_FROM_WOO = async () => {
    const headerFilePath = 'C:/Users/anagh/OneDrive/Desktop/MigrationData/headerValues.csv';
    const jsonFilePath = path.join( path.dirname( headerFilePath ), 'orders.json' );

    let counter = 1;
    let orderList = [];
    let orders = []
    do {
        orders = (
            await request(
                "orders?role=all&per_page=20&context=edit&page=" +
                counter
            ).catch( ( err ) => {
                throw err;
            } )
        )?.data || [];

        orderList = orderList.concat( orders );

        counter++;
    } while ( orders.length > 0 );

    return orderList
}




