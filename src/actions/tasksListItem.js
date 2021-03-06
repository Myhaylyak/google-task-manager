import {
  TASKS_LIST_ITEM_REQUEST,
  TASKS_LIST_ITEM_SUCCESS,
  TASKS_LIST_ITEM_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL
} from '../constants/tasksListItem';

import api from '../api';

export const tasksListItemRequest = () => ({ type: TASKS_LIST_ITEM_REQUEST, });
export const tasksListItemSuccess = (list) => ({ type: TASKS_LIST_ITEM_SUCCESS, list, });
export const tasksListItemFail = (error) => ({ type: TASKS_LIST_ITEM_FAIL, error, });
export const taskUpdateSuccess = (data) => ({ type: TASK_UPDATE_SUCCESS, data, });
export const taskUpdateFail = (error, data) => ({ type: TASK_UPDATE_FAIL, error, data, });
export const taskUpdateRequest = (data) => ({ type: TASK_UPDATE_REQUEST, data, });
export const taskCreateSuccess = (task) => ({ type: TASK_CREATE_SUCCESS, task, });
export const taskCreateFail = (error) => ({ type: TASK_CREATE_FAIL, error, });

export const fetchTaskskListItem = (listId) => async dispatch => {
  dispatch(tasksListItemRequest());

  try {
    const tasksLists = await api.fetchTasksListItem(listId);
    dispatch(tasksListItemSuccess(tasksLists.items));
  } catch (error) {
    dispatch(tasksListItemFail(error));
  }
};

export const updateTaskStatus = ({ tasksListId, taskId, status, }) => async dispatch => {
  const externalStatus = status ? 'completed' : 'needsAction';
  const statusOnError = status ? 'needsAction' : 'completed';

  dispatch(taskUpdateRequest({
    taskId,
    status: externalStatus,
  }));

  try {
    const task = await api.updateTask({
      tasksListId,
      taskId,
      status: externalStatus,
    });

    dispatch(taskUpdateSuccess({
      taskId,
      task,
    }));
  } catch (error) {
    dispatch(taskUpdateFail(error, { statusOnError, taskId, }));
  }
};

export const updateTask = ({ tasksListId, taskId, title, }) => async dispatch => {
  try {
    const task = await api.updateTask({
      tasksListId,
      taskId,
      title,
    });

    dispatch(taskUpdateSuccess({
      taskId,
      task,
    }));
  } catch (error) {
    dispatch(taskUpdateFail(error));
  }
};

export const createTask = ({ taskListId, title, }) => async dispatch => {
  try {
    const task = await api.insertTask({
      taskListId,
      title,
    });

    dispatch(taskCreateSuccess(task));
  } catch (error) {
    dispatch(taskCreateFail(error));
  }
};

