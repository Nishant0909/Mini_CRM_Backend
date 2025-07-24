# Mini_CRM_Backend

A minimal CRM backend built with Node.js, Express, and MongoDB. It supports user authentication and lead management with action tracking.

## Features
- User registration, login, and logout
- JWT-based authentication (with cookie support)
- Lead creation, update, deletion (archiving), and retrieval
- Tracks user actions on leads
- MongoDB with Mongoose and auto-incremented IDs

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or remote instance)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Mini_CRM_Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory (optional, see below for defaults):
   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   # MONGODB_URI=mongodb://localhost:27017/lead_management
   ```
   - By default, the app connects to `mongodb://localhost:27017/lead_management`.
   - `JWT_SECRET` is used for signing authentication tokens. Default is `defaultsecret` if not set.
   - `PORT` defaults to 3000 if not set.

4. **Start MongoDB:**
   Ensure MongoDB is running locally or update the connection string in `src/config/db.js` if using a remote database.

5. **Run the server:**
   ```bash
   node server.js
   # or for development with auto-reload:
   npx nodemon server.js
   ```

6. **API will be available at:**
   - `http://localhost:3000/`

## API Endpoints

### User Endpoints
- **Register:** `POST /api/users/register`
  - Body: `{ "username", "password", "first_name", "last_name", "user_type" (optional), "user_status" (optional) }`
- **Login:** `POST /api/users/login`
  - Body: `{ "username", "password" }`
  - Sets JWT token in HTTP-only cookie
- **Logout:** `POST /api/users/logout`

### Lead Endpoints (require authentication)
- **Create Lead:** `POST /api/leads/createlead`
  - Body: `{ "name", "email", "phone", "status", "source", "notes" (optional) }`
- **Get Leads:** `GET /api/leads/getleadDetails`
- **Update Lead:** `PUT /api/leads/updatelead/:leadid`
  - Body: Any updatable lead fields
- **Delete (Archive) Lead:** `DELETE /api/leads/deletelead/:leadid`
- **Get Lead Actions:** `GET /api/leads/getleadactions?leadid=LEAD_ID (optional)`

#### Authentication
- Pass JWT token as a Bearer token in the `Authorization` header, or use the cookie set by login.

### Example `.env` file
```
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
# MONGODB_URI=mongodb://localhost:27017/lead_management
```

## Project Structure
```
Mini_CRM_Backend/
  server.js
  src/
    app.js
    config/
      db.js
    controllers/
      leadController.js
      userController.js
    middleware/
      auth.js
    models/
      Lead.js
      User.js
      UserLeadAction.js
    routes/
      leadRoutes.js
      userRoutes.js
    services/
      leadService.js
      userService.js
```

## License
ISC