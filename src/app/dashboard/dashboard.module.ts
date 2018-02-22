import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent} from './dashboard.component';
import {ExampleDatabase} from './dashboard.service'
import {DataService} from './data.service'
import {ClientDatabase} from './tabs/clients/client.service'
import {OrderViewComponent} from './order-view/order-view.component'
import {Tab} from './tabs/tab'
import {ClientTabComponent} from './tabs/clients/tab-client'
import {TruckTabComponent} from './tabs/trucks/tab-truck'
import {TrailerTabComponent} from './tabs/trailers/tab-trailer'
import { routes } from './dashboard.router';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ViewDriverComponent } from './order-view/view-driver/view-driver.component';
import { EditClientComponent } from './tabs/clients/edit/edit.component';
import { EditTruckComponent } from './tabs/trucks/edit/edit.component';
import { EditTrailerComponent } from './tabs/trailers/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    OrderViewComponent,
    ClientTabComponent,
    TruckTabComponent,
    TrailerTabComponent,
    ViewDriverComponent,
    EditClientComponent,
    EditTruckComponent,
    EditTrailerComponent

  ],
  providers: [ExampleDatabase, ClientDatabase, DataService],
  bootstrap: [
    DashboardComponent,
    ClientTabComponent,
    TruckTabComponent,
    TrailerTabComponent
  ]
})
export class DashboardModule {}
