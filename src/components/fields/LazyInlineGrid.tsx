import React from "react";
import { InlineGrid, InlineGridProps } from "./InlineGrid";
import { ComponentList } from "../../types";

export interface LazyInlineGridProps extends Omit<InlineGridProps, "blocks"> {
  blocks: ComponentList;
}

export function LazyInlineGrid(props: LazyInlineGridProps) {
  return (
    <InlineGrid {...props} blocks={props.blocks as any} />
  )
}