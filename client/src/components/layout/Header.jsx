import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Card, Grid, Row, Text } from '@nextui-org/react';

function Header() {
  return (
    <header>
      <Container>
        <Row justify='center' align='center'>
          <Grid.Container gap={2} justify='center'>
            <Grid xs>
              <NavLink to='/'>Home</NavLink>
            </Grid>
            <Grid xs>
              <NavLink to='/products'>Products</NavLink>
            </Grid>
            <Grid xs>
              <NavLink to='#'>FAQ</NavLink>
            </Grid>
          </Grid.Container>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
