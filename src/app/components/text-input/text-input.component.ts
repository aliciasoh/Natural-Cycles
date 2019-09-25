import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  textValue;
  sliderValue;
  fontSize;
  resultWidth;
  element;
  isNight;

  constructor() {
    this.isNight = (new Date()).getHours() >= 6 && (new Date()).getHours() <= 17 ? false : true;
   }

  ngOnInit() {
    this.getStoredValues();
  }

  onSliderChange(event){
    this.resultWidth = ((window.screen.width * (event.value))/100)*(0.5);
    this.element['style'].width = (this.resultWidth+"px");
    this.sliderValue = event.value;

    this.alterElement(this.element);
  }

  onTextChange(){
    this.alterElement(this.element);
  }

  alterElement(element){
    this.fontSize = element.scrollWidth;
    this.alterFontSize(element);
    this.storeValues(this.resultWidth, this.fontSize, this.textValue, this.sliderValue);
  }

  alterFontSize(element){
    if(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight){
      while(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight){
        element['style'].fontSize = (this.fontSize+"px");
        this.fontSize--;
      }
    }
    else if(element.scrollWidth == element.clientWidth){
      element['style'].fontSize = (this.fontSize+"px");
      while(element.scrollWidth > element.clientWidth || element.scrollHeight > element.clientHeight){
        element['style'].fontSize = (this.fontSize+"px");
        this.fontSize--;
      }
    }
  }

  storeValues(resultWidth, textSize, textValue, sliderValue){
    localStorage.setItem("resultWidth", resultWidth);
    localStorage.setItem("textSize", textSize);
    localStorage.setItem("textValue", textValue);
    localStorage.setItem("sliderValue", sliderValue);
  }

  getStoredValues(){
    this.element = document.getElementsByClassName('text-result')[0];
    let initialWidth = ((window.screen.width * (50))/100)*(0.5);
    this.sliderValue = localStorage.getItem("sliderValue") ? localStorage.getItem("sliderValue") : 50;
    this.textValue = localStorage.getItem("textValue") ? localStorage.getItem("textValue") : "";
    this.element['style'].width = parseInt(localStorage.getItem("resultWidth")) >= 0 ? localStorage.getItem("resultWidth") + "px" : initialWidth+"px";
    this.element['style'].fontSize = localStorage.getItem("textSize") ? localStorage.getItem("textSize") + "px" : "";
  }

}
