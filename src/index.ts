import { getRandomString } from '@pnp/common';
import { Web } from '@pnp/sp';
export *  from './PropertyConfiguration';

export const Greeter = (name: string) => `Hello ${getRandomString(20)}`;

export async function GetWebName(url: string) {
  const web = new Web(url);
  const w = await web.get();
  return w.Title;
}
