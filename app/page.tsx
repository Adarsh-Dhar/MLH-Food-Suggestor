// pages/index.tsx
"use client"
import axios from 'axios';
import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput/page'; // Adjust the path as needed

interface Food {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
}

export default function Home() {
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [suggestedFoods, setSuggestedFoods] = useState<Food[]>([]);

    const handleAddIngredient = (ingredient: string): void => {
        setIngredients([...ingredients, ingredient]);
    };

    const handleSubmit = async (): Promise<void> => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.join(',')}`
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
            <IngredientInput onAddIngredient={handleAddIngredient} />
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>
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
