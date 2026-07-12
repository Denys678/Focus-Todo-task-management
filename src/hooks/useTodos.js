import { useCallback, useEffect, useState } from "react";
import { createTodo, getTodos, deleteTodo, updateTodo } from "../api/todosApi";

export function useTodos(token) {
  const [text, setText] = useState(() => localStorage.getItem("text") || "");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingPriority, setEditingPriority] = useState("MEDIUM");
  const [editingDueDate, setEditingDueDate] = useState("");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const loadTodos = useCallback(async () => {
    if (!token) {
      setList([]);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const query = {};

      if (filter === "active") {
        query.completed = false;
      }

      if (filter === "completed") {
        query.completed = true;
      }

      if (search.trim()) {
        query.search = search.trim();
      }

      if (priorityFilter !== "all") {
        query.priority = priorityFilter;
      }

      query.sortBy = sortBy;
      query.order = order;

      const todos = await getTodos(query, token);

      setList(todos);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token, filter, search, priorityFilter, sortBy, order]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  const filteredList = list;

  const activeTaskCount = list.filter((item) => !item.completed).length;

  const isUnique = (text, list) => {
    return !list.some((item) => item.title === text);
  };

  const addInput = async () => {
    if (!token) {
      return;
    }

    try {
      if (!text.trim()) {
        return;
      }

      if (isUnique(text.trim(), list)) {
        await createTodo(
          {
            title: text.trim(),
            priority,
            ...(dueDate ? { dueDate } : {}),
          },
          token
        );

        setText("");
        setPriority("MEDIUM");
        setDueDate("");

        await loadTodos();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteItem = async (id) => {
    if (!token) {
      return;
    }

    try {
      await deleteTodo(id, token);
      await loadTodos();
    } catch (error) {
      setError(error.message);
    }
  };

  const markTaskStatus = async (id) => {
    if (!token) {
      return;
    }

    try {
      const currentTodo = list.find((item) => item.id === id);

      if (!currentTodo) {
        return;
      }

      await updateTodo(
        id,
        {
          completed: !currentTodo.completed,
        },
        token
      );

      await loadTodos();
    } catch (error) {
      setError(error.message);
    }
  };

  const editListItem = (item) => {
    setEditingId(item.id);
    setEditingText(item.title);
    setEditingPriority(item.priority ?? "MEDIUM");
    setEditingDueDate(item.dueDate ?? "");
  };

  const clearInput = () => {
    setText("");
    setPriority("MEDIUM");
    setDueDate("");
  };

  const saveEditItem = async (id) => {
    if (!token) {
      return;
    }

    if (!editingText.trim()) {
      return;
    }

    try {
      await updateTodo(
        id,
        {
          title: editingText.trim(),
          priority: editingPriority,
          ...(editingDueDate ? { dueDate: editingDueDate } : {}),
        },
        token
      );

      setEditingId(null);
      setEditingText("");
      setEditingPriority("MEDIUM");
      setEditingDueDate("");

      await loadTodos();
    } catch (error) {
      setError(error.message);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingText("");
    setEditingPriority("MEDIUM");
    setEditingDueDate("");
  };

  const resetFilters = () => {
    setFilter("all");
    setSearch("");
    setPriorityFilter("all");
    setSortBy("createdAt");
    setOrder("desc");
  };

  return {
    isLoading,
    error,

    text,
    setText,
    priority,
    setPriority,
    dueDate,
    setDueDate,

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

    editingPriority,
    setEditingPriority,

    editingDueDate,
    setEditingDueDate,

    addInput,
    clearInput,
    deleteItem,
    markTaskStatus,
    editListItem,
    saveEditItem,
    cancelEditing,
    resetFilters,
  };
}