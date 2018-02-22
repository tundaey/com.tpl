import { NgModule } from '@angular/core';
import {
  MatRippleModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatTableModule,
  MatInputModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatMenuModule,
  MatIconModule,
  MatSelectModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatGridListModule,
  MatChipsModule,
  MatButtonModule } from '@angular/material';

import { ModalComponent, ModalDirectivesDirective } from './modal/modal.component';
import { CommonModule } from '@angular/common';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';
import { NotesComponent } from './notes/notes.component';
import { DateDialog } from './dialog/date';
import { AddDriverDialog } from './dialog/driver/add-driver';
import { AddClientDialog } from './dialog/client/add-client';
import { AddTruckDialog } from './dialog/truck/add-truck';
import { AddTrailerDialog } from './dialog/trailer/add-trailer';
import { FilterMenu } from './menu/filter-menu';
import { ButtonComponent } from './button/button.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { LoaderComponent } from './loader/loader.component';
import { DateRangeDirective } from "./directive/date-range.directive";
import { DateRangeComponent } from "./date-range/date-range.component";
import {GooglePieChartService} from './charts/GooglePieChartservice';
import {PieChartComponent} from './charts/PieChartComponent'
import { GoogleChartsBaseService } from './charts/GoogleCharts';

@NgModule({
  declarations: [
    PieChartComponent,
    ModalComponent,
    TopNavigationComponent,
    SubNavigationComponent,
    ModalDirectivesDirective,
    CardComponent,
    ButtonComponent,
    AddButtonComponent,
    LoaderComponent,
    InputComponent,
    NotesComponent,
    DateDialog,
    AddDriverDialog,
    AddClientDialog,
    AddTruckDialog,
    AddTrailerDialog,
    FilterMenu,
    DateRangeDirective,
    DateRangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatTabsModule,
    MatTableModule,
    MatStepperModule,
    MatNativeDateModule,
    MatAutocompleteModule, MatProgressSpinnerModule,
    MatDatepickerModule,MatSelectModule,
    MatInputModule, MatCheckboxModule,
    MatChipsModule, MatGridListModule,
    MatPaginatorModule, MatMenuModule, MatIconModule, MatButtonModule
  ],
  entryComponents: [
    DateDialog,
    AddDriverDialog,
    AddClientDialog,
    AddTruckDialog,
    AddTrailerDialog,
    FilterMenu,
  ],
  providers: [
    GoogleChartsBaseService, GooglePieChartService
  ],
  exports: [
    PieChartComponent,
    ModalComponent,
    ModalDirectivesDirective,
    TopNavigationComponent,
    LoaderComponent,
    CardComponent,
    ButtonComponent,
    AddButtonComponent,
    InputComponent,
    DateDialog,
    AddDriverDialog,
    AddClientDialog,
    AddTruckDialog,
    AddTrailerDialog,
    FilterMenu,
    SubNavigationComponent,
    NotesComponent,
    MatRippleModule, MatTabsModule,MatSelectModule, MatProgressSpinnerModule,
    MatNativeDateModule, MatDatepickerModule, MatSidenavModule,
    MatTableModule, MatInputModule, MatChipsModule,
    MatPaginatorModule, MatMenuModule, MatCheckboxModule,
    MatIconModule, MatButtonModule, MatGridListModule,
    MatAutocompleteModule,
    MatStepperModule,
    DateRangeDirective,
    DateRangeComponent
  ]
})
export class SharedModule {}
