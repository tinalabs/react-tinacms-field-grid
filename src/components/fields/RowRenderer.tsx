import React, { useContext } from "react";
import { BlocksContainerProps, InlineBlocks } from "react-tinacms-inline";
import { InlineGridContext } from "../../providers/InlineGridProvider";
import { InlineGridRowSchema } from "../../types";
import { InlineGridRowProps } from "./InlineGrid";
import ColumnRenderer from "./ColumnRenderer";

export interface RowRendererProps {
  name: string;
  index: number;
  data: InlineGridRowSchema<any, any>;
}

export function RowRenderer(props: RowRendererProps) {
  const { options } = useContext(InlineGridContext);
  const { row, column, direction } = options;
  const Row = ("Component" in row) ? row.Component : row.Block.Component;
  const columnBlocks = {
    column: {
      Component: ColumnRenderer,
      template: ("template" in column) ? column.template : column.Block.template
    }
  }
  let colProps: InlineGridRowProps = column;
  const rowContainer = ({ innerRef }: BlocksContainerProps) => (
    <div ref={innerRef}>
      <Row data={props.data} index={props.index} />
    </div>
  );

  return (
    <InlineBlocks
      name="cols"
      direction={direction === "vertical" ? "horizontal" : "vertical"}
      blocks={columnBlocks}
      components={{Container: rowContainer}}
      {...colProps} />
  );
}

export default RowRenderer;