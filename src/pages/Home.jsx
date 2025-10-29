import { useState } from "react";
import Navbar from "../components/Navbar";
import MoviesCard from "../components/MoviesCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const Home = () => {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearchedMovie = async () => {
    if (!searchedTerm.trim()) return;
    fetchMovies(searchedTerm, currentPage);
  };

  const fetchMovies = async (term, page = 1) => {
    const response = await fetch(
      `${BASE_URL}?apiKey=${apiKey}&s=${term}&page=${page}`
    );
    const data = await response.json();

    if (data.Response === "True") {
      setMovies(data.Search);
      setTotalResults(parseInt(data.totalResults));
      setError("");
    } else {
      setMovies([]);
      setError(data.Error);
    }
  };

  // handle pagination click
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMovies(searchedTerm, page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        searchedTerm={searchedTerm}
        setSearchedTerm={setSearchedTerm}
        handleSearchedMovie={handleSearchedMovie}
      />

      <MoviesCard
        movies={movies}
        setMovies={setMovies}
        error={error}
        searchedTerm={searchedTerm}
      />

      {/* Pagination */}
      {movies.length > 0 && (
        <div className="flex justify-center items-center my-6 gap-4">
          {Array.from({ length: Math.ceil(totalResults / 10) }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
