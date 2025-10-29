import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoviesCard from "./components/MoviesCard";
import MovieDetails from "./components/MovieDetails";
import Pagination from "./components/Pagination";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleSearchedMovie = useCallback(async () => {
    if (!searchedTerm) return;

    try {
      const response = await fetch(
        `${BASE_URL}?apiKey=${apiKey}&s=${searchedTerm}&page=${currentPage}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
        setError("");
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Something went wrong while fetching movies");
    }
  }, [currentPage, searchedTerm]);

  // fetch movies when page changes
  useEffect(() => {
    if (searchedTerm) handleSearchedMovie();
  }, [currentPage, handleSearchedMovie, searchedTerm]);

  // Add or remove favorites
  const toggleFavorite = (movie) => {
    const existing = favorites.find((fav) => fav.imdbID === movie.imdbID);
    let updated;

    if (existing) {
      updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updated = [...favorites, movie];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <Router>
      <Navbar
        searchedTerm={searchedTerm}
        setSearchedTerm={setSearchedTerm}
        handleSearchedMovie={handleSearchedMovie}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <MoviesCard
                movies={movies}
                setMovies={setMovies}
                error={error}
                searchedTerm={searchedTerm}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
              {movies.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalResults={totalResults}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
