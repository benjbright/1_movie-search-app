import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Search from "./pages/Search"
import Watchlist from "./pages/Watchlist"

function App() {
  const [searchItem, setSearchItem] = useState("")
  const [searchData, setSearchData] = useState([])
  const [watchlist, setWatchlist] = useState([])

  let moviesInLocalStorage = JSON.parse(localStorage.getItem("watchList"))
  console.log(moviesInLocalStorage)

  useEffect(() => {
    if (moviesInLocalStorage) {
      setWatchlist(moviesInLocalStorage)
    } else {
      setWatchlist([])
    }
  }, [])

  const handleChange = (e) => {
    setSearchItem(e.target.value)
  }

  const handleClick = () => {
    console.log(searchItem)
    fetchAPIData(searchItem)
    document.getElementById("search-form").value = ""
  }

  // REQUEST SEARCH DATA FROM API
  function fetchAPIData(request) {
    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=4ea7e3ee9d47329823ae7c093d00d3f0&language=en-US&query=${request}&page=1&include_adult=false`

    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const list = data.results
        const filteredList = list.filter(
          (movie) =>
            movie.release_date !== "" &&
            movie.overview !== "" &&
            movie.release_date !== undefined &&
            movie.poster_path !== null
        )

        setSearchData(filteredList)
      })
  }

  // ADD MOVIE TO THE WATCHLIST ARRAY
  function addToWatchlist(id) {
    const newListItem = searchData
      .filter((movie) => {
        return movie.id === Number(id)
      })
      .pop()

    console.log(newListItem)
    watchlist.push(newListItem)
    localStorage.setItem("watchList", JSON.stringify(watchlist))
  }

  // REMOVE MOVIE FROM THE WATCHLIST ARRAY
  function removeFromWatchlist(id) {
    console.log(`Clicked! ${id}`)
    const listArray = JSON.parse(localStorage.getItem("watchList"))
    const newArr = listArray.filter((movie) => {
      return movie.id !== Number(id)
    })

    localStorage.setItem("watchList", JSON.stringify(newArr))
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Search
              onChange={handleChange}
              onClick={handleClick}
              movieList={searchData}
              addToWatchlist={addToWatchlist}
            />
          }
        />
        <Route path="watchlist" element={<Watchlist watchlist={watchlist} />} />
      </Routes>
    </div>
  )
}

export default App
