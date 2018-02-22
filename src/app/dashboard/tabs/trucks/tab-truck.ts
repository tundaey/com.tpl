import {
  Component, ViewChild, ElementRef, Renderer2, OnInit, Input, Output, EventEmitter,
  AfterViewInit, AfterContentInit, AfterViewChecked
} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatPaginator} from '@angular/material'
import {Observable} from 'rxjs/Observable';
import {transition, trigger, state, style, animate} from '@angular/animations'
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import {
  MatDialog, 
  MatSidenav,
  MatMenuTrigger, 
  MatDatepicker, 
  MatMenuPanel, 
  MatTable, 
  PageEvent,
  MatCheckboxChange} from '@angular/material';
import { DateDialog } from '../../../shared/dialog/date';
import * as moment from 'moment';
import {MatChipInputEvent} from '@angular/material';
// import {DataService} from '../data.service';

import { Truck } from '../../../store/models/truck.model'
import { Store } from '@ngrx/store'
import {IAppState} from '../../../store'
import { 
  LoadTrucks, 
  FilterTrucksMake, 
  FilterTrucksModel,
  FilterTruckYear,
  FilterDate,
  enableRow,
  disableRow,
  selectAllCheckBoxes,
  UpdateFilterBar, 
  RemoveOptionFromFilterBar,
  LoadFilteredTrucks } from '../../../store/actions/truck.action'

const COMMA = 188;

declare var google: any;
declare var $: any;

@Component({
  selector: 'app-tab-truck',
  templateUrl: './tab-truck.html',
  styleUrls: ['./tab-truck.css'],
})
export class TruckTabComponent implements OnInit, AfterViewChecked  {

  //@ViewChild('sidenav') sidenav: MatSidenav;
  @Input() sidenav
  @Output() changeTitle: EventEmitter<any> = new EventEmitter<any>()
  @Output() dataChanged: EventEmitter<any> = new EventEmitter<any>()
  @Output() selected: EventEmitter<any> = new EventEmitter<any>()
  //@ViewChild('sidenav', {read: ElementRef}) private sidenav: ElementRef;

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @ViewChild('filter2Trigger') filter2Trigger: MatMenuTrigger;
  @ViewChild('colFilterTrigger') colFilterTrigger: MatMenuTrigger;
  @ViewChild('nameFilterTrigger') nameFilterTrigger: MatMenuTrigger;
  @ViewChild('phoneFilterTrigger') phoneFilterTrigger: MatMenuTrigger;
  @ViewChild('enableButtonFilterTrigger') enableButtonFilterTrigger: MatMenuTrigger;

  @ViewChild('filter') filter: ElementRef;
  @ViewChild('filter2') filter2: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatDatepicker) picker2: MatDatepicker<Date>;
  @ViewChild(MatTable) table: MatTable<any>;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
  // map
  @ViewChild('map') _el: ElementRef;
  
  truck$: Observable<Truck[]>
  trucks: Array<Truck> = []
  pageLength: number;
  loading: boolean;

  constructor(public dialog: MatDialog, private store: Store<IAppState>) {
    this.all_dates = "";
    this.isFilterOpen = false;
    this.truck$ = this.store.select('trucks').map((data) => data.data )
    this.store.select('trucks')
    .subscribe((data)=> {
      this.filterOptions = data.filterOptions
      this.headers = data.headers
      this.selectedOptions = data.filterBar
      this.pageLength = data.data.length
      this.loading = data.loading
    })
    this.store.dispatch(new LoadTrucks())
  }
  
  
  pageChanged(pageEvent: PageEvent){
    console.log('page change', pageEvent)
    this.dataSource.page = pageEvent
  }


  filterYear(value, condition){
    const year_filter = { field: "year", value, condition}
    this.store.dispatch(new FilterTruckYear(year_filter))
  }

  filterMake(value, condition){
    const make_filter = { field: "make", value, condition}
    this.store.dispatch(new FilterTrucksMake(make_filter))
  }

  filterModel(value, condition){
    const model_filter = { field: "model", value, condition}
    this.store.dispatch(new FilterTrucksModel(model_filter))
  }

  addYearToFilterBar(value): void {
    const selectedOption =  {type: "Year", field: "year", value: value}
    this.store.dispatch(new UpdateFilterBar(selectedOption))
  }

  addMakeToFilterBar(value): void {
    const selectedOption =  {type: "Make", field: "make", value: value}
    this.store.dispatch(new UpdateFilterBar(selectedOption))
  }

  addModelToFilterBar(value): void {
    const selectedOption = {type: "Model", field: "model", value: value}
    this.store.dispatch(new UpdateFilterBar(selectedOption))
  }

  removeFromFilterBar(value: any): void {
    const selectedOption =  {type: value.type, field: value.field, value: value.value}
    this.store.dispatch(new RemoveOptionFromFilterBar(selectedOption));
    this.store.dispatch(new LoadFilteredTrucks())
    if(this.selectedOptions.length === 0) this.showFilter = false
  }

  // data table
  displayedColumns = ['checkbox', 'enable','userId', 'userName', 'progress', 'color', 'date'];
  
  dataSource: TruckDataSource | null;

  map: any;

  //date picker
  start_date: Date;
  end_date: Date;
  all_dates: string;

  //changing style on mouse over row on table
  selectedRowIndex: number = -1;
  
  //boolean for open filter bar
  isFilterOpen: boolean;
  
  //Chips for selecting a filter
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  showFilter: boolean = false;
  sf: number = 0;
  tf: boolean = false;
  tf2: boolean = false;
    
  
  // Enter, comma
  separatorKeysCodes = [COMMA];

  filterOptions = []
  headers = []
  filterOptionToRemove: number
  
  selectedOptions = [];
  selectedFilters = [];
  selectedDateFilter: string;
  
  selectedItem: boolean = false;
  selectedId: any;
  detailData: any;
  panel_title = "Truck Information"
  
  highlight(row){
      this.selectedRowIndex = row.id;
  }

  removeHighlight(){
    this.selectedRowIndex= -1
  }

  showRowHighlight = false
  openEnableTrigger(row){
    this.selectedRowIndex = row.id;
  }

   //enable row
   enableRow(row){
    let data = {...row, enable: true}
     this.store.dispatch(new enableRow(data))
   }
  
   //disable row
   disableRow(row){
     let data = {...row, enable: false}
    this.store.dispatch(new disableRow(data))
   }

 // close detail view when tab is changed
 onChangeTab(event){
   this.selectedItem = false;
   this.sidenav.close()
 }

 reason = '';
  
  close(reason: string) {
    this.reason = reason;
    //this.sidenav.close();
  }

  doNothing(){ 
  }

  viewData(data){
    if(this.selectedItem){
      this.selectedId === data.id 
      ? (
        this.selectedItem = false, 
        this.selectedId = '',
        this.selected.emit(false) 
      )
      : (
        this.detailData = data, 
        this.selectedId = data.id,
        //emit new data
        console.log('selected'),
        this.changeTitle.emit(this.panel_title),
        this.dataChanged.emit(data)
      )
    }else{
      console.log('none selected')
      console.log('data', data)
      this.selectedItem = true
      this.detailData = data
      this.selectedId = data.id
      this.dataChanged.emit(data)
      this.changeTitle.emit(this.panel_title)
      this.selected.emit(true)
    }
    
  }

  
  

  openMenu(){
    this.picker2.open();
  }

  selectItem(){
    this.selectedItem = true;
  }

  selectAllCheckBoxes(event: MatCheckboxChange){
    console.log('event', event)
    this.store.dispatch(new selectAllCheckBoxes(event.checked))
  }

  openEnableFilter(){
    this.enableButtonFilterTrigger.openMenu()
  }

  closeDateMenu(menuTrigger){
    menuTrigger.closeMenu()
  }


  openFilter(event, filter2){
    if(this.selectedOptions.length > 0){
      this.tf = true;
      this.filter2Trigger.openMenu()
    }else{
      this.showFilter = !this.showFilter
      if(this.showFilter) this.filter2Trigger.openMenu()
    }
  }

  closeFilterBar(){
    this.showFilter = false;
    this.selectedOptions = [];
    this.filterOptions = this.headers
    this.dataSource.filter = ''
  }

  openFilterMenu(filterTrigger: MatMenuTrigger, index){
    this.filterOptionToRemove = index;
    filterTrigger.openMenu()
  }

 
  getDates($event, menuTrigger){

    if(!this.start_date || !this.end_date) {
      menuTrigger.closeMenu()
      return
    };
    //filter based on dates and current filters
    //looking for data where date is not less that start date and greater than end date 
    if(moment(this.start_date).isBefore(moment(this.end_date))){
       this.filter.nativeElement.value = ''
      if(moment(this.start_date).year() === moment(this.end_date).year()){

        let start_date = moment(this.start_date).format("MMM D")
        let end_date = this.start_date.getMonth() === this.end_date.getMonth()
        ? moment(this.end_date).format("D YYYY")
        : moment(this.end_date).format("MMM D YYYY")
        this.all_dates = `${start_date} - ${end_date}`
        this.selectedDateFilter = `${this.all_dates}`
      }
      
      else{
        let start_date = moment(this.start_date).format("MMM D YYYY")
        let end_date = moment(this.end_date).format("MMM D YYYY")
        this.all_dates = `${start_date} - ${end_date}`
      }
      
      menuTrigger.closeMenu();

      const date_filter = { field: "dob", condition:'contains', value: {start_date: this.start_date, end_date: this.end_date}}
      this.store.dispatch(new FilterDate(date_filter))

      $event.stopPropagation();
    }
  }


  cancelDate($event, menuTrigger){
    this.start_date = undefined;
    this.end_date = undefined;
    this.all_dates = undefined
    menuTrigger.closeMenu();
    this.store.dispatch(new LoadTrucks())
    $event.stopPropagation();
  }


  openCalendar(){
    this.dialog.open(DateDialog);
  }

  ngAfterViewChecked() {

  }

  ngOnInit(): void {

    setTimeout(()=>{
      // this.picker.open();
    }, 100)


    // DATA TABLE
    this.dataSource = new TruckDataSource(this.truck$, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.all_dates = ""
        this.dataSource.filter = this.filter.nativeElement.value;
      });

   var mainProperty = {lat: 41.8781, lng: -92.6298};

    var options = {
      html: true
    }

    $(function () {
      setTimeout(()=>{
        $('[data-toggle="popover"]').popover(options)
      }, 1000)

    })
  }

  rafe() {
    this.trigger.openMenu();
  }
}





/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class TruckDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    _pageChange = new BehaviorSubject({pageIndex: 0, pageSize: 5, length: 100});
    get page(): PageEvent { return this._pageChange.value; }
    set page(page: PageEvent) { this._pageChange.next(page); }
  
    filteredData: Truck[] = [];
    renderedData: Truck[] = [];
    constructor(private driver$: Observable<Truck[]>, private _paginator: MatPaginator) {
      super();
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Truck[]> {
      const displayDataChanges = [
        this.driver$,
        this._filterChange,
        this._paginator.page,
      ];

      let paginator = Observable.of(this._paginator.page)
  
      //return Observable.merge(...displayDataChanges).map(() => {
      return Observable.combineLatest(this.driver$, this._filterChange, this._pageChange,
        (drivers, filter, paginator) => {
        this.filteredData = drivers.filter((item: Truck) => {
          let searchStr = (item.unit_no + item.model + item.make + item.year).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        });
  
  
        // Grab the page's slice of data.
        const startIndex = this.page.pageIndex * this.page.pageSize;
        this.renderedData = this.filteredData.splice(startIndex, this.page.pageSize);
        return this.renderedData;
  
      });
    }
  
    disconnect() {}
  
  }

