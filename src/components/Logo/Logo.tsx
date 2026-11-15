import IconSearch from "@/components/Icons/IconSearch";
import { cn } from "@/utils/tailwind";

const Logo = () => {
  return (
    <h1
      className={cn(
        "flex flex-row justify-center items-center gap-3 mb-[50px] sm:mb-10",
        "font-[600] text-center text-primary-contrast",
        "text-[24px] sm:text-[50px]",
        "duration-300",
      )}
    >
      <span className="relative">
        shoukai
        <span
          className={cn(
            "absolute top-full right-0 rounded-full bg-[#82a849]",
            "h-[3px] w-[32px]",
            "sm:h-[5px] sm:w-[70px]",
            "duration-300",
          )}
        />
        <small className="hidden sm:block absolute text-[14px] text-[#5b0000] left-0 -bottom-2.5">
          alfa
        </small>
      </span>
      <IconSearch
        className={cn(
          "fill-[#82a849] text-[#82a849]",
          "size-8 sm:size-12",
          "duration-300",
        )}
      />
    </h1>
  );
};

export default Logo;
