import { FaBeer, FaCocktail } from 'react-icons/fa';

import { Input } from '../../components/fields/Input/Input';

export const FormRoute = (): JSX.Element => (
  <>
    <Input
      label="My Field"
      id="myField"
      name="myField"
    />

    <Input
      label="My Field"
      id="myField"
      name="myField"
      left={<FaBeer />}
    />

    <Input
      label="My Field"
      id="myField"
      name="myField"
      right={<FaCocktail />}
    />

    <Input
      label="My Field"
      id="myField"
      name="myField"
      left={<FaBeer />}
      right={<FaCocktail />}
    />
  </>
);
