import React, { useRef } from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ItemTypes } from '../../utils';
import BlocksContainer from './BlocksContainer';

export const BlockDropContainer = () => {

  const ref = useRef(null);
  const dispatch = useDispatch();
  const blocksCount = useSelector((state) => {
    const selectedSpriteId = state.dnd.selectedSpriteId;
    return state.dnd.blocks[selectedSpriteId].length;
  });
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop(item, monitor) {
      if (!!monitor.didDrop() && !!monitor.getDropResult()) return;
      const payload = {
        dropped: item,
        position: {
          initialPosition: monitor.getInitialSourceClientOffset(),
          finalPosition: monitor.getSourceClientOffset()
        }
      };
      dispatch({ type: "MOVE_TO_MID", payload });
    },
  }));
  drop(ref);
  return (
    <div ref={ref} className="h-full w-full box transform rotate-0" >
      <div className="flex flex-row items-start justify-between p-2" >
        <div className="grow font-bold text-lg mb-4"> {"Midarea"} </div>
      </div>
      {new Array(blocksCount).fill(0).map((id, idx) => (<BlocksContainer idx={(idx)} key={idx} />))}
  </div>
  )
}