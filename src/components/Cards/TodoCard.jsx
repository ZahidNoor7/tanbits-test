import { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";

const TodoCard = ({ TaskDetails, toggleTodoStatus, deleteTodo, editTodo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    editTodo(TaskDetails.id);
  };

  const handleDelete = () => {
    deleteTodo(TaskDetails.id);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="TodoCard p-4 rounded-md" style={{ background: "#FFF9DE" }}>
      <div className="flex flex-col gap-4">
        <div className="CardHeader flex items-center justify-between">
          <div
            className={`text-2xl ${
              TaskDetails.completed ? "line-through" : ""
            }`}
          >
            {TaskDetails.title}
          </div>
          <div>
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="flex items-center p-2 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <BsThreeDots size={20} />
              </button>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  ref={dropdownRef}
                >
                  <div className="py-1">
                    <button
                      onClick={handleEdit}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Edit...
                    </button>
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`CardBody ${TaskDetails.completed ? "line-through" : ""}`}
        >
          {TaskDetails.description}
        </div>

        <div className="CardFooter flex items-center justify-between">
          <div className="flex space-x-2">
            {TaskDetails.tags.map((option, index) => (
              <div
                key={index}
                className="rounded-full w-8 h-8"
                style={{
                  backgroundColor:
                    option === "Work"
                      ? "#D2CEFF"
                      : option === "Study"
                      ? "#D1E5F7"
                      : option === "Entertainment"
                      ? "#FFCECE"
                      : "#DAF2D7",
                }}
              />
            ))}
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={TaskDetails.completed}
                onChange={() => toggleTodoStatus(TaskDetails.id)}
              />
              <span>Done</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
