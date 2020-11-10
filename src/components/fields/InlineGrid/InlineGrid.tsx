import React, { useMemo, useState } from "react";
import { BlockTemplate } from "tinacms";
import { InlineBlocksProps, BlocksContainerProps } from "react-tinacms-inline";
import { InlineGridProvider } from "../../../state/InlineGridProvider";
import { InlineGridRow, InlineGridRowProps, RowsRenderer } from '../Row';
import { InlineGridColumn, InlineGridColumnProps } from '../Column';

export interface InlineGridProps<TBlocks extends InlineBlocksProps['blocks']> {
  name: string;
  blocks: TBlocks;
  blockOptions?: Omit<InlineBlocksProps, "blocks" | "controls" | "components">;
  rowOptions?: RowOptions;
  columnOptions?: ColumnOptions;
  components?: {
    Container?: React.FunctionComponent<BlocksContainerProps>,
    Grid?: React.FunctionComponent<any>;
    Row?: React.FunctionComponent<InlineGridRowProps>
    Column?: React.FunctionComponent<InlineGridColumnProps>
  }
}

export type RowOptions = Partial<Omit<InlineBlocksProps, "blocks" | "components">> & {
  template?: BlockTemplate
}

export type ColumnOptions = RowOptions;

export function InlineGrid(this: typeof InlineGrid, props: InlineGridProps<InlineBlocksProps['blocks']>) {
  const isLazy = useMemo(() => (props as any).isLazy ?? false, [(props as any).isLazy])
  const [blocksMap, setBlocksMap] = useState(
    new Map<string, any>()
  );
  const options = useMemo(() => ({
    ...props,
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