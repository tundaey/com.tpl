import { Action } from '@ngrx/store'
import { Client } from '../models/client.model'

//load drivers
export const LOAD_CLIENTS = '[Clients] Load Clients'
export const LOAD_CLIENTS_FAIL = '[Clients] Load Clients Fail'
export const LOAD_CLIENTS_SUCCESS = '[Clients] Load Clients Success'
export const CREATE_CLIENT = '[Clients] Create Client'
export const CREATE_CLIENT_SUCCESS = '[Clients] Create Client Success'
export const CREATE_CLIENT_FAILURE = '[Clients] Create Client Failure'
export const FILTER_CLIENT_CUSTOMER_NAME = '[Clients] Filter Clients Customer Name'
export const FILTER_CLIENT_EMAIL = '[Clients] Filter Clients Email'
export const FILTER_CLIENT_PHONE = '[Clients] FilterClients Phone'
export const FILTER_DATE = '[Clients] Filter Clients Date'
export const UPDATE_FILTER_BAR = '[Clients] Update Filter Bar'
export const REMOVE_OPTION_FROM_FILTER_BAR = '[Clients] Remove Option from Filter Bar'
export const LOAD_FILTERED_CLIENTS = '[Clients] Load Filtered Clients'
export const LOAD_FILTERED_CLIENTS_SUCCESS = '[Clients] Load Filtered Clients Success'
export const ENABLE_ROW = '[Clients] Enable Row'
export const ENABLE_ROW_SUCCESS = '[Clients] Enable Row Success'
export const ENABLE_ROW_FAILURE = '[Clients] Enable Row Failure'
export const DISABLE_ROW = '[Clients] Disable Row'
export const DISABLE_ROW_SUCCESS = '[Clients] Disable Row'
export const DISABLE_ROW_FAILURE = '[Clients] Disable Row'
export const SELECT_ALL_CHECKBOXES = '[Clients] Select all check boxes'

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

export class LoadClients implements Action {
    readonly type = LOAD_CLIENTS;
}

export class LoadClientsFail implements Action {
    readonly type = LOAD_CLIENTS_FAIL;
    constructor(public payload: any){}
}

export class LoadClientsSuccess implements Action {
    readonly type = LOAD_CLIENTS_SUCCESS;
    constructor(public payload: Client[]){}
}

export class createClient implements Action {
    readonly type = CREATE_CLIENT
    constructor(public payload: Client){}
}

export class createClientSuccess implements Action {
    readonly type = CREATE_CLIENT_SUCCESS
    constructor(public payload: Client){}
}

export class createClientFailure implements Action {
    readonly type = CREATE_CLIENT_FAILURE
    constructor(public payload: string){}
}

export class FilterClientsCustomerName implements Action {
    readonly type = FILTER_CLIENT_CUSTOMER_NAME;
    constructor(public payload: SelectedOption){}
}

export class FilterClientsEmail implements Action {
    readonly type = FILTER_CLIENT_EMAIL;
    constructor(public payload: SelectedOption){}
}

export class FilterClientsPhone implements Action {
    readonly type = FILTER_CLIENT_PHONE;
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

export class LoadFilteredClients implements Action {
    readonly type = LOAD_FILTERED_CLIENTS;
}

export class LoadFilteredClientsSuccess implements Action {
    readonly type = LOAD_FILTERED_CLIENTS_SUCCESS;
    constructor(public payload: Client[]){}
}

export class enableRow implements Action {
    readonly type = ENABLE_ROW;
    constructor(public payload: Client){}
}

export class enableRowSuccess implements Action {
    readonly type = ENABLE_ROW_SUCCESS;
    constructor(public payload: Client){}
}

export class enableRowFailure implements Action {
    readonly type = ENABLE_ROW_FAILURE;
    constructor(public payload: Client){}
}

export class disableRow implements Action {
    readonly type = DISABLE_ROW;
    constructor(public payload: Client){}
}

export class disableRowSuccess implements Action {
    readonly type = DISABLE_ROW_SUCCESS;
    constructor(public payload: Client){}
}

export class disableRowFailure implements Action {
    readonly type = DISABLE_ROW_FAILURE;
    constructor(public payload: Client){}
}

export class selectAllCheckBoxes implements Action {
    readonly type = SELECT_ALL_CHECKBOXES;
    constructor(public payload: boolean){}
}


//action types
export type ClientAction = LoadClients
| LoadClientsFail 
| LoadClientsSuccess
| createClient
| createClientSuccess
| createClientFailure
| FilterClientsCustomerName
| FilterClientsEmail
| FilterClientsPhone
| FilterDate
| UpdateFilterBar
| RemoveOptionFromFilterBar
| LoadFilteredClients
| LoadFilteredClientsSuccess
| enableRow
| enableRowSuccess
| enableRowFailure
| disableRow
| disableRowSuccess
| disableRowFailure
| selectAllCheckBoxes