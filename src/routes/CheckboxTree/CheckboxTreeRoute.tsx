import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

import { useMemo, useState } from 'react';
import { CheckboxTree, type Item } from '../../components/CheckboxTree/CheckboxTree';
import { Input } from '../../components/fields/Input/Input';

faker.seed(42);

const items: Item[] = [];
const TOTAL_ITEMS = 1400;
const TOTAL_CHILDREN_MAX = 200;

for (let parentIndex = 1; parentIndex <= TOTAL_ITEMS; parentIndex++) {
  const children: Item[] = [];
  const numChildrenForThisIteration = faker.number.int({ min: 1, max: TOTAL_CHILDREN_MAX });

  for (let childIndex = 1; childIndex <= numChildrenForThisIteration; childIndex++) {
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

  parentIndex += numChildrenForThisIteration;
}

export const CheckboxTreeRoute = (): JSX.Element => {
  const [filter, setFilter] = useState('');

  const filteredItems = useMemo(() => {
    if (!filter) {
      return items;
    }

    return items.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
  }, [filter]);

  return (
    <>
      <h1>CheckboxTree</h1>
      <p>Demo of a CheckboxTree.</p>

      <Input name="filter" id="filled-basic" label="Filled" value={filter} onChange={(event) => setFilter(event.target.value)} />

      <CheckboxTree items={filteredItems} />
    </>
  );
};
