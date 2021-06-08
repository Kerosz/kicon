## First time setup

The first step to running Spectrum locally is downloading the code by cloning the repository:

`gh repo clone Kerosz/kicon`

If you get Permission denied error using ssh refer here or you do not have github cli installed.

`git clone https://github.com/Kerosz/kicon`

### Installation
Kicon has big installation steps:
1. **Install yarn**: We use [yarn](https://yarnpkg.com/) to handle our dependencies. (plain npm doesn't work due to our monorepo workspaces setup) See the [yarn documentation for instructions](https://yarnpkg.com/getting-started/install) on installing it.
2. **Give scripts exec rights**: We are using scripty to manage our worspace and apps scripts. For scripty to run them you must make the scripts executable, for UNIX systems run `chmod -R +x scripts` in the root directory `kicon`. For WINDOWS you are on your own but [do check this google search](https://www.google.com/search?hl=en&q=how%20to%20do%20chmod%20in%20windows).
3. **Install dependencies**: Because it's pretty tedious to install the dependencies for each worker individually we have created a script file that leverages yarn workspaces and lerna to take care of it.
   - Run `yarn`
   - Run `yarn config-pck`
4. **Prepare Postgres Db**: You can use the `docker-compose.yml` file present in the tartarus app directory _(RECOMMENDED)_. Alternatively you can search on how you can install and start a Postgres OS on your system.
   - `cd` into tartarus app root directory
    - `docker-compose up -d`
    - `docker ps` and copy the container ID
    - `docker exec -it <container id> bash`
    - `su postgres`
    - `psql postgres`
    - `ALTER ROLE postgres WITH PASSWORD 'password123';`
    - `CREATE DATABASE store_dev;`
    - Modify `database.json` and `.env.development`/`.env.test` with your database configuration _(NOTE: Database name for test env in both .env.test as well as database.json/test should be `store_test`)_
    

#### Environment files
<details>
  <summary>Test Environment Example</summary>

```sh
# env.test example

# Application
HOSTNAME=http://localhost
PORT=8484
API_VERSION=/v1

# Security
ARGON_SECRET=testSecret
JWT_SECRET=testSecret

# Postgres
POSTGRES_HOST=127.0.0.1
POSTGRES_DATABASE=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
```

</details>

<details>
  <summary>Development Environment Example</summary>

```sh
# env.development example

# Application
HOSTNAME=http://localhost
PORT=1234
API_VERSION=/v1

# Security
ARGON_SECRET=devSecret
JWT_SECRET=devSecret

# Postgres
POSTGRES_HOST=127.0.0.1
POSTGRES_DATABASE=store_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
```

</details>

### API Endpoints
The API endpoints can be found temporarily in [tartarus REQUIREMENTS.MD](apps/tartarus/REQUIREMENTS.md), until proper API documentation will be available.

### Running the app locally
Once everything in the installation is done, you can simply `cd` into apps tartarus directory and run `yarn watch`

### Available scripts

#### Workspace level
_**Warning**: Must be in the root project directory_
```sh
  yarn api-docs         # Generates api documentation for the code
  yarn config-pck       # Installs and prepares the packages
  yarn test             # Tests every package (concurrency 1)
  yarn build            # Builds all available packages (concurrency 1)
  yarn lint             # Linting for all packages  (concurrency 1) 
  yarn lint-fix         # Linting with fix flag enables  (concurrency 1)
  yarn prettify         # Prettier, ensures code styling consistency  (concurrency 2)
  yarn prettify-fix     # Prettier with fix flag enabled  (concurrency 2)
  yarn clean            # Removes dist folder and tsbuild from every package
```

#### Apps level
_**Warning**: Must be in the apps `<appname>` directory_
```sh
  yarn api-report       # Generates api report used for code api docs
  yarn build            # Builds package
  yarn watch            # Live development environment
  yarn test-tartarus    # Test script using jasmine and preparing test Db
  yarn test             # Shortcut for test-tartarus
  yarn lint             # Linting
  yarn lint-fix         # Linting with fix flag enabled
  yarn clean            # Removes dist and tsbuild files
  yarn prettify         # Prettier
  yarn prettify-fix     # Prettier with fix flag enabled
```