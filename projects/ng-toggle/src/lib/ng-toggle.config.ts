import { toggleConfig, valueConfig } from "./ng-toggle.component";
import { Injectable } from "@angular/core";

@Injectable()
export class NgToggleConfig {
  value?: any;
  name?: string;
  disabled?: boolean;
  height?: number;
  width?: number;
  margin?: number;
  fontSize?: number;
  speed?: number;
  color?: string | toggleConfig;
  switchColor?: string | toggleConfig;
  labels?: boolean | toggleConfig;
  values?: valueConfig;
  fontColor?: string | toggleConfig;
}

@Injectable()
export class MultiStatesToggleConfig {
  value?: any;
  name?: string;
  disabled?: boolean;
  height?: number;
  width?: number;
  margin?: number;
  fontSize?: number;
  speed?: number;
  color?: string | toggleConfig;
  switchColor?: string | toggleConfig;
  labels?: boolean | toggleConfig;
  values?: valueConfig;
  fontColor?: string | toggleConfig;
}
