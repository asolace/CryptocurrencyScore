import React from 'react'
import Boxes from './Boxes'

const Legend = () =>
  <div className="legend">
    <ul className="flex-container">
      <Boxes boxColor="gb-a" grade="A" title="Excellent"/>
      <Boxes boxColor="gb-b" grade="B" title="Good"/>
      <Boxes boxColor="gb-c" grade="C" title="Hodl"/>
      <Boxes boxColor="gb-d" grade="D" title="Neutral"/>
      <Boxes boxColor="gb-f" grade="F" title="Dump/Avoid"/>
      <Boxes boxColor="gb-n" grade="N" title="No Rating"/>
    </ul>
  </div>

export default Legend
