export default function FiltersPanel({
  regions,
  genders,
  categories,
  payments,
  selected,
  onChange
}) {
  const toggleMulti = (key, value) => {
    const current = new Set(selected[key]);
    if (current.has(value)) {
      current.delete(value);
    } else {
      current.add(value);
    }
    onChange({ [key]: Array.from(current), page: 1 });
  };

  return (
    <aside className="filters-panel">
      <h4>Filters</h4>

      <section>
        <p>Customer Region</p>
        <div className="chips">
          {regions.map((r) => (
            <button
              key={r}
              className={
                selected.customerRegion.includes(r) ? "chip active" : "chip"
              }
              onClick={() => toggleMulti("customerRegion", r)}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      <section>
        <p>Gender</p>
        <div className="chips">
          {genders.map((g) => (
            <button
              key={g}
              className={
                selected.gender.includes(g) ? "chip active" : "chip"
              }
              onClick={() => toggleMulti("gender", g)}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      <section>
        <p>Payment Method</p>
        <div className="chips">
          {payments.map((p) => (
            <button
              key={p}
              className={
                selected.paymentMethod.includes(p) ? "chip active" : "chip"
              }
              onClick={() => toggleMulti("paymentMethod", p)}
            >
              {p}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
