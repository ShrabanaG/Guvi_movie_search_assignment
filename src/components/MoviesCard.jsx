import { useEffect, useState } from "react";

import { HiOutlineFilter } from "react-icons/hi";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const MoviesCard = ({ movies, setMovies, error, searchedTerm }) => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOptions(option);
    setIsDropdownMenuOpen(false);
  };

  useEffect(() => {
    const fetchedMOvies = async () => {
      const response = await fetch(
        `${BASE_URL}?apiKey=${apiKey}&s=${searchedTerm}&type=${selectedOptions}`
      );
      const data = await response.json();
      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
      }
    };

    fetchedMOvies();
  }, [searchedTerm, selectedOptions, setMovies]);

  return (
    <>
      {movies.length > 0 && (
        <div className="flex flex-col max-w-5xl mx-auto">
          <div className="flex flex-row items-start justify-between">
            <div className="text-xl font-bold text-black">Searched Movies</div>
            {movies.length > 0 && (
              <div className="relative">
                <div
                  className="flex flex-row items-center justify-center gap-2 p-2 cursor-pointer"
                  onClick={() => setIsDropdownMenuOpen((prev) => !prev)}
                >
                  <span>
                    <HiOutlineFilter color="black" fontSize={20} />
                  </span>
                  <span className="text-sm text-black font-bold">Filter</span>
                </div>
                {isDropdownMenuOpen && (
                  <div className="absolute right-0 mt-1 w-[200px] bg-white border rounded-md shadow-lg z-10">
                    <ul className="flex flex-col">
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick("movie")}
                      >
                        Movies
                      </li>
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick("series")}
                      >
                        Series
                      </li>
                      <li
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleOptionClick("episode")}
                      >
                        Episodes
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
              >
                {/* Poster */}
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
                  alt={movie.Title}
                  className="w-full h-64 object-cover"
                />

                {/* Info */}
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-bold text-gray-900">
                    {movie.Title}
                  </h2>
                  <p className="text-sm text-gray-600">Year: {movie.Year}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    Type: {movie.Type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {movies.length === 0 && (
        <div className="flex items-center justify-center text-2xl font-bold">
          {error ? error : "No movie is searched"}
        </div>
      )}
    </>
  );
};

export default MoviesCard;
