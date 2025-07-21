// src/components/Kanban.jsx
import React, { useEffect, useState } from 'react';
import { databases, ID, DATABASE_ID, COLLECTION_ID } from '../appwriteConfig';
import { DragDropContext } from '@hello-pangea/dnd';
import KanbanColumn from './Column';
import './Kanban.css';

function Kanban() {
  const [columns, setColumns] = useState({
    todo: { name: 'To Do', tasks: [] },
    'in-progress': { name: 'In Progress', tasks: [] },
    done: { name: 'Done', tasks: [] },
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    description: '',
    column: 'todo',
  });

  // ⬇️ Fetch tasks from Appwrite
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        const newColumns = {
          todo: { name: 'To Do', tasks: [] },
          'in-progress': { name: 'In Progress', tasks: [] },
          done: { name: 'Done', tasks: [] },
        };

        res.documents.forEach((doc) => {
          if (newColumns[doc.status]) {
            newColumns[doc.status].tasks.push(doc);
          }
        });

        setColumns(newColumns);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  // ⬇️ Drag & Drop Handler
  const handleDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    destCol.tasks.splice(destination.index, 0, movedTask);

    setColumns({ ...columns });

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, movedTask.$id, {
        status: destination.droppableId,
      });
    } catch (err) {
      console.error('Failed to update status in Appwrite:', err);
    }
  };

  // ⬇️ Modal: Open
  const openModal = (colId) => {
    setFormData({ title: '', date: '', description: '', column: colId });
    setShowModal(true);
  };

  // ⬇️ Modal: Input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ⬇️ Modal: Create Task
  const createTask = async () => {
    if (!formData.title || !formData.date) {
      alert("Title and Date are required.");
      return;
    }

    const newTask = {
      title: formData.title.trim(),
      description: formData.description?.trim() || '',
      date: formData.date,
      status: formData.column,
      image: 'https://source.unsplash.com/40x40/?face',
    };

    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        newTask
      );

      setColumns((prev) => ({
        ...prev,
        [formData.column]: {
          ...prev[formData.column],
          tasks: [res, ...prev[formData.column].tasks],
        },
      }));
    } catch (err) {
      console.error("❌ Failed to create task:", err.message);
      alert("Failed to create task. Check console.");
    }

    setShowModal(false);
  };

  // ⬇️ Delete Task
  const handleDelete = async (taskId, columnId) => {
    setColumns((prev) => {
      const newTasks = prev[columnId].tasks.filter(task => task.$id !== taskId);
      return {
        ...prev,
        [columnId]: {
          ...prev[columnId],
          tasks: newTasks,
        },
      };
    });

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, taskId);
    } catch (error) {
      console.error("❌ Failed to delete from Appwrite:", error);
    }
  };

 

  return (
    <div className="kanban-wrapper">
      {/* 🔥 Header with Logout */}
      <div className="kanban-header">
        <h1 className="kanban-title">Kanban Board ⭐</h1>
      </div>

      {/* 🧩 Board Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([colId, col]) => (
            <KanbanColumn
              key={colId}
              columnId={colId}
              title={col.name}
              tasks={col.tasks}
              openModal={openModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </DragDropContext>

      {/* 📦 Modal for Task Creation */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Create New Task</h3>
            <input type="text" name="title" value={formData.title} onChange={handleInput} placeholder="Task Title" />
            <input type="text" name="description" value={formData.description} onChange={handleInput} placeholder="Description" />
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
