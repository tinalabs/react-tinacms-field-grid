import React from "react";

export const RenderChildren = (props: any) => props.innerRef
  ? <div ref={props.innerRef}>{props.children}</div>
  : <> { props.children}</>;

export default RenderChildren;