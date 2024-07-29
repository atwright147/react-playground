import { FaBeer, FaCocktail } from 'react-icons/fa';

import { Button } from '../../components/Button/Button';

export const ButtonsRoute = (): JSX.Element => (
  <>
    <h1>Buttons</h1>
    <p>
      Demo of custom button components. Experimenting with the concept of <code>slots</code>
    </p>

    <Button left={<FaBeer />} right={<FaCocktail />} onClick={(event) => console.info('clicked', event)}>
      Cheers
    </Button>

    <hr />

    <Button left={<FaBeer />} onClick={(event) => console.info('clicked', event)}>
      Cheers
    </Button>

    <hr />

    <Button right={<FaCocktail />} onClick={(event) => console.info('clicked', event)}>
      Cheers
    </Button>
  </>
);
