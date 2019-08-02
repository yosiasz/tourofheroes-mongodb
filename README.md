# Tour of heroes using MS SQL Server

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/yosiasz/tourofheroes-mongodb
   cd tourofheroes-mongodb
   ```

1. Install the npm packages

   ```bash
   npm install
   ```

## SQL Server
1. Change your mongodb.js config file to use either a SQL Account or dedicated AD service account. 
   Here we will a SQL Account
2. Create a database named **heroes**
3. Open and run the sql scripts under ./src/sqlscript folder

## Technologies
- https://www.npmjs.com/package/mongodb
- https://expressjs.com/