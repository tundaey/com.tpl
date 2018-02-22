import {Client} from '../models/client.model'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as stitch from 'mongodb-stitch'



/** An example database that the data source uses to retrieve data for the table. */
export class ClientService {
  public client: any
  public db: any
  public clients: any
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  //nameDataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);
  get data(): Client[] { return this.dataChange.value; }
  //get name_data(): UserData[] { return this.dataChange.value; }
  
    
  constructor() {
    this.client = new stitch.StitchClient('tms-yybbm');
    this.db = this.client.service('mongodb', 'mongodb-atlas').db('tms');
    this.clients = this.db.collection('clients');
  }
  
  createClient(client: Client){
    return this.clients.insertOne(client)
  }

  fetchClients(): Promise<Client[]>{
    return this.client.login().then(() => (
      this.db.collection('clients').find({}).limit(100).execute()
    )).then((data)=> {
      const clients = data.map((client)=> {
        delete client['_id']
        return client
      })
      return clients
    })
  }


  updateClientId(_id, data){
    return this.db.collection('clients').updateOne({_id: _id}, data)
    .then(()=> {
      return Promise.resolve(data.id)
    })
  }



  updateRow(client){
    return this.db.collection('clients').updateOne({id: client.id}, client)
  }
    
  
}