import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

function SearchMovie() {
  const [search, setSearch] = useState("");
  const [searchmovies, setSearchMovies] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
    setSearchMovies([]);
    if (!search) {
      setLoader(false);
      return;
    }
  }, [debouncedSearch]);

  useEffect(() => {
    async function fetchMovies() {
      if (!debouncedSearch) {
        setSearchMovies([]);
        return;
      }
      setLoader(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=34d301d93bd60995f03f4a83368feb2f&query=${debouncedSearch}&page=${page}`,
      );
      const data = await response.json();
      setLoader(false);
      setSearchMovies((prev) =>
        page === 1 ? data.results : [...prev, ...data.results],
      );
    }
    fetchMovies();
  }, [debouncedSearch, page]);
  return (
    <>
      <div className="flex justify-center pr-4 pt-4 items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Here"
          className="bg-gray-500/10  p-2 w-[25%]"
        />
        {/* <i className="fa-solid fa-magnifying-glass px-2 cursor-pointer"></i> */}
      </div>
      {loader && (
        <div className="flex justify-center items-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {searchmovies.length > 0 && (
        <>
          <div className="w-[95%] mx-auto gap-x-12 gap-y-10 flex justify-center flex-wrap p-[20px]">
            {searchmovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
          <div className="flex justify-center">
            <button
              className="bg-orange-500 p-2"
              onClick={() => setPage(page + 1)}
            >
              More
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default SearchMovie;
