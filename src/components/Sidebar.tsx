import React from 'react';
import { MealDetails } from '../types';

interface SidebarProps {
    meal: MealDetails | null;
}

const Sidebar: React.FC<SidebarProps> = ({ meal }) => {
    if (!meal) return null;

    // Create arrays for ingredients and measures
    const ingredients = [];
    const measures: (string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined)[] = [];

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];


        if (ingredient) {
            ingredients.push(ingredient);
            measures.push(measure);
        }
    }

    return (
        <aside className="p-4 w-1/4 fixed right-0 top-0 bottom-0 overflow-y-scroll font-orbitron flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center">{meal.strMeal}</h2>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-2/4 h-auto mt-2" />
            <p className="mt-4 text-center"><strong>Category:</strong> {meal.strCategory}</p>
            <p className="text-center"><strong>Area:</strong> {meal.strArea}</p>
            <p className="text-center"><strong>Tags:</strong> {meal.strTags}</p>
            <p className="text-center"><strong>Youtube:</strong> {meal.strYoutube}</p>
            <p className="text-center"><strong>Source:</strong> {meal.strSource}</p>
            <h3 className="mt-4 font-semibold text-center">Ingredients:</h3>
            <ul className="list-disc list-inside font-serif">
                {ingredients.map((ingredient, index) => (
                    <li key={index} className="text-center">
                        {ingredient}: {measures[index]}
                    </li>
                ))}
            </ul>

            <h3 className="mt-4 font-semibold text-center">Instructions:</h3>
            <p style={{ fontFamily: 'Raleway, sans-serif' }} className="text-center">{meal.strInstructions}</p>
        </aside>

    );
};

export default Sidebar;

//style={{ fontFamily: 'Raleway, sans-serif' }}
