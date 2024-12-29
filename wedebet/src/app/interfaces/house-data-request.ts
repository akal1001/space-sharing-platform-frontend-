export interface HouseDataRequest {
    UserId?: string;
    HouseTypeId: string;
    HouseTypeName:string;
    HouseId: string;
    Header: string;
    Description: string;
    Price: number;  
    DatePosted?: Date;
    
    ContactId: string;
    Phone: string;
    Email: string;
  
    AddressId: string;
    Street: string;
    City: string;
    State: string;
    ZipCode: number;
    PostalCode: string;
    Country: string;
    IsAddressPublic: boolean;
    DateUpdated?: Date;
  
    ImageId: string;
    ImageName: string;
    Image: string;
    ImageUrls: string[];
    DateUploaded?: Date;
}
