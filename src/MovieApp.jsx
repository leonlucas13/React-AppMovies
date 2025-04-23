import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([])

    //'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher'

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'd5f72714220f90294a2a2fd08a47525a'

    const handleInputChange = ({ target }) => {
        setSearch(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
        console.log('handleSubmit : ', search)
    }

    const fetchMovies = async () => {

        try {
            const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`)
            const data = await response.json()
            setMovieList(data.results)

            console.log('pase por el fetchMovies')
            console.log(data.results)
        } catch (error) {
            console.log('Upss.. Fucking Error : ', error)
        }
    }



    return (
        <div className='container'>
            <h1 className='title'>Aplicacion de Peliculas</h1>
            <hr />
            <h2>Buscador de Peliculas</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Escribi una pelicula'
                    value={search}
                    onChange={handleInputChange} />

                <button
                    className='searh-button'>
                    Buscar
                </button>
            </form>

            {movieList &&
                <div className='movie-list'>
                    {movieList.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    ))}
                </div>
            }


        </div>
    )
}
