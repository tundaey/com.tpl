import { Action } from '@ngrx/store'
import { Trailer } from '../models/trailer.model'

//load drivers
export const LOAD_TRAILERS = '[Trailers] Load Trailers'
export const LOAD_TRAILERS_FAIL = '[Trailers] Load Trailers Fail'
export const LOAD_TRAILERS_SUCCESS = '[Trailers] Load Trailers Success'
export const CREATE_TRAILER = '[Trailers] Create Trailer'
export const CREATE_TRAILER_SUCCESS = '[Trailers] Create Trailer Success'
export const CREATE_TRAILER_FAILURE = '[Trailers] Create Trailer Failure'
export const FILTER_TRAILER_YEAR = '[Trailers] Filter Trailers Year'
export const FILTER_TRAILER_MAKE = '[Trailers] Filter Trailers Make'
export const FILTER_TRAILER_MODEL = '[Trailers] Filter Trailers Model'
export const FILTER_DATE = '[Trailers] Filter Trailers Date'
export const UPDATE_FILTER_BAR = '[Trailers] Update Filter Bar'
export const REMOVE_OPTION_FROM_FILTER_BAR = '[Trailers] Remove Option from Filter Bar'
export const LOAD_FILTERED_TRAILERS = '[Trailers] Load Filtered Trailers'
export const LOAD_FILTERED_TRAILERS_SUCCESS = '[Trailers] Load Filtered Trailers Success'
export const ENABLE_ROW = '[Trailers] Enable Row'
export const ENABLE_ROW_SUCCESS = '[Trailers] Enable Row Success'
export const ENABLE_ROW_FAILURE = '[Trailers] Enable Row Success'
export const DISABLE_ROW = '[Trailers] Disable Row'
export const DISABLE_ROW_SUCCESS = '[Trailers] Disable Row Success'
export const DISABLE_ROW_FAILURE = '[Trailers] Disable Row Failure'
export const SELECT_ALL_CHECKBOXES = '[Trailers] Select all check boxes'

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

export class LoadTrailers implements Action {
    readonly type = LOAD_TRAILERS;
}

export class LoadTrailersFail implements Action {
    readonly type = LOAD_TRAILERS_FAIL;
    constructor(public payload: any){}
}

export class LoadTrailersSuccess implements Action {
    readonly type = LOAD_TRAILERS_SUCCESS;
    constructor(public payload: Trailer[]){}
}

export class createTrailer implements Action {
    readonly type = CREATE_TRAILER
    constructor(public payload: Trailer){}
}

export class createTrailerSuccess implements Action {
    readonly type = CREATE_TRAILER_SUCCESS
    constructor(public payload: Trailer){}
}

export class createTrailerFailure implements Action {
    readonly type = CREATE_TRAILER_FAILURE
    constructor(public payload: string){}
}

export class FilterTrailersMake implements Action {
    readonly type = FILTER_TRAILER_MAKE;
    constructor(public payload: SelectedOption){}
}

export class FilterTrailersModel implements Action {
    readonly type = FILTER_TRAILER_MODEL;
    constructor(public payload: SelectedOption){}
}

export class FilterTrailerYear implements Action {
    readonly type = FILTER_TRAILER_YEAR;
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

export class LoadFilteredTrailers implements Action {
    readonly type = LOAD_FILTERED_TRAILERS;
}

export class LoadFilteredTrailersSuccess implements Action {
    readonly type = LOAD_FILTERED_TRAILERS_SUCCESS;
    constructor(public payload: Trailer[]){}
}

export class enableRow implements Action {
    readonly type = ENABLE_ROW;
    constructor(public payload: Trailer){}
}

export class enableRowSuccess implements Action {
    readonly type = ENABLE_ROW_SUCCESS;
    constructor(public payload: Trailer){}
}

export class enableRowFailure implements Action {
    readonly type = ENABLE_ROW_FAILURE;
    constructor(public payload: Trailer){}
}

export class disableRow implements Action {
    readonly type = DISABLE_ROW;
    constructor(public payload: Trailer){}
}

export class disableRowSuccess implements Action {
    readonly type = DISABLE_ROW_SUCCESS;
    constructor(public payload: Trailer){}
}

export class disableRowFailure implements Action {
    readonly type = DISABLE_ROW_FAILURE;
    constructor(public payload: Trailer){}
}

export class selectAllCheckBoxes implements Action {
    readonly type = SELECT_ALL_CHECKBOXES;
    constructor(public payload: boolean){}
}

//action types
export type TrailerAction = LoadTrailers
| LoadTrailersFail 
| LoadTrailersSuccess
| createTrailer
| createTrailerSuccess
| createTrailerFailure
| FilterTrailersMake
| FilterTrailersModel
| FilterTrailerYear
| FilterDate
| UpdateFilterBar
| RemoveOptionFromFilterBar
| LoadFilteredTrailers
| LoadFilteredTrailersSuccess
| enableRow
| enableRowSuccess
| enableRowFailure
| disableRow
| disableRowSuccess
| disableRowFailure
| selectAllCheckBoxes