# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Show (args: product id)
- ShowAll
- ShowTop
- Create [admin token required]
- Update (args: product id) [admin token required]
- Remove (args: product id) [admin token required]

#### Auth
- Create N
- Authenticate
- Create N Admin

#### Users
- Show (args: user id)
- ShowAll[admin token required]
- ShowAllAddresses (args: user id) [owner token required]
- ShowAddress (args: user id, address id) [owner token required]
- ShowAllOrdersByUser (args: user id) [owner token required]
- Create N Address (args: user id) [owner token required]

#### Orders
- Show (args: order id, query: status ["pending" | "delivered"]) [auth token required]
- ShowAll [admin token required]
- ShowComplete (args: order id) [auth token required]
- Create N [auth token required]
- Insert Product to Order (args: order id) [auth token required]

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