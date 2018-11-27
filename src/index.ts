import { getRandomString } from '@pnp/common';
import { Web } from "@pnp/sp";

export const Greeter = (name: string) => `Hello ${getRandomString(20)}`;

export function GetWebName(url:string) : string {
    const web = new Web(url);
    let name : string = "";
    web.get().then((web) => {name = web.name;});
    return name;
}



