<div align="center">

# 🧵 Daud Fabrics — E-Commerce Website

**A modern, fully responsive online store for premium fabrics, shawls & traditional clothing.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-black?style=for-the-badge&logo=vercel)](https://daud-fabrics-online-store.vercel.app)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

🔗 **[daud-fabrics-online-store.vercel.app](https://daud-fabrics-online-store.vercel.app)**

</div>

---

## 📖 Overview

**Daud Fabrics** is a complete e-commerce experience built for a fabrics & traditional clothing brand — combining a polished **customer-facing storefront** with a **secure, server-authenticated admin system** for managing the catalog. Every screen, from product grids to dashboards, is fully responsive across mobile, tablet, laptop, and large desktop displays.

---

## ✨ Features

### 🛍️ Customer Store
- Modern, animated e-commerce homepage
- Full product catalog with category filtering
- Dedicated **Men's**, **Women's**, and **Seasonal / Summer Lawn** collections
- Rich product detail pages — gallery, thumbnails, pricing, discounts, ratings & reviews
- "Recently Viewed" product tracking
- Related products recommendations
- Add-to-cart & persistent shopping cart
- Live search
- Fully responsive product grids and navigation
- Contact page

### 👤 Customer Accounts
- Customer login / registration
- Personal account dashboard
- Profile & saved address management
- Order-related functionality
- Session-aware protected account views

### 🔐 Admin System
- **Server-side** admin authentication (not client-side/localStorage)
- HttpOnly, `Secure`, `SameSite=Strict` signed session cookies
- Credentials verified against environment variables — never hardcoded
- Protected `/admin-dashboard.html` route enforced by **Vercel Edge Middleware**
- Full product management — add, edit, and remove catalog items
- Clean separation between customer accounts and admin access

### 📱 Fully Responsive Design
Every layout — navigation, product cards, forms, dashboards, and buttons — adapts seamlessly across:

| 📱 Mobile | 📲 Tablet | 💻 Laptop | 🖥️ Desktop | 🖥️ Large Displays |
|:---:|:---:|:---:|:---:|:---:|

---

## 🏗️ Website Structure

```text
Daud Fabrics
│
├── 🏠 Home
│
├── 🛍️ Shop
│   ├── Gents
│   ├── Women's
│   ├── Seasonal
│   └── Products
│
├── 📦 Product Details
│
├── 🛒 Shopping Cart
│
├── 👤 Customer Account
│   └── Account Dashboard
│
├── 📞 Contact
│
└── 🔐 Administration
    ├── Admin Login
    └── Admin Dashboard
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Data | LocalStorage-backed product catalog & cart |
| Backend / Auth | Node.js serverless function (`/api/admin-auth.js`) |
| Route Protection | Vercel Edge Middleware (`middleware.ts`) |
| Hosting | [Vercel](https://vercel.com) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Install the Vercel CLI (if you haven't already)
npm i -g vercel

# Run the project locally with serverless functions & middleware active
vercel dev
```

> ⚠️ **Note:** Opening the HTML files with a plain static server (e.g. VS Code Live Server) will *not* run the admin authentication backend, since it depends on Vercel's serverless functions and middleware. Use `vercel dev` for full functionality locally.

---

## 🔐 Admin Access Setup

The admin dashboard is protected entirely on the server — no admin credentials are ever stored in the codebase or browser. To configure your own admin login:

1. Go to your **Vercel Project → Settings → Environment Variables**
2. Add the following:

| Variable | Description |
|---|---|
| `ADMIN_EMAIL` | Your private admin email |
| `ADMIN_PASSWORD` | A strong, unique password |
| `ADMIN_SESSION_SECRET` | A long random string used to sign session cookies |

3. Redeploy the project.
4. Log in at **`/admin-login.html`** — only requests with the correct credentials receive a signed session cookie, and unauthenticated visits to `/admin-dashboard.html` are rejected at the middleware level.

---

## 📸 Preview

<div align="center">

*(Add screenshots of your homepage, product page, and admin dashboard here)*

</div>

---

## 📄 License

This project is proprietary and built exclusively for **Daud Fabrics**. All rights reserved © 2026.

---

<div align="center">

Made with ❤️ for **Daud Fabrics**

</div>