declare var google: any;

export class GoogleChartsBaseService {
  constructor() { 
    google.charts.load('current', {'packages':['corechart']});
  }

  protected buildChart(data: any[], chartFunc: any, options: any) : void {
    var func = (chartFunc, options) => {
      var datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, options);
    };   
    var callback = () => func(chartFunc, options);
    // setTimeout(()=>{
    //     google.charts.setOnLoadCallback(callback)
    //  }, 1000)
    //google.charts.setOnLoadCallback(callback);
    google.charts.setOnLoadCallback(()=> {
        return func(chartFunc, options)
    })
  }
  
}