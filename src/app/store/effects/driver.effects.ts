import { Injectable } from '@angular/core'

import { Effect, Actions} from '@ngrx/effects'
import { switchMap, map, catchError} from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import { 
    LOAD_DRIVERS,
    ENABLE_ROW,
    DISABLE_ROW, 
    LoadDrivers,
    enableRow,
    disableRow,
    enableRowSuccess,
    disableRowSuccess,
    LoadDriversSuccess,
    CREATE_DRIVER,
    createDriver,
    createDriverSuccess,
    createDriverFailure,
    LOAD_FILTERED_DRIVERS, 
    LoadFilteredDrivers,
    LoadFilteredDriversSuccess,
 } from '../actions/drivers.action'
import { DriverService } from '../services/driver.service'
import { LoadDriversFail} from '../actions/index';

@Injectable()
export class DriverEffects {

    constructor(private actions$: Actions, private driverService: DriverService) {
        
    }

    // @Effect()
    // loadDrivers$ = this.actions$.ofType(LOAD_DRIVERS)
    // .pipe(
    //     switchMap(()=> {
    //         return this.driverService.fetchDrivers().pipe(
    //             map(drivers => new LoadDriversSuccess(drivers) ),
    //             catchError(error =>  of(new LoadDriversFail(error)))
    //         )
    //     })
    // )

    @Effect()
    fetchDriver$ = this.actions$
    .ofType(LOAD_DRIVERS)
    .switchMap((action: LoadDrivers) => {

    return this.driverService.fetchDrivers()
        .then((response) => new LoadDriversSuccess(response))
        .catch((error) => new LoadDriversFail(error))
    });

    @Effect()
    fetchFilteredDriver$ = this.actions$
    .ofType(LOAD_FILTERED_DRIVERS)
    .switchMap((action: LoadFilteredDrivers) => {

    return this.driverService.fetchDrivers()
        .then((response) => new LoadFilteredDriversSuccess(response))
        .catch((error) => new LoadDriversFail(error))
    });

    @Effect()
    enableRow$ = this.actions$
    .ofType(ENABLE_ROW)
    .switchMap((action: enableRow) => {
    return this.driverService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadDriversFail(error))
    });

    @Effect()
    disableRow$ = this.actions$
    .ofType(DISABLE_ROW)
    .switchMap((action: disableRow) => {
    return this.driverService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadDriversFail(error))
    });

    @Effect()
    createDriver$ = this.actions$
    .ofType(CREATE_DRIVER)
    .switchMap((action: createDriver) => {

    return this.driverService.createDriver(action.payload)
    .then((response) => {
        let id = response.insertedId.toString()
        const data = {...action.payload, id}
        return {data, _id: response.insertedId }
    })
    .then(({data, _id})=> {
        return this.driverService.updateDriverId(_id, data)
    })
    .then((id)=> {
        console.log('id', id)
        return new createDriverSuccess({...action.payload, id})
    })
    .catch((error) => new createDriverFailure(error))
    });

}