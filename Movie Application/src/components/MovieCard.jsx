import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function MovieCard({
  movie,
  watchlist,
  handleAdd,
  handleRemove,
  setWatchlist,
}) {
  const id=movie.id;
  const navigate=useNavigate();
  const [inWatchlist, setInwatchlist] = useState(false);

  useEffect(() => {
    if (!watchlist) return;
    const check = watchlist.some((movies) => movies.id === movie.id);
    if (check) {
      setInwatchlist(true);
    } else {
      setInwatchlist(false);
    }
    // setWatchlist(JSON.parse(localStorage.getItem("moviesApp")));
  });

  return (
    <div
      className="h-[230px] w-[130px] bg-black bg-center bg-no-repeat bg-cover rounded-xl transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col justify-between"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
      }}
      onClick={()=>navigate(`/moviedetail/${id}`)}
    >
      <div className="text-right">
        {inWatchlist ? (
          <button
            className="mx-[7px] p-[5px] bg-gray-500/50 cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={(e)=>{handleRemove(movie); e.stopPropagation();}}
          >
            ❌
          </button>
        ) : (
          <button
            className="mx-[7px] p-[5px] bg-gray-500/50 cursor-pointer transition-transform duration-300 hover:scale-107"
            onClick={(e)=>{handleAdd(movie); e.stopPropagation();}}
          >
            ❤️
          </button>
        )}
      </div>
      <h2 className="p-[5px] text-white font-serif text-grey text-center w-[100%] bg-gray-900/60 ">
        {movie.title}
      </h2>
    </div>
  );
}

export default MovieCard;
