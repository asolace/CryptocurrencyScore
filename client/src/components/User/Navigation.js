import React from 'react'
import helper from '../../helpers'

import { Card, ListGroup, ListGroupItem } from 'reactstrap'

const SideContent = ({  }) =>
    <Card body outline>
      <ListGroup className="user-nav">
        <ListGroupItem className="user-nav-selected"><i className="fa fa-user-circle"></i>Profile</ListGroupItem>
        <ListGroupItem><i className="fa fa-bitcoin"></i>Coins Rated</ListGroupItem>
      </ListGroup>
    </Card>


export default SideContent
