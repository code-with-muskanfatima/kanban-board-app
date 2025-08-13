// src/components/TaskCard.jsx
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import './Kanban.css';
import { Delete, DeleteIcon, Trash, Trash2, TrashIcon } from 'lucide-react';

function TaskCard({ task, index, onDelete }) {
  return (
    <Draggable draggableId={task.$id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <h5><strong>📆</strong> {task.date}</h5>
          <h6><strong>👤</strong> {task.createdBy}</h6>
          <div className="task-footer">

          {task.assignedTo && (
            <h3><strong>Assigned to:</strong> {task.assignedTo}</h3>
          )}

          <Trash2 className="delete-btn" size={18} onClick={() => onDelete(task.$id)} />
          </div>

        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
