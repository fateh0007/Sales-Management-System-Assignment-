export default function SalesTable({ rows }) {
  if (!rows.length) {
    return <div className="no-results">No transactions found.</div>;
  }

  return (
    <table className="sales-table">
      <thead>
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Product Category</th>
          <th>Quantity</th>
          <th>Payment Method</th>
          <th>Total Amount</th>
          <th>Final Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, idx) => (
          <tr key={idx}>
            <td>{r.transactionId}</td>
            <td>
              {r.date ? new Date(r.date).toLocaleDateString() : ""}
            </td>
            <td>{r.customerId}</td>
            <td>{r.customerName}</td>
            <td>{r.phoneNumber}</td>
            <td>{r.gender}</td>
            <td>{r.age}</td>
            <td>{r.productCategory}</td>
            <td>{r.quantity}</td>
            <td>{r.paymentMethod}</td>
            <td>{r.totalAmount}</td>
            <td>{r.finalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
