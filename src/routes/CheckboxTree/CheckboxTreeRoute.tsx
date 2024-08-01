import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

import { CheckboxTree, type Item } from '../../components/CheckboxTree/CheckboxTree';

const items: Item[] = [];

for (let parentIndex = 1; parentIndex <= 10; parentIndex++) {
  const children: Item[] = [];

  for (let childIndex = 1; childIndex <= 3; childIndex++) {
    children.push({
      id: uuidv4(),
      name: faker.lorem.words(3),
    });
  }

  items.push({
    id: uuidv4(),
    name: faker.lorem.words(3),
    children,
  });
}

export const CheckboxTreeRoute = (): JSX.Element => (
  <>
    <h1>CheckboxTree</h1>
    <p>Demo of a CheckboxTree.</p>
    <CheckboxTree items={items} />
  </>
);
