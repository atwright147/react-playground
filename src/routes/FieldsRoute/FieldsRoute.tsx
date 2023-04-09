import { FaBeer, FaCocktail } from 'react-icons/fa';

import { Input } from '../../components/fields/Input/Input';
import { Textarea } from '../../components/fields/Textarea/Textarea';

export const FieldsRoute = (): JSX.Element => (
  <>
    <Input
      label="Field 1"
      id="field-1"
      name="field-1"
    />

    <Input
      label="Field 2"
      id="field-2"
      name="field-2"
      left={<FaBeer />}
    />

    <Input
      label="Field 3"
      id="field-3"
      name="field-3"
      right={<FaCocktail />}
    />

    <Input
      label="Field 4"
      id="field-4"
      name="field-4"
      left={<FaBeer />}
      right={<FaCocktail />}
    />

    <hr />

    <Textarea
      label="Textarea"
      id="textarea-1"
      name="textarea-1"
    />
  </>
);
