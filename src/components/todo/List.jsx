import ListItem from "./ListItem";

function List({ filteredList,
                deleteItem,
                markTaskStatus,
                editListItem,
                editingId,
                editingText,
                setEditingText,
                saveEditItem,
                cancelEditing, 
}) {
  if (filteredList.length === 0) {
    return <p className="empty-list">No tasks match your filters</p>;
  }
  
  return (
    <ul className="todo-list">
      {filteredList.map((item) => (
        <ListItem key={item.id}
                  item={item}
                  deleteItem={deleteItem}
                  markTaskStatus={markTaskStatus}
                  editListItem={editListItem}
                  editingId={editingId}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  saveEditItem={saveEditItem}
                  cancelEditing={cancelEditing} />
      ))}
    </ul>
  );
}

export default List;