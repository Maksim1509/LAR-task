import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices';

const NewTaskForm = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(({ tasksInfo }) => tasksInfo);
  const addNewTaskHandle = ({ name, date }, { resetForm }) => {
    const id = tasks.length + 1;
    const task = {
      id, name, date, status: false,
    };
    dispatch(actions.addTask({ task }));
    resetForm();
  };
  const form = (
    <Formik
      initialValues={{ name: '', date: '' }}
      onSubmit={addNewTaskHandle}
    >
      <Form>
        <Field type="text" name="name" placeholder="task name" required />
        <Field type="date" name="date" required />
        <button type="submit">ADD</button>
      </Form>
    </Formik>
  );
  return form;
};

export default NewTaskForm;
