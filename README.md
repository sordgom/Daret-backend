# Backend for Daret
This repository contains the backend for Daret project. It is a Node.js application that uses ExpressJS as a web framework and PostgresQl as a database.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
Node.js
npm or yarn
MySQL

## Installation
Clone the repository:
<br>`git clone https://github.com/sordgom/BE.git`

Change to the project directory:
<br>`cd BE`

Install the required dependencies:
<br>`npm install`

Start the development server:
<br>`npm start`

Check .env.example for the required environment variables.

The backend should now be accessible at http://localhost:8080/.

## Environment Variables

To run this project, you need to add the following environment variables to your .env file

`DB_HOST`: Hostname of the database server.
<br>`DB_USER`: Username for the database.
<br>`DB_PASSWORD`: Password for the database.
<br>`DB_NAME`: Name of the database.
<br>`DB_PORT`: Port of the database server.
<br>`SUPABASE_URL`: URL of the Supabase server.
<br>`SUPABASE_KEY`: API key for the Supabase server.
<br>`INFURA_PROJECT_ID`: Project ID for the Infura server.
<br>`PRIVATE_KEY`: Private key of the account used to deploy the smart contracts.

## License

This project is licensed under the MIT License.