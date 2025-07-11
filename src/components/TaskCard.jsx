import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, Github, Linkedin, Figma } from 'lucide-react';

function TaskCard({ task, index, onDelete, columnId }) {
  return (
    <Draggable draggableId={task.$id || task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* === Title === */}
          <h4 className="task-title">{task.title}</h4>

          {/* === Description === */}
          <p className="task-description">{task.description}</p>

          {/* === Avatar + Date === */}
          <div className="task-meta">
           <img
  src={`https://i.pravatar.cc/40?img=${(index % 70) + 1}`}
  alt="avatar"
  className="task-avatar"
/>


            <span className="task-date">{task.date}</span>
          </div>

          {/* === Links + Delete === */}
          <div className="task-footer">
            <div className="task-icons">
              {Array.isArray(task.links) &&
                task.links.map((link, i) => {
                  if (link.includes('github.com')) {
                    return (
                      <a key={i} href={link} target="_blank" rel="noreferrer">
                        <Github size={16} color="#000" />
                      </a>
                    );
                  } else if (link.includes('linkedin.com')) {
                    return (
                      <a key={i} href={link} target="_blank" rel="noreferrer">
                        <Linkedin size={16} color="#0a66c2" />
                      </a>
                    );
                  } else if (link.includes('figma.com')) {
                    return (
                      <a key={i} href={link} target="_blank" rel="noreferrer">
                        <Figma size={16} color="#a259ff" />
                      </a>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>

            <button
              onClick={() => onDelete(task.$id || task.id, columnId)}
              title="Delete Task"
            >
              <Trash2 size={16} color="#e74c3c" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
