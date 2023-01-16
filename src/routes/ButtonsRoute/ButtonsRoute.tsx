import { FaBeer, FaCocktail } from 'react-icons/fa';

import { Button } from '../../components/Button/Button';

export const ButtonsRoute = (): JSX.Element => (
  <>
    <Button
      left={<FaBeer />}
      right={<FaCocktail />}
      onClick={(event) => console.info('clicked', event)}
    >Cheers</Button>

    <hr />

    <Button
      left={<FaBeer />}
      onClick={(event) => console.info('clicked', event)}
    >Cheers</Button>

    <hr />

    <Button
      right={<FaCocktail />}
      onClick={(event) => console.info('clicked', event)}
    >Cheers</Button>
  </>
);
