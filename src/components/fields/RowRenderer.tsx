import React, { useContext } from "react";
import { InlineBlocks } from "react-tinacms-inline";
import ColumnRenderer from "./ColumnRenderer";
import { InlineGridContext } from "../../providers/InlineGridProvider";
import { InlineGridRowSchema } from "../../types";
import { InlineGridRowProps } from "./InlineGrid";

export interface RowRendererProps {
  name: string;
  index: number;
  data: InlineGridRowSchema<any, any>;
}

export function RowRenderer(props: RowRendererProps) {
  const { options } = useContext(InlineGridContext);
  const { row, column, direction } = options;
  const Row = ("Component" in row) ? row.Component : row.Block.Component;
  const RowBlocksContainer = ({ ref, children }) => (
    <div ref={ref}>
      <Row data={props.data} index={props.index}>
        {children}
      </Row>
    </div>
  );
  const columnBlocks = {
    column: {
      Component: ColumnRenderer,
      template: ("template" in column) ? column.template : column.Block.template;
    }
  }
  let colProps: InlineGridRowProps = column;

  return (
    <InlineBlocks
      name="cols"
      direction={direction === "vertical" ? "horizontal" : "vertical"}
      blocks={columnBlocks}
      components={{ Container: RowBlocksContainer}}
      {...colProps}
    />
  );
}

export default RowRenderer;