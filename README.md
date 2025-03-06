# Pillar Product services

## Description
This is a Node.js project designed to provide a scalable and efficient solution for web applications. It includes essential configurations and APIs to streamline development.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Scripts](#scripts)

## Deployment 
Services deployed in next link [https://nexu-challange.onrender.com](https://nexu-challange.onrender.com)
Im using Render service to deploy in free tier, this means if the service not response inmediatly is beacuase the instance is off, just wait a few menuts (2 or 3 minuts) and try again to get response from any service

## Installation
```sh
# Clone the repository
git clone https://github.com/angel-sm/nexu-challange.git
cd nexu-challange

# Install dependencies
npm install
```

## Usage
```sh
# Build application
dcocker compose build

# Start the application
dcocker compose up

# Run in development mode
npm run start:dev
```

## Configuration
Describe any necessary environment variables or configurations required for the project.
Example:
```sh
PORT=3000
NODE_ENV=production
DATABASE_URL=postgresql://localhost/mydb?user=other&password=secret
```

## API Reference
If your project has an API, document the available endpoints.
```sh
'GET'  │ '/brands'            │
'GET'  │ '/models'            │
'GET'  │ '/brands/:id/models' │
'POST' │ '/brands'            │
'POST' │ '/brands/:id/models' │
'PUT'  │ '/models/:id'      
```

## Scripts
List useful scripts that can be run using npm.
```sh
npm run start    # Start the application
npm run start:dev      # Run in development mode
npm run build    # Build the project
```
