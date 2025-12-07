export default function Pagination({ meta, onPageChange }) {
  if (!meta) return null;

  const { page, totalPages } = meta;

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages || 1}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
