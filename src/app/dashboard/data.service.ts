import {Injectable} from '@angular/core'
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx'

@Injectable()
export class DataService {
    private data: object;
    private dataSource: Subject<any> = new Subject<any>();
    d = this.dataSource.asObservable();
    constructor(){
        this.data = {}
    }

    public setData(val: object): void{
        //this.data = val;
        this.dataSource.next(val);
    }

    public getData(): Observable<any>{
        //return this.data
        return this.dataSource.asObservable()
    }

}