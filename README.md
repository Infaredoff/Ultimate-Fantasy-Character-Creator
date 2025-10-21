# The Ultimate Fantasy Character Creator

This application generates detailed fantasy characters and beasts using the Google Gemini API.

## Project Status

This project is currently a **frontend-only application**. All data is generated and stored in your web browser's local storage. This is great for demonstration, but for a real-world application, you'll want a backend and a database to persist data and secure your API key.

This codebase has been prepared for a transition to a full-stack application.

## Preparing for Deployment (Your Next Steps)

To deploy this as a full-featured web application on a platform like Render with a MongoDB Atlas database, you need to build a backend server.

### 1. Build a Backend Server

You'll need a server (e.g., using Node.js and the Express framework) that does the following:

-   **Securely Call the Gemini API**: The logic in `services/geminiService.ts` should be moved to your backend. Your server will receive requests from the frontend, call the Gemini API, and then send the results back. This protects your `API_KEY`.
-   **Connect to MongoDB**: Use the `MONGODB_URI` to connect your server to your MongoDB Atlas database. You can use a library like Mongoose to define schemas for your Characters and Beasts.
-   **Create API Endpoints**: Your server needs to provide routes that the frontend can call. For example:
    -   `GET /api/characters`: Fetch all saved characters for a user.
    -   `POST /api/characters`: Receive user input, call Gemini to generate a character, save it to the database, and return it.
    -   `DELETE /api/characters/:id`: Delete a character.
    -   (Similar endpoints for `beasts` and `profile`).

### 2. Set Up Environment Variables

Your backend server will need a `.env` file to store your secrets. A `.env.example` file has been provided for you. Create a `.env` file in the root of your **backend project** and add your credentials.

```
API_KEY="YOUR_GEMINI_API_KEY"
MONGODB_URI="YOUR_MONGODB_CONNECTION_STRING"
PORT=3001
```

### 3. Update the Frontend API Service

The file `services/apiService.ts` has been created to make switching to your backend easy. It currently uses local browser functionality. Once your backend is running, you can replace the existing logic in that file with `fetch()` calls to your new server endpoints.

### 4. Deploy

1.  **Push to GitHub**: Create a repository and push your frontend and backend code.
2.  **Deploy on Render**:
    -   Create a new **Web Service** on Render for your backend. Connect it to your GitHub repo and add your environment variables (`API_KEY`, `MONGODB_URI`) in the Render dashboard.
    -   Create a new **Static Site** on Render for your frontend. Connect it to the same repo and point it to serve the static files.

## Running Locally

This project is set up to run directly in the browser from the `index.html` file, which uses ES modules and an import map. You will need a simple local web server to serve the files to avoid CORS issues with module loading.
