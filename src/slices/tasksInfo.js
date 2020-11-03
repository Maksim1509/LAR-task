/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasksInfo',
  initialState: {
    tasks: [],
    editing: null,
    hideComplited: false,
  },
  reducers: {
    changeHide: (state) => {
      state.hideComplited = !state.hideComplited;
    },
    changeTaskStatus: (state, { payload }) => {
      const { id: currentId } = payload;
      const task = state.tasks.find(({ id }) => id === currentId);
      task.status = !task.status;
    },
    addTask: (state, { payload }) => {
      const { task } = payload;
      state.tasks.push(task);
    },
    removeTask: (state, { payload }) => {
      const { id: removingId } = payload;
      state.tasks = state.tasks.filter(({ id }) => id !== removingId);
    },
    editTask: (state, { payload }) => {
      const { editingId, taskName, date } = payload;
      const task = state.tasks.find(({ id }) => id === editingId);
      task.name = taskName;
      task.date = date;
    },
    setEditing: (state, { payload }) => {
      state.editing = payload.id;
    },
  },
});

const actions = { ...tasksSlice.actions };

export { actions };
export default tasksSlice.reducer;
