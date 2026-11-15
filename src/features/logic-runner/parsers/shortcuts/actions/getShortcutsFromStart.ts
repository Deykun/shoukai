import { NODE_TYPE } from "@/features/logic/nodes/type/types";
import useDiagramStore from "@/features/logic/stores/useDiagramStore";
import { SearchDirectShortcutsIndex } from "@/types";

import { getSearchUrlFromSearchEngine } from "../../openers/actions/getSearchUrlFromSearchEngine";

export const getShortcutsFromStart = ():
  | SearchDirectShortcutsIndex
  | undefined => {
  const shortcutsIndex: SearchDirectShortcutsIndex = {};
  const state = useDiagramStore.getState();

  const startNode = state.nodes.find((node) => node.type === NODE_TYPE.START);

  if (startNode) {
    Object.values(startNode.data.shortcuts).forEach((shortcut) => {
      try {
        const { getSearchUrl } = getSearchUrlFromSearchEngine({
          searchEngineToOpen: shortcut,
          phrase: shortcut.phrase,
        });

        shortcut.triggers.forEach((trigger) => {
          // getSearchUrl
          shortcutsIndex[trigger] = {
            magicWord: trigger,
            getSearchUrl,
          };
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  return Object.keys(shortcutsIndex).length > 0 ? shortcutsIndex : undefined;
};
