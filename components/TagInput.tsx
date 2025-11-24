import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center w-full min-h-[42px] px-3 py-2 bg-white border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 transition-all">
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="flex items-center gap-1 px-2 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md animate-fadeIn"
        >
          {tag}
          <button 
            type="button" 
            onClick={() => removeTag(index)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <X size={14} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        className="flex-1 min-w-[120px] outline-none text-gray-700 bg-transparent text-sm placeholder-gray-400"
        placeholder={tags.length === 0 ? "Add tags (press Enter)..." : ""}
      />
    </div>
  );
};
