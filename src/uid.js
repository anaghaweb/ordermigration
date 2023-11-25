import dotenv from "dotenv"
dotenv.config( { path: '../.env' } );

fetch( `${ process.env.MEDUSA_BACKEND_URL }/admin/auth`, {
    credentials: "include",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify( {
        email: process.env.CURRENT_USER_EMAIL,
        password: process.env.CURRENT_USER_PWD,
    } ),
} )
    .then( ( response ) => response.json() )
    .then( ( { user } ) => {
        console.log( user.id )
    } )  
