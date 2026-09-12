import ButtonIcon from "@/components/UI/ButtonIcon";

import useLayout from "../hooks/useLayout";
import IconFlowHorizontal from "@/components/Icons/IconFlowHorizontal";

const ButtonRefreshLayout = () => {
  const layout = useLayout();

  return (
    <ButtonIcon label="Refresh layout" labelPosition="right" onClick={layout}>
      <IconFlowHorizontal />
    </ButtonIcon>
  );
};

export default ButtonRefreshLayout;
