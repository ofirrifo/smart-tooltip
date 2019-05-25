import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SmTooltipModule } from '../../projects/sm-tooltip/src/lib/sm-tooltip.module';

@NgModule({
  imports: [
    BrowserModule,
    SmTooltipModule
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
