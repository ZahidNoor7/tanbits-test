import { useState, useEffect } from "react";
import Filters from "../components/Filters/Filters";
import TodoCard from "../components/Cards/TodoCard";
import TodoModal from "../components/Modals/TodoModal";

export default function TodoAll() {
  const [Todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("TodosList");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [SelectedTags, setSelectedTags] = useState([]);
  const [HideDoneTasks, setHideDoneTasks] = useState(false);
  const [EditTodo, setEditTodo] = useState(null);

  const options = [
    {
      color: "#D2CEFF",
      title: "Work",
    },
    {
      color: "#D1E5F7",
      title: "Study",
    },
    {
      color: "#FFCECE",
      title: "Entertainment",
    },
    {
      color: "#DAF2D7",
      title: "Family",
    },
  ];

  const toggleTag = (tag, event) => {
    event.preventDefault();
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((prevTag) => prevTag !== tag)
        : [...prevTags, tag]
    );
  };

  const toggleTodoStatus = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    const todoToEdit = Todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditTodo(todoToEdit);
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("TodosList", JSON.stringify(Todos));
  }, [Todos]);

  return (
    <div className="p-6 xl:p-12 TodoAll grid grid-rows-[auto,1fr] border h-screen overflow-hidden">
      <header className="header flex items-center justify-between border-b h-20">
        <h1 className="text-2xl font-bold">Todo</h1>
        <TodoModal
          Todos={Todos}
          setTodos={setTodos}
          toggleTag={toggleTag}
          SelectedTags={SelectedTags}
          setSelectedTags={setSelectedTags}
          EditTodo={EditTodo}
          setEditTodo={setEditTodo}
        />
      </header>

      <div className="grid grid-cols-12 gap-4 h-full overflow-hidden">
        <div className="col-span-full lg:col-span-3 xl:col-span-2 p-4 lg:border-r overflow-auto">
          <Filters
            options={options}
            HideDoneTasks={HideDoneTasks}
            setHideDoneTasks={setHideDoneTasks}
            toggleTag={toggleTag}
            SelectedTags={SelectedTags}
            setSelectedTags={setSelectedTags}
          />
        </div>

        <main className="Todos col-span-full lg:col-span-9 xl:col-span-10 p-4 overflow-auto">
          <div className="h-full">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {Todos.length > 0 ? (
                Todos.filter((todo) => {
                  if (SelectedTags.length === 0) {
                    return !HideDoneTasks || !todo.completed;
                  } else {
                    return (
                      SelectedTags.some((tag) => todo.tags.includes(tag)) &&
                      (!HideDoneTasks || !todo.completed)
                    );
                  }
                }).length > 0 ? (
                  Todos.filter((todo) => {
                    if (SelectedTags.length === 0) {
                      return !HideDoneTasks || !todo.completed;
                    } else {
                      return (
                        SelectedTags.some((tag) => todo.tags.includes(tag)) &&
                        (!HideDoneTasks || !todo.completed)
                      );
                    }
                  }).map((todo, index) => (
                    <TodoCard
                      key={index}
                      TaskDetails={todo}
                      toggleTodoStatus={toggleTodoStatus}
                      deleteTodo={deleteTodo}
                      editTodo={editTodo}
                    />
                  ))
                ) : (
                  <div>No Tasks!</div>
                )
              ) : (
                <div>No Tasks!</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
