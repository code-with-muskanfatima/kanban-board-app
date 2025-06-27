import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

function TaskCard({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.tags?.length > 0 && (
            <div className="tags">
              {task.tags.map((tag, i) => (
                <span className="tag" key={i}>{tag}</span>
              ))}
            </div>
          )}
          <div className="title">{task.title}</div>
          <div className="desc">{task.description}</div>
          <div className="date">{task.date}</div>
        </div>
      )}
    </Draggable>
  );
}


export default TaskCard;
