import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import {connect} from 'react-redux';
import * as sagaHelpersActionCreators from '../../actionCreators/actionCreators'
import {bindActionCreators} from 'redux';
import Task from './Task';
import ConfirmationPopup from '../common/ConfirmationPopup';


class ToDoList extends Component {


    componentWillMount() {
        if(!this.props.toDoState.tasks || this.props.toDoState.showlist ){
            this.props.sagaHelpersActions.getAllTasks();
            return false;
        }
    }

    handleEditClick(id) {
        this.props.router.push('/edit/' + id);
    }

    handleRemoveClick(id) {
        this.props.sagaHelpersActions.confirmationPopup('Do you want to delete task?', id);
    }

    handleDeleteOk(popupParams){
        this.props.sagaHelpersActions.deleteTask(popupParams);
    }

    handleDeleteCancel(popupParams){
        this.props.sagaHelpersActions.confirmationPopupClose();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.toDoState.showlist){
            this.props.sagaHelpersActions.getAllTasks();
        }
    }

    render() {
        const {
            toDoState
            }=this.props;

        return (
            <Table responsive striped bordered condensed hover>
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <ConfirmationPopup showPopup={toDoState.showPopup} message={toDoState.message} handleOk={this.handleDeleteOk.bind(this)} handleCancel={this.handleDeleteCancel.bind(this)} popupParams={toDoState.popupParams}></ConfirmationPopup>
                {toDoState.tasks ? toDoState.tasks.map((row, i)=> <Task key={row.id} task={row}
                                                                        handleEdit={this.handleEditClick.bind(this)}
                                                                        handleRemove={this.handleRemoveClick.bind(this)}/>) : ""}
                </tbody>
            </Table>

        );
    }
}

function mapStateToProps(state) {
    return {
        toDoState: state.toDoReducer
    }
}

function mapDispathToProps(dispatch) {
    return {
        sagaHelpersActions: bindActionCreators(sagaHelpersActionCreators, dispatch)
    }
}


export default connect(mapStateToProps, mapDispathToProps)(ToDoList);