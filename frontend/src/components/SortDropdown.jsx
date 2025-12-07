export default function SortDropdown({ sortBy, sortOrder, onChange }) {
  return (
    <div className="sort-dropdown">
      <select
        value={sortBy}
        onChange={(e) => onChange({ sortBy: e.target.value, page: 1 })}
      >
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A–Z)</option>
      </select>

      <button
        onClick={() =>
          onChange({
            sortOrder: sortOrder === "asc" ? "desc" : "asc",
            page: 1
          })
        }
      >
        {sortOrder === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
}
