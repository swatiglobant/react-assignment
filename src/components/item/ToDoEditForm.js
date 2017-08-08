import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, ButtonToolbar, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import DatePicker from 'react-bootstrap-date-picker';
import {bindActionCreators} from 'redux';
import * as sagaHelpersActionCreators from '../../actionCreators/actionCreators'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class ToDoEditForm extends Component {

    componentWillMount() {

        if (!this.props.toDoState.categories) {
            this.props.sagaHelpersActions.getCategories();
        }
        if (this.props.params.id && !this.props.toDoState.task) {
            this.props.sagaHelpersActions.getTask(this.props.params.id);
        }
    }


    updateTask() {
        var newTask = {
            desc: this.desc.value,
            due: this.refs.dueDate.getValue(),
            category: parseInt(this.category.value, 10),
            completed: this.status.checked
        };
        this.props.sagaHelpersActions.updateTask(this.props.toDoState.task.id, newTask);
    }

    updateField(a,b){
        console.log(a,b);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.toDoState.showlist){
            nextProps.router.push('/');
        }
    }

    componentWillUnmount(){
        this.props.sagaHelpersActions.getNewTask();
    }

    render() {

        const {
            toDoState
            }=this.props;

        if(!toDoState.task){
            return (<div></div>)
        }

        return (
            <div>
                <form>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Description"
                        inputRef={(ref) => {this.desc = ref}}
                        placeholder="Enter Description"
                        onChange={this.updateField}
                        defaultValue={toDoState.task.desc}
                        />
                    <FormGroup>
                        <ControlLabel>Due Date</ControlLabel>
                        <DatePicker id="example-datepicker"
                                    dateFormat="DD-MM-YYYY"
                                    ref="dueDate"
                            value={toDoState.task.due}
                            />
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Category</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select Category"
                                     inputRef={(ref) => {this.category = ref}}
                                     defaultValue={toDoState.task.category }
                            >
                            <option value="select">Select</option>
                            {toDoState.categories ? toDoState.categories.map((repo, i)=> (
                                <option key={i} value={repo.id}>{repo.name}</option>)) : ""}
                        </FormControl>
                    </FormGroup>
                    <Checkbox
                        defaultChecked={toDoState.task.completed}
                        inputRef={ref => {this.status = ref }}>
                        Task completed
                    </Checkbox>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.updateTask.bind(this)}>Save</Button>
                        <Button onClick={()=>this.props.router.push('/')}>Cancel</Button>
                    </ButtonToolbar>
                </form>
            </div>
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


export default connect(mapStateToProps, mapDispathToProps)(ToDoEditForm);
