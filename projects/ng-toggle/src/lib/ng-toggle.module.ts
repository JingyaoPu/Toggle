import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgToggleComponent } from './ng-toggle.component';
import { MultiStatesToggleComponent} from './multi-states-toggle.component'
import { CommonModule } from '@angular/common';
import { NgToggleConfig } from './ng-toggle.config';

@NgModule({
  declarations: [NgToggleComponent, MultiStatesToggleComponent],
  imports: [
    CommonModule
  ],
  exports: [NgToggleComponent, MultiStatesToggleComponent],
  providers: [NgToggleConfig]
})
export class NgToggleModule {
  static forRoot(config: NgToggleConfig = {}): ModuleWithProviders<NgToggleModule> {
    return {
      ngModule: NgToggleModule,
      providers: [
        {
          provide: NgToggleConfig,
          useValue: config
        }
      ]
    }
  }
}
