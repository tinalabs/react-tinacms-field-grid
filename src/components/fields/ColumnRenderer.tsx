import React from "react";
import { BlocksControlsProps, InlineBlocksProps } from "react-tinacms-inline";
import useInlineGrid from "../../hooks/useInlineGrid";
import { PropsSchema, InlineGridBlock, ComponentList } from "../../types";
import { BlocksRenderer, LazyBlocksRenderer } from "./BlocksRenderer";
import { InlineGridProps } from "./InlineGrid";

export interface ColumnRendererProps {
  index: number;
  data: InlineGridColSchema<any>;
}

export type InlineGridColSchema<TColProps = PropsSchema> = {
  blocks: PropsSchema[];
} & {
  [key: string]: TColProps;
}

export type InlineGridColProps = InlineGridBlock | {
  Block: InlineGridBlock;
} & Omit<BlocksControlsProps, "children">
  & Omit<InlineBlocksProps, "blocks" | "name">;

export function ColumnRenderer(props: ColumnRendererProps) {
  const { index, data } = props;
  const context = useInlineGrid();
  const { options, izLazy } = context;

  if (!options?.column) {
    throw new Error("You must provide a column block to InlineGrid");
  }

  const BlocksRendererInstance = (options: InlineGridProps & { izLazy: boolean }) => {
    if (izLazy) {
      return (
        <LazyBlocksRenderer lazyBlocks={options.blocks as any} blocksData={props.data.blocks} />
      )
    }
  
    return <BlocksRenderer blocks={options.blocks} />
  }
  const Column = (options.column && "Block" in options?.column)
    ? options.column.Block
    : options.column;
  const columnProps = (options.column && "Block" in options.column)
    ? options.column
    : {};
  const columnData: Partial<InlineGridColSchema> = data;

  delete columnData.blocks;

  console.log({
    columnProps: props,
    columnInlineGridProps: columnProps,
    columnData
  });

  return (
    <Column.Component controls={columnProps} data={columnData} index={index}>
      <BlocksRendererInstance {...options} izLazy={izLazy} />
    </Column.Component>
  )
}

export default ColumnRenderer;