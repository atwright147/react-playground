import { faker } from '@faker-js/faker';

import { Accordion, Item } from '../../components/Accordion/Accordion';

const items: Item[] = [];

for (let index = 1; index < 10; index++) {
  items.push({
    heading: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
  });
}

export const AccordionRoute = (): JSX.Element => (
  <Accordion id="a11y-accordion" title="Accordion" items={items} />
);
