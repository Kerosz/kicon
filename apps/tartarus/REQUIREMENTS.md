# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Show (args: product id) [ GET ]
    - `{{ baseUrl }}/v1/products/:id`
- ShowAll [ GET ]
    - `{{ baseUrl }}/v1/products`
- ShowTop (query: limit [ "number" ]) [ GET ]
    - `{{ baseUrl }}/v1/products/show/top?limit=5`
- Create [ POST ] [admin token required]
    - `{{ baseUrl }}/v1/products`
    - Body: `{
      "name": "Structures: Or Why Things Don't Fall Down",
      "description": "Structures: Or Why Things Don't Fall Down is an informal explanation of the basic forces that hold together the ordinary and essential things of this world--from buildings and bodies to flying aircraft and eggshells.",
      "price": 32,
      "stock": 4
      }`
- Update (args: product id) [ PATCH ] [admin token required]
    - `{{ baseUrl }}/v1/products/:id`
    - Body: `{
      "stock": 40,
      "price": 221
      }`
- Remove (args: product id) [ DELETE ] [admin token required]
    - `{{ baseUrl }}/v1/products/:id`

#### Auth
- Create N [ POST ]
    - `{{ baseUrl }}/v1/signup`
    - Body: `{
      "email": "customer@example.com",
      "password": "password123",
      "first_name": "Customer",
      "last_name": "Customer"
      }`
- Authenticate
    - `{{ baseUrl }}/v1/signin`
    - Body: `{
      "email": "customer@example",
      "password": "password123"
      }`
- Create N Admin
    - `{{ baseUrl }}/v1/create-admin-account`
    - Body: `{
      "email": "admin@example.com",
      "password": "password123"
      }`

#### Users
- Show (args: user id) [ GET ]
    - `{{ baseUrl }}/v1/users/:id`
- ShowAll [ GET ] [admin token required]
    - `{{ baseUrl }}/v1/users`
- Update [ PATCH ] [owner token required]
    - `{{ baseUrl }}/v1/users/:id`
    - Body: `{
      "display_name": "customer"
      }`
- Create N Address (args: user id) [ POST ] [owner token required]
    - `{{ baseUrl }}/v1/users/:id/address`
    - Body: `{
      "first_name": "Customer",
      "last_name": "Customer",
      "address1": "Str. Kicon, Nr. 6",
      "address2": null,
      "country": "Romania",
      "city": "Brasov",
      "state": "BV",
      "postal_code": null,
      "phone": "0753978444"
      }`
- ShowAllAddresses (args: user id) [ GET ] [owner token required]
    - `{{ baseUrl }}/v1/users/:id/addresses`
- ShowAddress (args: user id, address id) [ GET ] [owner token required]
    - `{{ baseUrl }}/v1/users/:id/address/:addressId`
- ShowAllOrdersByUser (args: user id) [ GET ] [owner token required]
    - `{{ baseUrl }}/v1/users/:id/orders`

#### Orders
- Show (args: order id, query: status ["pending" | "delivered"]) [ GET ] [auth token required]
    - `{{ baseUrl }}/v1/orders/:id?status=pending`
- ShowAll [ GET ] [admin token required]
    - `{{ baseUrl }}/v1/orders`
- ShowComplete (args: order id) [ GET ] [auth token required]
    - `{{ baseUrl }}/v1/orders/:id/products`
- Create N [ POST ] [auth token required]
    - `{{ baseUrl }}/v1/orders`
    - Body: `{
      "user_id": "<must match an existing user ID in database>",
      "shipping_address_id": "<must match an existing address ID in database>",
      "billing_address_id": "<must match an existing address ID in database>",
      "total": 200,
      "total_discount": 0,
      "comment": "I would like to test the order endpoint!"
      }`
- Insert Product to Order (args: order id) [ POST ] [auth token required]
    - `{{ baseUrl }}/v1/orders/:id/products`
    - Body: `{
      "product_id": "<must match an existing product ID in database>",
      "quantity": 1,
      "price": 16
      }`

## Data Shapes
#### Product

- id `VARCHAR(50) PRIMARY KEY`
- name `VARCHAR(255) NOT NULL`
- description `TEXT NOT NULL`
- price `DECIMAL NOT NULL`
- stock `INTEGER NOT NULL`
- created_at `VARCHAR(255) NOT NULL`
- updated_at `VARCHAR(255) NOT NULL`

#### User
- id `VARCHAR(50) PRIMARY KEY`
- email `VARCHAR(255) UNIQUE NOT NULL`
- password `VARCHAR(255) NOT NULL`
- role `VARCHAR(15) DEFAULT 'customer'`
- first_name `VARCHAR(100) NOT NULL`
- last_name `VARCHAR(100) NOT NULL`
- display_name `VARCHAR(150)`
- birthday `DATE`
- created_at `VARCHAR(255) NOT NULL`
- updated_at `VARCHAR(255) NOT NULL`

#### Orders
- id `VARCHAR(50) PRIMARY KEY`
- user_id `VARCHAR(50) REFERENCES users(id)`
- shipping_address_id `VARCHAR(50) REFERENCES addresses(id)`
- billing_address_id `VARCHAR(50) REFERENCES addresses(id)`
- shipping_no `VARCHAR(50) NOT NULL`
- invoice_no `VARCHAR(50) NOT NULL`
- invoice_date `VARCHAR(255) NOT NULL`
- delivery_date `VARCHAR(255) NOT NULL`
- status `VARCHAR(15) NOT NULL`
- total `NUMERIC NOT NULL`
- total_discount `NUMERIC NOT NULL DEFAULT 0`
- comment `TEXT`
- created_at `VARCHAR(255) NOT NULL`
- updated_at `VARCHAR(255) NOT NUL`

#### Addresses
- id `VARCHAR(50) PRIMARY KEY`
- user_id `VARCHAR(50) REFERENCES users(id)`
- first_name `VARCHAR(100) NOT NULL`
- last_name `VARCHAR(100) NOT NULL`
- address1 `VARCHAR(255) NOT NULL`
- address2 `VARCHAR(255)`
- country `VARCHAR(255) NOT NULL`
- city `VARCHAR(255) NOT NULL`
- state `VARCHAR(255) NOT NULL`
- postal_code `VARCHAR(50)`
- phone `VARCHAR(50) NOT NULL`
- created_at `VARCHAR(255) NOT NULL`
- updated_at `VARCHAR(255) NOT NUL`