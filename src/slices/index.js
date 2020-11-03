import { combineReducers } from 'redux';
import tasksInfo, { actions as tasksActions } from './tasksInfo';

export default combineReducers({
  tasksInfo,
});

const actions = {
  ...tasksActions,
};

export { actions };
