import * as fromMap from '../actions/map.action'

export interface MapState {
    markers:Array<any>;
    zoom: number;
    showMarker: boolean;
}

export const initialState: MapState  = { 
    markers: [
        {lat: 41.8781, lng: -92.6298},
        {lat: 44.068203, lng: -114.742043},
        {lat: 41.8781, lng: -92.6298},
        {lat: 39.113014, lng: -105.358887},
        {lat: 40.730610, lng: -73.935242},
    ],
    //markers: [],
    zoom: 3,
    showMarker: false
}

export function mapReducer(
    state = initialState,
    action: fromMap.MapAction
){
    switch(action.type){
        case fromMap.ADD_MARKER: {
            return {
                ...state,
                markers: [...state.markers, action.payload],
                showMarker: true
            }
        }

        case fromMap.HIDE_MARKER: {
            return {
                ...state,
                showMarker: false
            }
        }

        case fromMap.SHOW_MARKER: {
            return {
                ...state,
                showMarker: true
            }
        }

        default:
            return state
    }

    
}