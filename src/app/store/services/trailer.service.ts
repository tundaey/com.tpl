import {Trailer} from '../models/trailer.model'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as stitch from 'mongodb-stitch'


/** An example database that the data source uses to retrieve data for the table. */
export class TrailerService {
  public client: any
  public db: any
  public trailers: any
    /** Stream that emits whenever the data has been modified. */
    dataChange: BehaviorSubject<Trailer[]> = new BehaviorSubject<Trailer[]>([]);
    //nameDataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
    get data(): Trailer[] { return this.dataChange.value; }
    //get name_data(): UserData[] { return this.dataChange.value; }
  
    constructor() {
      this.client = new stitch.StitchClient('tms-yybbm');
      this.db = this.client.service('mongodb', 'mongodb-atlas').db('tms');
      this.trailers = this.db.collection('trailers');
    }
  
    createTrailer(trailer: Trailer){
      return this.trailers.insertOne(trailer)
    }

    locations = [
      {lat: 41.8781, lng: -92.6298},
      {lat: 44.068203, lng: -114.742043},
      {lat: 41.8781, lng: -92.6298},
      {lat: 39.113014, lng: -105.358887},
      {lat: 40.730610, lng: -73.935242},
    ]

    fetchTrailers(): Promise<Trailer[]>{
      return this.client.login().then(() => (
        this.db.collection('trailers').find({}).limit(100).execute()
      )).then((data)=> {
        var i = 0
        const trailers = data.map((trailer)=> {
          trailer['location'] = this.locations[i];
          delete trailer._id;
          i++;
          return trailer
        })
        return trailers
      })
    }

    
  updateTrailerId(_id, data){
    return this.db.collection('trailers').updateOne({_id: _id}, data)
    .then(()=> {
      return Promise.resolve(data.id)
    })
  }


  updateRow(driver){
    return this.db.collection('trailers').updateOne({id: driver.id}, driver)
  }

}
