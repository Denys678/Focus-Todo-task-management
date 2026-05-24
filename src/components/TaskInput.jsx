function TaskInput({ text, setText }) {
  return (
    <input className="form-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter task" />
  );
}

export default TaskInput;