import * as moment from 'moment'
import * as fromClients from '../actions/client.action'
import {SelectedOption, Filter} from '../actions/client.action'
import { Client } from '../models/client.model'

export interface ClientState {
    data: Client[];
    error: string;
    loaded: boolean;
    loading: boolean;
    filterOptions: Array<string>;
    headers: Array<string>;
    filterBar: Array<Filter>;
    selectedOptions: Array<SelectedOption>;
}

export const initialState : ClientState = {
    data: [],
    error: '',
    loaded: false,
    loading: false,
    filterOptions: ["Customer Name","Email", "Phone"],
    headers: ["Customer Name","Email", "Phone"],
    filterBar: [],
    selectedOptions: [],
}

export function clientReducer(
    state = initialState,
    action: fromClients.ClientAction
): ClientState{
    switch(action.type){
        case fromClients.LOAD_CLIENTS: {
            return {
                ...state,
                loading: true
            }
        }

        case fromClients.LOAD_CLIENTS_SUCCESS: {
            const data = action.payload
            console.log('load clients success', data)
            return {
                ...state,
                data: data,
                loading: false,
                loaded: true
            }
        }

        case fromClients.LOAD_CLIENTS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }

        case fromClients.CREATE_CLIENT: {
            return {
                ...state,
                loading: true,
            }
        }

        case fromClients.CREATE_CLIENT_SUCCESS: {
            const data = action.payload
            const newData = [...state.data, data]
            return {
                ...state,
                data: newData,
                loading: false,
                error: ''
            }
        }

        case fromClients.CREATE_CLIENT_FAILURE: {
            console.log('error', action.payload)
            const error = 'There was an error creating driver'
            return {
                ...state,
                loading: false,
                error: error
            }
        }

        case fromClients.FILTER_CLIENT_CUSTOMER_NAME: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((client)=> client.customer_name.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((client)=> client.customer_name.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)
            
            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromClients.FILTER_CLIENT_EMAIL: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((client)=> client.email.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((client)=> client.email.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)

            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions,
            }
        }

        case fromClients.FILTER_CLIENT_PHONE: {
            const condition = action.payload.condition
            const data = condition === 'contains'
                ? state.data.filter((client)=> client.phone.toLowerCase().indexOf(action.payload.value.toLowerCase()) != -1)
                : state.data.filter((client)=> client.phone.toLowerCase().indexOf(action.payload.value.toLowerCase()) == -1)

            const selectedOptions = [...state.selectedOptions, action.payload]
            return {
                ...state,
                data: data,
                selectedOptions: selectedOptions
            }
        }

        // case fromClients.FILTER_DATE: {
        //     const data = state.data.filter((client)=> {
        //         return ( 
        //             moment(client.dob).isSameOrAfter(moment(action.payload.value.start_date)) 
        //             && ( moment(client.dob).isSameOrBefore(moment(action.payload.value.end_date)))
        //         )
        //     } )
        //     return {
        //         ...state,
        //         data: data
        //     }
        // }


        case fromClients.UPDATE_FILTER_BAR: {
            const filterOptions = state.filterOptions.filter((option)=> option != action.payload.type);
            return {
                ...state,
                filterBar: [...state.filterBar, action.payload],
                filterOptions
            }
        }

        case fromClients.REMOVE_OPTION_FROM_FILTER_BAR: {
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

        case fromClients.ENABLE_ROW: {
            
            return {
                ...state,
                loading: true
            }
        }

        case fromClients.ENABLE_ROW_SUCCESS: {
            const data = state.data.map((client)=> {
                if(client.id === action.payload.id){
                    return action.payload
                }else{
                    return client
                }
            })
            
            return {
                ...state,
                data: data,
                loading: false
            }
        }

        case fromClients.DISABLE_ROW: {
            return {
                ...state,
                loading: true
            }
        }

        case fromClients.DISABLE_ROW_SUCCESS: {
            const data = state.data.map((client)=> {
                if(client.id === action.payload.id){
                    return action.payload
                }else{
                    return client
                }
            })
            return {
                ...state,
                data: data,
                loading: false
            }
        }

        case fromClients.SELECT_ALL_CHECKBOXES: {
            const data = state.data.map((client)=> {
                const newClient = {...client, checked: action.payload}
                return newClient
            })
            return {
                ...state,
                data: data
            }
        }

        case fromClients.LOAD_FILTERED_CLIENTS_SUCCESS: {
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
