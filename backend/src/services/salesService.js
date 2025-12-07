let SALES_DATA = [];

export function setSalesData(data) {
  SALES_DATA = data || [];
}

export function querySales({
  search = "",
  customerRegion = [],
  gender = [],
  ageMin,
  ageMax,
  productCategory = [],
  tags = [],
  paymentMethod = [],
  dateFrom,
  dateTo,
  sortBy = "date",
  sortOrder = "desc",
  page = 1,
  pageSize = 10
}) {
  const searchTerm = (search || "").trim().toLowerCase();

  const normalizeArray = (v) =>
    typeof v === "string" && v.length
      ? v.split(",").map((s) => s.trim()).filter(Boolean)
      : Array.isArray(v)
      ? v
      : [];

  customerRegion = normalizeArray(customerRegion);
  gender = normalizeArray(gender);
  productCategory = normalizeArray(productCategory);
  tags = normalizeArray(tags);
  paymentMethod = normalizeArray(paymentMethod);

  if (ageMin !== undefined) ageMin = Number(ageMin);
  if (ageMax !== undefined) ageMax = Number(ageMax);

  if (dateFrom) dateFrom = new Date(dateFrom);
  if (dateTo) dateTo = new Date(dateTo);

  let filtered = SALES_DATA;

  if (searchTerm) {
    filtered = filtered.filter((r) => {
      const name = (r.customerName || "").toLowerCase();
      const phone = (r.phoneNumber || "").toLowerCase();
      return name.includes(searchTerm) || phone.includes(searchTerm);
    });
  }

  filtered = filtered.filter((r) => {
    if (customerRegion.length && !customerRegion.includes(r.customerRegion))
      return false;

    if (gender.length && !gender.includes(r.gender)) return false;

    if (productCategory.length && !productCategory.includes(r.productCategory))
      return false;

    if (paymentMethod.length && !paymentMethod.includes(r.paymentMethod))
      return false;

    if (ageMin !== undefined && !Number.isNaN(ageMin) && r.age < ageMin)
      return false;

    if (ageMax !== undefined && !Number.isNaN(ageMax) && r.age > ageMax)
      return false;

    if (dateFrom && r.date && r.date < dateFrom) return false;
    if (dateTo && r.date && r.date > dateTo) return false;

    if (tags.length) {
      const recordTags = String(r.tags || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const hasAny = tags.some((t) => recordTags.includes(t));
      if (!hasAny) return false;
    }

    return true;
  });

  const totalItems = filtered.length;

  const sortFactor = sortOrder === "asc" ? 1 : -1;

  const sorted = [...filtered].sort((a, b) => {
    let av, bv;

    if (sortBy === "date") {
      av = a.date ? a.date.getTime() : 0;
      bv = b.date ? b.date.getTime() : 0;
    } else if (sortBy === "quantity") {
      av = a.quantity || 0;
      bv = b.quantity || 0;
    } else if (sortBy === "customerName") {
      av = (a.customerName || "").toLowerCase();
      bv = (b.customerName || "").toLowerCase();
      if (av < bv) return -1 * sortFactor;
      if (av > bv) return 1 * sortFactor;
      return 0;
    } else {
      return 0;
    }

    if (av < bv) return -1 * sortFactor;
    if (av > bv) return 1 * sortFactor;
    return 0;
  });

  pageSize = 10;
  const pageInt = Number(page) || 1;
  const start = (pageInt - 1) * pageSize;
  const end = start + pageSize;
  const paginated = sorted.slice(start, end);

  return {
    data: paginated,
    meta: {
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      page: pageInt,
      pageSize
    }
  };
}
