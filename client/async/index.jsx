import React, { Component } from 'react';

class Async extends Component {
    componentWillMount() {
        console.log('componentWillMount');
    }
    render() {
        return (
            <div>Async</div>
        );
    }
}

export default Async;
