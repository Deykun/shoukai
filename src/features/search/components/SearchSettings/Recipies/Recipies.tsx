import useSearchSettingsStore from "@/features/search/stores/searchSettingsStore";
import RecipiesItem from "./RecipiesItem";

const Recipies = () => {
  const recipies = useSearchSettingsStore((state) => state.recipies);

  return (
    <ul className="grid grid-cols-3 gap-4">
      {recipies.map((userRecipie) => (
        <RecipiesItem userRecipie={userRecipie} />
      ))}
    </ul>
  );
};

export default Recipies;
