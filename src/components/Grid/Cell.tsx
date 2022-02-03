import React, {FC} from "react";
import styled from "@emotion/styled"
import { Cell as CellType, CellState, Coords } from "@/helpers/Field";
import { useMouseDown } from "@/hooks/useMouseDown";

const transparent = 'rgba(0,0,0,0)';
const colors: { [key in CellType]: string } = {
  0: transparent,
  1: '#2a48ec',
  2: '#2bb13d',
  3: '#ec6561',
  4: '#233db7',
  5: '#a6070f',
  6: '#e400af',
  7: '#906a02',
  8: '#fa0707',
  9: transparent,
  10: transparent,
  11: transparent,
  12: transparent,
};

interface ClosedFrameProps {
  mousedown?: boolean;
}

export const ClosedFrame = styled.div<ClosedFrameProps>`
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
  border-color: ${({mousedown = false}) =>
    mousedown ? 'transparent' : 'white #9e9e9e #9e9e9e white'}; 
  &:hover {
    filter: brightness(1.1);
  }
`;

const RevealedFrame = styled(ClosedFrame)`
  border-color: #dddddd;
  cursor: default;
  &:hover {
    filter: brightness(1);
  };
  color: ${({ children }) => colors[children as CellType] ?? transparent};
`;

const Bomb = styled.div`
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  background-color: #333;
`;

const BombFrame = styled(RevealedFrame)`
  background-color: #ec433c;
`;

const Flag = styled.div`
  width: 0px;
  height: 0px;
  border-top: 1vh solid transparent;
  border-bottom: 1vh solid transparent;
  border-left: 1vh solid #ec433c;
`;

const WeakFlag = styled(Flag)`
  border-left: 1vh solid #f19996;
`;

export interface CellProps {
  /**
   * Cell status based on the CellType
   */
  children: CellType;
  /**
   * Cell coordinates
   */
  coords: Coords;
  /**
   * onClick by cell handler
   */
  onClick: (coords: Coords) => void;
  /**
   * onContextMenu by cell handler
   */
  onContextMenu: (coords: Coords) => void;
}

export const checkCellIsActive = (cell: CellType): boolean => 
  [CellState.hidden, CellState.flag, CellState.weakFlag].includes(cell);

export const Cell: FC<CellProps> = ({children, coords, ...rest}) => {
  const [mousedown, onMouseDown, onMouseUp] = useMouseDown();

  const onClick = () => rest.onClick(coords);

  const onContextMenu = (event: React.MouseEvent) => {
    /**
     * Prevent context menu by default
     */
    event.preventDefault();
    if(checkCellIsActive(children)) {
      rest.onContextMenu(coords);
    }
  }

  const props = {
    onClick,
    onContextMenu,
    'data-testid': `${coords}`,
    mousedown,
    onMouseDown,
    onMouseUp,
    onMouseLeave: onMouseUp,
    role: 'cell',
  };

  return <ComponentsMap {...props}>{children}</ComponentsMap>
}

interface ComponentsMapProps {
  children: CellType;
  onClick: (elem: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (elem: React.MouseEvent<HTMLElement>) => void;
  'data-testid'?: string;
  mousedown: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  role: string;
}

const ComponentsMap: FC<ComponentsMapProps> = ({children, ...rest}) => {
  const nonActiveCellProps = {
    onContextMenu: rest.onContextMenu,
    'data-testid': rest['data-testid'],
    role: rest.role,
  };

  switch(children) {
    case CellState.empty:
      return <RevealedFrame {...nonActiveCellProps}>{children}</RevealedFrame>
    case CellState.hidden:
      return <ClosedFrame {...rest}>{children}</ClosedFrame>
    case CellState.bomb:
      return (
        <BombFrame {...nonActiveCellProps} >
          <Bomb />
        </BombFrame>
      )
    case CellState.flag:
      return (
        <ClosedFrame {...rest} >
          <Flag>{children}</Flag>
        </ClosedFrame>
      )
    case CellState.weakFlag:
      return (
        <ClosedFrame {...rest} >
          <WeakFlag />
        </ClosedFrame>
      )
    default:
      return <RevealedFrame {...nonActiveCellProps}>{children}</RevealedFrame>
  }
}