function TaskInput({ text, setText, dueDate, setDueDate, priority, setPriority, addInput }) {
  return (
    <form className="task-form" onSubmit={(e) => {e.preventDefault(); addInput(); }}>
      <input className="form-input task-title-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter task" />
       <div className="task-options-row">
        <select className="form-input task-priority-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="HIGH">High priority</option>
          <option value="MEDIUM">Medium priority</option>
          <option value="LOW">Low priority</option>
        </select>

        <input className="form-input task-date-input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
      </div>
    </form>
  );
}

export default TaskInput;