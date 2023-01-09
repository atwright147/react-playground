import { FaBeer, FaCocktail } from 'react-icons/fa';

import { Button } from '../../components/Button/Button';

export const ButtonsRoute = (): JSX.Element => (
  <>
    <Button
      left={<FaBeer />}
      middle="Cheers"
      right={<FaCocktail />}
      onClick={(event) => console.info('clicked', event)}
    />

    <hr />

    <Button
      left={<FaBeer />}
      middle="Cheers"
      onClick={(event) => console.info('clicked', event)}
    />

    <hr />

    <Button
      middle="Cheers"
      right={<FaCocktail />}
      onClick={(event) => console.info('clicked', event)}
    />
  </>
);
