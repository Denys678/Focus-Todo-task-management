function Controls({ text, clearInput, addInput }) {
  return (
    <div className="controls-group">
      <button className="btn btn-primary" disabled={!text.trim()} onClick={addInput}>
        Add
      </button>
      
      <button className="btn btn-secondary" disabled={!text} onClick={clearInput}>
        Clear
      </button>
    </div>
  );
}

export default Controls;