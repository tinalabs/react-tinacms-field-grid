import React, { useEffect, useState } from "react";
import { Block, InlineBlocksProps } from "react-tinacms-inline";
import { useCMS } from "tinacms";
import useInlineGrid from "../../../hooks/useInlineGrid";
import { ComponentList, InlineGridBlock, PropsSchema } from "../../../types";
import { LazyInlineGridProps } from "../LazyInlineGrid";
import BlocksRenderer from "./BlocksRenderer";

export interface LazyBlocksRendererProps extends Omit<InlineBlocksProps, "blocks" | "name"> {
  blocksData: PropsSchema[];
  lazyBlocks: LazyInlineGridProps['blocks']
}

export function LazyBlocksRenderer(props: LazyBlocksRendererProps) {
  const { lazyBlocks, blocksData } = props;
  const cms = useCMS();
  const context = useInlineGrid();
  const { componentMap, setComponentMap } = context;
  const [blocks, setBlocks] = useState<{ [key: string]: Block }>();
  const [error, setError] = useState<Error>();
  const hasBlocks = typeof blocks !== "undefined" && Object.keys(blocks).length > 0;

  useEffect(() => {
    const fetchBlocks = async () => {
      const initialSize = componentMap.size;

      if (cms.enabled) {
        await getBlocksForEditing(lazyBlocks, componentMap);
      }
      else {
        for (let block of blocksData) {
          await getBlockForRendering(block._template, lazyBlocks, componentMap);
        }
      }

      if (componentMap.size !== initialSize) {
        setComponentMap(new Map(componentMap));
      }
    }
    const getBlocks = async () => {
      let updatedBlocks: { [key: string]: Block } = {};

      componentMap.forEach((block, id) => {
        updatedBlocks[id] = block;
      })
  
      if (typeof blocks !== "undefined" && Object.keys(updatedBlocks).length > Object.keys(blocks).length) {
        setBlocks(updatedBlocks);
      }
    }

    fetchBlocks()
      .then(() => getBlocks())
      .catch(error => setError(error));
  }, [props.lazyBlocks]);

  if (error) {
    throw error;  
  }

  console.log({
    lazyBlocksProps: props,
    blocks
  })

  if (blocks && hasBlocks) {
    return (
      <BlocksRenderer
        {...props}
        blocks={blocks}
      />
    )
  }
  else {
    // TODO: make this configurable
    return <>Loading blocks...</>
  }
}

async function getBlocksForEditing(components: ComponentList, componentMap: Map<string, InlineGridBlock>) {
  for (let component of components) {
    if (!componentMap.has(component.id)) {
      const block = await component.importFunc();

      componentMap.set(component.id, block);
    }
  }

  return componentMap;
}

async function getBlockForRendering(blockId: string, lazyBlocks: ComponentList, componentMap: Map<string, InlineGridBlock>) {
  return componentMap;
}

export default LazyBlocksRenderer;