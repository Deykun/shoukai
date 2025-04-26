import clsx from "clsx";

import IconSearch from "@/components/Icons/IconSearch";

const Logo = () => {
  return (
    <h1
      className={clsx(
        "flex flex-row justify-center items-center gap-3 mb-10",
        "text-[50px] font-[600] text-center text-primary-contrast"
      )}
    >
      <span className="relative">
        shoukai
        <span className="absolute top-full right-0 h-[5px] w-[70px] rounded-full bg-[#82a849]" />
        
      <small className="absolute text-[10px] text-[#5b0000] left-0 -bottom-2.5">alfa</small>
      </span>
      <IconSearch className="size-12 fill-[#82a849]" />
    </h1>
  );
};

export default Logo;
