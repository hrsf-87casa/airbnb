import React from 'react';
import { Container, CardDeck } from 'reactstrap';

import ListingEntry from './ListingEntry.jsx';

export default ({ listings }) => (
  <Container>
    <CardDeck>
      {listings.map(item => <ListingEntry listing={item} key={item.id} showButton={false} />)}
    </CardDeck>
  </Container>
);
