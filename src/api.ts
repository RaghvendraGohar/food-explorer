const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}categories.php`);
  return response.json();
};

export const fetchMealsByCategory = async (category: string) => {
  const response = await fetch(`${BASE_URL}filter.php?c=${category}`);
  return response.json();
};

export const fetchMealDetails = async (id: string) => {
  const response = await fetch(`${BASE_URL}lookup.php?i=${id}`);
  return response.json();
};
