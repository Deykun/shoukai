import ButtonText from "@/components/UI/ButtonText";
import Checkbox from "@/components/UI/Checkbox";
import { ShoukaiShortcut } from "@/features/logic/nodes/type/schema";
import { cn } from "@/utils/tailwind";

type Props = {
  value: ShoukaiShortcut["detectionStrategy"];
  onChange: (value: ShoukaiShortcut["detectionStrategy"]) => void;
};

const PLACES = [
  "start",
  "end",
  "both",
  "middle",
] as const satisfies readonly ShoukaiShortcut["detectionStrategy"]["place"][];

const rowClassName = cn("flex flex-wrap gap-2", "items-center");

export const FlowSelectShortcutStrategy = ({ value, onChange }: Props) => {
  const handlePlaceSelect = (place: (typeof PLACES)[number]) => {
    // middle always requires space, otherwise it would match inside words
    onChange(
      place === "middle"
        ? { place, shouldRequireSpace: true }
        : { place, shouldRequireSpace: value.shouldRequireSpace },
    );
  };

  const handleShouldRequireSpaceChange = (shouldRequireSpace: boolean) => {
    if (value.place === "middle") {
      return;
    }

    onChange({ place: value.place, shouldRequireSpace });
  };

  return (
    <div className="flex gap-2 justify-between flex-wrap">
      <div>
        <p className="text-xs text-primary-contrast mb-1">Place</p>
        <div className={rowClassName}>
          {PLACES.map((place) => (
            <ButtonText
              key={place}
              size="small"
              className="capitalize"
              isActive={place === value.place}
              onClick={() => handlePlaceSelect(place)}
            >
              <span>{place}</span>
            </ButtonText>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-primary-contrast mb-1">Require space</p>
        <div className={rowClassName}>
          <Checkbox
            isActive={value.shouldRequireSpace}
            isDisabled={value.place === "middle"}
            onChange={handleShouldRequireSpaceChange}
          />
        </div>
      </div>
    </div>
  );
};
