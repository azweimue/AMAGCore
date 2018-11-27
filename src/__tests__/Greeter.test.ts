import { Greeter } from '../index';
test('My Greeter', () => {
  expect(Greeter('Carl')).toContain('Hello');
});
