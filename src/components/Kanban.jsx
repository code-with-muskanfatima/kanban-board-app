// Kanban.jsx (updated)
import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './Column';
import initialData from '../data/initialData ';

function Kanban() {
  const [columns, setColumns] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tags: '',
    date: '',
    description: '',
    column: 'todo',
  });

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const movedTask = sourceCol.tasks[source.index];

    const updatedSourceTasks = [...sourceCol.tasks];
    updatedSourceTasks.splice(source.index, 1);

    const updatedDestTasks = [...destCol.tasks];
    updatedDestTasks.splice(destination.index, 0, movedTask);

    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceCol,
        tasks: updatedSourceTasks,
      },
      [destination.droppableId]: {
        ...destCol,
        tasks: updatedDestTasks,
      },
    });
  };

  const openModal = (colId) => {
    setFormData({ title: '', tags: '', date: '', description: '', column: colId });
    setShowModal(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createTask = () => {
    if (!formData.title || !formData.date) return;

    const newTask = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description || '',
      date: formData.date,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
    };

    setColumns((prev) => ({
      ...prev,
      [formData.column]: {
        ...prev[formData.column],
        tasks: [...prev[formData.column].tasks, newTask],
      },
    }));

    setShowModal(false);
  };

  return (
    <div className="kanban-wrapper">
      <h1 className="kanban-title">Kanban board ⭐</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([colId, col]) => (
            <KanbanColumn
              key={colId}
              columnId={colId}
              title={col.name}
              tasks={col.tasks}
              openModal={openModal}
            />
          ))}
        </div>
      </DragDropContext>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Create New Task</h3>
            <input type="text" name="title" value={formData.title} onChange={handleInput} placeholder="Task Title" />
            <input type="text" name="description" value={formData.description} onChange={handleInput} placeholder="Description" />
            <input type="text" name="tags" value={formData.tags} onChange={handleInput} placeholder="Tags (comma separated)" />
            <input type="date" name="date" value={formData.date} onChange={handleInput} />
            <div className="modal-buttons">
              <button onClick={createTask}>Create</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kanban;
