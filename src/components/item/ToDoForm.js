import React, {Component} from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, ButtonToolbar, Button } from 'react-bootstrap';
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

class ToDoForm extends Component {

    componentDidMount() {
        if (!this.props.toDoState.categories) {
            this.props.sagaHelpersActions.getCategories();
        }
        if (this.props.params.id && !this.props.toDoState.task) {
            this.props.sagaHelpersActions.getTask(this.props.params.id);
        }
    }


    createNewTask() {
        var newTask = {
            desc: this.desc.value,
            due: this.refs.dueDate.getValue(),
            category: parseInt(this.category.name, 10),
            completed: false
        };
        this.props.sagaHelpersActions.createNewTask(newTask);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.toDoState.showlist){
            nextProps.router.push('/');
        }
    }

    render() {

        const {
            toDoState
            }=this.props;

        return (
            <div>
                <form>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="Description"
                        inputRef={(ref) => {this.desc = ref}}
                        placeholder="Enter Description"
                        />
                    <FormGroup>
                        <ControlLabel>Due Date</ControlLabel>
                        <DatePicker dateFormat="DD-MM-YYYY"
                                    ref="dueDate"
                            />
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Category</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select Category"
                                     inputRef={(ref) => {this.category = ref}}
                            >
                            <option value="select">Select</option>
                            {toDoState.categories ? toDoState.categories.map((repo, i)=> (
                                <option key={i} value={repo.id}>{repo.name}</option>)) : ""}
                        </FormControl>
                    </FormGroup>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.createNewTask.bind(this)}>Save</Button>
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


export default connect(mapStateToProps, mapDispathToProps)(ToDoForm);
