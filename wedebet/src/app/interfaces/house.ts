import { Address } from "./address";
import { Contact } from "./contact";
import {Image} from "./image";

export interface House {
     houseid?: any;
     userId?: any;
     header?: any;
     Description?: any;
     price?: any;
     city?: any;
     zipCode?: any;
     State?: any;
     phone?: any;
     images?: Image;
     _Date: Date | undefined;
     contact?: Contact
     address?: Address;
     houseImageURL?: string;
}
