import React from "react";
import { InlineBlocks } from "react-tinacms-inline";
import { useInlineGrid } from "../../../hooks/useInlineGrid";

export function BlocksRenderer() {
  const { options } = useInlineGrid();
  const direction = options?.blockOptions?.direction ?? options?.rowOptions?.direction === "vertical" ? "vertical" : "horizonal";
  const name = options?.blockOptions?.name ?? "blocks";
  
  return (
    <InlineBlocks
      {...options?.blockOptions}
      name={name}
      direction={direction as any}
      blocks={options?.blocks} />
  )
}