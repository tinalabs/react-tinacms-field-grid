import React from "react";
import { BlocksContainerProps } from "react-tinacms-inline";
import styled from "styled-components";


export interface InlineGridColumnProps extends BlocksContainerProps {
  children: React.ReactChild
}

export function InlineGridColumn(props: InlineGridColumnProps) {
  return (
    <FlexColumn ref={props.innerRef} className={props.className}>{props.children}</FlexColumn>
  );
}

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;