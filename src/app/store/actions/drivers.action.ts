import { Action } from '@ngrx/store'
import { Driver } from '../models/driver.model'

//load drivers
export const LOAD_DRIVERS = '[Drivers] Load Drivers'
export const CREATE_DRIVER = '[Drivers] Create Driver'
export const CREATE_DRIVERS_SUCCESS = '[Drivers] Create Driver Success'
export const CREATE_DRIVERS_FAILURE = '[Drivers] Create Driver Failure'
export const LOAD_DRIVERS_FAIL = '[Drivers] Load Drivers Fail'
export const LOAD_DRIVERS_SUCCESS = '[Drivers] Load Drivers Success'
export const FILTER_DRIVER_FIRST_NAME = '[Drivers] Filter Driver First Name'
export const FILTER_DRIVER_LAST_NAME = '[Drivers] Filter Driver Last Name'
export const FILTER_DRIVER_MOBILE_PHONE = '[Drivers] Filter Driver Mobile Phone'
export const FILTER_DATE = '[Drivers] Filter Driver Date'
export const UPDATE_FILTER_BAR = '[Drivers] Update Filter Bar'
export const REMOVE_OPTION_FROM_FILTER_BAR = '[Drivers] Remove Option from Filter Bar'
export const LOAD_FILTERED_DRIVERS = '[Drivers] Load Filtered Drivers'
export const LOAD_FILTERED_DRIVERS_SUCCESS = '[Drivers] Load Filtered Drivers Success'
export const ENABLE_ROW = '[Drivers] Enable Row'
export const ENABLE_ROW_SUCCESS = '[Drivers] Enable Row Success'
export const ENABLE_ROW_FAILURE = '[Drivers] Enable Row Failure'
export const DISABLE_ROW = '[Drivers] Disable Row'
export const DISABLE_ROW_SUCCESS = '[Drivers] Disable Row Success'
export const DISABLE_ROW_FAILURE = '[Drivers] Disable Row Failure'
export const SELECT_ALL_CHECKBOXES = '[Drivers] Select all check boxes'
export const SELECT_ALL_CHECKBOXES_SUCCESS = '[Drivers] Select all check boxes Success'

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

export class createDriver implements Action {
    readonly type = CREATE_DRIVER
    constructor(public payload: Driver){}
}

export class createDriverSuccess implements Action {
    readonly type = CREATE_DRIVERS_SUCCESS
    constructor(public payload: Driver){}
}

export class createDriverFailure implements Action {
    readonly type = CREATE_DRIVERS_FAILURE
    constructor(public payload: string){}
}

export class LoadDrivers implements Action {
    readonly type = LOAD_DRIVERS;
}

export class LoadDriversFail implements Action {
    readonly type = LOAD_DRIVERS_FAIL;
    constructor(public payload: any){}
}

export class LoadDriversSuccess implements Action {
    readonly type = LOAD_DRIVERS_SUCCESS;
    constructor(public payload: Driver[]){}
}

export class FilterDriverFirstName implements Action {
    readonly type = FILTER_DRIVER_FIRST_NAME;
    constructor(public payload: SelectedOption){}
}

export class FilterDriverLastName implements Action {
    readonly type = FILTER_DRIVER_LAST_NAME;
    constructor(public payload: SelectedOption){}
}

export class FilterDriverMobilePhone implements Action {
    readonly type = FILTER_DRIVER_MOBILE_PHONE;
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

export class LoadFilteredDrivers implements Action {
    readonly type = LOAD_FILTERED_DRIVERS;
}

export class LoadFilteredDriversSuccess implements Action {
    readonly type = LOAD_FILTERED_DRIVERS_SUCCESS;
    constructor(public payload: Driver[]){}
}

export class enableRow implements Action {
    readonly type = ENABLE_ROW;
    constructor(public payload: Driver){}
}

export class enableRowSuccess implements Action {
    readonly type = ENABLE_ROW_SUCCESS;
    constructor(public payload: Driver){}
}

export class enableRowFailure implements Action {
    readonly type = ENABLE_ROW_FAILURE;
    constructor(public payload: Driver){}
}

export class disableRow implements Action {
    readonly type = DISABLE_ROW;
    constructor(public payload: Driver){}
}

export class disableRowSuccess implements Action {
    readonly type = DISABLE_ROW_SUCCESS;
    constructor(public payload: Driver){}
}

export class disableRowFailure implements Action {
    readonly type = DISABLE_ROW_FAILURE;
    constructor(public payload: Driver){}
}

export class selectAllCheckBoxes implements Action {
    readonly type = SELECT_ALL_CHECKBOXES;
    constructor(public payload: boolean){}
}



//action types
export type DriversAction = LoadDrivers 
| LoadDriversFail 
| LoadDriversSuccess
| FilterDriverFirstName
| FilterDriverLastName
| FilterDriverMobilePhone
| FilterDate
| UpdateFilterBar
| RemoveOptionFromFilterBar
| LoadFilteredDrivers
| LoadFilteredDriversSuccess
| enableRow
| enableRowSuccess
| enableRowFailure
| disableRow
| disableRowSuccess
| disableRowFailure
| selectAllCheckBoxes
| createDriver
| createDriverSuccess
| createDriverFailure