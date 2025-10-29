import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams(); // gets imdbID from the route
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}?apiKey=${apiKey}&i=${id}&plot=full`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
          setError("");
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading movie details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p className="text-lg font-semibold mb-4">{error}</p>
        <Link
          to="/"
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 my-10 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-6">
      {/* Poster */}
      <div className="flex-shrink-0">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
          alt={movie.Title}
          className="w-72 h-auto rounded-lg shadow-md"
        />
      </div>

      {/* Movie Info */}
      <div className="flex flex-col justify-start gap-3">
        <h1 className="text-3xl font-bold text-gray-900">{movie.Title}</h1>
        <div className="text-sm text-gray-500 space-x-2">
          <span>{movie.Year}</span>
          <span>•</span>
          <span>{movie.Runtime}</span>
          <span>•</span>
          <span>{movie.Genre}</span>
        </div>

        <p className="text-gray-700 mt-3 leading-relaxed">{movie.Plot}</p>

        <div className="mt-4">
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p>
            <strong>Language:</strong> {movie.Language}
          </p>
          <p>
            <strong>Country:</strong> {movie.Country}
          </p>
          <p>
            <strong>Awards:</strong> {movie.Awards}
          </p>
        </div>

        {/* Ratings */}
        {movie.Ratings && movie.Ratings.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Ratings:</h3>
            <ul className="space-y-1">
              {movie.Ratings.map((rating, index) => (
                <li key={index} className="text-gray-800">
                  {rating.Source}: <strong>{rating.Value}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
          >
            ← Back to Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
