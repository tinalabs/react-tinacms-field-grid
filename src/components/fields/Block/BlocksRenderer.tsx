import React from "react";
import { InlineBlocks } from "react-tinacms-inline";
import { useInlineGrid } from "../../../hooks/useInlineGrid";

export function BlocksRenderer() {
  const { options } = useInlineGrid();
  
  return (
    <InlineBlocks
      name="blocks"
      direction={options?.direction}
      blocks={options?.blocks} />
  )
}