import { Action } from '@ngrx/store'

export const CHANGE_TAB = '[Tabs] Change Tab'

export class ChangeTab implements Action {
    readonly type = CHANGE_TAB
    constructor(public payload: number){}
}

export type TabAction = ChangeTab 