import Header from "./layouts/Header";

import { useEffect, useState } from "react";

import TaskInput from "./components/TaskInput";
import SearchInput from "./components/SearchInput";
import Controls from "./components/Controls";
import ListControls from "./components/ListControls";
import List from "./components/List";
import Timer from "./components/Timer";
import TimerControls from "./components/TimerControls";
import TimerSelects from "./components/TimerSelects";

import { formatTime } from "./utils/formatTime";
import { useTimer } from "./hooks/useTimer";

function App() {
  const [text, setText] = useState(() => localStorage.getItem("text") || "");

  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("list");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { count, startTimer, stopTimer, resetTimer, selectTimer } =
    useTimer(60);

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const filteredList = list.filter((item) => {
    const matchesFilter =
      filter === "active"
        ? !item.completed
        : filter === "completed"
        ? item.completed
        : true;

    const matchesSearch =
      search === "" ||
      item.task.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const activeTaskCount = list.filter((item) => !item.completed).length;

  const isUnique = (text, list) => {
    return !list.some((item) => item.task === text);
  };

  const addInput = () => {
    if (!text.trim()) {
      return;
    }
    
    if (isUnique(text.trim(), list)) {
      setList((prev) => [...prev, { id: crypto.randomUUID(), task: text.trim(), completed: false },
    ]);

    setText("");
  }
};
  const deleteItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const markTaskStatus = (id) => {
    setList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }

        return item;
      })
    );
  };

  const editListItem = (item) => {
    setEditingId(item.id);
    setEditingText(item.task);
  };

  const clearInput = () => {
    setText("");
  };

  const saveEditItem = (id) => {
    if (!editingText.trim()) {
      return;
    }
    
    setList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
         return { ...item, task: editingText.trim() };
        }

        return item;
      })
    );

    setEditingId(null);
    setEditingText("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="app">
      <Header />
      <main className="todo-card">
        <section className="todo-section input-section">
          <TaskInput text={text} setText={setText} />
          
          <p className="todo-meta">Length: {text.length}</p>

          <Controls text={text} clearInput={clearInput} addInput={addInput} />
        </section>

        <section className="todo-section filter-controls-section">
          <SearchInput search={search} setSearch={setSearch} />

          <ListControls filter={filter} setFilter={setFilter} />
        </section>

        <section className="todo-section list-section">
          <p className="todo-meta">Active tasks: {activeTaskCount}</p>
          <List filteredList={filteredList}
                deleteItem={deleteItem}
                markTaskStatus={markTaskStatus}
                editListItem={editListItem}
                editingId={editingId}
                editingText={editingText}
                setEditingText={setEditingText}
                saveEditItem={saveEditItem}
                cancelEditing={cancelEditing}/>
        </section>
        
        <section className="todo-section timer-section">
          <Timer count={count} formatTime={formatTime} />

          <TimerSelects selectTimer={selectTimer} />

          <TimerControls startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
        </section>
      </main>
    </div>
  );
}

export default App;