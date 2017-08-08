import React from 'react';

export default  class About extends React.Component {
    render() {

        return (
            <div>
                <h4>Application performs following tasks,</h4>
                <ul>
                    <li>List all available Items</li>
                    <li>Add new TODO item</li>
                    <li>Delete TODO item</li>
                    <li>Update TODO item</li>
                </ul>
            </div>
        );
    }
}

