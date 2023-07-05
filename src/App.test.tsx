import { render, screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('should render title', () => {
    const mockTitle = 'Mock title';
    render(<App title={mockTitle} />);
    expect(screen.getByRole('heading')).toHaveTextContent(mockTitle);
  });
});
