import { faker } from '@faker-js/faker';

import { Accordion, type Item } from '../../components/Accordion/Accordion';

const items: Item[] = [];

for (let index = 1; index < 10; index++) {
  items.push({
    heading: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
  });
}

export const AccordionRoute = (): JSX.Element => (
  <>
    <h1>Accordion</h1>
    <p>Demo of a custom accordion, designed to be accessible.</p>
    <Accordion id="a11y-accordion" title="Accordion of Items" items={items} />
  </>
);
