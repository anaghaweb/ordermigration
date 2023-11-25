# OrderMigration

This is an internal tool to migrate order data from woocommerce to medusajs backend.

The orders created are Draft-orders which further have to be processed for payment and converted to regular order.

The available object types to migrate currently are

- orders from woocommerce

## Usage

`Only create orders for US region`

Before using any commands - fill the necessary .env file data
currently works only for

### Env file

On the repository you will find an .env.template file, copy and paste the content on .env file at root and fill the variables, if a command requires an env variable and it is not set then a error will throw

`Below values have to be filled in with your admin-user and admin-pwd the .env file. They are used in files - api.js and uid.js to retreive Authentication-token and current-user-login-ID without which the module will fail to run`

CURRENT_USER_EMAIL
CURRENT_USER_PWD

```
Commands:
`navigate to src folder`

To create draft-orders, run:-
node createorder.js

To delete all the draft-orders, run:-
node deletedraftorder.js
/* WARNING - using the above command deletes ALL the draft-orders from the draft-order tab */

```
