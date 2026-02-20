import React, { useEffect, useState } from "react";

function Banner() {
  const [movie, setMovie] = useState(null);
  async function fetchRandomMovie() {
    const randomPage = Math.floor(Math.random() * 500) + 1;

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=34d301d93bd60995f03f4a83368feb2f&page=${randomPage}`,
    );

    const data = await response.json();

    const results = data.results;

    const randomIndex = Math.floor(Math.random() * results.length);

    setMovie(results[randomIndex]);
  }

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  if (!movie) {
    return;
  }
  return (
    <div
     className="relative flex items-end h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
      }}
    >
      <h1 className="font-bold text-white w-[100%] bg-orange-500/70  text-center py-[10px] ">
        Trust All The Way
      </h1>
    </div>
  );
}

export default Banner;
