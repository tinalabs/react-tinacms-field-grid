import _get from "lodash.get";
import React, { useMemo, useState } from "react";
import { BlocksFieldDefinititon } from "tinacms";
import { BlocksControlsProps, InlineBlocks, InlineBlocksProps, useInlineForm } from "react-tinacms-inline";
import { InlineGridProvider } from "../../providers/InlineGridProvider";
import { ComponentList, InlineGridBlock, InlineGridSchema } from "../../types";
import { RowRenderer } from "./RowRenderer";

export interface InlineGridControlProps extends Omit<BlocksControlsProps, "index" | "children"> {}

export interface InlineGridProps extends Omit<InlineBlocksProps, "blocks" | "controls"> {
  blocks: ComponentList | BlocksFieldDefinititon['templates'];
  row: InlineGridRowProps;
  column: InlineGridColProps;
}

export type InlineGridRowProps = InlineGridBlock | {
  Block: InlineGridBlock;
} & Omit<BlocksControlsProps, "children">;

export type InlineGridColProps = InlineGridBlock | {
  Block: InlineGridBlock
} & Omit<BlocksControlsProps, "children">;

export function InlineGrid<TRowProps, TColProps>(props: InlineGridProps) {
  const { direction, name, row } = props;
  const inlineForm = useInlineForm();
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

  return (
    <InlineGridProvider
      value={{
        data: layout,
        componentMap: componentMap,
        setComponentMap: setComponentMap.bind(this),
        options: {
          ...props,
          direction: props.direction ?? "vertical"
        }
      }}
    >
      <InlineBlocks
        {...props}
        name={`${name}.rows`}
        blocks={rowBlocks}
        direction={direction}
      />
    </InlineGridProvider>
  );
}

export default InlineGrid;