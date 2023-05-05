# Backend for Daret
This repository contains the backend for Daret project. It is a Node.js application that uses Express as a web framework and MySQL as a database.  It is deployed on Heroku.

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

## Routes

- GET /: A test route that returns a message indicating that the server is running.
- POST /daret: Creates a new daret.
- GET /daret/:daretId: Retrieves information about the specified daret.
- POST /campaign: Creates a new campaign.
- GET /campaign/:campaignAddress: Retrieves information about the specified campaign.
- POST /faucet: Sends 0.001 ETH to the specified address on Optimism Goerli. 

## License

This project is licensed under the MIT License.