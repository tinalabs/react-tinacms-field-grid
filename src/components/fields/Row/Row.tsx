import React from "react";
import { BlockComponentProps, BlocksControls } from "react-tinacms-inline";
import styled from "styled-components";


export interface InlineGridRowProps extends BlockComponentProps {
  children: React.ReactChild
}

export function InlineGridRow(props: InlineGridRowProps) {
  return (
    <BlocksControls index={props.index}>
      <FlexRow>
        {props.children}
      </FlexRow>
    </BlocksControls>
  );
}

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;