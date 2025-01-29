import { Address } from "./address";
import { Contact } from "./contact";
import {Image} from "./image";

export interface House {
     // houseId?: any;
     // userId?: any;
     // header?: any;
     // Description?: any;
     // price?: any;
     // city?: any;
     // zipCode?: any;
     // State?: any;
     // phone?: any;
     // images?: Image;
     // datePosted: Date | undefined;
     // contact?: Contact
     // address?: Address;
     // houseImageURL?: string;

     houseId?: any;
     userId?: any;
     houseTypeId?:any;
     header?: any;
     description?: any;
     price?: any;
    
     images?: Image;
     datePosted: Date;
     contact?: Contact
     address?: Address;
     houseImageURL?: string;
}
