import React, {PureComponent} from 'react';
import { Button } from 'react-bootstrap';

export default class Task extends PureComponent {


    render() {
        const {
            task,
            handleEdit,
            handleRemove
            } = this.props;

        return (
            <tr>
                <td>{task.desc}</td>
                <td>{task.category}</td>
                <td>{task.due && task.due.split('T')[0]}</td>
                <td>{task.completed ? 'Complete' : 'Pending'}</td>
                <td>
                    <Button bsStyle="link" bsSize='xs' onClick={() => handleEdit(task.id)}>Edit</Button>
                    <Button bsStyle="link" bsSize='xs' onClick={() => handleRemove(task.id)}>Delete</Button>
                </td>
            </tr>
        );
    }
}
