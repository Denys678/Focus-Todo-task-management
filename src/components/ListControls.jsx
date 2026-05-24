function ListControls({ filter, setFilter }) {
  return (
    <div className="controls-group">
      <button className={`btn btn-secondary ${filter === "all" ? "filter-active" : ""}`} onClick={() => setFilter("all")}>All</button>
      <button className={`btn btn-secondary ${filter === "active" ? "filter-active" : ""}`} onClick={() => setFilter("active")}>Active</button>
      <button className={`btn btn-secondary ${filter === "completed" ? "filter-active" : ""}`} onClick={() => setFilter("completed")}>Completed</button>
    </div>
  );
}

export default ListControls;