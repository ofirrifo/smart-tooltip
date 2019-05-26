import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SmTooltipModule } from '../../projects/sm-tooltip/src/lib/sm-tooltip.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyTooltipComponent } from './my-tooltip/my-tooltip.component';

@NgModule({
  imports: [
    BrowserModule,
    SmTooltipModule.withComponents([MyTooltipComponent]),
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    MyTooltipComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
