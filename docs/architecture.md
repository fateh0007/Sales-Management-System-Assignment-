# Architecture

## Backend Architecture

- **Stack**: Node.js, Express, csv-parser.
- **Entry Point**: `backend/src/index.js`
- **Layers**
  - **Routes** (`routes/salesRoutes.js`): HTTP routing (`GET /api/sales`).
  - **Controller** (`controllers/salesController.js`): Converts HTTP request → service parameters, returns JSON.
  - **Service** (`services/salesService.js`): Business logic for search / filter / sort / pagination on in-memory dataset.
  - **Utils** (`utils/dataLoader.js`): Loads CSV once on startup, normalizes headers, converts types.

- **Data Flow**
  1. Server starts → `loadSalesData()` reads CSV → `setSalesData()` stores it in memory.
  2. Client calls `GET /api/sales?search=&customerRegion=&...`.
  3. Controller calls `querySales(params)` in the service.
  4. Service applies search → filters → sort → pagination and returns `{ data, meta }`.
  5. JSON is sent back to frontend.

## Frontend Architecture

- **Stack**: React + Vite, Axios.
- **Entry Point**: `frontend/src/main.jsx`, root component `App.jsx`.

- **Key Modules**
  - **Hooks**
    - `useSalesQuery.js`: Holds UI state (search, filters, sort, page) and fetches data from backend.
  - **Components**
    - `SearchBar`: text input for full-text search.
    - `FiltersPanel`: multi-select filters (region, gender, payment, etc.).
    - `SortDropdown`: sort by date / quantity / name and toggle asc/desc.
    - `SalesTable`: main transaction table.
    - `Pagination`: next/previous navigation (page size fixed at 10).
  - **Services**
    - `api.js`: Axios instance and `fetchSales()` wrapper.

- **Data Flow**
  1. User interacts with search / filters / sort / pagination.
  2. `useSalesQuery` updates local state and triggers an API call with query params.
  3. Backend responds with `{ data, meta }`.
  4. `SalesTable` renders rows; `Pagination` uses `meta` to show navigation.

## Folder Structure

- `backend/` – server-side code.
- `frontend/` – client app.
- `docs/` – additional documentation.
- `README.md` – high-level overview.