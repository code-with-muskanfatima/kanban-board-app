// src/components/Column.jsx
import React from 'react';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';

function KanbanColumn({ columnId, title, tasks, onDelete, users, openModal }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
          <div className="column-header">
            <h2>{title}</h2>
            {columnId === 'todo' && (
              <button className="add-button" onClick={() => openModal(columnId)}>+</button>
            )}
          </div>

          <div className="task-list">
            {(tasks?.length ?? 0) === 0 ? (
              <div className="placeholder-card" onClick={() => openModal(columnId)}>
                <div className="plus">+</div>
                <div className="add-text">Add task</div>
              </div>
            ) : (
              tasks.map((task, index) => (
               <TaskCard 
                task={task} 
                index={index} 
                onDelete={onDelete} 
                users={users} 
              />

              ))
            )}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default KanbanColumn;
