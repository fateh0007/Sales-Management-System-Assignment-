import { useEffect, useState } from "react";
import { fetchSales } from "../services/api";

const defaultState = {
  search: "",
  customerRegion: [],
  gender: [],
  ageRange: [null, null],
  productCategory: [],
  tags: [],
  paymentMethod: [],
  dateRange: [null, null],
  sortBy: "date",
  sortOrder: "desc",
  page: 1
};

export function useSalesQuery() {
  const [state, setState] = useState(defaultState);
  const [result, setResult] = useState({ data: [], meta: null });
  const [loading, setLoading] = useState(false);

  const update = (partial) =>
    setState((prev) => ({
      ...prev,
      ...partial,
      page: partial.page ? partial.page : prev.page
    }));

  useEffect(() => {
    const params = {
      search: state.search || undefined,
      customerRegion: state.customerRegion.join(",") || undefined,
      gender: state.gender.join(",") || undefined,
      ageMin: state.ageRange[0] || undefined,
      ageMax: state.ageRange[1] || undefined,
      productCategory: state.productCategory.join(",") || undefined,
      tags: state.tags.join(",") || undefined,
      paymentMethod: state.paymentMethod.join(",") || undefined,
      dateFrom: state.dateRange[0] || undefined,
      dateTo: state.dateRange[1] || undefined,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      page: state.page
    };

    setLoading(true);
    fetchSales(params)
      .then(setResult)
      .catch((err) => {
        console.error(err);
        setResult({ data: [], meta: null });
      })
      .finally(() => setLoading(false));
  }, [
    state.search,
    state.customerRegion,
    state.gender,
    state.ageRange,
    state.productCategory,
    state.tags,
    state.paymentMethod,
    state.dateRange,
    state.sortBy,
    state.sortOrder,
    state.page
  ]);

  return { state, update, result, loading };
}
