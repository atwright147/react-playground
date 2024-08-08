import { faker } from '@faker-js/faker';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { type Item, ListBuilder } from '../../components/ListBuilder/ListBuilder';

faker.seed(42);

const TOTAL_ITEMS = 10;

const availableItems: Item[] = [];
for (let index = 1; index <= TOTAL_ITEMS; index++) {
  availableItems.push({
    id: uuidv4(),
    name: faker.lorem.words(3),
  });
}

const selectedItems: Item[] = [];
// for (let index = 1; index <= TOTAL_ITEMS; index++) {
//   selectedItems.push({
//     id: uuidv4(),
//     name: faker.lorem.words(3),
//   });
// }

export const ListBuilderRoute = (): JSX.Element => {
  return (
    <>
      <h1>ListBuilder component</h1>
      <p>Demo of a ListBuilder.</p>

      <ListBuilder availableItems={availableItems} selectedItems={selectedItems} />
    </>
  );
};
