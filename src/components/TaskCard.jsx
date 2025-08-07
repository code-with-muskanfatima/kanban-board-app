import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Trash2, Github, Linkedin, Figma } from 'lucide-react';
import './Kanban.css';

function TaskCard({ task, index, onDelete, columnId }) {
  if (!task || !task.$id) return null; // ✅ Prevent render crash if task is missing

  return (
    <Draggable draggableId={task.$id || task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className="task-title">{task.title || 'Untitled'}</h4>
          <p className="task-description">{task.description || 'No description'}</p>

          <div className="task-meta">
            <span className="task-author">👤 {task.createdBy || 'Unknown'}</span>
            <span className="task-date">📅 {task.date || 'No date'}</span>
          </div>

          <div className="task-footer">
            <div className="task-icons">
              {Array.isArray(task.links) &&
                task.links.map((link, i) => {
                  if (link.includes('github.com')) {
                    return (
                      <a key={i} href={link} target="_blank" rel="noreferrer">
                        <Github size={16} />
                      </a>
                    );
                  } else if (link.includes('linkedin.com')) {
                    return (
                      <a key={i} href={link} target="_blank" rel="noreferrer">
                        <Linkedin size={16} />
                      </a>
                    );
                  } else if (link.includes('figma.com')) {
                    return (
                      <a key={i} href={link} target="_blank" rel="noreferrer">
                        <Figma size={16} />
                      </a>
                    );
                  } else {
                    return null;
                  }
                })}
            </div>

            {/* 🗑️ Delete Task */}
            <button
              className="task-delete-icon"
              onClick={() => onDelete(task.$id || task.id, columnId)}
              title="Delete Task"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
