# Swipe Savvy Freemium Landing Page

## Setup Instructions

1. **Prerequisites**:
   - Node.js (v18+)
   - PostgreSQL
   - Google Places API key

2. **Client Setup**:
   ```bash
   cd client
   npm install
   npm start
```

Runs on http://localhost:3000

3. **Server Setup**:

   ```bash
   cd server
   npm install
   ```

   Create a PostgreSQL database:

   ```bash
   psql -U postgres -c "CREATE DATABASE swipesavvy;"
   ```

   Create a `.env` file in `server/` with:

   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/swipesavvy
   GOOGLE_API_KEY=your-google-api-key
   ```

   Start the server:

   ```bash
   npm run dev
   ```

   Runs on http://localhost:5001

4. **Assets**:

   - Add `logo.png` and `background.jpg` to `client/public/`.

5. **Testing**:

   - Verify business lookup, form submission, and premium user update.
   - Check responsive design on mobile and desktop.
