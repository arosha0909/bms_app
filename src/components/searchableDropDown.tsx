import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Option {
  _id: string;
  name: string;
  description: string;
}

interface SearchableDropdownProps {
  label: string;
  options: Option[];
  placeholder?: string;
  onSelect: (value: any) => void;
  error?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  options,
  placeholder = "Select an option",
  onSelect,
  error,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt._id === selected);

  return (
    <div className="mb-4 relative">
      <label className="mb-2 ml-1 font-bold text-xs text-slate-700">
        {label}
      </label>
        <div
          ref={triggerRef}
          className="focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? selectedOption.name : placeholder}
        </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: popupPosition.top,
              left: popupPosition.left,
              width: triggerRef.current?.offsetWidth || "200px",
            }}
            className="bg-white border border-gray-300 rounded-lg mt-1 z-50 shadow-lg"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border-b border-gray-300 focus:outline-none"
              placeholder="Search..."
              autoFocus
            />
            <div className="max-h-40 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option._id}
                    className="px-3 py-1 hover:bg-gray-200 cursor-pointer text-sm"
                    onClick={() => {
                      setSelected(option._id);
                      onSelect(option);
                      setIsOpen(false);
                      setSearch("");
                    }}
                  >
                    {option.name}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-500">No results found</div>
              )}
            </div>
          </div>,
          document.body
        )}

      {error && <small className="error text-red-500">{error}</small>}
    </div>
  );
};

export default SearchableDropdown;
