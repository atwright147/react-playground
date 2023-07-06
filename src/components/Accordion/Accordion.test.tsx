import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';

import { Accordion, Item } from './Accordion';

const getMockItems = (max: number): Item[] => {
  const items: Item[] = [];
  for (let index = 1; index <= max; index++) {
    items.push({
      heading: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
    });
  }
  return items;
}

describe('Accordion', () => {
  it('should render a title', () => {
    const numItems = 3;
    const mockId = 'mockId';
    const mockItems = getMockItems(numItems);
    const mockTitle = 'Mock title';

    render(<Accordion id={mockId} title={mockTitle} items={mockItems} />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(mockTitle);
  });

  it('should render all items', () => {
    const numItems = 3;
    const mockId = 'mockId';
    const mockItems = getMockItems(numItems);
    const mockTitle = 'Mock title';

    render(<Accordion id={mockId} title={mockTitle} items={mockItems} />);

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(numItems);
    expect(screen.getAllByTestId('content')).toHaveLength(numItems);
  });

  it('should render buttons with correct aria-controls attribute', async () => {
    const numItems = 3;
    const mockId = 'mockId';
    const mockItems = getMockItems(numItems);
    const mockTitle = 'Mock title';

    render(<Accordion id={mockId} title={mockTitle} items={mockItems} />);

    screen.getAllByRole('button').forEach((item, index) => {
      expect(item).toHaveAttribute('aria-controls', `${mockId}-section--${index}`);
    });
  });

  describe('given no buttons have been clicked', () => {
    it('should render all items as collapsed', () => {
      const numItems = 3;
      const mockId = 'mockId';
      const mockItems = getMockItems(numItems);
      const mockTitle = 'Mock title';

      render(<Accordion id={mockId} title={mockTitle} items={mockItems} />);

      screen.getAllByRole('button').forEach((item) => {
        expect(item).toHaveAttribute('aria-expanded', 'false');
      });

      screen.getAllByTestId('content').forEach((item) => {
        expect(item).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('given some buttons has been clicked', () => {
    it('should render some items as expanded', async () => {
      const numItems = 3;
      const mockId = 'mockId';
      const mockItems = getMockItems(numItems);
      const mockTitle = 'Mock title';
      const itemToCheck = 1;

      render(<Accordion id={mockId} title={mockTitle} items={mockItems} />);

      await userEvent.click(screen.getAllByRole('button')[itemToCheck]);

      expect(screen.getAllByRole('button')[itemToCheck]).toHaveAttribute('aria-expanded', 'true');
      screen.getAllByTestId('content').forEach((item, index) => {
        expect(item).toHaveAttribute('aria-hidden', String(index !== itemToCheck));
      })
    });
  });
});
