export interface Category {
    idCategory: string;
    strCategory: string;
  }
  
  export interface Meal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }
  
  export interface MealDetails {
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strCategory: string;
    strArea: string;
    strTags: string;
    strMealThumb: string;
    strYoutube: string;
    [key: string]: string;
  }
  