import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Grid, Row, Text } from '@nextui-org/react';

function Footer() {
  return (
    <footer>
      <Container css={{ pt: '$20' }}>
        <Row justify='center' align='center'>
          <Grid.Container gap={2} justify='center'>
            <Grid xs>
              <Link to='#'>Link 1</Link>
            </Grid>
            <Grid xs>
              <Link to='#'>Link 2</Link>
            </Grid>
            <Grid xs>
              <Link to='#'>Link 3</Link>
            </Grid>
          </Grid.Container>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
