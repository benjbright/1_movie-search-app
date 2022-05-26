import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Search from "./pages/Search"
import Watchlist from "./pages/Watchlist"

function App() {
  let checkLocalStorage = []
  let moviesInLocalStorage = JSON.parse(localStorage.getItem("watchList"))
  console.log(moviesInLocalStorage)

  if (moviesInLocalStorage.length > 0) {
    checkLocalStorage = moviesInLocalStorage
  } else {
    checkLocalStorage = []
  }

  const [searchItem, setSearchItem] = useState("")
  const [searchData, setSearchData] = useState([])
  const [watchlist, setWatchlist] = useState(checkLocalStorage)

  // localStorage.clear()

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
            movie.poster_path !== null &&
            movie.vote_average !== 0
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

    setWatchlist((prevList) => {
      return [...prevList, newListItem]
    })
  }

  // REMOVE MOVIE FROM THE WATCHLIST ARRAY
  function removeFromWatchlist(id) {
    // console.log(`Clicked! ${id}`)

    setWatchlist((prevList) => {
      return prevList.filter((movie) => {
        return movie.id !== Number(id)
      })
    })

    // localStorage.setItem("watchList", JSON.stringify(watchlist))
  }

  localStorage.setItem("watchList", JSON.stringify(watchlist))

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
              watchlist={watchlist}
            />
          }
        />
        <Route
          path="watchlist"
          element={
            <Watchlist
              watchlist={watchlist}
              removeMovie={removeFromWatchlist}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
