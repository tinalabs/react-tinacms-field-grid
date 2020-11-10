import React, { useMemo } from "react";
import { Block, BlockComponentProps, BlocksContainerProps, InlineBlocks } from "react-tinacms-inline";
import { useInlineGrid } from "../../../hooks/useInlineGrid";
import RenderChildren from "../../RenderChildren";
import { BlocksRenderer } from "../Block";

export interface ColumnsRendererProps {
  row: BlockComponentProps
}

export function ColumnsRenderer(props: ColumnsRendererProps) {
  const { options } = useInlineGrid();
  const Row = useMemo(() => {
    return options?.components?.Row ?? RenderChildren
  }, [options?.components?.Row]);
  const columnBlock = useMemo(() => ({
    Component: ColumnRenderer,
    template: options?.columnOptions?.template ?? { label: "Column" }
  }), [options?.columnOptions?.template]) as Block;
  const columnContainer = useMemo(() => {
    return useMemo(() => (containerProps: BlocksContainerProps) => (
      <div ref={containerProps.innerRef} className={containerProps.className}>
        <Row {...props.row}>
          {(containerProps as any).children}
        </Row>
      </div>
    ), [props.row])
  }, [props.row]);
  const columnName = useMemo(() => options?.columnOptions?.name ?? "columns", [options?.rowOptions?.name]);
  const direction = options?.columnOptions?.direction ?? options?.rowOptions?.direction === "vertical" ? "horizontal" : "vertical";

  return (
    <InlineBlocks
      {...options?.columnOptions}
      name={columnName}
      direction={direction}
      blocks={{ column: columnBlock }}
      components={{ Container: columnContainer }}
    />
  );
}

export interface ColumnRendererProps extends BlockComponentProps {
  data: any;
}

export function ColumnRenderer(props: ColumnRendererProps) {
  const { options } = useInlineGrid();
  const Column = useMemo(() => options?.components?.Column ? options?.components?.Column : RenderChildren, [options?.components?.Column]);

  return (
    <Column {...props}>
      <BlocksRenderer />
    </Column>
  );
}