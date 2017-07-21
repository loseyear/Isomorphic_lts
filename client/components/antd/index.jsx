import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DatePicker } from 'antd';

class Ant extends Component {
    render() {
        return (
            <div>
                <DatePicker />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return { };
};

export default connect(mapStateToProps)(Ant);

