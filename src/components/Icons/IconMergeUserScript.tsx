import clsx from "clsx";
import IconMerge from "./IconMerge";
import IconMergeBlocked from "./IconMergeBlocked";
// import IconMergeSemiconnected from "./IconMergeSemiconnected";

type Props = {
  className?: string;
};

const Icon = ({ className }: Props) => (
  <>
    <IconMerge className={clsx("show-for-script", className)} />
    <IconMergeBlocked
      className={clsx("show-for-no-script text-[#d50101]", className)}
    />
    {/* <IconMergeSemiconnected className={clsx("text-[#b15c02]", className)} /> */}
  </>
);

export default Icon;
