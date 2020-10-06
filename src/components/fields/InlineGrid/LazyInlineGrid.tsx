import React from "react";
import { Block } from "react-tinacms-inline";
import { InlineGrid, InlineGridProps } from "./InlineGrid";

export interface LazyInlineGridProps extends Omit<InlineGridProps<any>, "blocks"> {
  lazyBlocks: {
    [key: string]: LazyBlock
  }
}

export interface LazyBlock {
  import(): React.FC<Block>
}

export function LazyInlineGrid(props: LazyInlineGridProps) {
  const Grid = InlineGrid as React.FunctionComponent<InlineGridProps<any>>;

  return (
    <Grid {...props} blocks={props.lazyBlocks} />
  )
}