import { Component, OnInit, Input, forwardRef, Output, EventEmitter, OnChanges, SimpleChanges, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgToggleConfig } from './ng-toggle.config';
import { px } from './ng-toggle.component'

const DEFAULT_COLOR_CHECKED = '#0099CC'
const DEFAULT_COLOR_UNCHECKED = '#e0e0e0'
const DEFAULT_LABEL_CHECKED = ''
const DEFAULT_LABEL_UNCHECKED = ''
const DEFAULT_SWITCH_COLOR = '#fff'
const DISABLED_COLOR = '#dbdbdb'
const DISABLED_BUTTON_COLOR = 'silver'

@Component({
  selector: 'multi-states-toggle',
  templateUrl: './multi-states-toggle.component.html',
  styleUrls: ['./multi-states-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiStatesToggleComponent),
      multi: true
    }
  ]
})
export class MultiStatesToggleComponent implements AfterViewInit, OnChanges {

  @Input() selected: any = "option1"
  @Input() name: string = this.config.name || ''
  @Input() disabled: boolean = this.config.disabled || false

  @Input() height: number = this.config.height || 25
  @Input() width: number = this.config.width || 45
  @Input() margin: number = this.config.margin || 2
  @Input() fontSize: number = this.config.fontSize || undefined
  @Input() speed: number = this.config.speed || 300
  @Input() color: string | toggleConfig = this.config.color
  @Input() switchColor: string | toggleConfig = this.config.switchColor
  @Input() labels: boolean | toggleConfig = this.config.labels || true
  @Input() fontColor: string | toggleConfig = this.config.fontColor || undefined
  @Input() states: any = [
      {key: "option1", text: "option1"},
      {key: "option2", text: "option2"},
      {key: "option3", text: "option3"}
    ]
  cssColors: boolean = false

  sliderPos: stateButtonPos = null;
  stateButtonPos: stateButtonPos | {} = {};
  
  @Output() change = new EventEmitter()
  @Output() stateChange = new EventEmitter()

  @ViewChildren("stateButtonWrapper") private stateButtonWrappers: QueryList<ElementRef>;
  //@ViewChildren("state-button-wrapper") private stateButtonWrappers: QueryList<ElementRef>;

  constructor(
    private config: NgToggleConfig
  ) { }
  
  ngAfterViewInit(){
    this.getAllStateButtonPos();
    console.log(this.stateButtonPos);
    this.updateSliderRect();
  }

  ngOnChanges(){
    console.log("on changes")
    this.updateSliderRect();
  }

  updateSliderRect(){
    this.sliderPos = this.stateButtonPos[this.selected];
    console.log(this.sliderPos)
  }

  getAllStateButtonPos() {
    const newStateButtonPos = {};
    this.stateButtonWrappers.reduce((marginLeft, el, index)=>{
        const buttonKey = this.states[index].key;
        const buttonWidth = el.nativeElement.getBoundingClientRect().width;
        newStateButtonPos[buttonKey] = {
            marginLeft,
            width: buttonWidth
        }
        return marginLeft + buttonWidth;
    }, 0);
    this.stateButtonPos = newStateButtonPos;
  }

  onSelect(key) {
    console.log("select")
    this.selected = key;
    this.updateSliderRect();
    this.stateChange.emit(key);
  }

  get sliderStyle () {
    return this.sliderPos? {
      width: px(this.sliderPos.width),
      "margin-left": px(this.sliderPos.marginLeft),
      transition: `all ${this.speed}ms`,
      backgroundColor: this.cssColors
        ? null
        : (this.disabled ? this.colorDisabled : this.colorChecked),
      borderRadius: px(Math.round(this.height / 2))
    } : {display: "hidden"}
  }

  get colorDisabled () {
    return get(this.color, 'disabled', DISABLED_COLOR)
  }

  get colorChecked () {
    let { color } = this
    if (!isObject(color)) {
      return color || DEFAULT_COLOR_CHECKED
    }
    return get(color, 'checked', DEFAULT_COLOR_CHECKED)
  }
}

export const isObject = (value) => {
  return typeof value === 'object'
}

export const has = (object, key) => {
  return isObject(object) && object.hasOwnProperty(key)
}

export const get = (object, key, defaultValue) => {
  return has(object, key) ? object[key] : defaultValue
}

export const translate = (x, y) => {
  return `translate(${x}, ${y})`
}

type stateButtonPos = {
  width:number, 
  marginLeft: number
}

export type toggleConfig = {
  checked: string;
  unchecked: string;
};

export type valueConfig = {
  checked: any;
  unchecked: any;
};

export type stateConfig = {
    key: string;
    text: string;
};
