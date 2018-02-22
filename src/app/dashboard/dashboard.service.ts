const LAST_NAME_FILTER = "Last Name Filter"
const FIRST_NAME_FILTER = "First Name Filter"
const DATE_FILTER ="Date Filter"

import * as moment from 'moment';

import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatPaginator} from '@angular/material'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';


/** Constants used to fill up our data base. */
const COLORS = ['0754689080', '0734689081', '0454633032', '0773489180', '2754687081', '07737980712', '0754689081',
'0744135088', '0754689111', '07364689777', '0722189654', '0751189532', '0754619244', '0754689080', '0754689080'];
const FIRST_NAME = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
const LAST_NAME = ['Adams', 'Joe', 'Palmer', 'Kirkman', 'Job', 'Lane',
'Gray', 'Henry', 'Mark', 'LaMarr', 'Pittman', 'Kane',
'Jackson', 'Wilshere', 'Ball', 'Arthur', 'Mia', 'Thomas', 'Elizabeth']

const DATES = [
    new Date("October 13, 2014"),
    new Date("November 1, 2016"),
    new Date("December 10, 2016"),
    new Date("January 4, 2017"),
    new Date("October 14, 2017"),
    new Date("January 23, 2017"),
    new Date("February 2, 2017"),
    new Date("February 12, 2017"),
    new Date("March 11, 2017"),
    new Date("June 5, 2017"),

]

export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
    date: Date
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    //nameDataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): UserData[] { return this.dataChange.value; }
    //get name_data(): UserData[] { return this.dataChange.value; }
  
    constructor() {
      // Fill up the database with 100 users.
      for (let i = 0; i < 100; i++) { this.addUser(); }
    }
  
    /** Adds a new user to the database. */
    addUser() {
      const copiedData = this.data.slice();
      copiedData.push(this.createNewUser());
      this.dataChange.next(copiedData);
    }
  
    /** Builds and returns a new User. */
    private createNewUser() {
      const first_name =
        FIRST_NAME[Math.round(Math.random() * (FIRST_NAME.length - 1))] 
  
      const last_name =
        LAST_NAME[Math.round(Math.random() * (LAST_NAME.length - 1))]
  
      return {
        id: (this.data.length + 1).toString(),
        name: first_name,
        progress: last_name,
        color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
        date: DATES[Math.round(Math.random() * (DATES.length - 1))]
      };
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
  
    filteredData: UserData[] = [];
    renderedData: UserData[] = [];
    constructor(private _exampleDatabase: ExampleDatabase, private _paginator: MatPaginator) {
      super();
    }
  
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<UserData[]> {
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._filterChange,
        this._paginator.page,
      ];
  
      return Observable.merge(...displayDataChanges).map(() => {
  
        this.filteredData = this._exampleDatabase.data.slice().filter((item: UserData) => {
          let searchStr = (item.name + item.color + item.progress).toLowerCase();
          let nameStr = (item.name).toLowerCase();
          let colorStr = (item.color).toLowerCase();
          let dateStr = (item.date)
  
          
          // if(this.filter.indexOf('search date') != -1){
          //   let searchArray = this.filter.split(',')
          //   let keyWord = searchArray[1]
          //   let date = searchArray[2];
          //   let dateArray = searchArray.filter(value => value.indexOf(`${DATE_FILTER}`) != -1)
          //   let dateFilter = this.getDateFilter(dateArray, dateStr.toDateString())
          //   console.log('date array', dateFilter)
          //   return (searchStr.indexOf(keyWord.toLowerCase()) == -1 ) && dateFilter
          // }
  
          if(this.filter.indexOf("-") === 0) {
            console.log('does not contain', searchStr.indexOf(this.filter.slice(1).toLowerCase()) == -1)
            return searchStr.indexOf(this.filter.slice(1).toLowerCase()) == -1;
          }
  
          if(this.filter.indexOf(',') != -1){
            //split string into an array
            //for each element check if its type of filter input
            //get the filter from the element
            //search for the filter in the appropraite data column
            let filterArray = this.filter.split(",")
            let nameFilterArray = filterArray.filter(value => value.indexOf(`${LAST_NAME_FILTER}`) != -1)
            let colorFilterArray = filterArray.filter(value => value.indexOf(`${FIRST_NAME_FILTER}`) != -1)
            let dateFilterArray = filterArray.filter(value => value.indexOf(`${DATE_FILTER}`) != -1)
            let filter = filterArray.length === 1
            ? searchStr.indexOf(filterArray[0].toLowerCase()) != -1 
            : this.filterColumns(nameFilterArray, colorFilterArray, dateFilterArray, nameStr, colorStr, dateStr)
            return filter
          }
  
          let fullString = this.filter;
  
          if(fullString.indexOf(LAST_NAME_FILTER) != -1){
  
            if(fullString.lastIndexOf('does not contains') != -1){
              let filter = this.filterDoesNotContainOption(fullString)
              return nameStr.indexOf(filter.toLowerCase()) == -1;
            }
  
            if(fullString.lastIndexOf('contains') != -1){
              let filter = this.filterContainsOption(fullString)
              return nameStr.indexOf(filter.toLowerCase()) != -1;
            }
           
          }
  
          if(fullString.indexOf(FIRST_NAME_FILTER) != -1){
  
            if(fullString.lastIndexOf('does not contains') != -1){
              let filter = this.filterDoesNotContainOption(fullString)
              return colorStr.indexOf(filter.toLowerCase()) == -1;
            }
  
            if(fullString.lastIndexOf('contains') != -1){
              let filter = this.filterContainsOption(fullString)
              return colorStr.indexOf(filter.toLowerCase()) != -1;
            }
            
          }
  
          if(fullString.indexOf(DATE_FILTER) != -1){
  
            let startDateString = fullString.substring(fullString.lastIndexOf('start'), fullString.lastIndexOf('end'))
            let endDateString = fullString.substring(fullString.lastIndexOf('end'));
            let startDate = startDateString.replace('start', '').trim();
            let endDate = endDateString.replace('end', '').trim();
  
            return moment(dateStr).isSameOrAfter(moment(startDate)) && ( moment(dateStr).isSameOrBefore(moment(endDate)))
            //return nameStr.indexOf(filter.toLowerCase()) != -1;
          }
          
  
          return searchStr.indexOf(this.filter.toLowerCase()) != -1;
          
          
        });
  
  
        // Grab the page's slice of data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = this.filteredData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
  
      });
    }
  
    disconnect() {}
  
    filterName() :Observable<UserData[]>{
      const displayDataChanges = [
        this._exampleDatabase.dataChange,
        this._filterChange,
        this._paginator.page,
      ];
  
      return Observable.merge(...displayDataChanges).map(() => {
  
        this.filteredData = this._exampleDatabase.data.slice().filter((item: UserData) => {
          let searchStr = (item.name + item.color).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) != -1;
        });
  
  
        // Grab the page's slice of data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = this.filteredData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
  
      });
    }
  
    filterDoesNotContainOption(fullString){
      let doesNotContainsString = fullString.substring(fullString.lastIndexOf('does not contains'))
      let filter = doesNotContainsString.replace('does not contains', '').trim();
      return filter
    }
  
    filterContainsOption(fullString){
      let containsString = fullString.substring(fullString.lastIndexOf('contains'))
      let filter = containsString.replace('contains', '').trim();
      return filter;
    }
  
    getNameAndColorFilter(nameArray:Array<any>, colorArray:Array<any>, nameStr: string, colorStr: string){
      let nameFilter: boolean
      let colorFilter: boolean
  
      if(nameArray[0].lastIndexOf('contains') != -1){
        let filterString = this.filterContainsOption(nameArray[0])
        nameFilter = nameStr.indexOf(filterString.toLowerCase()) != -1
      }
  
      if(nameArray[0].lastIndexOf('does not contains') != -1){
        let filterString = this.filterDoesNotContainOption(nameArray[0])
        nameFilter = nameStr.indexOf(filterString.toLowerCase()) == -1
      }
  
      if(colorArray[0].lastIndexOf('contains') != -1){
        let filterString = this.filterContainsOption(colorArray[0])
        colorFilter = colorStr.indexOf(filterString.toLowerCase()) != -1
      }
  
      if(colorArray[0].lastIndexOf('does not contains') != -1){
        let filterString = this.filterDoesNotContainOption(colorArray[0])
        colorFilter = colorStr.indexOf(filterString.toLowerCase()) == -1
      }
  
      return {nameFilter, colorFilter}
    }
  
    getNameFilter(nameArray:Array<any>, nameStr: string){
      let nameFilter: boolean
  
      if(nameArray[0].lastIndexOf('contains') != -1){
        let filterString = this.filterContainsOption(nameArray[0])
        nameFilter = nameStr.indexOf(filterString.toLowerCase()) != -1
      }
  
      if(nameArray[0].lastIndexOf('does not contains') != -1){
        let filterString = this.filterDoesNotContainOption(nameArray[0])
        nameFilter = nameStr.indexOf(filterString.toLowerCase()) == -1
      }
  
      return nameFilter
    }
  
    getColorFilter(colorArray: Array<any>, colorStr: string){
      let colorFilter: boolean;
      if(colorArray[0].lastIndexOf('contains') != -1){
        let filterString = this.filterContainsOption(colorArray[0])
        colorFilter = colorStr.indexOf(filterString.toLowerCase()) != -1
      }
  
      if(colorArray[0].lastIndexOf('does not contains') != -1){
        let filterString = this.filterDoesNotContainOption(colorArray[0])
        colorFilter = colorStr.indexOf(filterString.toLowerCase()) == -1
      }
  
      return colorFilter
    }
  
    getDateFilter(dateArray: Array<any>, dateStr: string){
      let dateFilter: boolean;
  
      let startDateString = dateArray[0].substring(dateArray[0].lastIndexOf('start'), dateArray[0].lastIndexOf('end'))
      let endDateString = dateArray[0].substring(dateArray[0].lastIndexOf('end'));
      let startDate = startDateString.replace('start', '').trim();
      let endDate = endDateString.replace('end', '').trim();
  
      dateFilter = moment(dateStr).isSameOrAfter(moment(startDate)) && ( moment(dateStr).isSameOrBefore(moment(endDate)))
      return dateFilter
    }
  
    filterColumns(nameArray:Array<string>, colorArray: Array<string>, dateArray: Array<string>, nameStr, colorStr, dateStr){
  
      let fullString = this.filter;
  
      //all filters selected
      if(nameArray.length > 0 && colorArray.length > 0 && dateArray.length > 0){  
        let {nameFilter, colorFilter} = this.getNameAndColorFilter(nameArray, colorArray, nameStr, colorStr)
        //get Date FIlter
        let dateFilter = this.getDateFilter(dateArray, dateStr)
        //return nameStr.indexOf(filter.toLowerCase()) != -1;
        return nameFilter && colorFilter && dateFilter
      }
  
      // no date filter
      if(dateArray.length == 0){
        let {nameFilter, colorFilter} = this.getNameAndColorFilter(nameArray, colorArray, nameStr, colorStr) 
        return nameFilter &&  colorFilter
      }
  
      //no colour filter
      if(nameArray.length > 0  && dateArray.length > 0){
        let nameFilter = this.getNameFilter(nameArray,nameStr)
        //get Date FIlter
        let dateFilter = this.getDateFilter(dateArray, dateStr)
        //return nameStr.indexOf(filter.toLowerCase()) != -1;
        return nameFilter && dateFilter
      }
  
      //no name filter
      if(colorArray.length > 0 && dateArray.length > 0){
        //get name and color filers
        let colorFilter = this.getColorFilter(colorArray, colorStr)
        //get Date FIlter
        let dateFilter = this.getDateFilter(dateArray, dateStr)
        
        return colorFilter && dateFilter
      }
  
     
      
    }
  
  
  }