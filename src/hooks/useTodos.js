import { useEffect, useState } from "react";

export function useTodos() {
  const [text, setText] = useState(() => localStorage.getItem("text") || "");

  const [list, setList] = useState(() => {
    const saved = localStorage.getItem("list");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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
      search === "" || item.task.toLowerCase().includes(search.toLowerCase());

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
      setList((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          task: text.trim(),
          completed: false,
        },
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

  return {
    text,
    setText,

    search,
    setSearch,

    filter,
    setFilter,

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
  };
}