import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <div className="list">
        <h1>测试</h1>
        {this.props.children}
      </div>
    );
  }
}

export default List;
