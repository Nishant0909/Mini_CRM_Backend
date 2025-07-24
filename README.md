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
  - This api will be use for the sign up
  - Body: `{ "username", "password", "first_name", "last_name", "user_type" (optional), "user_status" (optional) }`
- **Login:** `POST /api/users/login`
  - This api will be use for the login and it will do the verification of the user and  return JWT token in response
  - Body: `{ "username", "password" }`
  - Sets JWT token in HTTP-only cookie

### Lead Endpoints (require authentication)
- **Create Lead:** `POST /api/leads/createlead`
  - This api will create a lead after verification of the user in the middleware
  - Body: `{ "name", "email", "phone", "status", "source", "notes" (optional) }`
- **Get Leads:** `GET /api/leads/getleadDetails`
  - This api will return all of the active(not deleted) leads
- **Update Lead:** `PUT /api/leads/updatelead/:leadid`
  - This api will update the detail of the particular lead
  - Body: Any updatable lead fields
- **Delete (Archive) Lead:** `DELETE /api/leads/deletelead/:leadid`
  - This api will delete the lead (marked as an archived in db but it will not delete that row)
- **Get Lead Actions:** `GET /api/leads/getleadactions?leadid=LEAD_ID (optional)`
  - This api will return all of the action on that lead (audit log)

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






