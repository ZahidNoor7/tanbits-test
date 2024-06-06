import React from "react";

interface Option {
  color: string;
  title: string;
}

interface FiltersProps {
  options: Option[];
  HideDoneTasks: boolean;
  setHideDoneTasks: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTag: (tag: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  SelectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const Filters: React.FC<FiltersProps> = ({
  options,
  HideDoneTasks,
  setHideDoneTasks,
  toggleTag,
  SelectedTags,
  setSelectedTags,
}) => {
  const changeTaskStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setHideDoneTasks(isChecked);
  };

  return (
    <div className="Filters">
      <h2 className="text-lg font-semibold mb-4">Options</h2>
      <div className="flex lg:flex lg:flex-col gap-4 items-start">
        {options.map((option) => (
          <button
            key={option.title}
            onClick={(event) => toggleTag(option.title, event)}
            className={`flex items-center gap-4 w-full p-2 rounded-lg hover:bg-[#FAF9F8] ${
              SelectedTags.includes(option.title) && "bg-[#FAF9F8]"
            }`}
          >
            <div
              className="rounded-full w-8 h-8"
              style={{ backgroundColor: option.color }}
            ></div>
            <span>{option.title}</span>
          </button>
        ))}
      </div>
      <label className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={HideDoneTasks}
          onChange={changeTaskStatus}
        />
        <span>Hide Done Tasks</span>
      </label>
    </div>
  );
};

export default Filters;
