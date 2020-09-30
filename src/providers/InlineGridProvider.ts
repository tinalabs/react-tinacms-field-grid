import React from "react";
import { InlineGridProps, InlineGridSchema } from "../components/fields/InlineGrid";
import { InlineGridBlock } from "../types";

export interface InlineGridContextProps<TRowProps = any, TColProps = any> {
  izLazy: boolean;
  componentMap: Map<string, InlineGridBlock>;
  setComponentMap(componentMap: InlineGridContextProps['componentMap']): void;
  data?: InlineGridSchema<TRowProps, TColProps> | null;
  options?: InlineGridProps
}

export const InlineGridContext = React.createContext<InlineGridContextProps>({
  izLazy: false,
  componentMap: new Map(),
  setComponentMap: () => undefined
});

export const InlineGridProvider = InlineGridContext.Provider;

export const InlineGridConsumer = InlineGridContext.Consumer;

export default InlineGridProvider;