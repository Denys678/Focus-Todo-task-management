function TimerSelects({ selectTimer }) {
  return (
    <div className="controls-group timer-selects">
      <button className="btn btn-secondary btn-sm" onClick={() => selectTimer(30)}>30s</button>
      <button className="btn btn-secondary btn-sm" onClick={() => selectTimer(60)}>60s</button>
      <button className="btn btn-secondary btn-sm" onClick={() => selectTimer(90)}>90s</button>
      <button className="btn btn-secondary btn-sm" onClick={() => selectTimer(1500)}>25min</button>
    </div>
  )
}

export default TimerSelects;