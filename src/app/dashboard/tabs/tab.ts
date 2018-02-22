export class Tab {
    /**
     *
     */
    headers: Array<string>;
    filterOptions: Array<string>;
    dataSource: any
    selectedOptions = [];
    showFilter: boolean = false;
    filterOptionToRemove: number;

    constructor(filterOptions, headers, dataSource) {
        this.headers = headers;
        this.filterOptions = filterOptions;
        this.dataSource = dataSource
    }

    addToFilterBar(value): void {
        if ((value || '').trim()) {
           let index = this.selectedOptions.indexOf(value);
           if(index < 0) this.selectedOptions.push(value);
         }
    }

    removeFromFilterBar(value: any): void {
        let index = this.selectedOptions.indexOf(value);
    
        if (index >= 0) {
          this.selectedOptions.splice(index, 1);
          this.restoreFilterOption(value)
          let stringToBeFiltered = ''
          stringToBeFiltered = this.selectedOptions.toString()
          this.dataSource.filter = stringToBeFiltered;
          if(this.selectedOptions.length <= 0) this.showFilter = false
          //this.triggerDateFilter()
        }
    }

    restoreFilterOption(value){
        this.headers.forEach((option)=> {
            let index = value.indexOf(option)
            if(index != -1) this.filterOptions.splice(index, 0, option)
        })
    }

    removeFilterOption(){
        if(this.filterOptionToRemove !== undefined) {
          this.filterOptions.splice(this.filterOptionToRemove, 1)
          this.filterOptionToRemove = undefined
        }
    }

    closeFilterBar(){
        this.showFilter = false;
        this.selectedOptions = [];
        this.filterOptions = this.headers
        this.dataSource.filter = ''
    }
}