import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function MovieDetails() {
  const [loader, setLoader] = useState(false);
  const { id } = useParams();
  const [movie, setMovie] = useState("");
  useEffect(() => {
    async function fetchmovie() {
      setLoader(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=34d301d93bd60995f03f4a83368feb2f`,
      );
      const data = await response.json();
      setMovie(data);
      setLoader(false);
    }
    fetchmovie();
  }, []);

  return (
    <div className="p-4">
      {loader && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {movie && (
        <div className="flex h-[80vh] items-center">
          {/* Left - Image */}
          <div className="w-1/2 flex justify-center">
            <img
              className="w-64 h-96 object-cover rounded-xl shadow-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          </div>

          {/* Right - Content */}
          <div className="flex justify-center w-1/2">
            <div className="w-[90%]">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <h3 className="text-gray-500 italic">{movie.tagline}</h3>

              <div className="mt-6">
                <h2 className="font-bold text-lg">Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
