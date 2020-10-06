import React, { useMemo } from "react";
import { BlockComponentProps, BlocksContainerProps, BlocksControls, InlineBlocks } from "react-tinacms-inline";
import { useInlineGrid } from "../../../hooks/useInlineGrid";
import RenderChildren from "../../RenderChildren";
import { BlocksRenderer } from "../Block";

export function ColumnsRenderer() {
  const { options } = useInlineGrid();
  const columnBlock = useMemo(() => ({
    Component: ColumnRenderer,
    template: options?.columnOptions?.template ?? { label: "Column" }
  }), [options?.columnOptions?.template])
  const Row = options?.components?.Row ? options?.components?.Row : RenderChildren;

  return (
    <InlineBlocks
      {...options?.columnOptions}
      name="columns"
      direction={options?.direction === "vertical" ? "horizontal" : "vertical"}
      blocks={{ column: columnBlock }}
      components={{Container: Row as any}}
    />
  );
}

export interface ColumnRendererProps extends BlockComponentProps {
  data: any;
}

export function ColumnRenderer(props: ColumnRendererProps) {
  const { options } = useInlineGrid();
  const Column = options?.components?.Column as React.FunctionComponent<BlocksContainerProps> || RenderChildren;

  return (
    <Column innerRef={null}>
      <BlocksControls index={props.index}>
        <BlocksRenderer />
      </BlocksControls>
    </Column>
  );
}