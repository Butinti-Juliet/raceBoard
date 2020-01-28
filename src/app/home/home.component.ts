import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import * as Chart from 'chart.js';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  displayedColumns: string[] = ['Clubname', 'Address', 'Opening time', 'Closing time','Action'];
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  myChart:any = [];
  clubList: any;
  array

  eventList:any[];
  bookedList:any[];
  constructor(private mydata:DataService) { 
    this.rtnEvents();
   
    this.rtnBooked();
   

  }
  rtnClub(){
    this.mydata.getClubChanges().subscribe(data=>{
      this.clubList=data.map(e=>{
        return{
          key:e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          add: e.payload.doc.data()['address'],
          open: e.payload.doc.data()['openingHours'],
          close: e.payload.doc.data()['closingHours'],
          photo: e.payload.doc.data()['photoURL'],
        }as Club;
      });
      console.log(this.clubList)
      this.dataSource = new MatTableDataSource(this.clubList)
    });

   }
   rtnEvents(){
     this.mydata.getEventsChanges().subscribe(event=>{
       this.eventList=event.map(e=>{
         return{
          key:e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          add: e.payload.doc.data()['address'],
          open: e.payload.doc.data()['openingHours'],
          close: e.payload.doc.data()['closingHours'],
          photo: e.payload.doc.data()['photoURL'],
         }as Events
       });
       console.log(this.eventList)
     });
   
   }
   rtnBooked(){
    this.mydata.getBokedChanges().subscribe(event=>{
      this.bookedList=event.map(e=>{
        return{
         key:e.payload.doc.id,
         name: e.payload.doc.data()['name'],
         add: e.payload.doc.data()['address'],
         open: e.payload.doc.data()['openingHours'],
         close: e.payload.doc.data()['closingHours'],
         photo: e.payload.doc.data()['photoURL'],
         approved: e.payload.doc.data()['approved'],
         price: e.payload.doc.data()['price'],
         tickets: e.payload.doc.data()['tickets'],
         total: e.payload.doc.data()['total'],
        
        }as Events
      });
      console.log(this.bookedList)
    });
   }

   onDelete(key) {
    this.mydata.delete(key);
    alert("You chose to delete the club");
  }
  
  update(){
    this.mydata.update(this.clubList,this.clubList[0].key);
    console.log("updated")
    
   }
  //  onUpdate(item) {
  //   this.router.navigate(['/update'], { queryParams: { key: item.key, name: item.name, address: item.address, open: item.open, close: item.close } })
  // }
  ngOnInit() {

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['run club', 'jays club', 'race club', 'first club', 'jjj club', 'kay club'],
          datasets: [{
              label: '# of Clubs',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
  // this.getAllusers()
  this.rtnClub();
  }


}
