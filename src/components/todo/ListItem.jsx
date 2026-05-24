function ListItem({ item, 
                    deleteItem, 
                    markTaskStatus, 
                    editListItem, 
                    editingId,
                    editingText,
                    setEditingText,
                    saveEditItem,
                    cancelEditing }) 
{
  const isEditing = item.id === editingId;  
  return (
    <li className={`todos-list-card ${item.completed ? 'completed' : ""}`} onClick={() => {if (!isEditing) {markTaskStatus(item.id); }}}>
      <div className="todos-list-item">
        {isEditing ? (
          <input className="form-input form-input-sm" value={editingText} onChange={(e) => setEditingText(e.target.value)} onClick={(e) => e.stopPropagation()} />
        ) : (
          <span>{item.task}</span>
        )}
      </div>
      
      <div className="list-item-controls">
        {isEditing ? (
          <>
            <button className="btn btn-primary btn-sm" onClick={(e) => {e.stopPropagation(); saveEditItem(item.id);}} disabled={!editingText.trim()}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={(e) => {e.stopPropagation(); cancelEditing();}}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn btn-danger btn-sm" onClick={(e) => {e.stopPropagation(); deleteItem(item.id);}}>Delete</button>
            <button className="btn btn-secondary btn-sm" onClick={(e) => {e.stopPropagation(); editListItem(item);}}>Edit</button>
          </>
        )}
      </div>
    </li>
  );
}

export default ListItem;