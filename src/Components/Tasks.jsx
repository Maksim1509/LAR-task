import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import localStore from 'store';
import { actions } from '../slices';

const editFrom = (submitHandler, cancelHendler) => (
  <Formik initialValues={{ taskName: '', date: '' }} onSubmit={submitHandler}>
    <Form>
      <Field type="text" name="taskName" placeholder="task name" required />
      <Field type="date" name="date" placeholder="date" required />
      <div>
        <button type="submit">OK</button>
        <button type="button" onClick={cancelHendler}>Cancel</button>
      </div>
    </Form>
  </Formik>
);

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, editing, hideComplited } = useSelector(({ tasksInfo }) => tasksInfo);

  const {
    changeTaskStatus, removeTask, editTask, setEditing, changeHide,
  } = actions;

  const removeTaskHandle = (id) => (e) => {
    e.preventDefault();
    dispatch(removeTask({ id }));
  };
  const editTaskHandle = (id) => (e) => {
    e.preventDefault();
    dispatch(setEditing({ id }));
  };
  const editingSubmitHandle = ({ taskName, date }, { resetForm }) => {
    dispatch(editTask({ taskName, date, editingId: editing }));
    dispatch(setEditing({ id: null }));
    resetForm();
  };
  const cancelEditHandle = () => {
    dispatch(setEditing({ id: null }));
  };
  const changeStatusHandle = (id) => () => {
    dispatch(changeTaskStatus({ id }));
  };
  const changeHideHandle = () => {
    dispatch(changeHide());
  };

  useEffect(() => {
    localStore.set('tasks', tasks);
  });

  const renderRow = (task) => {
    const {
      id, name, date, status,
    } = task;
    if (hideComplited && status) {
      return null;
    }
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{date}</td>
        <td>
          <input type="checkbox" name="status" id={id} checked={status} onChange={changeStatusHandle(id)} />
        </td>
        <td>
          {editing === id ? editFrom(editingSubmitHandle, cancelEditHandle) : <a href="/" onClick={editTaskHandle(id)}>[Edit]</a>}
          <br />
          <a href="/" onClick={removeTaskHandle(id)}>[Remove]</a>
        </td>
      </tr>
    );
  };
  return (
    <>
      <label htmlFor="hide">
        <input type="checkbox" name="hide" id="input-hide" checked={hideComplited} onChange={changeHideHandle} />
        Hide Complited
      </label>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
          {tasks.map(renderRow)}
        </tbody>
      </table>
    </>
  );
};

export default Tasks;
