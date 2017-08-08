import * as actionTypes from '../actionTypes/actionTypes'

export function getCategories() {
  return {type: actionTypes.GET_CATEGORY}
}

export function getCategoriesResponse(resp) {
    return {type: actionTypes.GET_CATEGORY_RESPONSE, resp }
}


export function getAllTasks() {
    return {type: actionTypes.GET_TASKS}
}

export function getAllTasksResponse(resp) {
    return {type: actionTypes.GET_TASKS_RESPONSE, resp }
}

export function getTask(id) {
    return {type: actionTypes.GET_TASK, id}; // same as {type: actionTypes.GET_TASK, id:id}
}

export function deleteTask(id) {
    return {type: actionTypes.DELETE_TASK, id};
}

export function getNewTask() {
    return {type: actionTypes.GET_NEW_TASK};
}

export function createNewTask(task) {
    return {type: actionTypes.CREATE_TASK, task};
}

export function getTaskResponse(resp) {
    return {type: actionTypes.GET_TASK_RESPONSE, resp };
}

export function getDeleteTaskResponse(resp) {
    return {type: actionTypes.DELETE_TASK_RESPONSE, resp };
}

export function getCreateTaskResponse(resp) {
    return {type: actionTypes.CREATE_TASK_RESPONSE, resp };
}

export function updateTask(id, task) {
    return {type: actionTypes.UPDATE_TASK, id, task};
}

export function getUpdateTaskResponse(resp) {
    return {type: actionTypes.UPDATE_TASK_RESPONSE, resp};
}

export function confirmationPopup(message, params) {
    var popup = {message, params};
    return {type: actionTypes.CONFIRMATION_POPUP, popup};
}
export function confirmationPopupClose() {
    return {type: actionTypes.CONFIRMATION_POPUP_CLOSE};
}

