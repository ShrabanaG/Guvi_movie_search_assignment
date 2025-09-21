import { useState } from "react";
import MoviesCard from "./components/MoviesCard";
import Navbar from "./components/Navbar";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [responseError, setResponseError] = useState("");

  const handleSearchedMovie = async () => {
    const response = await fetch(
      `${BASE_URL}?apiKey=${apiKey}&s=${searchedTerm}`
    );
    const data = await response.json();
    if (data.Response === "True" && data.Search) {
      setAllMovies(data.Search);
    }
    if (data.Response === "False" && data.Error) {
      setResponseError(data.Error);
    }
  };

  return (
    <>
      <Navbar
        searchedTerm={searchedTerm}
        setSearchedTerm={setSearchedTerm}
        handleSearchedMovie={handleSearchedMovie}
      />
      <MoviesCard
        movies={allMovies}
        setMovies={setAllMovies}
        error={responseError}
        searchedTerm={searchedTerm}
      />
    </>
  );
}

export default App;
