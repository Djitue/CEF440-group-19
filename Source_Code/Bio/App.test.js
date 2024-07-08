// app.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions

// Import your screen components
import WelcomePage from '../Bio/screen/WelcomePage';
import LoginAs from '../Bio/screen/LoginAs';

// Utility function to measure render time
const measureRenderTime = (Component) => {
  const start = performance.now();
  render(<Component />);
  const end = performance.now();
  return end - start;
};

describe('Screen Component Performance Tests', () => {
  test('WelcomePage renders within acceptable time', () => {
    const renderTime = measureRenderTime(WelcomePage);
    console.log(`WelcomePage render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(4000); // adjust the threshold as needed
  });

  test('LoginAs renders within acceptable time', () => {
    const renderTime = measureRenderTime(LoginAs);
    console.log(`LoginAs render time: ${renderTime}ms`);
    expect(renderTime).toBeLessThan(4000); // adjust the threshold as needed
  });

  // Add more tests for other screens if needed
});
