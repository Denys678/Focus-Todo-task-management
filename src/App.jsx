import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import TaskInput from "./components/todo/TaskInput";
import SearchInput from "./components/todo/SearchInput";
import Controls from "./components/todo/Controls";
import ListControls from "./components/todo/ListControls";
import List from "./components/todo/List";

import Timer from "./components/timer/Timer";
import TimerControls from "./components/timer/TimerControls";
import TimerSelects from "./components/timer/TimerSelects";

import AuthForm from "./components/auth/AuthForm";

import { formatTime } from "./utils/formatTime";
import { useTimer } from "./hooks/useTimer";
import { useTodos } from "./hooks/useTodos";
import { useAuth } from "./hooks/useAuth";

function App() {
  const {
    token,
    user,
    isAuthenticated,
    isAuthLoading,
    authError,
    login,
    register,
    logout,
  } = useAuth();

  const {
    text,
    setText,
    search,
    setSearch,
    filter,
    setFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    order,
    setOrder,
    filteredList,
    activeTaskCount,
    editingId,
    editingText,
    setEditingText,
    addInput,
    clearInput,
    deleteItem,
    markTaskStatus,
    editListItem,
    saveEditItem,
    cancelEditing,
    dueDate,
    setDueDate,
    priority,
    setPriority,
    resetFilters,
    editingPriority,
    setEditingPriority,
    editingDueDate,
    setEditingDueDate,
    isLoading,
    error,
  } = useTodos(token);

  const { count, startTimer, stopTimer, resetTimer, selectTimer } =
    useTimer(60);

  return (
    <div className="app">
      <Header />

      {!isAuthenticated ? (
        <AuthForm
          login={login}
          register={register}
          isAuthLoading={isAuthLoading}
          authError={authError}
        />
      ) : (
        <main className="todo-card">
          <section className="todo-section">
            <div className="controls-group">
              <span className="todo-meta">Logged in as: {user?.email}</span>

              <button className="btn btn-secondary btn-sm" onClick={logout}>
                Logout
              </button>
            </div>
          </section>

          <section className="todo-section input-section">
            <TaskInput
              text={text}
              setText={setText}
              dueDate={dueDate}
              setDueDate={setDueDate}
              priority={priority}
              setPriority={setPriority}
              addInput={addInput}
            />

            <p className="todo-meta">Length: {text.length}</p>

            <Controls text={text} clearInput={clearInput} addInput={addInput} />
          </section>

          <section className="todo-section filter-controls-section">
            <SearchInput search={search} setSearch={setSearch} />

            <ListControls
              filter={filter}
              setFilter={setFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              order={order}
              setOrder={setOrder}
              resetFilters={resetFilters}
            />
          </section>

          <section className="todo-section list-section">
            <p className="todo-meta">Active tasks: {activeTaskCount}</p>

            {error && <p className="error-message">{error}</p>}

            {isLoading ? (
              <p className="loading-message">Loading tasks...</p>
            ) : (
              <List
                filteredList={filteredList}
                deleteItem={deleteItem}
                markTaskStatus={markTaskStatus}
                editListItem={editListItem}
                editingId={editingId}
                editingText={editingText}
                setEditingText={setEditingText}
                editingPriority={editingPriority}
                setEditingPriority={setEditingPriority}
                editingDueDate={editingDueDate}
                setEditingDueDate={setEditingDueDate}
                saveEditItem={saveEditItem}
                cancelEditing={cancelEditing}
              />
            )}
          </section>

          <section className="todo-section timer-section">
            <Timer count={count} formatTime={formatTime} />

            <TimerSelects selectTimer={selectTimer} />

            <TimerControls
              startTimer={startTimer}
              stopTimer={stopTimer}
              resetTimer={resetTimer}
            />
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
}

export default App;