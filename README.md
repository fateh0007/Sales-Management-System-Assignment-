# Retail Sales Management System

## 1. Overview (3–5 lines)

A web-based Retail Sales Management System built to explore structured sales data.  
It supports advanced search, multi-select filters, sorting, and pagination on top of a CSV dataset.  
The app is structured with a clean separation of frontend and backend responsibilities.

## 2. Tech Stack

- **Backend**: Node.js, Express, csv-parser  
- **Frontend**: React, Vite, Axios  
- **Others**: HTML, CSS

## 3. Search Implementation Summary

- Full-text search on **Customer Name** and **Phone Number**.  
- Case-insensitive matching done on backend in `querySales()`.  
- Search works in combination with filters, sorting, and pagination because all logic is centralized in the service layer.

## 4. Filter Implementation Summary

- Multi-select filters for Customer Region, Gender, Product Category, Payment Method, Tags.  
- Range filters for Age and Date (dateFrom/dateTo).  
- Filters are converted to normalized parameters and processed on backend; combinations are intersected so all active filters apply together.  
- Edge cases like invalid numeric ranges and empty filters are handled gracefully.

## 5. Sorting Implementation Summary

- Sorting supported for **Date (Newest First)**, **Quantity**, and **Customer Name (A–Z)**.  
- Sorting is applied after filtering and search, inside the backend service.  
- Sort order (asc/desc) is controlled via `sortOrder` query parameter and preserved while navigating pages.

## 6. Pagination Implementation Summary

- Fixed page size of **10 items** as per requirement.  
- Backend calculates `totalItems`, `totalPages`, and current `page` and returns them in `meta`.  
- Frontend shows Next / Previous controls while retaining current search, filters, and sorting state.

## 7. Setup Instructions

1. Clone or extract this repository.  
2. Ensure the CSV dataset is present at `backend/truestate_assignment_dataset.csv`.

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs at `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and expects backend at `http://localhost:4000/api`.  
Set `VITE_API_URL` if running on a different URL.