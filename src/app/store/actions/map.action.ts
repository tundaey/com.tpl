import { Action } from '@ngrx/store'

export const ADD_MARKER = '[Map] Add Marker'
export const HIDE_MARKER = '[Map] Hide Marker'
export const SHOW_MARKER = '[Map] Show Marker'

export class AddMarker implements Action {
    readonly type = ADD_MARKER
    constructor(public payload: any){}
}

export class HideMarker implements Action {
    readonly type = HIDE_MARKER
}

export class ShowMarker implements Action {
    readonly type = SHOW_MARKER
}



export type MapAction = AddMarker | HideMarker | ShowMarker