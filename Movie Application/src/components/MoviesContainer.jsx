import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

function MoviesContainer() {
  const [movies, setMovies] = useState([]);
  const [pageno, setPageno] = useState(1);
  async function fetchmovies() {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=34d301d93bd60995f03f4a83368feb2f&language=en-US&page=${pageno}`,
    );
    const data = await response.json();
    setMovies(data.results);
  }

  function pageInchandler() {
    setPageno(pageno+1);
  }
  function pageDechandler() {
    if(pageno===1){
      return;
    }
    setPageno(pageno-1);
  }
  useEffect(() => {
    fetchmovies();
  }, [pageno]);

  return (
    <div className="mt-[20px] py-[20px]">
      <h1 className="text-center py-[10px] text-xl">Trending Movies</h1>
      <div className="flex  gap-[40px] flex-wrap p-[20px]">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} key={index} />
        ))}
      </div>
      <Pagination pageno={pageno} pageInchandler={pageInchandler} pageDechandler={pageDechandler}  />
    </div>
  );
}

export default MoviesContainer;
