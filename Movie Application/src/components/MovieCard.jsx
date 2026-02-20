import React from 'react'

function MovieCard({movie}) {
  return (
    <div className='h-[280px] w-[200px] bg-black bg-center bg-no-repeat bg-cover transition-transform duration-300 hover:scale-105 cursor-pointer flex items-end' style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${movie.poster_path})`}}>
      <h2 className='p-[5px] text-white font-serif text-grey text-center w-[100%] bg-gray-900/60'>{movie.title}</h2>
    </div>
  )
}

export default MovieCard
