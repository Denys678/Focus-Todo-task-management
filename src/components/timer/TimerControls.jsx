function TimerControls({ startTimer, stopTimer, resetTimer }) {
  return (
    <div className="controls-group timer-controls">
      <button className="btn btn-primary btn-sm" onClick={startTimer}>Start</button>
      <button className="btn btn-secondary btn-sm" onClick={stopTimer}>Stop</button>
      <button className="btn btn-secondary btn-sm" onClick={resetTimer}>Reset</button>
    </div>
  );
}

export default TimerControls;