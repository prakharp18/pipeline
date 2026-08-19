import React from 'react';
import { Search } from 'lucide-react';
import { SortOption } from '../types/pokemon';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  types: string[];
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  types
}) => {
  return (
    <section className="controls-section">
      <div className="search-sort-bar">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search Pokémon by name or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="select-input"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="hp">Sort by HP</option>
          <option value="attack">Sort by Attack</option>
          <option value="speed">Sort by Speed</option>
        </select>
      </div>

      <div className="type-pills">
        <button
          className={`type-pill ${selectedType === '' ? 'active' : ''}`}
          onClick={() => onTypeChange('')}
        >
          All Types
        </button>
        {types.map((type) => (
          <button
            key={type}
            className={`type-pill ${selectedType === type ? 'active' : ''}`}
            onClick={() => onTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </section>
  );
};
