// src/components/Kanban.jsx
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { databases, DATABASE_ID, USERS_COLLECTION_ID, TASKS_COLLECTION_ID, account, ID } from "../appwriteConfig";
import { DragDropContext } from "@hello-pangea/dnd";
import KanbanColumn from "./Column";
import "./Kanban.css";

function Kanban() {
  const [users, setUsers] = useState([]);
  const [columns, setColumns] = useState({
    todo: { name: "To Do", tasks: [] },
    "in-progress": { name: "In Progress", tasks: [] },
    done: { name: "Done", tasks: [] },
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    column: "todo",
    assignedTo: "",
  });

  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState({ taskId: null, columnId: null });

  // ✅ Fetch tasks + users
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, TASKS_COLLECTION_ID);
        const newColumns = {
          todo: { name: "To Do", tasks: [] },
          "in-progress": { name: "In Progress", tasks: [] },
          done: { name: "Done", tasks: [] },
        };
        res.documents.forEach((doc) => {
          if (newColumns[doc.status]) newColumns[doc.status].tasks.push(doc);
        });
        setColumns(newColumns);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, USERS_COLLECTION_ID);
        setUsers(
          res.documents.map((u) => ({
            $id: u.$id,
            name: u.name || u.email,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      }
    };

    fetchTasks();
    fetchUsers();
  }, []);

  const handleDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const [movedTask] = sourceCol.tasks.splice(source.index, 1);
    destCol.tasks.splice(destination.index, 0, movedTask);

    setColumns({ ...columns });

    try {
      await databases.updateDocument(DATABASE_ID, TASKS_COLLECTION_ID, movedTask.$id, {
        status: destination.droppableId,
      });
    } catch (err) {
      console.error("Failed to update task status:", err);
    }
  };

  const openModal = (colId) => {
    setFormData({ title: "", date: "", description: "", column: colId, assignedTo: "" });
    setShowModal(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createTask = async () => {
    if (!formData.title || !formData.date) {
      alert("Title and Date are required.");
      return;
    }

    try {
      const user = await account.get(); // current logged-in user

      const newTask = {
        title: formData.title.trim(),
        description: formData.description?.trim() || "",
        date: formData.date,
        status: formData.column,
        createdBy: user.name || user.email,
        assignedTo: formData.assignedTo || "",
      };

      const res = await databases.createDocument(DATABASE_ID, TASKS_COLLECTION_ID, ID.unique(), newTask);

      setColumns((prev) => ({
        ...prev,
        [formData.column]: {
          ...prev[formData.column],
          tasks: [res, ...prev[formData.column].tasks],
        },
      }));
    } catch (err) {
      console.error("Failed to create task:", err);
      alert("Failed to create task. Check console.");
    }

    setShowModal(false);
  };

  const handleDelete = (taskId, columnId) => {
    setDeleteInfo({ taskId, columnId });
    setConfirmModal(true);
  };

  const confirmDelete = async () => {
    const { taskId, columnId } = deleteInfo;

    setColumns((prev) => {
      const newTasks = prev[columnId].tasks.filter((task) => task.$id !== taskId);
      return {
        ...prev,
        [columnId]: { ...prev[columnId], tasks: newTasks },
      };
    });

    try {
      await databases.deleteDocument(DATABASE_ID, TASKS_COLLECTION_ID, taskId);
    } catch (err) {
      console.error("Failed to delete task:", err);
    }

    setConfirmModal(false);
    setDeleteInfo({ taskId: null, columnId: null });
  };

  return (
    <div className="kanban-wrapper">
      <div className="kanban-title">Kanban Board ⭐</div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="board">
          {Object.entries(columns).map(([columnId, column]) => (
            <KanbanColumn
              key={columnId}
              columnId={columnId}
              title={column.name}
              tasks={column.tasks}
              onDelete={handleDelete}
              users={users}
              openModal={openModal}
            />
          ))}
        </div>
      </DragDropContext>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Task</h2>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInput} />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInput} />
            <input type="date" name="date" value={formData.date} onChange={handleInput} />

            {/* Users Dropdown */}
           <Select
            options={users.map(u => ({ value: u.$id, label: u.name }))}
           value={
           formData.assignedTo
           ? { value: formData.assignedTo, label: users.find(u => u.$id === formData.assignedTo)?.name }
             : null
          }
            onChange={(selected) =>
           setFormData(prev => ({
            ...prev,
           assignedTo: selected ? selected.value : ''
           }))
         }
          placeholder="Assign to"
          isClearable
        />


            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="add-btn" onClick={createTask}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Are you sure you want to delete this task?</h3>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setConfirmModal(false)}>
                Cancel
              </button>
              <button className="delete-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kanban;
