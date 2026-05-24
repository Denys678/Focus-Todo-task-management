function SearchInput({ search, setSearch }) {
  return (
    <input className="form-input form-input-sm" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks" />
  );
}

export default SearchInput;