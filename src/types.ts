import { Block, BlockComponentProps, BlocksControlsProps } from "react-tinacms-inline";

export type PropsSchema = { [key: string]: any };

export type ComponentList = ComponentDefinition[];

export interface ComponentDefinition {
  id: string;
  importFunc(): Promise<InlineGridBlock>;
}

export type InlineGridBlock<TProps extends BlockComponentProps = BlockComponentProps & { controls: Partial<BlocksControlsProps>}> = Block & 
{
  Component: React.FC<TProps>;
  preview: React.FunctionComponent;
}