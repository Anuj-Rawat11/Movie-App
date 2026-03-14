import React from "react";
import {useState,useEffect} from "react";
function Watchlist({ watchlist,setWatchlist }) {
const [genres, setGenres] = useState([]);

useEffect(() => {
  async function fetchGenres() {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=34d301d93bd60995f03f4a83368feb2f&language=en-US"
    );
    const data = await res.json();
    setGenres(data.genres);
  }

  fetchGenres();
}, []);

function getGenreNames(genreIds) {
  return genreIds.map(id => {
    const genre = genres.find(g => g.id === id);
    return genre ? genre.name : null;
  });
}

function handleRemove(id){
  const newlist=watchlist.filter((movies)=>movies.id!==id);
  localStorage.setItem("moviesApp",JSON.stringify(newlist));
  setWatchlist(JSON.parse(localStorage.getItem("moviesApp")));

}
  return (
    <>
      <div className="h-[80px] flex justify-center items-center">
        <input type="text" className="bg-gray-200 p-[5px]" />
      </div>
      <table className="w-[80%] mx-auto m-[20px] border">
        <thead className="border">
          <tr >
            <th className="border">Name</th>
            <th className="border">Ratings</th>
            <th className="border">Popularity</th>
            <th >Genre</th>
          </tr>
        </thead>
        <tbody className="border">
          {watchlist.map((movie) => (
            <tr key={movie.id} className="border">
              <td className="flex items-center gap-[6px] ">
                <img className="w-[75px] h-auto" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                {movie.original_title}
              </td>
              <td className="border">{movie.vote_average}</td>
              <td className="border">{movie.popularity}</td>
              <td >{getGenreNames(movie.genre_ids).join(", ")}</td>
              <td><span className="border p-[10px] bg-orange-600/70 cursor-pointer rounded-sm" onClick={()=>handleRemove(movie.id)}>Remove</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Watchlist;
