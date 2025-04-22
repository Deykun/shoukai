import useSearchSettingsStore from "@/features/search/stores/searchSettingsStore";
import RecipiesItem from "./RecipiesItem";

const Recipies = () => {
  const recipies = useSearchSettingsStore((state) => state.recipies);

  return (
    <ul>
      {recipies.map((userRecipie) => (
        <RecipiesItem userRecipie={userRecipie} />
      ))}
    </ul>
  );
};

export default Recipies;
