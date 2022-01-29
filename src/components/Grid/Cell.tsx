import React, {FC} from "react";
import styled from "@emotion/styled"
import { Cell as CellType } from "@/helpers/Field";

export interface CellProps {
  children: CellType;
}

export const ClosedFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 1.8vw;
  height: 1.8vw;
  color: transparent;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  border-color: 'white #9e9e9e #9e9e9e white'; 
  &:hover {
    filter: brightness(1.1);
  }
`;

const EmptyFrame = styled(ClosedFrame)`
  border-color: #dddddd;
  cursor: default;
  &:hover {
    filter: brightness(1);
  }
`;

export const Cell: FC<CellProps> = ({children}) => {
  switch(children) {
    case 0:
      return <EmptyFrame />
    case 10:
      return <ClosedFrame />
    default:
      return <ClosedFrame />
  }
}