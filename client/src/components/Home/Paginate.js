import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const Paginate = ({ page, viewAll }) =>
  <Pagination className="list-pagination">
    {page > 1 &&
      <PaginationItem>
        <PaginationLink href={`/c/${page - 1}`}>
          &#8592; Previous 100
        </PaginationLink>
      </PaginationItem>}

    {page < 4 &&
      <PaginationItem>
        <PaginationLink href={`/c/${page + 1}`}>
          Next 100 &#8594;
        </PaginationLink>
      </PaginationItem>}

    {!viewAll &&
      <PaginationItem>
        <PaginationLink href={`/c/all`}>
          View All
        </PaginationLink>
      </PaginationItem>}
  </Pagination>


export default Paginate
