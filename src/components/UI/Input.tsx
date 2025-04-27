import clsx from "clsx";

type Props = {
  className?: string;
  value?: string;
  defaultValue?: string;
  setValue?: (value: string) => void;
  isDisabled?: boolean;
};

const Input = ({ className = "", value, defaultValue, setValue, isDisabled = false }: Props) => {
  return (
    <div
      className={clsx(
        "relative",
        "flex items-center w-full",
        "rounded-[18px] shadow-sm",
        "border-[#f5f9ef] border",
        "mx-auto font-[500] text-[16px]",
        "hover:border-[#f5f9ef] hover:shadow-md",
        "duration-500",
        className
      )}
    >
      <input
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => (setValue ? setValue(e.target.value || "") : {})}
        className={clsx(
          "w-full py-3 px-5 outline-none",
          "bg-transparent rounded-[24px]",
          "caret-[#82a849] tracking-wider", {
            'opacity-45': isDisabled,
          }
        )}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
