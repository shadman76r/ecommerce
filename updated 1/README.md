# GreenMart — React + Node.js e-commerce starter

A modern, green-themed storefront with a React frontend and an Express
backend. Includes a sticky header (logo, search, cart), a 4-card category
carousel (2 shown at a time), a top-selling grid, a comments section, a
footer, and a sticky cart panel that appears on the right side of the
screen once a customer adds a product.

## Project structure

```
ecommerce-app/
├── client/     React app (create-react-app)
└── server/     Express API
```

## Running the backend

```bash
cd server
npm install
npm start
```

The API runs on **http://localhost:5000** and exposes:
- `GET /api/products` — all products (optional `?category=` filter)
- `GET /api/products/top-selling` — the four top sellers
- `GET /api/products/:id` — a single product
- `GET /api/categories` — the four categories
- `GET /api/comments` — customer comments

## Running the frontend

In a second terminal:

```bash
cd client
npm install
npm start
```

The app runs on **http://localhost:3000** and calls the API at
`http://localhost:5000/api` by default. To point it elsewhere, create a
`client/.env` file:

```
REACT_APP_API_BASE=http://your-api-host/api
```

If the API is unreachable, the frontend automatically falls back to local
sample data so the UI still works during development.

## How the pieces map to your brief

- **Header** — logo + name (left), search bar (center), cart icon with a
  live item-count badge (right).
- **Category section** — 4 category cards, shown two at a time with
  arrow buttons and dots to slide to the other two.
- **Top selling** — a 4-product grid pulled from the top sellers in the
  catalog.
- **Comments** — a form to post a comment plus a grid of existing
  customer reviews.
- **Footer** — brand blurb, shop links, support links, and an email
  signup.
- **Sticky cart** — once a product is added, a panel appears fixed to
  the right side, vertically centered, listing everything added so far
  with quantity controls and a running total.

## Customizing

- Product/category/comment data lives in `server/data/products.js` —
  point this at a real database when you're ready.
- Colors and fonts are defined as CSS variables at the top of
  `client/src/index.css`.
