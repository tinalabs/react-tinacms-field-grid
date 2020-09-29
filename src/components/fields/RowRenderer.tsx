import React, { useContext } from "react";
import { InlineBlocks } from "react-tinacms-inline";
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

  return (
    <InlineBlocks
      name="cols"
      direction={direction === "vertical" ? "horizontal" : "vertical"}
      blocks={columnBlocks}
      {...colProps}
    >
      {({providedRef, children}) => (
        <div ref={providedRef}>
          <Row data={props.data} index={props.index}>
            {children}
          </Row>
        </div>
      )}
    </InlineBlocks>
  );
}

export default RowRenderer;