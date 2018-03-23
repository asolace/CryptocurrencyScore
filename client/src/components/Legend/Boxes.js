import React from 'react';

// Left as class for future implementation of tool tips
export default class Example extends React.Component {
  render() {
    const { boxColor, grade, title } = this.props

    return (
      <li className="flex-item">
        <span className={`grade-box ${boxColor}`}>{grade}</span>
        <span className="grade-text">{title}</span>
      </li>
    )
  }
}
