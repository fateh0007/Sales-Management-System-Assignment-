import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";

export default function TopFiltersBar({
  state,
  update,
  regionOptions,
  genderOptions,
  categoryOptions,
  paymentOptions
}) {
  const handleRegionChange = (e) => {
    const value = e.target.value;
    update({
      customerRegion: value ? [value] : [],
      page: 1
    });
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    update({
      gender: value ? [value] : [],
      page: 1
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    update({
      productCategory: value ? [value] : [],
      page: 1
    });
  };

  const handlePaymentChange = (e) => {
    const value = e.target.value;
    update({
      paymentMethod: value ? [value] : [],
      page: 1
    });
  };

  return (
    <div className="top-filters-row">
      <div className="top-filters-left">
        <div className="top-filter-pill">
          <span>Customer Region</span>
          <select value={state.customerRegion[0] || ""} onChange={handleRegionChange}>
            <option value="">All</option>
            {regionOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="top-filter-pill">
          <span>Gender</span>
          <select value={state.gender[0] || ""} onChange={handleGenderChange}>
            <option value="">All</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="top-filter-pill">
          <span>Product Category</span>
          <select
            value={state.productCategory[0] || ""}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="top-filter-pill">
          <span>Payment Method</span>
          <select
            value={state.paymentMethod[0] || ""}
            onChange={handlePaymentChange}
          >
            <option value="">All</option>
            {paymentOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="top-filters-right">
        <SearchBar
          value={state.search}
          onChange={(v) => update({ search: v, page: 1 })}
        />
        <SortDropdown
          sortBy={state.sortBy}
          sortOrder={state.sortOrder}
          onChange={update}
        />
      </div>
    </div>
  );
}
