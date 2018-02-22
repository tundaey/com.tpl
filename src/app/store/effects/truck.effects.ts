import { Injectable } from '@angular/core'

import { Effect, Actions} from '@ngrx/effects'
import { switchMap, map, catchError} from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import { 
    LOAD_TRUCKS,
    LoadTrucks,
    LoadTrucksSuccess,
    LoadFilteredTrucks,
    LoadFilteredTrucksSuccess,
    LoadTrucksFail,
    CREATE_TRUCK,
    createTruck,
    createTruckFailure,
    createTruckSuccess,
    ENABLE_ROW,
    ENABLE_ROW_FAILURE,
    ENABLE_ROW_SUCCESS,
    DISABLE_ROW,
    DISABLE_ROW_SUCCESS,
    DISABLE_ROW_FAILURE,
    enableRowSuccess,
    enableRow,
    enableRowFailure,
    disableRow,
    disableRowFailure,
    disableRowSuccess,
    LOAD_FILTERED_TRUCKS
 } from '../actions/truck.action'
import { TruckService } from '../services/truck.service'


@Injectable()
export class TruckEffects {

    constructor(private actions$: Actions, private truckService: TruckService) {
        
    }

    @Effect()
    fetchTruck$ = this.actions$
    .ofType(LOAD_TRUCKS)
    .switchMap((action: LoadTrucks) => {

    return this.truckService.fetchTrucks()
        .then((response) => new LoadTrucksSuccess(response))
        .catch((error) => new LoadTrucksFail(error))
    });

    @Effect()
    createTruck$ = this.actions$
    .ofType(CREATE_TRUCK)
    .switchMap((action: createTruck) => {

    return this.truckService.createTruck(action.payload)
    .then((response) => {
        let id = response.insertedId.toString()
        const data = {...action.payload, id}
        return {data, _id: response.insertedId }
    })
    .then(({data, _id})=> {
        return this.truckService.updateTruckId(_id, data)
    })
    .then((id)=> {
        console.log('id', id)
        return new createTruckSuccess({...action.payload, id})
    })
    .catch((error) => new createTruckFailure(error))
    });

    @Effect()
    fetchFilteredTruck$ = this.actions$
    .ofType(LOAD_FILTERED_TRUCKS)
    .switchMap((action: LoadFilteredTrucks) => {

    return this.truckService.fetchTrucks()
        .then((response) => new LoadFilteredTrucksSuccess(response))
        .catch((error) => new LoadTrucksFail(error))
    });

    @Effect()
    enableRow$ = this.actions$
    .ofType(ENABLE_ROW)
    .switchMap((action: enableRow) => {
    return this.truckService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadTrucksFail(error))
    });

    @Effect()
    disableRow$ = this.actions$
    .ofType(DISABLE_ROW)
    .switchMap((action: disableRow) => {
    return this.truckService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadTrucksFail(error))
    });

  

}