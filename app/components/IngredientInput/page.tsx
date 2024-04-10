"use client"
import React, { useState, ChangeEvent } from 'react';

interface IngredientInputProps {
    onAddIngredient: (ingredient: string) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onAddIngredient }: IngredientInputProps) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [addedIngredients, setAddedIngredients] = useState<string[]>([]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const handleAddIngredient = (): void => {
        if (inputValue.trim() !== '') {
            onAddIngredient(inputValue.trim());
            setAddedIngredients([...addedIngredients, inputValue.trim()]);
            setInputValue('');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                placeholder="What do you want to eat today"
                value={inputValue}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 mb-2 w-full max-w-md"
            />
            <button onClick={handleAddIngredient} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-md">
                Add
            </button>
            <ul className="mt-2">
                {addedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientInput;
