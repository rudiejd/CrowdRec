import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

/**
 * TODO: Write more comprehensive test cases
 */


test('makes sure any CrowdRec stuff is showing up', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/CrowdRec/i);
  expect(linkElement).toBeInTheDocument();
});

