import React from "react";

type SearchBarProps = {
  searchTerm: string;
  onSearch: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search notes by title..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
