import * as fromTab from '../actions/tab.action'

export interface TabState {
    selectedIndex:number
}

export const initialState: TabState  = { 
    selectedIndex: 0
}

export function tabReducer(
    state = initialState,
    action: fromTab.TabAction
){
    switch(action.type){
        case fromTab.CHANGE_TAB: {
            return {
                ...state,
                selectedIndex: action.payload
            }
        }

        default:
            return state
    }

    
}