import React, { useContext } from "react";
import { BlocksControls, BlocksControlsProps, InlineBlocks, InlineBlocksProps } from "react-tinacms-inline";
import { InlineGridContext } from "../../providers/InlineGridProvider";
import { InlineGridBlock, PropsSchema } from "../../types";
import ColumnRenderer, { InlineGridColSchema } from "./ColumnRenderer";

export interface RowRendererProps {
  index: number;
  data: InlineGridRowSchema<any, any>;
}

export type InlineGridRowSchema<TRowProps = PropsSchema, TColProps = PropsSchema> = {
  columns: InlineGridColSchema<TColProps>[];
} & {
  [key: string]: TRowProps
}

export type InlineGridRowProps = InlineGridBlock | {
  Block: InlineGridBlock;
} & Omit<BlocksControlsProps, "children">
  & Omit<InlineBlocksProps, "blocks" | "name">;

export function RowRenderer(props: RowRendererProps) {
  const context = useContext(InlineGridContext);
  const options = context?.options;

  if (typeof options?.row === "undefined") {
    throw new Error("You must provide a row block to InlineGrid");
  }

  const Row = (options.row && "Block" in options?.row)
    ? options.row.Block
    : options.row;
  const rowProps = (options.row && "Block" in options.row)
    ? options.row
    : {};
  const columnBlocks = {
    column: {
      Component: ColumnRenderer,
      template: (options.column)
        ? ("template" in options.column) ? options.column.template : options.column.Block.template
        :
        {
          label: "Column"  
        }
    }
  }
  const columnProps = (options.column && "Block" in options.column)
  ? options.column
  : {};
  const rowContainer = ({ innerRef, children }: any) => {
    const rowData: Partial<InlineGridRowSchema> = props.data;

    delete rowData.columns;

    console.log({
      rowProps: props,
      rowInlineGridProps: columnProps,
      rowData
    });

    return (
      <div ref={innerRef}>
        <Row.Component controls={rowProps} data={rowData} index={props.index}>
          {children}
        </Row.Component>
      </div>
    )
  };

  return (
    <InlineBlocks
      {...columnProps}
      name="columns"
      direction={options?.direction === "vertical" ? "horizontal" : "vertical"}
      blocks={columnBlocks}
      components={{ Container: rowContainer }}
    />
  );
}

export default RowRenderer;