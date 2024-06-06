import React, { useState, useRef, useEffect, useCallback } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  tags: string[];
  completed: boolean;
}

interface Option {
  color: string;
  title: string;
}

interface TodoModalProps {
  Todos: Todo[];
  EditTodo?: Todo | null;
  setEditTodo?: React.Dispatch<React.SetStateAction<Todo | null>>;
  toggleTag: (tag: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  SelectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setTodos?: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoModal: React.FC<TodoModalProps> = ({
  Todos,
  EditTodo,
  setEditTodo,
  toggleTag,
  setSelectedTags,
  SelectedTags,
  setTodos,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: EditTodo ? EditTodo.title : "",
    description: EditTodo ? EditTodo.description : "",
  });

  useEffect(() => {
    if (EditTodo) {
      setFormData({
        title: EditTodo.title,
        description: EditTodo.description,
      });
    } else {
      setFormData({
        title: "",
        description: "",
      });
    }

    return () => {
      setFormData({
        title: "",
        description: "",
      });
    };
  }, [EditTodo]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Option[] = [
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

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (setEditTodo) {
      setEditTodo(null);
    }
  }, [setEditTodo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = formData.title;
    const newDescription = formData.description;

    const newTodo: Todo = {
      id: new Date().getTime(),
      title: newTitle,
      description: newDescription,
      tags: SelectedTags,
      completed: false,
    };

    if (EditTodo) {
      const updatedTodos = Todos.map((todo) =>
        todo.id === EditTodo.id
          ? {
              ...todo,
              title: newTitle,
              description: newDescription,
              tags: SelectedTags,
            }
          : todo
      );

      if (setTodos) {
        setTodos(updatedTodos);
      }
    } else {
      if (setTodos) {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      }
    }

    closeModal();
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        const tagButtons = Array.from(
          document.querySelectorAll(".tag-button")
        ) as HTMLElement[];

        if (
          tagButtons.some((button) => button.contains(event.target as Node))
        ) {
          return;
        }

        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (EditTodo) {
      openModal();
    }
    return () => {};
  }, [EditTodo, openModal]);

  useEffect(() => {
    return () => {
      if (setEditTodo) {
        setEditTodo(null);
      }
    };
  }, [setEditTodo]);

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      setSelectedTags([]);
    };
  }, [handleClickOutside, isModalOpen, setSelectedTags]);

  if (!isModalOpen) {
    return (
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={openModal}
          className="bg-gray-700 text-white px-4 py-2 rounded-md"
        >
          Add Task
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        ref={dropdownRef}
        className="bg-white rounded-lg py-6 px-10 z-10 max-w-2xl w-full"
      >
        <form action="submit" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <button onClick={closeModal} className="text-gray-500">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2">Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            ></textarea>
          </div>

          <div>
            <label className="block text-lg font-bold mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.title}
                  onClick={(event) => toggleTag(option.title, event)}
                  className={`tag-button flex items-center gap-2 p-2 rounded-lg ${
                    SelectedTags.includes(option.title) && "bg-[#FAF9F8]"
                  } hover:bg-[#FAF9F8]`}
                >
                  <div
                    className="rounded-full w-8 h-8"
                    style={{ backgroundColor: option.color }}
                  ></div>
                  <span>{option.title}</span>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
