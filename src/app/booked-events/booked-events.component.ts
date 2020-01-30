import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataService } from '../services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-booked-events',
  templateUrl: './booked-events.component.html',
  styleUrls: ['./booked-events.component.scss']
})
export class BookedEventsComponent implements OnInit {

    
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  dataSource: any;
  displayedColumns: string[] = ['Name', 'Address', 'Price', 'Tickets','Total','Payed'];

  bookedList:any[];

  constructor(private mydata:DataService,private firestore:AngularFirestore) { 
    this. rtnBooked();
  }

  //  booked events
  bookedSource: any;
  bookedColumns: string[] = ['Name', 'Address', 'Price', 'Tickets','Total','Payed'];
  

  bookedFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      this.dataSource = new MatTableDataSource(this.bookedList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   }
   updateDoc() {
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
      this.firestore.doc(`bookedEvents/${this.bookedList[0].key}`).update({approved: true});
      console.log(this.bookedList)
      this.dataSource = new MatTableDataSource(this.bookedList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });
  }
   clubDelete(key) {
    this.mydata.clubDelete(key);
    alert("You chose to delete the club");
  }
  bookedDelete(key) {
    this.mydata.bookedDelete(key);
    alert("You chose to delete the club");
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
  }
 

 

}
