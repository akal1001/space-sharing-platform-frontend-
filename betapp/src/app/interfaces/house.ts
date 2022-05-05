import { Imagefile } from './imagefile';
import { Contact } from './contact';
import { Address } from './address';


export class House {

  public houseid?: any;
  public userId?: any;
  public HouseRoomeType?: any;
  public Description?: any;

  public price?: any;
  public city?: any;
  public zipCode?: any;
  public State?: any;
  public phone?: any;
  public ImageFiles?: Imagefile[];
  public _Date: Date | undefined;
  public contact?: Contact
  public address?: Address;
  public houseImageURL?: string;
}
