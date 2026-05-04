import { createContext, useContext, useState } from "react";
 
const AgendaContext = createContext(null);
 
// Wrap the app in this provider (added in _layout.jsx) so all tabs share agenda state
export function AgendaProvider({ children }) {
  const [agenda, setAgenda] = useState([]);
 
  function addTask(task) {
    // Don't add duplicates
    if (agenda.find((t) => t.id === task.id)) return;
    setAgenda((prev) => [...prev, { ...task, checked: false }]);
  }
 
  function removeTask(id) {
    setAgenda((prev) => prev.filter((t) => t.id !== id));
  }
 
  function toggleChecked(id) {
    setAgenda((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  }
 
  function moveTask(fromIndex, toIndex) {
    setAgenda((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }
 
  return (
    <AgendaContext.Provider value={{ agenda, addTask, removeTask, toggleChecked, moveTask }}>
      {children}
    </AgendaContext.Provider>
  );
}
 
export function useAgenda() {
  return useContext(AgendaContext);
}