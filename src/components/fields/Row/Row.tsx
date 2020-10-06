import React from "react";
import { BlocksContainerProps } from "react-tinacms-inline";
import styled from "styled-components";


export interface InlineGridRowProps extends BlocksContainerProps {
  children: React.ReactChild
}

export function InlineGridRow(props: InlineGridRowProps) {
  return (
    <FlexRow ref={props.innerRef} className={props.className}>{props.children}</FlexRow>
  );
}

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;