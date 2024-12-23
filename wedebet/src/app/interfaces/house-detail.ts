import { Address } from "./address";
import { Contact } from "./contact";
import { House } from "./house";
import { Image } from "./image";
export interface HouseDetail {
    house:House;
    address:Address;
    contact:Contact;
    image:Image;

}
