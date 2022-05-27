import { useState } from "react"
// import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Search from "./pages/Search"
import Watchlist from "./pages/Watchlist"

function App() {
  // Check local storage and set state
  let checkLocalStorage = []
  let moviesInLocalStorage = JSON.parse(localStorage.getItem("watchList"))

  if (moviesInLocalStorage.length > 0) {
    checkLocalStorage = moviesInLocalStorage
  } else {
    checkLocalStorage = []
  }

  const [searchItem, setSearchItem] = useState("")
  const [searchData, setSearchData] = useState([])
  const [watchlist, setWatchlist] = useState(checkLocalStorage)
  const [errorMsg, setErrorMsg] = useState(false)

  // localStorage.clear()

  const handleChange = (e) => {
    setSearchItem(e.target.value)
  }

  const handleClick = () => {
    fetchAPIData(searchItem)
    document.getElementById("search-form").value = ""
  }

  // Request the search item from the Movie DB API
  function fetchAPIData(request) {
    const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=4ea7e3ee9d47329823ae7c093d00d3f0&language=en-US&query=${request}&page=1&include_adult=false`

    fetch(API_URL)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json()
        } else {
          // Add basic error msg handling
          throw Error(response.statusText)
        }
      })
      .then((data) => {
        const list = data.results
        const filteredList = list.filter(
          (movie) =>
            // Apply a series of basic filters to the API data
            movie.release_date !== "" &&
            movie.overview !== "" &&
            movie.release_date !== undefined &&
            movie.poster_path !== null &&
            movie.vote_average !== 0
        )
        setErrorMsg(false)
        setSearchData(filteredList)
      })
      .catch((error) => {
        console.log(error)
        setErrorMsg(true)
      })
  }

  // Add the selected movie to the watchlist state
  function addToWatchlist(id) {
    const newListItem = searchData
      .filter((movie) => {
        return movie.id === Number(id)
      })
      .pop()

    setWatchlist((prevList) => {
      return [...prevList, newListItem]
    })
  }

  // Filter the watchlist to remove the selected movie
  function removeFromWatchlist(id) {
    setWatchlist((prevList) => {
      return prevList.filter((movie) => {
        return movie.id !== Number(id)
      })
    })
  }

  // Set local storage to reflect changes in the two above functions
  localStorage.setItem("watchList", JSON.stringify(watchlist))

  return (
    <>
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
              error={errorMsg}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              watchlist={watchlist}
              removeMovie={removeFromWatchlist}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
