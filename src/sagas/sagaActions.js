import {takeLatest, call, put} from "redux-saga/effects"
import * as actionTypes from '../actionTypes/actionTypes'
import * as actionCreators from '../actionCreators/actionCreators';

const GET_CATEGORY_URL = 'http://localhost:4000/category';
const GET_TASKS_URL = 'http://localhost:4000/todos';
const GET_TASK_URL = (id) => (`http://localhost:4000/todos/${id}`);

function* getCategories() {
  try {
    let categories = yield call(() => fetch(GET_CATEGORY_URL).then(response => response.json()));
      yield put(actionCreators.getCategoriesResponse(categories))
  } catch (error) {
    yield put(actionCreators.getCategoriesResponse(error))
  }
}

function* getTask(action) {
    try {
        let task = yield call(() => fetch(GET_TASK_URL(action.id)).then(response => response.json()));
        yield put(actionCreators.getTaskResponse(task))
    } catch (error) {
        yield put(actionCreators.getTaskResponse(error))
    }
}

function* deleteTask(action) {
    try {
        let task = yield call(() => fetch(GET_TASK_URL(action.id),{method:'DELETE'}).then(response => response.json()));
        yield put(actionCreators.getDeleteTaskResponse(task))
    } catch (error) {
        yield put(actionCreators.getDeleteTaskResponse(error))
    }
}

function* createTask(action) {
    try {

        let taskresp = yield call(() => fetch(GET_TASKS_URL, {method:'POST',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify(action.task)}).then(response => response.json()));
        yield put(actionCreators.getUpdateTaskResponse(taskresp))
    } catch (error) {
        yield put(actionCreators.getUpdateTaskResponse(error))
    }
}

function* updateTask(action) {
    try {

        let taskresp = yield call(() => fetch(GET_TASK_URL(action.id), {method:'PUT',
            headers : {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json'
            },
            body    : JSON.stringify(action.task)}).then(response => response.json()));
        yield put(actionCreators.getCreateTaskResponse(taskresp))
    } catch (error) {
        yield put(actionCreators.getCreateTaskResponse(error))
    }
}

function* getAllTasks() {
    try {
        let tasks = yield call(() => fetch(GET_TASKS_URL).then(response => response.json()));
        let categories = yield call(() => fetch(GET_CATEGORY_URL).then(response => response.json()));

        if(tasks){
            tasks.map((task) => {
                let currentTask = task;
                currentTask.category = categories.find(x => x.id === currentTask.category).name;
                return currentTask;
            })
        }

        yield put(actionCreators.getAllTasksResponse(tasks))
    } catch (error) {
        yield put(actionCreators.getAllTasksResponse(error))
    }
}

export function* sagaTODOActions() {
    yield [
        takeLatest(actionTypes.GET_CATEGORY, getCategories),
        takeLatest(actionTypes.GET_TASKS, getAllTasks),
        takeLatest(actionTypes.GET_TASK, getTask),
        takeLatest(actionTypes.CREATE_TASK, createTask),
        takeLatest(actionTypes.DELETE_TASK, deleteTask),
        takeLatest(actionTypes.UPDATE_TASK, updateTask)
    ]
}