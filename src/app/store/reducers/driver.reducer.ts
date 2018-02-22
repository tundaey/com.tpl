import * as moment from 'moment'
import * as fromDrivers from '../actions/drivers.action'
import {SelectedOption, Filter} from '../actions/drivers.action'
import { Driver } from '../models/driver.model'
export interface DriverState {
    data: Driver[];
    error: string;
    loaded: boolean;
    loading: boolean;
    filterOptions: Array<string>;
    headers: Array<string>;
    filterBar: Array<Filter>;
    selectedOptions: Array<SelectedOption>;
}

export const initialState : DriverState = {
    data: [],
    error: '',
    loaded: false,
    loading: false,
    filterOptions: ["First Name","Last Name", "Mobile Phone"],
    headers: ["First Name","Last Name", "Mobile Phone"],
    filterBar: [],
    selectedOptions: [],
}

export function driverReducer(
    state = initialState,
    action: fromDrivers.DriversAction
): DriverState{
    switch(action.type){
        case fromDrivers.LOAD_DRIVERS: {
            return {
                ...state,
                loading: true
            }
        }

        case fromDrivers.LOAD_DRIVERS_SUCCESS: {
            const data = action.payload
            return {
                ...state,
                data: data,
                loading: false,
                loaded: true
            }
        }

        case fromDrivers.CREATE_DRIVER: {
            return {
                ...state,
                loading: true,
            }
        }

        case fromDrivers.CREATE_DRIVERS_SUCCESS: {
            const data = action.payload
            const newData = [...state.data, data]
            return {
                ...state,
                data: newData,
                loading: false,
                error: ''
            }
        }

        case fromDrivers.CREATE_DRIVERS_FAILURE: {
            console.log('error', action.payload)
            const error = 'There was an error creating driver'
            return {
                ...state,
                loading: false,
                error: error
            }
        }

        case fromDrivers.LOAD_DRIVERS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromDrivers.FILTER_DRIVER_FIRST_NAME: {
            const condition = action.payload.condition
            console.log('filter condition', condition)
            const data = condition === 'contains'
                ? state.data.filter((driver)=> driver.first_name.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((driver)=> driver.first_name.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)
            
            //const data = state.data.filter((driver)=> driver.first_name.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromDrivers.FILTER_DRIVER_LAST_NAME: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((driver)=> driver.last_name.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((driver)=> driver.last_name.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)
            
            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromDrivers.FILTER_DRIVER_MOBILE_PHONE: {
            const condition = action.payload.condition
            console.log('filter condition', condition)
            const data = condition === 'contains'
                ? state.data.filter((driver)=> driver.mobile.indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((driver)=> driver.mobile.indexOf(action.payload.value.toLowerCase()) == -1)
            
            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions
            }
        }

        case fromDrivers.FILTER_DATE: {
            const data = state.data.filter((driver)=> {
                return ( 
                    moment(driver.dob).isSameOrAfter(moment(action.payload.value.start_date)) 
                    && ( moment(driver.dob).isSameOrBefore(moment(action.payload.value.end_date)))
                )
            } )
            return {
                ...state,
                data: data
            }
        }


        case fromDrivers.UPDATE_FILTER_BAR: {
            const filterOptions = state.filterOptions.filter((option)=> option != action.payload.type);
            return {
                ...state,
                filterBar: [...state.filterBar, action.payload],
                filterOptions
            }
        }

        case fromDrivers.ENABLE_ROW: {
            return {
                ...state,
                loading: true
            }
        }

        case fromDrivers.ENABLE_ROW_SUCCESS: {
            const data = state.data.map((driver)=> {
                if(driver.id === action.payload.id){
                    return action.payload
                }else{
                    return driver
                }
            })
            
            return {
                ...state,
                data: data,
                loading: false
            }
        }

        case fromDrivers.DISABLE_ROW: {
            return {
                ...state,
                loading: true
            }
        }

        case fromDrivers.DISABLE_ROW_SUCCESS: {
            const data = state.data.map((driver)=> {
                if(driver.id === action.payload.id){
                    return action.payload
                }else{
                    return driver
                }
            })
            return {
                ...state,
                data: data,
                loading: false
            }
        }

        case fromDrivers.SELECT_ALL_CHECKBOXES: {
            const data = state.data.map((driver)=> {
                const newDriver = {...driver, checked: action.payload}
                return newDriver
            })
            return {
                ...state,
                data: data
            }
        }

        case fromDrivers.REMOVE_OPTION_FROM_FILTER_BAR: {
            console.log('remove filter bar', action.payload)
            const filterOptions = [...state.filterOptions, action.payload.type]
            const filterBar = state.filterBar.filter((filter)=> filter.value != action.payload.value)
            const selectedOptions = state.selectedOptions.filter((filter)=> ( 
                filter.field != action.payload.field)
            )
            console.log('selected options', selectedOptions)
            return {
                ...state,
                filterBar: filterBar,
                filterOptions,
                selectedOptions
            }
        }

        case fromDrivers.LOAD_FILTERED_DRIVERS_SUCCESS: {
            console.log('filtered success')
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
            console.log('filtered success', data)
            return {
                ...state,
                data: data
            }
        }
    }
    return state
}

export const getDriversLoading = (state: DriverState) => state.loading
export const getDriversLoaded = (state: DriverState) => state.loaded
export const getDrivers = (state: DriverState) => state.data