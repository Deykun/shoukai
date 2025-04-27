import useSearchSettingsStore from "@/features/search/stores/searchSettingsStore";
import RecipesItem from "./RecipesItem";

const Recipes = () => {
  const recipesById = useSearchSettingsStore((state) => state.recipesById);

  return (
    <ul className="grid grid-cols-2 gap-4">
      {Object.values(recipesById).map((userRecipe) => (
        <RecipesItem userRecipe={userRecipe} />
      ))}
    </ul>
  );
};

export default Recipes;
