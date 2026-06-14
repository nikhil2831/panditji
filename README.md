# Pandit Ji Platform

Next.js frontend + backend structure for a Pandit ji service platform.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Structure

- `app/` - frontend pages and backend API routes
- `components/` - reusable UI sections
- `lib/` - backend services, schemas, and shared data
- `types/` - TypeScript domain types

## API Routes

- `GET /api/poojas` - list pooja services
- `POST /api/bookings` - create booking request
