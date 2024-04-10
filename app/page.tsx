// pages/index.tsx
"use client"
import axios from 'axios';
import React, { useState } from 'react';

interface Food {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
}

export default function Home() {
    const [ingredientInput, setIngredientInput] = useState<string>('');
    const [suggestedFoods, setSuggestedFoods] = useState<Food[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setIngredientInput(event.target.value);
    };

    const handleAddIngredient = async (): Promise<void> => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientInput}`
            );
            if (response.data.meals) {
                setSuggestedFoods(response.data.meals);
            } else {
                setSuggestedFoods([]);
            }
        } catch (error) {
            console.error('Error fetching food suggestions:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Food Suggestor</h1>
            <div className="flex flex-col items-center mb-4">
                <input
                    type="text"
                    placeholder="Enter ingredient"
                    value={ingredientInput}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 mb-2 w-full max-w-md"
                />
                <button
                    onClick={handleAddIngredient}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full max-w-md"
                >
                    show
                </button>
            </div>
            {suggestedFoods.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Suggested Foods</h2>
                    <ul>
                        {suggestedFoods.map((food) => (
                            <li key={food.idMeal}>{food.strMeal}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
