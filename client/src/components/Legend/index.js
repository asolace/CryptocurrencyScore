import React from 'react'
import Boxes from './Boxes'

const Legend = () =>
  <div className="legend">
    <h4 className="legend-header">Legend</h4>
    <ul className="flex-container">
      <Boxes boxColor="gb-a" grade="A" title="Excellent"/>
      <Boxes boxColor="gb-b" grade="B" title="Good"/>
      <Boxes boxColor="gb-c" grade="C" title="Netural"/>
      <Boxes boxColor="gb-d" grade="D" title="Poor"/>
      <Boxes boxColor="gb-f" grade="F" title="Dump/Avoid"/>
      <Boxes boxColor="gb-n" grade="N" title="No Rating"/>
    </ul>
  </div>

export default Legend
