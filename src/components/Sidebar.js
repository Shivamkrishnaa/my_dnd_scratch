import React, { memo } from "react";
import { Block } from "./Block";
import { useSelector } from "react-redux";
import { DragContainer } from "./DragContainer";

const Sidebar = () => {
  const blocks = useSelector((state) => {
    return Object.keys(state.dnd.globalBlocks).length;
  });
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
        {new Array(blocks).fill(0).map((id, idx) => (<DragContainer key={idx} id={idx + 1} />))}
    </div>
  );
};
export default memo(Sidebar);