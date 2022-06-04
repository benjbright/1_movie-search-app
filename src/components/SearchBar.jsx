const SearchBar = (props) => {
  return (
    <form onSubmit={(event) => props.onClick(event)}>
      <input
        type="text"
        id="search-form"
        placeholder="Search for your movie"
        onChange={(event) => props.onChange(event)}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar

// onClick={() => props.onClick()}
