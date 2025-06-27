import React from 'react';
import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import "../components/Kanban.css"

function KanbanColumn({ title, tasks, columnId, openModal }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
          <div className="column-header">
            <h2>{title}</h2>
            <button className="add-button" onClick={() => openModal(columnId)}>+</button>
          </div>
          <div className="task-list">
        {tasks.length === 0 ? (
  <div className="placeholder-card" onClick={() => openModal(columnId)}>
    <div className="plus">+</div>
    <div className="add-text">Add task</div>
  </div>
) : (
  tasks.map((task, index) => (
    <TaskCard key={task.id} task={task} index={index} />
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
