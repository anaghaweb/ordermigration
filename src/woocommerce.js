import OAuth from "oauth-1.0a";
import axios from "axios";
import createHmac from "create-hmac";
import dotenv from 'dotenv';
dotenv.config( { path: '../.env' } );

export const request = async ( endpoint, options = { method: "GET" } ) => {
  validateEnv();
  const url = `${ process.env.WOO_URL }/wp-json/wc/v3/${ endpoint }`;
  const isHttps = process.env.WOO_URL.startsWith( "https" );
  const params = !isHttps
    ? getOAuth().authorize( { url, method: options.method } )
    : undefined;
  const basicAuth = isHttps ? getBasicAuth() : {};
  return axios.request( {
    url,
    params,
    headers: basicAuth,
    ...options,
  } );
};

function getBasicAuth() {
  return {
    Authorization: `Basic ${ Buffer.from(
      `${ process.env.WOO_CONSUMER_KEY }:${ process.env.WOO_CONSUMER_SECRET }`
    ).toString( "base64" ) }`,
  };
}

function getOAuth() {
  const data = {
    consumer: {
      key: process.env.WOO_CONSUMER_KEY,
      secret: process.env.WOO_CONSUMER_SECRET,
    },
    signature_method: "HMAC-SHA256",
    hash_function: ( base, key ) => {
      return createHmac( "sha256", key ).update( base ).digest( "base64" );
    },
  };

  return new OAuth( data );
}

function validateEnv() {
  if ( !process.env.WOO_URL ) throw new Error( "WOO_URL is required in .env file" );
  if ( !process.env.WOO_CONSUMER_KEY )
    throw new Error( "WOO_CONSUMER_KEY is required in .env file" );
  if ( !process.env.WOO_CONSUMER_SECRET )
    throw new Error( "WOO_CONSUMER_SECRET is required in .env file" );
}
