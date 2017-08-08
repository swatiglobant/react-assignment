import React, {PureComponent} from 'react';
import Header from './Header';

export default class App extends PureComponent {


    render() {

        return (
            <div className="container">
                <Header router={this.props.router}></Header>
                <div className="jumbotron">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

