import { useContext } from "react";
import { InlineGridContext } from "../providers/InlineGridProvider";

export function useInlineGrid() {
  const context = useContext(InlineGridContext);

  return context;
}

export default useInlineGrid;