import { Action } from '@ngrx/store'
import { Truck } from '../models/truck.model'

//load drivers
export const LOAD_TRUCKS = '[Trucks] Load Trucks'
export const LOAD_TRUCKS_FAIL = '[Trucks] Load Trucks Fail'
export const LOAD_TRUCKS_SUCCESS = '[Trucks] Load Trucks Success'
export const CREATE_TRUCK = '[Trucks] Create Truck'
export const CREATE_TRUCK_SUCCESS = '[Trucks] Create Truck Success'
export const CREATE_TRUCK_FAILURE = '[Trucks] Create Truck Failure'
export const FILTER_TRUCK_YEAR = '[Trucks] Filter Trucks Year'
export const FILTER_TRUCK_MAKE = '[Trucks] Filter Trucks Make'
export const FILTER_TRUCK_MODEL = '[Trucks] Filter Trucks Model'
export const FILTER_DATE = '[Trucks] Filter Trucks Date'
export const UPDATE_FILTER_BAR = '[Trucks] Update Filter Bar'
export const REMOVE_OPTION_FROM_FILTER_BAR = '[Trucks] Remove Option from Filter Bar'
export const LOAD_FILTERED_TRUCKS = '[Trucks] Load Filtered Trucks'
export const LOAD_FILTERED_TRUCKS_SUCCESS = '[Trucks] Load Filtered Trucks Success'
export const ENABLE_ROW = '[Trucks] Enable Row'
export const ENABLE_ROW_SUCCESS = '[Trucks] Enable Row Success'
export const ENABLE_ROW_FAILURE = '[Trucks] Enable Row Failure'
export const DISABLE_ROW = '[Trucks] Disable Row'
export const DISABLE_ROW_SUCCESS = '[Trucks] Disable Row Success'
export const DISABLE_ROW_FAILURE = '[Trucks] Disable Row Failure'
export const SELECT_ALL_CHECKBOXES = '[Trucks] Select all check boxes'

export interface SelectedOption {
    field: string;
    value: any;
    condition: any;
}

export interface Filter {
    type: string;
    value: string;
    field: string;
}

export class LoadTrucks implements Action {
    readonly type = LOAD_TRUCKS;
}

export class LoadTrucksFail implements Action {
    readonly type = LOAD_TRUCKS_FAIL;
    constructor(public payload: any){}
}

export class LoadTrucksSuccess implements Action {
    readonly type = LOAD_TRUCKS_SUCCESS;
    constructor(public payload: Truck[]){}
}

export class createTruck implements Action {
    readonly type = CREATE_TRUCK
    constructor(public payload: Truck){}
}

export class createTruckSuccess implements Action {
    readonly type = CREATE_TRUCK_SUCCESS
    constructor(public payload: Truck){}
}

export class createTruckFailure implements Action {
    readonly type = CREATE_TRUCK_FAILURE
    constructor(public payload: string){}
}

export class FilterTrucksMake implements Action {
    readonly type = FILTER_TRUCK_MAKE;
    constructor(public payload: SelectedOption){}
}

export class FilterTrucksModel implements Action {
    readonly type = FILTER_TRUCK_MODEL;
    constructor(public payload: SelectedOption){}
}

export class FilterTruckYear implements Action {
    readonly type = FILTER_TRUCK_YEAR;
    constructor(public payload: SelectedOption){}
}

export class FilterDate implements Action {
    readonly type = FILTER_DATE;
    constructor(public payload: SelectedOption){}
}

export class UpdateFilterBar implements Action {
    readonly type = UPDATE_FILTER_BAR;
    constructor(public payload: Filter){}
}

export class RemoveOptionFromFilterBar implements Action {
    readonly type = REMOVE_OPTION_FROM_FILTER_BAR;
    constructor(public payload: Filter){}
}

export class LoadFilteredTrucks implements Action {
    readonly type = LOAD_FILTERED_TRUCKS;
}

export class LoadFilteredTrucksSuccess implements Action {
    readonly type = LOAD_FILTERED_TRUCKS_SUCCESS;
    constructor(public payload: Truck[]){}
}

export class enableRow implements Action {
    readonly type = ENABLE_ROW;
    constructor(public payload: Truck){}
}

export class enableRowSuccess implements Action {
    readonly type = ENABLE_ROW_SUCCESS;
    constructor(public payload: Truck){}
}

export class enableRowFailure implements Action {
    readonly type = ENABLE_ROW_FAILURE;
    constructor(public payload: Truck){}
}

export class disableRow implements Action {
    readonly type = DISABLE_ROW;
    constructor(public payload: Truck){}
}

export class disableRowSuccess implements Action {
    readonly type = DISABLE_ROW_SUCCESS;
    constructor(public payload: Truck){}
}

export class disableRowFailure implements Action {
    readonly type = DISABLE_ROW_FAILURE;
    constructor(public payload: Truck){}
}

export class selectAllCheckBoxes implements Action {
    readonly type = SELECT_ALL_CHECKBOXES;
    constructor(public payload: boolean){}
}

//action types
export type TruckAction = LoadTrucks
| LoadTrucksFail 
| LoadTrucksSuccess
| createTruck
| createTruckSuccess
| createTruckFailure
| FilterTrucksMake
| FilterTrucksModel
| FilterTruckYear
| FilterDate
| UpdateFilterBar
| RemoveOptionFromFilterBar
| LoadFilteredTrucks
| LoadFilteredTrucksSuccess
| enableRow
| enableRowSuccess
| enableRowFailure
| disableRow
| disableRowSuccess
| disableRowFailure
| selectAllCheckBoxes