# RUPP Payment Portal

A complete React-based payment portal for the Royal University of Phnom Penh (RUPP) built with TypeScript, React Router, and Tailwind CSS.

## Features

- **Home Page** - Landing page with features and call-to-actions
- **About Us** - Information about the portal, mission, vision, and team
- **Login/Registration** - Authentication page with tabbed interface
- **Student Dashboard** - View payment history and status
- **Payment Submission** - Submit new tuition payments with receipt upload
- **Admin Dashboard** - Review and approve/reject student payments

## Tech Stack

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Vite
- Laravel 12 API backend
- SQLite database

## Installation

1. Navigate to the project directory:

```bash
cd rupp-payment-portal
```

2. Install dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
cd ..
```

4. Start the Laravel API server:

```bash
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

5. In a second terminal, start the React development server:

```bash
npm run dev
```

6. Open your browser and visit `http://localhost:5173`

The React app uses `VITE_API_URL=http://127.0.0.1:8000/api` by default. Create a local `.env` from `.env.example` if your API runs somewhere else. The backend allows `http://localhost:5173` and `http://127.0.0.1:5173` by default; set `FRONTEND_URLS` in `backend/.env` to change that list.

Demo accounts seeded by Laravel:

- Student: `student@rupp.edu.kh` / `student123`
- Admin: `admin@rupp.edu.kh` / `admin123`

## Project Structure

```
rupp-payment-portal/
├── src/
│   ├── components/       # Reusable components (Header, Footer)
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── PaymentSubmission.tsx
│   │   └── AdminDashboard.tsx
│   ├── App.tsx          # Main app with routing
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Routes

- `/` - Home page
- `/about` - About us page
- `/login` - Login/Registration page
- `/student/dashboard` - Student dashboard (payment history)
- `/student/payment` - Submit new payment
- `/admin/dashboard` - Admin dashboard (approve/reject payments)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## License

© 2024 Royal University of Phnom Penh. All rights reserved.
