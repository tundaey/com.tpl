import { Injectable } from '@angular/core'

import { Effect, Actions} from '@ngrx/effects'
import { switchMap, map, catchError} from 'rxjs/operators'
import { of } from 'rxjs/observable/of'

import { 
    LOAD_CLIENTS,
    LoadClientsSuccess,
    LoadFilteredClientsSuccess,
    LoadClientsFail,
    LOAD_FILTERED_CLIENTS,
    LoadClients,
    createClient,
    createClientSuccess,
    createClientFailure,
    CREATE_CLIENT,
    ENABLE_ROW,
    enableRow,
    enableRowSuccess,
    enableRowFailure,
    DISABLE_ROW,
    DISABLE_ROW_FAILURE,
    DISABLE_ROW_SUCCESS,
    disableRow,
    disableRowFailure,
    disableRowSuccess,
    LoadFilteredClients
 } from '../actions/client.action'
import { ClientService } from '../services/client.service'


@Injectable()
export class ClientEffects {

    constructor(private actions$: Actions, private clientService: ClientService) {
        
    }

    @Effect()
    fetchClient$ = this.actions$
    .ofType(LOAD_CLIENTS)
    .switchMap((action: LoadClients) => {

    return this.clientService.fetchClients()
        .then((response) => new LoadClientsSuccess(response))
        .catch((error) => new LoadClientsFail(error))
    });

    @Effect()
    createClient$ = this.actions$
    .ofType(CREATE_CLIENT)
    .switchMap((action: createClient) => {

    return this.clientService.createClient(action.payload)
        .then((response) => {
            let id = response.insertedId.toString()
            const data = {...action.payload, id}
            return {data, _id: response.insertedId }
        })
        .then(({data, _id})=> {
            return this.clientService.updateClientId(_id, data)
        })
        .then((id)=> {
            console.log('id', id)
            return new createClientSuccess({...action.payload, id})
        })
        .catch((error) => new createClientFailure(error))
    
    });

    @Effect()
    fetchFilteredClient$ = this.actions$
    .ofType(LOAD_FILTERED_CLIENTS)
    .switchMap((action: LoadFilteredClients) => {

    return this.clientService.fetchClients()
        .then((response) => new LoadFilteredClientsSuccess(response))
        .catch((error) => new LoadClientsFail(error))
    });

    @Effect()
    enableRow$ = this.actions$
    .ofType(ENABLE_ROW)
    .switchMap((action: enableRow) => {
    return this.clientService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadClientsFail(error))
    });

    @Effect()
    disableRow$ = this.actions$
    .ofType(DISABLE_ROW)
    .switchMap((action: disableRow) => {
    return this.clientService.updateRow(action.payload)
        .then((response) => {
            return new enableRowSuccess(action.payload)
        })
        .catch((error) => new LoadClientsFail(error))
    });


}