import * as moment from 'moment'
import * as fromTrucks from '../actions/truck.action'
import {SelectedOption, Filter} from '../actions/truck.action'
import { Truck } from '../models/truck.model'

export interface TruckState {
    data: Truck[];
    error: string;
    loaded: boolean;
    loading: boolean;
    filterOptions: Array<string>;
    headers: Array<string>;
    filterBar: Array<Filter>;
    selectedOptions: Array<SelectedOption>;
}

export const initialState : TruckState = {
    data: [],
    error: '',
    loaded: false,
    loading: false,
    filterOptions: ["Model","Make", "Year"],
    headers: ["Model","Make", "Year"],
    filterBar: [],
    selectedOptions: [],
}

export function truckReducer(
    state = initialState,
    action: fromTrucks.TruckAction
): TruckState{
    switch(action.type){
        case fromTrucks.LOAD_TRUCKS: {
            return {
                ...state,
                loading: true
            }
        }

        case fromTrucks.LOAD_TRUCKS_SUCCESS: {
            const data = action.payload
            return {
                ...state,
                data: data,
                loading: false,
                loaded: true
            }
        }

        case fromTrucks.LOAD_TRUCKS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromTrucks.CREATE_TRUCK: {
            return {
                ...state,
                loading: true,
            }
        }

        case fromTrucks.CREATE_TRUCK_SUCCESS: {
            const data = action.payload
            const newData = [...state.data, data]
            return {
                ...state,
                data: newData,
                loading: false,
                error: ''
            }
        }

        case fromTrucks.CREATE_TRUCK_FAILURE: {
            console.log('error', action.payload)
            const error = 'There was an error creating driver'
            return {
                ...state,
                loading: false,
                error: error
            }
        }

        case fromTrucks.FILTER_TRUCK_MAKE: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((truck)=> truck.make.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((truck)=> truck.make.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)

            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromTrucks.FILTER_TRUCK_MODEL: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((truck)=> truck.model.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((truck)=> truck.model.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)

            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromTrucks.FILTER_TRUCK_YEAR: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((truck)=> truck.year.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((truck)=> truck.year.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)

            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions
            }
        }

        case fromTrucks.FILTER_DATE: {
            const data = state.data.filter((truck)=> {
                return ( 
                    moment(truck.fed_inspection).isSameOrAfter(moment(action.payload.value.start_date)) 
                    && ( moment(truck.fed_inspection).isSameOrBefore(moment(action.payload.value.end_date)))
                )
            } )
            return {
                ...state,
                data: data
            }
        }


        case fromTrucks.UPDATE_FILTER_BAR: {
            const filterOptions = state.filterOptions.filter((option)=> option != action.payload.type);
            return {
                ...state,
                filterBar: [...state.filterBar, action.payload],
                filterOptions
            }
        }

        case fromTrucks.REMOVE_OPTION_FROM_FILTER_BAR: {
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

        case fromTrucks.ENABLE_ROW: {
            
            return {
                ...state,
                loading: true
            }
        }

        case fromTrucks.ENABLE_ROW_SUCCESS: {
            const data = state.data.map((truck)=> {
                if(truck.id === action.payload.id){
                    return action.payload
                }else{
                    return truck
                }
            })
            
            return {
                ...state,
                data: data,
                loading: false
            }
        }

        case fromTrucks.DISABLE_ROW: {
            const data = state.data.map((trailer)=> {
                if(trailer.id === action.payload.id){
                    return action.payload
                }else{
                    return trailer
                }
            })
            return {
                ...state,
                data: data
            }
        }

        case fromTrucks.SELECT_ALL_CHECKBOXES: {
            const data = state.data.map((truck)=> {
                const newTruck = {...truck, checked: action.payload}
                return newTruck
            })
            return {
                ...state,
                data: data
            }
        }

        case fromTrucks.LOAD_FILTERED_TRUCKS_SUCCESS: {
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
