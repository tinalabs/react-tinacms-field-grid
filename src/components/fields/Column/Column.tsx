import React from "react";
import { BlockComponentProps, BlocksControls } from "react-tinacms-inline";
import styled from "styled-components";


export interface InlineGridColumnProps extends BlockComponentProps {
  children: React.ReactChild
}

export function InlineGridColumn(props: InlineGridColumnProps) {
  return (
    <FlexColumn>
      <BlocksControls index={props.index}>
          {props.children}
        </BlocksControls>
    </FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;