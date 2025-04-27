import useSearchSettingsStore from "@/features/search/stores/searchSettingsStore";
import RecipesItem from "./RecipesItem";

const Recipes = () => {
  const Recipes = useSearchSettingsStore((state) => state.Recipes);

  return (
    <ul className="grid grid-cols-2 gap-4">
      {Recipes.map((userRecipe) => (
        <RecipesItem userRecipe={userRecipe} />
      ))}
    </ul>
  );
};

export default Recipes;
