import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

test('Renders app', () => {
  expect(render(<App />)).not.toThrowError();
});
