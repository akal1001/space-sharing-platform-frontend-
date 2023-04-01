export class uploadContent {
  public title?: string;
  public description?: string;
  public city?: string;
  public phone?: number;
  public price?: number;
  public images?: HouseImage[] = new Array();
  public catagoryrefrenceId?:any;
}
export class HouseImage {
  public id?:any;
  public imageUrl?:string;
}