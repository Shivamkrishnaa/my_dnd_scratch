import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux';
import { Block } from './Block';

export const DragContainer = ({ id }) => {
    const { uId, type, action } = useSelector((state) => {
        return state.sideBlocks.blocks[id];
    });
    const dispatch = useDispatch();
    const [, drag] = useDrag(() => ({
        type,
        item: { id: uId, type, action },
        end: (item, monitor) => {
            monitor.didDrop() && dispatch({ "type": "SWITCH_UID", payload: { id } });
        },
    }), [uId, id]);
    return (<div ref={drag}><Block action={action} uId={uId} id={id} /></div>);
}
