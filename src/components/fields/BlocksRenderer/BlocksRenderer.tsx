import React from "react";
import { InlineBlocks, InlineBlocksProps } from "react-tinacms-inline";

export interface BlocksRendererProps extends Omit<InlineBlocksProps, "name"> {}

export function BlocksRenderer(props: BlocksRendererProps) {
  const { blocks, direction } = props;

  console.log({
    blockProps: props
  });

  return (
    <InlineBlocks
      name="blocks"
      direction={direction === "vertical" ? "vertical" : "horizontal"}
      blocks={blocks}
    />
  )
}

export default BlocksRenderer;