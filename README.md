# Zoma

Zoma is a full-stack e-commerce web application for cleaning products. This repository contains the **frontend** — a React/TypeScript storefront and admin interface that consumes a separate Node.js/Express/PostgreSQL backend API. The app supports bilingual content (Georgian/English) throughout the storefront and admin experience.

## Features

- 🛒 Full e-commerce flow: product browsing, product detail pages, cart, checkout, and order history
- 🌐 Bilingual support (Georgian/English) via i18next, including translated product data
- 🔐 Authentication & authorization (JWT-based, consuming the backend API)
- 👤 User accounts: registration, login, profile editing, password change, and delivery address management
- 🗂️ Admin panel: manage products, categories, variants, and orders
- 🧾 Product variants (e.g. capacity/size options) with per-variant images and translated instructions
- ⚡ Performance-optimized frontend (lazy-loaded routes, optimized image loading, memoized components)

## Tech Stack

- React + TypeScript
- Vite
- React Router
- i18next (Georgian/English)
- Tailwind CSS
- Zustand (cart state)

## Project Structure
