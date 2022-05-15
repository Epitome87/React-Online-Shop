import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/userSlice';
import { Container, Card, Grid, Row, Text } from '@nextui-org/react';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const onLogout = (event) => {
    dispatch(logout());
  };

  let renderedContent;

  renderedContent = user ? (
    <React.Fragment>
      <Grid xs>
        <NavLink to='#' onClick={onLogout}>
          Sign Out
        </NavLink>
      </Grid>
      <Grid xs>
        <NavLink to='#' onClick={onLogout}>
          Profile {user.name}
        </NavLink>
      </Grid>
    </React.Fragment>
  ) : (
    <Grid xs>
      <NavLink to='/login'>Sign In</NavLink>
    </Grid>
  );

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
            {renderedContent}
          </Grid.Container>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
