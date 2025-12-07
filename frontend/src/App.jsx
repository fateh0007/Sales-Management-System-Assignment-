import "./styles/layout.css";
import { useSalesQuery } from "./hooks/useSalesQuery";
import Sidebar from "./components/Sidebar";
import TopFiltersBar from "./components/TopFiltersBar";
import SummaryCards from "./components/SummaryCards";
import SalesTable from "./components/SalesTable";
import Pagination from "./components/Pagination";

export default function App() {
  const { state, update, result, loading } = useSalesQuery();

  const regionOptions = ["North", "South", "East", "West"];
  const genderOptions = ["Male", "Female", "Other"];
  const paymentOptions = ["Cash", "Card", "UPI", "Netbanking", "Wallet", "Debit Card", "Credit Card"];
  const categoryOptions = ["Clothing", "Electronics", "Beauty", "Grocery"];

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Sales Management System</h1>
      </header>

      <div className="app-body">
        <Sidebar />

        <main className="app-content">
          <TopFiltersBar
            state={state}
            update={update}
            regionOptions={regionOptions}
            genderOptions={genderOptions}
            categoryOptions={categoryOptions}
            paymentOptions={paymentOptions}
          />

          <SummaryCards rows={result.data || []} meta={result.meta} />

          <section className="table-section">
            {loading ? (
              <div className="loading-state">Loading...</div>
            ) : (
              <>
                <SalesTable rows={result.data || []} />
                <div className="pagination-wrapper">
                  <Pagination
                    meta={result.meta}
                    onPageChange={(page) => update({ page })}
                  />
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
