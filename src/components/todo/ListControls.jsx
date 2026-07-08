function ListControls({ filter, setFilter, priorityFilter, setPriorityFilter, sortBy, setSortBy, order, setOrder, resetFilters }) {
  return (
    <>
      <div className="controls-group">
        <button className={`btn btn-secondary ${filter === "all" ? "filter-active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>

        <button className={`btn btn-secondary ${filter === "active" ? "filter-active" : ""}`} onClick={() => setFilter("active")}>
          Active
        </button>

        <button className={`btn btn-secondary ${filter === "completed" ? "filter-active" : ""}`} onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <div className="controls-group">
        <select className="form-input form-input-sm" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">All priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select className="form-input form-input-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="createdAt">Created date</option>
          <option value="dueDate">Due date</option>
          <option value="priority">Priority</option>
        </select>

        <select className="form-input form-input-sm" value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <button className="btn btn-secondary" onClick={resetFilters}>
        Reset filters
      </button>
    </>
  );
}

export default ListControls;