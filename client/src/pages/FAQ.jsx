import { Collapse, Container, Text } from '@nextui-org/react';

function FAQ() {
  return (
    <Container>
      <Text
        h1
        size={60}
        css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%', lineHeight: 1, mt: '$20' }}
        weight='bold'
      >
        Frequently Asked Questions
      </Text>
      <Collapse.Group css={{ mt: '$10' }}>
        <Collapse title='Why'>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title='Okay, but how come?'>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title='I do not understand'>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title='Okay, I give up'>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        </Collapse>
      </Collapse.Group>
    </Container>
  );
}

export default FAQ;
