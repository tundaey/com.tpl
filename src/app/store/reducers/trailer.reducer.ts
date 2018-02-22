import * as moment from 'moment'
import * as fromTrailers from '../actions/trailer.action'
import {SelectedOption, Filter} from '../actions/trailer.action'
import { Trailer } from '../models/trailer.model'

export interface TrailerState {
    data: Trailer[];
    error: string;
    loaded: boolean;
    loading: boolean;
    filterOptions: Array<string>;
    headers: Array<string>;
    filterBar: Array<Filter>;
    selectedOptions: Array<SelectedOption>;
}

export const initialState : TrailerState = {
    data: [],
    error: '',
    loaded: false,
    loading: false,
    filterOptions: ["Model","Make", "Year"],
    headers: ["Model","Make", "Year"],
    filterBar: [],
    selectedOptions: [],
}

export function trailerReducer(
    state = initialState,
    action: fromTrailers.TrailerAction
): TrailerState{
    switch(action.type){
        case fromTrailers.LOAD_TRAILERS: {
            return {
                ...state,
                loading: true
            }
        }

        case fromTrailers.LOAD_TRAILERS_SUCCESS: {
            const data = action.payload
            return {
                ...state,
                data: data,
                loading: false,
                loaded: true
            }
        }

        case fromTrailers.LOAD_TRAILERS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromTrailers.CREATE_TRAILER: {
            return {
                ...state,
                loading: true,
            }
        }

        case fromTrailers.CREATE_TRAILER_SUCCESS: {
            const data = action.payload
            const newData = [...state.data, data]
            return {
                ...state,
                data: newData,
                loading: false,
                error: ''
            }
        }

        case fromTrailers.CREATE_TRAILER_FAILURE: {
            console.log('error', action.payload)
            const error = 'There was an error creating driver'
            return {
                ...state,
                loading: false,
                error: error
            }
        }

        case fromTrailers.FILTER_TRAILER_MAKE: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((trailer)=> trailer.make.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((trailer)=> trailer.make.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)

            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromTrailers.FILTER_TRAILER_MODEL: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((trailer)=> trailer.model.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((trailer)=> trailer.model.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)

            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromTrailers.FILTER_TRAILER_YEAR: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((trailer)=> trailer.year.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((trailer)=> trailer.year.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)
            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions
            }
        }


        case fromTrailers.UPDATE_FILTER_BAR: {
            const filterOptions = state.filterOptions.filter((option)=> option != action.payload.type);
            return {
                ...state,
                filterBar: [...state.filterBar, action.payload],
                filterOptions
            }
        }

        case fromTrailers.REMOVE_OPTION_FROM_FILTER_BAR: {
            const filterOptions = [...state.filterOptions, action.payload.type]
            const filterBar = state.filterBar.filter((filter)=> filter.value != action.payload.value)
            const selectedOptions = state.selectedOptions.filter((filter)=> ( 
                filter.field != action.payload.field)
            )
            return {
                ...state,
                filterBar: filterBar,
                filterOptions,
                selectedOptions
            }
        }

        case fromTrailers.ENABLE_ROW: {
            
            return {
                ...state,
                loading: true
            }
        }

        case fromTrailers.ENABLE_ROW_SUCCESS: {
            const data = state.data.map((trailer)=> {
                if(trailer.id === action.payload.id){
                    return action.payload
                }else{
                    return trailer
                }
            })
            
            return {
                ...state,
                data: data,
                loading: false
            }
        }

        case fromTrailers.DISABLE_ROW: {
        
            return {
                ...state,
                loading: true
            }
        }

        case fromTrailers.DISABLE_ROW_SUCCESS: {
            const data = state.data.map((trailer)=> {
                if(trailer.id === action.payload.id){
                    return action.payload
                }else{
                    return trailer
                }
            })
            return {
                ...state,
                data: data,
                loading: false
            }
        }
        
        case fromTrailers.SELECT_ALL_CHECKBOXES: {
            const data = state.data.map((trailer)=> {
                const newTrailer = {...trailer, checked: action.payload}
                return newTrailer
            })
            return {
                ...state,
                data: data
            }
        }

        case fromTrailers.LOAD_FILTERED_TRAILERS_SUCCESS: {
            const selectedOptions = state.selectedOptions;
            let drivers:any = []
            
            let data = action.payload.map((driver)=> {
                const length = selectedOptions.length
                //selectedOptions[length].field
                if(selectedOptions.length > 1){
                    const firstCondition = selectedOptions[0].condition
                    const secondCondition = selectedOptions[1].condition
                    const firstFilter = firstCondition === 'contains' 
                    ? driver[selectedOptions[0].field].toLowerCase() == selectedOptions[0].value
                    : driver[selectedOptions[0].field].toLowerCase() != selectedOptions[0].value

                    const secondFilter = secondCondition === 'contains' 
                    ? driver[selectedOptions[1].field].toLowerCase() == selectedOptions[1].value
                    : driver[selectedOptions[1].field].toLowerCase() != selectedOptions[1].value

                    let selected = (
                        firstFilter  &&
                        secondFilter
                    ) 
                    if(selected){
                        drivers.push(driver)
                    }   
                }
                else{
                    selectedOptions.forEach((option)=> {
                        const condition = option.condition
                        condition === 'contains' 
                        ?(
                            (driver[option.field].toLowerCase() == option.value) ? drivers.push(driver) :null
                        )
                        :(
                            (driver[option.field].toLowerCase() != option.value) ? drivers.push(driver) :null
                        )
                        
                    })
                }

                return driver;
            })
            data = drivers.length === 0 ? action.payload : drivers;
            return {
                ...state,
                data: data
            }
        }
    }
    return state
}
