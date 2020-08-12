import React, { useContext, useEffect, useState } from "react";
import { BlockTemplate, useCMS } from "tinacms";
import { Block, InlineBlocks } from "react-tinacms-inline";
import { InlineGridContext } from "../../providers/InlineGridProvider";
import { ComponentList, InlineGridBlock, InlineGridColSchema } from "../../types";

export interface ColumnBlockProps {
  index: number;
  data: InlineGridColSchema<any>;
}

export function ColumnRenderer(props: ColumnBlockProps) {
  const cms = useCMS();
  const { options, componentMap, setComponentMap } = useContext(InlineGridContext);
  const [blocksConfig, setBlocksConfig] = useState<{ [key: string]: Block }>({});
  const { column, blocks, direction } = options;
  const components = (Array.isArray(blocks)) ? blocks : [];
  const Column = ("Component" in column) ? column.Component : column.Block.Component;
  const colProps = ("Block" in column) ? column : {};
  const hasBlocks = Object.keys(blocksConfig).length > 0;

  useEffect(() => {
    // Fetches blocks from the componentList
    const fetchBlocks = async () => {
      const initialSize = componentMap.size;
  
      if (cms.enabled && components.length > 0) {
        await getBlocksForEditing(components, componentMap);
      }
      else {
        props.data?.blocks?.forEach(async block => {
          await getBlockForRendering(block, components, componentMap);
        });
      }
  
      if (componentMap.size > initialSize) {
        setComponentMap(new Map(componentMap));
      }
    }
    // Sets blocks from the passed in blocks
    const setBlocks = async () => {
      if (!Array.isArray(blocks)) {
        await setBlocksForEditing(blocks as any, componentMap);
      }
    }
    // Updates the columns blocks config from the fetched/passed in blocks
    const getBlocksConfig = async () => {
      let updatedBlocksConfig = {};

      componentMap.forEach((block, id) => {
        updatedBlocksConfig[id] = block;
      })
  
      if (Object.keys(updatedBlocksConfig).length > Object.keys(blocksConfig).length) {
        setBlocksConfig(updatedBlocksConfig);
      }
    }

    if (components.length > 0) {
      // Get the lazy loaded blocks
      fetchBlocks()
        .then(() => getBlocksConfig());
    }
    else {
      // Use the passed in blocks
      setBlocks()
        .then(() => getBlocksConfig)
    }
  }, [components]);

  const x = ["y", "z"];

  return (
    <Column data={props.data} index={props.index}>
      {hasBlocks && (
        <InlineBlocks
          name="block"
          direction={direction === "vertical" ? "vertical" : "horizontal"}
          blocks={blocksConfig}
          {...colProps}
        />
      )}
      {!hasBlocks && (
        <>
          {/* TODO: make this prettier */}
          <div style={{ minHeight: "2rem" }} />
        </>
      )}
    </Column>
  );
}

async function setBlocksForEditing(blocks: BlockTemplate[], componentMap: Map<string, InlineGridBlock>) {
  Object.keys(blocks).forEach(id => {
    if (!componentMap.has(id)) {
      componentMap.set(id, blocks[id]);
    }
  })

  return componentMap;
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

async function getBlockForRendering(block: any, components: ComponentList, componentMap: Map<string, InlineGridBlock>) {
  return componentMap;
}

export default ColumnRenderer;
