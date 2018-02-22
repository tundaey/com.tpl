import {Driver} from '../models/driver.model'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as stitch from 'mongodb-stitch'


/** An example database that the data source uses to retrieve data for the table. */
export class DriverService {
  public client: any
  public db: any
  public drivers: any
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Driver[]> = new BehaviorSubject<Driver[]>([]);
    get data(): Driver[] { return this.dataChange.value; }

  
    constructor() {
      this.client = new stitch.StitchClient('tms-yybbm');
      this.db = this.client.service('mongodb', 'mongodb-atlas').db('tms');
      this.drivers = this.db.collection('drivers');
      //this.deleteDBFields()
    }

    createDriver(driver: Driver){
      return this.drivers.insertOne(driver)
    }

    updateDriverId(_id, data){
      return this.db.collection('drivers').updateOne({_id: _id}, data)
      .then(()=> {
        return Promise.resolve(data.id)
      })
    }

    deleteDBFields(){
      this.db.collection('drivers').deleteMany({})
      .then((data)=> console.log('del', data))
    }

    fetchDrivers(): Promise<Driver[]>{
      return this.client.login().then(() => (
        this.db.collection('drivers').find({}).limit(100).execute()
      )).then((data)=> {
        const drivers = data.map((driver)=> {
          //driver['checked']= false;
          delete driver['_id']
          return driver
        })
        return drivers
      })
    }

    updateRow(driver){
      return this.db.collection('drivers').updateOne({id: driver.id}, driver)
    }

  }