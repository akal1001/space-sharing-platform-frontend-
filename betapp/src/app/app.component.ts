import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoaclstoarageService } from './services/loaclstoarage.service';
import { BreakpointObserver } from '@angular/cdk/layout'
import { SearchService } from './services/search.service';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { HomeService } from './services/home.service';
import { DataService } from './services/data.service';
import { MatRadioButton, MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})

export class AppComponent {

  control = new FormControl();
  streets: any[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<any[]> | undefined;
  img: any = 'https://sm-image-bucket.s3.amazonaws.com/imagefiles/qRcmyhi3LFZf47CD7FC7-C347-4D5D-9C49-EB01113B7D0B.jpeg'

  searchinput: any;
  serarchResult: any = null;
  sampleData: any = [];
  idlist: any = new Array();
  tempList: any = [];
  public v: any;
  public inputFromParent: any = "akal";
  title = 'betapp';
  input: any;
  userselectedvalue: any;

  data: any;

  selectedPriceValue: any;
  selectedPostValue: any;
  @ViewChild(MatSidenav) sidenav!: MatSidenav

  constructor(private service: DataService, private observer: BreakpointObserver, private homseService: HomeService, private searchsrvice: SearchService, private router: Router, private storage: LoaclstoarageService) {

  }
  ngOnInit(): void {


    this.service.data$.subscribe((res: any) => this.data = res)  //read the invoked data or default data

    console.log("data form child " + this.data);
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );



  }

  myvalue: any;
  onChangePrice(mrChange: MatRadioChange) {

    let mrButton: MatRadioButton = mrChange.source;


    this.myvalue = mrButton;
    this.selectedPriceValue = mrButton.value;
    console.log(mrButton.inputId);
    mrButton = this.myvalue;
  }


  onChangePost(mrChange: MatRadioChange) {

    let mrButton: MatRadioButton = mrChange.source;
    console.log(mrButton.name);
    this.selectedPostValue = mrButton.value;
    console.log(mrButton.checked);
    console.log(mrButton.inputId);
  }



  ngAfterViewInit() {
    this.router.navigateByUrl("/home")

    //max-width:1024px

    this.observer.observe(['(max-width:3024px)']).subscribe((res: { matches: any; }) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }


  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  home() {
    // if(window.innerWidth >= 1024)
    // {
    //   this.sidenav.open();
    // }
     window.scroll(0,0)
    this.userselectedvalue = null;
    this.inputFromParent = null;
    this.router.navigateByUrl("/home")

  }
  account() {
    this.sidenav.close();
    this.userselectedvalue = null;
    this.inputFromParent = null;
    let userInfo = this.storage.GetData(this.storage.usertoken);

    if (userInfo != null) {
      this.router.navigateByUrl("/account")
    }
    if (userInfo == null) {
      this.router.navigateByUrl("/login")
    }
    console.log(userInfo)
  }
  upload() {
    this.sidenav.close();
    this.userselectedvalue = null;
    this.inputFromParent = null;

    let userInfo = this.storage.GetData(this.storage.usertoken);

    if (userInfo != null) {
      this.router.navigateByUrl("/upload")
    }
    if (userInfo == null) {
      this.router.navigateByUrl("/login")
    }
  }


  gotodetail(id: any) {


    //this.setTempData(JSON.stringify(id));

    //this.router.navigateByUrl("/detail");

    let da: any[] = this.storage.GetData(this.storage.id);

    if (da != null) {
      this.idlist = this.storage.GetData(this.storage.id);
    }
    if (this.idlist != null) {
      console.log("length : " + this.idlist.length)

      for (var i = 0; i < this.idlist.length; i++) {
        console.log(this.idlist[i]);
        if (this.idlist[i] == id) {
          this.idlist.splice(i, 1);
          console.log("similar id found! " + this.idlist[i])
        }
      }
    }

    this.idlist.push(id);
    this.storage.SetData(this.storage.id, JSON.stringify(this.idlist));





    // this.sampleData = this.storage.GetData(this.storage.id);


  }

  slideIndex = 1;

  selectdvalue(id: any, city: any, state: any) {

    this.homseService.GetHouseService(id).subscribe((resposne: any) =>
    {

      this.storage.SetData(this.storage.SearchedSelectValueDatakey, JSON.stringify(resposne));
      this.router.navigateByUrl("/child")

    })



  }
  userSearchinput() {

    console.log(this.router.url)

    if (this.router.url != "/home") {
      this.router.navigateByUrl("/home")
    }

    this.searchsrvice.SearchServe(this.searchinput).subscribe((result: any) => {
      console.log(JSON.stringify(result))
      console.log(this.searchinput)
      this.serarchResult = result;

      this.storage.SetData(this.storage.SearchedDatakey, JSON.stringify(result))



    })
    this.inputFromParent = this.searchinput;


  }
}
