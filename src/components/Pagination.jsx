const Pagination = ({ currentPage, totalResults, setCurrentPage }) => {
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="flex items-center justify-center gap-4 my-6">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50 hover:bg-slate-700 transition-all"
      >
        Prev
      </button>

      <span className="text-lg font-semibold text-gray-800">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-slate-800 text-white rounded disabled:opacity-50 hover:bg-slate-700 transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
