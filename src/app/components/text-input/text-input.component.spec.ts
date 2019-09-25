import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputComponent } from './text-input.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MatSliderModule ],
      declarations: [ TextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create text-input component', () => {
    expect(component).toBeTruthy();
  });

  it('should show dark background if at night', () => {
    component.isNight = true;
    fixture.detectChanges();
    let bg = fixture.debugElement.query(By.css('.night')).nativeElement;
    expect(bg).toBeTruthy();
  });

  it('should show light background if morning', () => {
    component.isNight = false;
    fixture.detectChanges();
    let bg = fixture.debugElement.query(By.css('.night'));
    expect(bg).toBeNull();
  });

  it('on typing into the input text field, the same word should be in the result div', () => {
    component.textValue = "test";
    fixture.detectChanges();
    let resultEl = fixture.debugElement.query(By.css('.text-result')).nativeElement;
    expect(" " + component.textValue + " ").toBe(resultEl.innerHTML);
  });

  it('should persist and restore values resultWidth, textSize, textValue, sliderValue', () => {
    component.storeValues(100, 10, "test test", 100);
    component.getStoredValues();
    fixture.detectChanges();
    expect(component.element['style'].width).toBe("100px");
    expect(component.element['style'].fontSize).toBe("10px");
    expect(component.textValue).toBe("test test");
    expect(component.sliderValue).toBe('100');
  });

  it('on text change to longer text, it should change font size', () => {
    component.textValue = "changed text value to longer text";
    component.onTextChange();
    fixture.detectChanges();
    component.alterFontSize(component.element);
    let isFontSizeEqual = (component.element['style'].fontSize == component.fontSize + "px") || (component.element['style'].fontSize == component.fontSize + 1 + "px");

    expect(isFontSizeEqual).toBeTruthy();
  });

  it('on slider change, it should change the width and font size', () => {
    component.onSliderChange({value:10});
    fixture.detectChanges();

    let resultWidth = ((window.screen.width * (10))/100)*(0.5);
    component.alterFontSize(component.element);
    let isFontSizeEqual = (component.element['style'].fontSize == component.fontSize + "px") || (component.element['style'].fontSize == component.fontSize + 1 + "px");

    expect(isFontSizeEqual).toBeTruthy();
    expect(component.element['style'].width).toBe(resultWidth+"px");
  });

});
