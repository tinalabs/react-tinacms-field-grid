import React, { useMemo, useState } from "react";
import { InlineBlocksProps, BlocksContainerProps } from "react-tinacms-inline";
import { InlineGridProvider } from "../../../state/InlineGridProvider";
import { InlineGridRow, InlineGridRowProps, RowsRenderer } from '../Row';
import { InlineGridColumn, InlineGridColumnProps } from '../Column';
import { BlockTemplate } from "tinacms";

export interface InlineGridProps<TBlocks extends any> extends Omit<InlineBlocksProps, "blocks" | "controls" | "components"> {
  blocks: TBlocks;
  rowOptions?: RowOptions;
  columnOptions?: ColumnOptions;
  components?: {
    Container?: React.FunctionComponent<BlocksContainerProps>,
    Grid?: React.FunctionComponent<any>;
    Row?: React.FunctionComponent<InlineGridRowProps>
    Column?: React.FunctionComponent<InlineGridColumnProps>
  }
}

export type RowOptions = Omit<InlineBlocksProps, "blocks" | "name"> & {
  template: BlockTemplate
}

export type ColumnOptions = RowOptions;

export function InlineGrid(this: typeof InlineGrid, props: InlineGridProps<InlineBlocksProps['blocks']>) {
  const isLazy = useMemo(() => (props as any).isLazy ?? false, [(props as any).isLazy])
  const [blocksMap, setBlocksMap] = useState(
    new Map<string, any>()
  );
  const options = useMemo(() => ({
    ...props,
    direction: props.direction ?? "vertical",
    components: {
      Row: props.components?.Row || InlineGridRow as React.FunctionComponent<InlineGridRowProps>,
      Column: props.components?.Column || InlineGridColumn as React.FunctionComponent<InlineGridColumnProps>
    }
  }), [props]);
  const contextValues = useMemo(() => ({
    blocksMap: blocksMap,
    setBlocksMap: setBlocksMap.bind(this),
    isLazy: isLazy,
    options: options
  }), [blocksMap, setBlocksMap, isLazy, options]);

  if (typeof options?.blocks === "undefined") {
    throw new Error("You must provide blocks to InlineGrid");
  }

  return (
    <InlineGridProvider
      value={contextValues}
    >
      <RowsRenderer />
    </InlineGridProvider>
  );
}