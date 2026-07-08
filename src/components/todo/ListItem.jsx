function ListItem({
  item,
  deleteItem,
  markTaskStatus,
  editListItem,
  editingId,
  editingText,
  setEditingText,
  editingPriority,
  setEditingPriority,
  editingDueDate,
  setEditingDueDate,
  saveEditItem,
  cancelEditing,
}) {
  const isEditing = item.id === editingId;

  return (
    <li
      className={`todos-list-card ${item.completed ? "completed" : ""}`}
      onClick={() => {
        if (!isEditing) {
          markTaskStatus(item.id);
        }
      }}
    >
      <div className="todos-list-item">
        {isEditing ? (
          <div className="edit-form">
            <input className="form-input form-input-sm"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />

            <select
              className="form-input form-input-sm"
              value={editingPriority}
              onChange={(e) => setEditingPriority(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="HIGH">High priority</option>
              <option value="MEDIUM">Medium priority</option>
              <option value="LOW">Low priority</option>
            </select>

            <input
              className="form-input form-input-sm"
              type="date"
              value={editingDueDate}
              onChange={(e) => setEditingDueDate(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ) : (
          <>
            <span className="list-item-task">{item.title}</span>

            <div className="todo-meta">
              {item.priority && (
                <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                  {item.priority}
                </span>
              )}

              {item.dueDate && (
                <span className="due-date">
                  Due: {item.dueDate}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="list-item-controls">
        {isEditing ? (
          <>
            <button className="btn btn-primary btn-sm" onClick={(e) => {e.stopPropagation(); saveEditItem(item.id);}} disabled={!editingText.trim()}>
              Save
            </button>

            <button className="btn btn-secondary btn-sm" onClick={(e) => {e.stopPropagation(); cancelEditing();}}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-danger btn-sm" onClick={(e) => {e.stopPropagation(); deleteItem(item.id);}}>
              Delete
            </button>

            <button className="btn btn-secondary btn-sm" onClick={(e) => {e.stopPropagation(); editListItem(item);}}>
              Edit
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default ListItem;