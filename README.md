# Zoma

Zoma is a full-stack e-commerce web application for cleaning products, built with a React/TypeScript frontend and a Node.js/Express/PostgreSQL backend. The app supports bilingual content (Georgian/English) throughout the storefront and admin experience.

## Features

- 🛒 Full e-commerce flow: product browsing, product detail pages, cart, checkout, and order history
- 🌐 Bilingual support (Georgian/English) via i18next, including translated product data
- 🔐 Authentication & authorization with JWT and bcrypt-hashed passwords
- 👤 User accounts: registration, login, profile editing, password change, and delivery address management
- 🗂️ Admin panel: manage products, categories, variants, and orders
- 🧾 Product variants (e.g. capacity/size options) with per-variant images and translated instructions
- ⚡ Performance-optimized frontend (lazy-loaded routes, optimized image loading, memoized components)

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- React Router
- i18next (Georgian/English)
- Tailwind CSS
- Zustand (cart state)

**Backend**
- Node.js + Express
- PostgreSQL (`pg`)
- JWT authentication
- bcrypt for password hashing

## Project Structure

```
zoma/
├── client/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── locales/        # en / ka translation files
│   └── vite.config.ts
├── server/                  # Express + PostgreSQL backend
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   └── db/
└── README.md
```

## Database Schema (overview)

- **products** — core product data
- **product_variants** — variant-level data (e.g. `capacity`)
- **product_translations** — localized text content (e.g. instructions as `TEXT[]`)
- **product_images** — product/variant images
- **categories** — category data with JSONB `name` (`en`/`ka` keys)
- **orders** / **order_items** — order data and line items
- **users** — account data
- **addresses** — delivery addresses

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/zoma.git
cd zoma
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=3000
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/zoma
JWT_SECRET=your_jwt_secret
```

Run the server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### 3. Frontend setup

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_URL=http://localhost:3000
```

Run the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Overview

| Resource | Endpoints |
|---|---|
| Products | `GET /products`, `GET /products/:id`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id` |
| Categories | `GET /categories`, `POST /categories`, `PUT /categories/:id`, `DELETE /categories/:id` |
| Orders | `GET /orders`, `GET /orders/:id`, `POST /orders` |
| Users | `POST /users/register`, `POST /users/login`, `GET /users/me`, `PUT /users/me` |
| Addresses | `GET /addresses`, `POST /addresses`, `PUT /addresses/:id`, `DELETE /addresses/:id` |

> Admin-only endpoints require a valid JWT belonging to a user with the `admin` role.

## Roadmap

- [ ] Payment integration
- [ ] Order status tracking / notifications
- [ ] Product search & filtering improvements
- [ ] Automated tests (backend & frontend)

## License

This project is licensed under the MIT License.

## Author

Built by Luka — (https://github.com/lukakhara/Zoma)
