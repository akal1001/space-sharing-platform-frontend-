import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ameharic } from 'src/app/interfaces/ameharic';
import { AmeharicService } from 'src/app/services/ameharic.service';
import { LoaclstoarageService } from 'src/app/services/loaclstoarage.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  searchinput: any;

  _key: any;
  _value: any;
  _response: any;

  alphObj = [
    { "AmharicAlph": "", "EnglishSound": "" }
  ]

  ameharicList: any = new Array();


  constructor(private loacl: LoaclstoarageService, private amharic: AmeharicService, private valdator: ValidatorService) { }

  ngOnInit(): void {

    //this.fiewriter();
    this.GetkeyandValue();
  }

  translate(val: any) {


  }
  wordList: any = null;
  val: any = null;
  w: any = null;
  vw: any = null;
  getDataFromLocal() {



    var lastChar = this.searchinput.at(-1);

    //console.log("last char : " + lastChar);

    if (lastChar != 'a' && lastChar != 'e' && lastChar != 'i' && lastChar != 'o' && lastChar != 'u') {
      this.w = null;
      console.log(lastChar)
    }
    else {

      if (this.w != null) {
        this.w = this.w + lastChar;
        console.log(this.w + "no");
      }
      else {
        this.w = lastChar;
        console.log(this.w + "no2");
      }

    }
    // this.val = this.loacl.GetDatatest(this.searchinput);
    // if (this.val != null || this.val != undefined) {
    //   this.wordList += this.val;


    // }
    // if (this.val == null || this.val == undefined) {
    //   const lastChar = this.searchinput.at(-1);
    //   console.log(this.wordList)
    //   this.val = this.loacl.GetDatatest(lastChar)
    //   this.wordList += this.val;
    // }
    // console.log(this.wordList)
    //
  }
  alpha(val: any) {

  }
  search_value: any = null;
  // KeyboardEvent
  async userSearchinput(event:KeyboardEvent) {
    //this.wordList = this.userSearchinput
    let val = await this.valdator.IsStringContaionNoneEngChar(this.searchinput);
    if(val == true)
    {
      console.log("val " + val);
      this.search_value = await this.amharic.ConvertAmeharicCharByCharToEngAlpha(this.searchinput);
    }
  }
  clear() {
    this.wordList = null;
    this.search_value = null;
  }






  addkeyandValue() {

    this.amharic.PostAmeharicAlphSerivce(this.ameharicList).subscribe((response) => {
      // console.log("post result " + response);
    })

    //this.loacl.SetDatatest(this._key, this._value)
  }





  async GetkeyandValue() {

    let am = await this.amharic.AmeharcJsonAsy()
    this._response = am;
    // this.amharic.ReturnAllAlph().subscribe((response) => {

    //   this._response = response;

     
    // })

    //this.loacl.SetDatatest(this._key, this._value)
  }





  sotritinarray() {


    for (let i = 1; i < 310; i++) {
      const val = document.getElementById(i.toString()) as HTMLInputElement | null

      let ameharicAlph: Ameharic = { AmharicAlph: val?.value, EnglishSound: val?.title }
      //this.ameharicList.m(ameharicAlph);
      this.ameharicList.push(ameharicAlph)

      // console.log(i + "  " + val?.title + " : " + val?.value)


    }
    //console.log(this.ameharicList)

    for (let m = 0; m < this.ameharicList.length; m++) {
      //console.log(this.ameharicList[m].AmharicAlph + "  " +  this.ameharicList[m].EnglishSound)

      this.loacl.SetDatatest(this.ameharicList[m].AmharicAlph, this.ameharicList[m].EnglishSound)
    }


  }



}
