import {
  Component, ViewChild, ElementRef, Renderer2, OnInit, 
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
import { DateDialog } from '../shared/dialog/date';
import * as moment from 'moment';
import {MatChipInputEvent} from '@angular/material';
import {DataService} from './data.service';

import { Driver } from '../store/models/driver.model'
import { Store } from '@ngrx/store'
import {IAppState} from '../store'
import { 
  LoadDrivers, 
  FilterDriverFirstName, 
  FilterDriverLastName,
  FilterDriverMobilePhone,
  FilterDate,
  UpdateFilterBar, 
  RemoveOptionFromFilterBar,
  LoadFilteredDrivers,
  enableRow,
  disableRow,
  selectAllCheckBoxes } from '../store/actions'

import {ChangeTab} from '../store/actions/tab.action'
import {HideMarker} from '../store/actions/map.action'

const COMMA = 188;
const FIRST_NAME_FILTER ="First Name Filter"
const LAST_NAME_FILTER ="Last Name Filter"
const PHONE_FILTER ="Mobile Phone Filter"
const DATE_FILTER ="Date Filter"
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit  {

  @ViewChild('sidenav') sidenav: MatSidenav;
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
 
  
  driver$: Observable<Driver[]>
  drivers: Array<Driver> = []
  pageLength: number
  loading: boolean
  selectedIndex: number


  constructor(public dialog: MatDialog, private store: Store<IAppState>) {
    this.all_dates = "";
    this.isFilterOpen = false;
    this.driver$ = this.store.select('drivers').map((data) => data.data )

    this.store.select('drivers')
    .subscribe((data)=> {
      this.filterOptions = data.filterOptions
      this.headers = data.headers
      this.selectedOptions = data.filterBar
      this.pageLength = data.data.length
      this.loading = data.loading
      //this.loading = true
      
    })
    this.store.dispatch(new LoadDrivers())

    this.store.select('tab').subscribe((data)=> this.selectedIndex = data.selectedIndex)
    

    
  }
  
  
  pageChanged(pageEvent: PageEvent){
    console.log('page change', pageEvent)
    this.dataSource.page = pageEvent
  }


  filterFirstName(value, condition){
    const first_name_filter = { field: "first_name", value: value, condition}
    this.store.dispatch(new FilterDriverFirstName(first_name_filter))
  }

  filterLastName(value, condition){
    console.log('condition', condition)
    const first_name_filter = { field: "last_name", value: value, condition}
    this.store.dispatch(new FilterDriverLastName(first_name_filter))
  }

  filterMobile(value, condition){
    const mobile_filter = { field: "mobile", value: value, condition}
    this.store.dispatch(new FilterDriverMobilePhone(mobile_filter))
  }

  addToFilterBar(value): void {
    const selectedOption =  {type: "First Name", field: "first_name", value: value}
    this.store.dispatch(new UpdateFilterBar(selectedOption))
  }

  addLastNameToFilterBar(value): void {
    const selectedOption =  {type: "Last Name", field: "last_name", value: value}
    this.store.dispatch(new UpdateFilterBar(selectedOption))
  }

  addMobileToFilterBar(value): void {
    const selectedOption = {type: "Mobile Phone", field: "mobile", value: value}
    this.store.dispatch(new UpdateFilterBar(selectedOption))
  }

  removeFromFilterBar(value: any): void {
    const selectedOption =  {type: value.type, field: value.field, value: value.value}
    this.store.dispatch(new RemoveOptionFromFilterBar(selectedOption));
    this.store.dispatch(new LoadFilteredDrivers())
    if(this.selectedOptions.length === 0) this.showFilter = false

  }

  // data table
  displayedColumns = ['checkbox', 'enable','userId', 'userName', 'progress', 'color', 'date'];
  
  dataSource: ExampleDataSource | null;

  map: any;
  markers: any;
  myLatLng: any;

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
  panel_title = "Driver Information"
  reason = '';
  
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

 

 drawClientsChart(elementId, title){
  let data = new google.visualization.DataTable();
  data.addColumn('string', 'Month');
  data.addColumn('number', 'Number');
  data.addRows([
    ['January', 200],
    ['February', 250],
    ['March', 100],
    ['April', 800],
    ['May', 120],
    ['June', 500],
    ['July', 80],
    ['August', 700],
    ['September', 350],
    ['October', 220],
    ['November', 100],
    ['December', 267],
  ]);

 let options = {
   title: title,
   width: 1300,
   height: 400,
   legend: 'none',
   bar: {groupWidth: '70%'},
   vAxis: { gridlines: { count: 4 } }
 };

  let chart = new google.visualization.ColumnChart(
    document.getElementById(elementId));

  chart.draw(data, options);
 }

 // close detail view when tab is changed
 
 onChangeTab(event){
   if(event.index === 1){
     this.store.dispatch(new ChangeTab(1))
     this.drawClientsChart('chart', 'Monthly Acquired Clients, 2017')
   }

   if(event.index === 2){
    this.store.dispatch(new ChangeTab(2))
    this.drawClientsChart('truckChart', 'Monthly On Road Trucks, 2017')
  }

   if(event.index === 3){
    this.store.dispatch(new ChangeTab(3))
    this.drawClientsChart('trailerChart', 'Monthly On Road Trailers, 2017')
  }

   this.selectedItem = false;
   this.sidenav.close()
 }

  
  close(reason: string) {
    this.reason = reason;
    //this.sidenav.close();
  }

  doNothing(){ 
  }

  displayDriver(){
    if(this.panel_title === 'Driver Information' && this.selectedItem === true) return true
    else return false;
  }

  displayClient(){
    if(this.panel_title === 'Client Information' && this.selectedItem === true) return true
    else return false;
  }

  displayTruck(){
    if(this.panel_title === 'Truck Information' && this.selectedItem === true) return true
    else return false;
  }

  displayTrailer(){
    if(this.panel_title === 'Trailer Information' && this.selectedItem === true) return true
    else return false;
  }

  closeSideMenu(){
    this.sidenav.close()
    this.store.dispatch(new HideMarker())
  }

  viewData(data){
    //this.menuState = this.menuState === 'out' ? 'in' : 'out';
    //this.panel_title = "Driver Information"
    if(this.selectedItem){
      this.selectedId === data.id 
      ? (
        this.selectedItem = false,
        this.sidenav.close(),
        this.selectedId = '' 
      )
      : this.detailData = data, this.selectedId = data.id
    }else{
      this.selectedItem = true
      this.sidenav.open()
      this.detailData = data
      this.selectedId = data.id
    } 
  }


  selectedRecord(event){
    this.selectedItem = event;
    if(this.selectedItem === true){
      this.sidenav.open()
    }else{
      this.sidenav.close()
    }
  }

  changeSelectedData(event){
    this.detailData = event
    console.log('change data', this.detailData)
  }

  changePanelTitle($event){
    this.panel_title = $event
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

      const date_filter = { field: "dob", condition: 'contains', value: {start_date: this.start_date, end_date: this.end_date}}
      this.store.dispatch(new FilterDate(date_filter))

      $event.stopPropagation();
    }
  }


  cancelDate($event, menuTrigger){
    this.start_date = undefined;
    this.end_date = undefined;
    this.all_dates = undefined
    menuTrigger.closeMenu();
    this.store.dispatch(new LoadDrivers())
    $event.stopPropagation();
  }


  openCalendar(){
    this.dialog.open(DateDialog);
  }

  ngAfterViewInit() {
    //this.initializePieChart()
  }

  ngOnInit(): void {
    google.charts.load("current", {packages:["corechart","bar"]});

    // DATA TABLE
    this.dataSource = new ExampleDataSource(this.driver$, this.paginator);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.all_dates = ""
        this.dataSource.filter = this.filter.nativeElement.value;
      });

    // MAP
    var styledMapType = new google.maps.StyledMapType(
      [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "stylers": [
            {
              "color": "#346afa"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a0c7ff"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ],
      {name: 'Styled Map'});

    var mainProperty = {lat: 41.8781, lng: -92.6298};
    this.map = new google.maps.Map(this._el.nativeElement, {
      zoom: 4,
      center: mainProperty
    });

    this.map.mapTypes.set('styled_map', styledMapType);
    this.map.setMapTypeId('styled_map');

    this.myLatLng = {lat: -25.363, lng: 131.044};


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
export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    _pageChange = new BehaviorSubject({pageIndex: 0, pageSize: 5, length: 100});
    get page(): PageEvent { return this._pageChange.value; }
    set page(page: PageEvent) { this._pageChange.next(page); }
  
    filteredData: Driver[] = [];
    renderedData: Driver[] = [];
    constructor(private driver$: Observable<Driver[]>, private _paginator: MatPaginator) {
      super();
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Driver[]> {
      const displayDataChanges = [
        this.driver$,
        this._filterChange,
        this._paginator.page,
      ];

      let paginator = Observable.of(this._paginator.page)
  
      //return Observable.merge(...displayDataChanges).map(() => {
      return Observable.combineLatest(this.driver$, this._filterChange, this._pageChange,
        (drivers, filter, paginator) => {
          console.log('paginator', this._paginator)
        this.filteredData = drivers.filter((item: Driver) => {
          let searchStr = (item.first_name + item.last_name + item.mobile).toLowerCase();
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

