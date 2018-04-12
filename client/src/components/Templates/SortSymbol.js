import React from 'react'

const SortSymbol = ({ sortId, divId, sortAsc }) =>
  <span>
    {sortId === divId && sortAsc  && <span>&#8595;</span>}
    {sortId === divId && !sortAsc  && <span>&#8593;</span>}
  </span>

export default SortSymbol
