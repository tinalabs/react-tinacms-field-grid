import React, { useMemo } from "react";
import { BlockComponentProps, InlineBlocks } from "react-tinacms-inline";
import { useInlineGrid } from "../../../hooks/useInlineGrid";
import RenderChildren from "../../RenderChildren";
import { ColumnsRenderer } from "../Column/ColumnsRenderer";

export interface RowsRendererProps {}

export function RowsRenderer(props: RowsRendererProps) {
  const { options } = useInlineGrid();
  const rowBlocks = useMemo(() => ({
    row: {
      Component: RowRenderer,
      template: options?.rowOptions?.template ?? { label: "Row" }
    }
  }), [options?.rowOptions?.template]);

  return (
    <InlineBlocks
      {...options?.rowOptions}
      name={`${options?.name}.rows`}
      direction={options?.direction}
      blocks={rowBlocks}
      components={options?.components}
    />
  );
}

export interface RowRendererProps extends BlockComponentProps {
  data: any
}

export function RowRenderer(props: RowRendererProps) {
  const { options } = useInlineGrid();
  const Grid = useMemo(() => options?.components?.Grid ? options?.components?.Grid : RenderChildren, [options?.components?.Grid]);

  return (
    <Grid>
      <ColumnsRenderer row={props} />
    </Grid>
  )
}

export default RowsRenderer;