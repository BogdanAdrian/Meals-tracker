export function mealsObjectToArray(meals) {
  const array = [];

  for (let mealId in meals) {
    array.push({
      ...meals[mealId],
      id: mealId
    });
  }

  return array;
}