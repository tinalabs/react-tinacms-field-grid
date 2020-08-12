import React from "react";
import { InlineGridProps } from "../components/fields/InlineGrid";
import { InlineGridBlock, InlineGridSchema } from "../types";

export interface InlineGridContextProps<TRowProps = any, TColProps = any> {
  data: InlineGridSchema<TRowProps, TColProps>;
  componentMap: Map<string, InlineGridBlock>;
  setComponentMap(componentMap: InlineGridContextProps['componentMap']): void;
  options: InlineGridProps
}

export const InlineGridContext = React.createContext<InlineGridContextProps | null>(
  null
);

export const InlineGridProvider = InlineGridContext.Provider;

export const InlineGridConsumer = InlineGridContext.Consumer;

export default InlineGridProvider;