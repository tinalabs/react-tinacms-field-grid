import _get from "lodash.get";
import React, { useContext, useMemo, useState } from "react";
import { BlocksControlsProps, InlineBlocks, InlineBlocksProps, useInlineForm } from "react-tinacms-inline";
import { InlineGridContext, InlineGridProvider } from "../../providers/InlineGridProvider";
import { InlineGridBlock, PropsSchema } from "../../types";
import { InlineGridRowProps, InlineGridRowSchema, RowRenderer } from "./RowRenderer";
import { InlineGridColProps } from "./ColumnRenderer";

export interface InlineGridControlProps extends Omit<BlocksControlsProps, "index" | "children"> {}

export type InlineGridSchema<TRowProps = PropsSchema, TColProps = PropsSchema> = {
  id?: string;
  rows: InlineGridRowSchema<TRowProps, TColProps>[];
}

export interface InlineGridProps extends Omit<InlineBlocksProps, "blocks" | "controls"> {
  blocks: InlineBlocksProps['blocks'];
  row: InlineGridRowProps;
  column: InlineGridColProps;
}

export function InlineGrid<TRowProps, TColProps>(this: React.Component, props: InlineGridProps) {
  const { direction, name, row } = props;
  const inlineForm = useInlineForm();
  const context = useContext(InlineGridContext);
  const options = context?.options;
  const [componentMap, setComponentMap] = useState(
    new Map<string, InlineGridBlock>()
  );
  const layout = useMemo(() => {
    return inlineForm.form.values[name] as InlineGridSchema<TRowProps, TColProps>;
  }, [name, inlineForm.form.values]);
  const rowBlocks = {
    row: {
      Component: RowRenderer,
      template: ("template" in row) ? row.template : row.Block.template
    }
  }
  const rowProps = (options?.row && "Block" in options.row)
  ? options.row
    : {};
  
  console.log({
    layout,
    props,
    rowProps
  });

  return (
    <InlineGridProvider
      value={{
        data: layout,
        componentMap: componentMap,
        setComponentMap: setComponentMap.bind(this),
        izLazy: (props as any)['isLazy'] ?? false,
        options: {
          ...props,
          direction: props.direction ?? "vertical"
        }
      }}
    >
      <InlineBlocks
        {...props}
        {...rowProps}
        name={`${name}.rows`}
        blocks={rowBlocks}
        direction={direction}
      />
    </InlineGridProvider>
  );
}