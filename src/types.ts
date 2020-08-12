import { BlockTemplate } from "tinacms";
import { Block, BlockComponentProps } from "react-tinacms-inline";

export type InlineGridSchema<TRowProps = PropsSchema, TColProps = PropsSchema> = {
  id?: string;
  rows: InlineGridRowSchema<TRowProps, TColProps>[];
}

export type InlineGridRowSchema<TRowProps = PropsSchema, TColProps = PropsSchema> = {
  columns: InlineGridColSchema<TColProps>[];
} & {
  [key: string]: TRowProps
}

export type InlineGridColSchema<TColProps = PropsSchema> = {
  blocks: PropsSchema[];
} & {
  [key: string]: TColProps;
}

export type PropsSchema = { [key: string]: any };

export type ComponentList = ComponentDefinition[];

export interface ComponentDefinition {
  id: string;
  importFunc(): Promise<InlineGridBlock>;
}

export interface InlineGridBlock<TProps extends BlockComponentProps = BlockComponentProps> extends Block {
  Component: React.FunctionComponent<TProps>;
  template: BlockTemplate;
  preview: React.FunctionComponent;
}