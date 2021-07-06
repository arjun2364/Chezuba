import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { AppService } from './app.service';
import { apiValue } from './models/apiValue.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  apiValues!: apiValue[];
  searchText: any;
  loader = true;
  category: string = 'thirds';
  filteredApiValues!: apiValue[];
  categories = ['thirds', 'fifths', 'magic'];
  title = 'Chezuba';
  constructor(private readonly appService: AppService) {
  }
  buttonClicked(category: string) {
    this.category = category;
    this.filteredApiValues = this.apiValues.filter(x => x.category == this.category);
  }

  /**Delete object with provide id */
  delete(id: number) {
    this.filteredApiValues = this.filteredApiValues.filter(x => x.id !== id);
  }
  /**Reset the list */
  reset() {
    this.getValues();
  }

  ngOnInit() {
    this.getValues();
  }

  /**Get values from the API */
  getValues(){

    //Set loader true
    this.loader = true;

    //Get values from API
    this.appService.getApiValues().subscribe(
      (data: apiValue[]) => {
        //Loop over each element and add category based on there id.
        for (const item of data) {
          if (item.id % 3 == 0 && item.id % 5 == 0) {
            item.category = "magic";
          } else if (item.id % 5 == 0) {
            item.category = "fifths";
          } else if (item.id % 3 == 0) {
            item.category = "thirds";
          }
        }
        this.apiValues = data;
        //filer list based on the first category selected 'thirds'
        this.filteredApiValues = this.apiValues.filter(x => x.category == this.category);
        //Set loader false
        this.loader = false;
      },
      () => {
        //Set loader false
        this.loader = false;
      }
    );
  }
}
