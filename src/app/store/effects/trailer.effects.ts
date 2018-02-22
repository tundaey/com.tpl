import { Injectable } from '@angular/core'

import { Effect, Actions} from '@ngrx/effects'
import { switchMap, map, catchError} from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import { 
    LOAD_TRAILERS,
    LoadTrailers,
    LoadTrailersSuccess,
    LoadFilteredTrailersSuccess,
    LoadTrailersFail,
    createTrailer,
    createTrailerFailure,
    createTrailerSuccess,
    CREATE_TRAILER,
    CREATE_TRAILER_FAILURE,
    CREATE_TRAILER_SUCCESS,
    LOAD_FILTERED_TRAILERS,
    ENABLE_ROW,
    ENABLE_ROW_FAILURE,
    ENABLE_ROW_SUCCESS,
    DISABLE_ROW,
    DISABLE_ROW_FAILURE,
    DISABLE_ROW_SUCCESS,
    enableRow,
    enableRowSuccess,
    enableRowFailure,
    disableRow,
    disableRowFailure,
    disableRowSuccess,
    LoadFilteredTrailers
 } from '../actions/trailer.action'
import { TrailerService } from '../services/trailer.service'


@Injectable()
export class TrailerEffects {

    constructor(private actions$: Actions, private trailerService: TrailerService) {
        
    }

    @Effect()
    fetchTrailer$ = this.actions$
    .ofType(LOAD_TRAILERS)
    .switchMap((action: LoadTrailers) => {

    return this.trailerService.fetchTrailers()
        .then((response) => new LoadTrailersSuccess(response))
        .catch((error) => new LoadTrailersFail(error))
    });

    @Effect()
    createTruck$ = this.actions$
    .ofType(CREATE_TRAILER)
    .switchMap((action: createTrailer) => {

    return this.trailerService.createTrailer(action.payload)
    .then((response) => {
        let id = response.insertedId.toString()
        const data = {...action.payload, id}
        return {data, _id: response.insertedId }
    })
    .then(({data, _id})=> {
        return this.trailerService.updateTrailerId(_id, data)
    })
    .then((id)=> {
        console.log('id', id)
        return new createTrailerSuccess({...action.payload, id})
    })
    .catch((error) => new createTrailerFailure(error))
    });

    @Effect()
    fetchFilteredTrailer$ = this.actions$
    .ofType(LOAD_FILTERED_TRAILERS)
    .switchMap((action: LoadFilteredTrailers) => {

    return this.trailerService.fetchTrailers()
        .then((response) => new LoadFilteredTrailersSuccess(response))
        .catch((error) => new LoadTrailersFail(error))
    });

    @Effect()
    enableRow$ = this.actions$
    .ofType(ENABLE_ROW)
    .switchMap((action: enableRow) => {
    return this.trailerService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadTrailersFail(error))
    });

    @Effect()
    disableRow$ = this.actions$
    .ofType(DISABLE_ROW)
    .switchMap((action: disableRow) => {
    return this.trailerService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadTrailersFail(error))
    });

}