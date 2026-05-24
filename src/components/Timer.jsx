function Timer({ count, formatTime }) {
  return (
    <div className="timer-display">
      <h2>Timer</h2>
      <p>{formatTime(count)}</p>
    </div>
  )
}

export default Timer;