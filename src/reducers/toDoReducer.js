import * as actionTypes from '../actionTypes/actionTypes';

export default (prevState = {}, action = {}) => {
    switch (action.type) {

        case actionTypes.GET_CATEGORY:
            return Object.assign({}, prevState, {isFetching: true});
        case actionTypes.GET_CATEGORY_RESPONSE:
            return Object.assign({}, prevState, {isFetching: false}, {categories: action.resp});

        case actionTypes.GET_TASKS:
            return Object.assign({}, prevState, {isFetching: true, showlist: false, showPopup:false});

        case actionTypes.GET_TASKS_RESPONSE:

            return Object.assign({}, prevState, {isFetching: false}, {
                tasks: action.resp,
                task: undefined,
                showlist: false
            });

        case actionTypes.GET_NEW_TASK:
            return Object.assign({}, prevState, {isFetching: true}, {task: undefined});

        case actionTypes.GET_TASK:
            return Object.assign({}, prevState, {isFetching: true});
        case actionTypes.GET_TASK_RESPONSE:
            return Object.assign({}, prevState, {isFetching: false}, {task: action.resp});

        case actionTypes.CREATE_TASK:
            return Object.assign({}, prevState, {isFetching: true});
        case actionTypes.CREATE_TASK_RESPONSE:
            return Object.assign({}, prevState, {isFetching: false}, {showlist: true});
        case actionTypes.DELETE_TASK:
            return Object.assign({}, prevState, {isFetching: true,  showPopup:false});

        case actionTypes.DELETE_TASK_RESPONSE:
            return Object.assign({}, prevState, {isFetching: false}, {showlist: true});

        case actionTypes.UPDATE_TASK:
            return Object.assign({}, prevState, {isFetching: true});

        case actionTypes.UPDATE_TASK_RESPONSE:
            return Object.assign({}, prevState, {isFetching: false}, {showlist: true});

        case actionTypes.CONFIRMATION_POPUP_CLOSE:
            return Object.assign({}, prevState, {showPopup: false});

        case actionTypes.CONFIRMATION_POPUP:
            return Object.assign({}, prevState, {message: action.popup.message, showPopup:true, popupParams:action.popup.params});
        default:
            return prevState;
    }
}