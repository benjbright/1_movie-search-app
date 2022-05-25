// import { useState } from "react"

const SearchBar = (props) => {
  return (
    <form>
      <input
        type="text"
        id="search-form"
        placeholder="Search for your movie"
        onChange={(event) => props.onChange(event)}
      />
      <button onClick={() => props.onClick()}>Search</button>
    </form>
  )
}

export default SearchBar
