import { Address } from "./address";
import { Contact } from "./contact";
import { Imagefile } from "./imagefile";

export interface House {
     houseid?: any;
     userId?: any;
     header?: any;
     Description?: any;
     catagory?:any;
  
     price?: any;
     city?: any;
     zipCode?: any;
     State?: any;
     phone?: any;
     ImageFiles?: Imagefile[];
     _Date: Date | undefined;
     contact?: Contact
     address?: Address;
     houseImageURL?: string;
}
