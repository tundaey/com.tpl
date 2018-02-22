import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { metaReducers, reducers } from './store';
import { SharedModule } from './shared/shared.module';

import { DriverService } from './store/services/driver.service'
import { ClientService} from './store/services/client.service'
import { TruckService} from './store/services/truck.service'
import { TrailerService} from './store/services/trailer.service'
import {GooglePieChartService} from '../app/shared/charts/GooglePieChartservice';

import { FeedEffects } from './store/feed/feed.effects';

import { DriverEffects } from './store/effects/driver.effects'
import { ClientEffects } from './store/effects/client.effects'
import { TruckEffects } from './store/effects/truck.effects'
import { TrailerEffects } from './store/effects/trailer.effects'

import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
//import { GoogleChartsBaseService } from './shared/charts/GoogleCharts';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      FeedEffects,
      DriverEffects,
      ClientEffects,
      TruckEffects,
      TrailerEffects
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
    RouterModule.forRoot(
      routes,
      {
        useHash: true
      }
    )
  ],
  providers: [
    DriverService, 
    ClientService, 
    TruckService, 
    TrailerService,
    //GoogleChartsBaseService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
