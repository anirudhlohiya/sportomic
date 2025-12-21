# Sportomic Backend API

This is the backend API for the Sportomic sports facility management system. It provides RESTful endpoints for managing venues, bookings, members, and transactions, along with dashboard analytics.

## Features

- RESTful API design
- MongoDB integration with Mongoose
- Dashboard analytics for revenue, bookings, and member metrics
- Comprehensive data management for sports facilities

## API Endpoints

### Venues
- `GET /api/venues` - Get all venues
- `GET /api/venues/:id` - Get a specific venue
- `POST /api/venues` - Create a new venue
- `PUT /api/venues/:id` - Update a venue
- `DELETE /api/venues/:id` - Delete a venue

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get a specific booking
- `POST /api/bookings` - Create a new booking
- `PUT /api/bookings/:id` - Update a booking status
- `DELETE /api/bookings/:id` - Delete a booking

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get a specific member
- `POST /api/members` - Create a new member
- `PUT /api/members/:id` - Update a member
- `DELETE /api/members/:id` - Delete a member

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get a specific transaction
- `POST /api/transactions` - Create a new transaction

### Dashboard
- `GET /api/dashboard/general` - Get general dashboard metrics
- `GET /api/dashboard/revenue-by-venue` - Get revenue data by venue

## Dashboard Screenshots

### Frontend Dashboard
![Frontend Dashboard](https://image2url.com/images/1766296920545-bc256d0c-b2e1-4554-abc3-b5bfff6bf5c9.png)

### Revenue by Venue Graph
![Revenue by Venue Graph](https://image2url.com/images/1766296952047-3bd34f14-6a5f-44ae-a228-540ae381527c.png)

### Showing Different Venues Through Dropdown
![Showing Different Venues Through Dropdown](https://image2url.com/images/1766296968902-0df5d1cc-c6cf-46a5-8b26-301fdf551ff3.png)

### Showing Another Venue Revenue Dashboard
![Showing Another Venue Revenue Dashboard](https://image2url.com/images/1766296987144-a4178f0e-6214-4fd1-a23e-9ee1f23cb075.png)

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Set up your environment variables in `.env`:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
5. Start the server:
   ```
   npm start
   ```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Dotenv for environment management

## Contributing

For major changes, please open an issue first to discuss what you would like to change.