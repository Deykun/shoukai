import { useState } from "react";

import ButtonText from "@/components/UI/ButtonText";

import IconNewTab from "@/components/Icons/IconNewTab";
import Checkbox from "@/components/UI/Checkbox";
import Radiobox from "@/components/UI/Radiobox";


const General = () => {
  const [v, setV] = useState(false);

  return (
    <div>
      <ButtonText>
        <IconNewTab />
        <span>Recipes</span>
      </ButtonText>
      <br />
      <br />
      Checkbox:
      <div>
        <Checkbox size="small" isActive={v} onChange={(x) => setV(x)} />
        <Radiobox size="small" isActive={v} onChange={(x) => setV(x)} />
      </div>
      <div>
        <Checkbox isActive={v} onChange={(x) => setV(x)} />
        <Radiobox isActive={v} onChange={(x) => setV(x)} />
      </div>
      <div>
        <Checkbox size="large" isActive={v} onChange={(x) => setV(x)} />
        <Radiobox size="large" isActive={v} onChange={(x) => setV(x)} />
      </div>
    </div>
  );
};

export default General;
