import { getRandomString } from '@pnp/common';

export const Greeter = (name: string) => `Hello ${getRandomString(20)}`;
