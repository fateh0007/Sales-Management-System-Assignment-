export default function SummaryCards({ rows, meta }) {
  const totalUnits = rows.reduce((sum, r) => sum + (r.quantity || 0), 0);
  const totalAmount = rows.reduce((sum, r) => sum + (r.totalAmount || 0), 0);
  const totalFinal = rows.reduce((sum, r) => sum + (r.finalAmount || 0), 0);
  const totalDiscount = totalAmount - totalFinal;

  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(n || 0);

  return (
    <div className="summary-cards-row">
      <div className="summary-card">
        <p className="summary-label">Total units sold</p>
        <p className="summary-value">{totalUnits}</p>
        <p className="summary-sub">
          On this page ({rows.length} SRs)
        </p>
      </div>

      <div className="summary-card">
        <p className="summary-label">Total Amount</p>
        <p className="summary-value">{formatCurrency(totalAmount)}</p>
        <p className="summary-sub">
          For current page
        </p>
      </div>

      <div className="summary-card">
        <p className="summary-label">Total Discount</p>
        <p className="summary-value">{formatCurrency(totalDiscount)}</p>
        <p className="summary-sub">
          Total − Final (page)
        </p>
      </div>
    </div>
  );
}
