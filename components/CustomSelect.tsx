import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    label: string;
    value: string;
    options: Option[];
    onChange: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className="space-y-2" ref={containerRef}>
            <label className="block text-sm font-semibold text-gray-700">
                {label}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg flex items-center justify-between transition-all duration-200 group hover:bg-white ${isOpen
                            ? 'border-orange-500 ring-2 ring-orange-500/20 bg-white'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                >
                    <span className={`block truncate ${!selectedOption ? 'text-gray-400' : 'text-gray-700'}`}>
                        {selectedOption?.label || 'Select an option'}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180 text-orange-500' : 'group-hover:text-gray-600'}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl shadow-orange-500/10 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <div className="max-h-60 overflow-auto py-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between hover:bg-orange-50 transition-colors ${value === option.value ? 'text-orange-600 bg-orange-50/50 font-medium' : 'text-gray-700'
                                        }`}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <Check size={16} className="text-orange-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
