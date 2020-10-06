import React from "react";
import { InlineGridProps } from "../components/fields/InlineGrid/InlineGrid";
import { InlineGridBlock } from "../types";

export interface InlineGridContextProps<TRowProps = any, TColProps = any> {
  isLazy: boolean;
  blocksMap: Map<string, InlineGridBlock>;
  setBlocksMap(blocksMap: InlineGridContextProps['blocksMap']): void;
  options?: InlineGridProps<any>
}

export const InlineGridContext = React.createContext<InlineGridContextProps>({
  isLazy: false,
  blocksMap: new Map(),
  setBlocksMap: () => undefined
});

export const InlineGridProvider = InlineGridContext.Provider;

export const InlineGridConsumer = InlineGridContext.Consumer;

export default InlineGridProvider;