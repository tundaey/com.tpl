import {Truck} from '../models/truck.model'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import * as stitch from 'mongodb-stitch'


/** An example database that the data source uses to retrieve data for the table. */
export class TruckService {
  public client: any
  public db: any
  public trucks: any
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Truck[]> = new BehaviorSubject<Truck[]>([]);
    //nameDataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): Truck[] { return this.dataChange.value; }
    //get name_data(): UserData[] { return this.dataChange.value; }
  
    constructor() {
      this.client = new stitch.StitchClient('tms-yybbm');
      this.db = this.client.service('mongodb', 'mongodb-atlas').db('tms');
      this.trucks = this.db.collection('trucks');
      
    }
  
    createTruck(truck: Truck){
      return this.trucks.insertOne(truck)
    }

    fetchTrucks(): Promise<Truck[]>{
      return this.client.login().then(() => (
        this.db.collection('trucks').find({}).limit(100).execute()
      )).then((data)=> {
        const trucks = data.map((truck)=> {
          delete truck._id;
          return truck
        })
        return trucks
      })
    }

    updateTruckId(_id, data){
      return this.db.collection('trucks').updateOne({_id: _id}, data)
      .then(()=> {
        return Promise.resolve(data.id)
      })
    }

    deleteDBFields(){
      this.db.collection('trucks').deleteMany({})
      .then((data)=> console.log('del', data))
    }


    updateRow(driver){
      return this.db.collection('trucks').updateOne({id: driver.id}, driver)
    }

  }