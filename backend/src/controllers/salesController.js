import { querySales } from "../services/salesService.js";

export function getSales(req, res) {
  try {
    const result = querySales({
      search: req.query.search,
      customerRegion: req.query.customerRegion,
      gender: req.query.gender,
      ageMin: req.query.ageMin,
      ageMax: req.query.ageMax,
      productCategory: req.query.productCategory,
      tags: req.query.tags,
      paymentMethod: req.query.paymentMethod,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
      page: req.query.page
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
