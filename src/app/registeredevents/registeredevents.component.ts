import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeredevents',
  templateUrl: './registeredevents.component.html',
  styleUrls: ['./registeredevents.component.scss']
})
export class RegisteredeventsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  
  dataSource: any;
  displayedColumns: string[] = ['Eventname', 'Address','Distance', 'Opening time', 'Closing time','Action'];
  eventList: Events[];


  constructor(private route:Router,private mydata:DataService,private firestore:AngularFirestore)  { 
    this.rtnEvents();
  }


  eventSource: any;
  eventColumns: string[] = ['Eventname', 'Address','Distance', 'Opening time', 'Closing time','Action'];
  

  eventFilter(filterValue: string) {
    this.eventSource.filter = filterValue.trim().toLowerCase();
  }

   rtnEvents(){
     this.mydata.getEventsChanges().subscribe(event=>{
       this.eventList=event.map(e=>{
         return{
          key:e.payload.doc.id,
          club:e.payload.doc.data()['clubID'],
          name: e.payload.doc.data()['name'],
          km: e.payload.doc.data()['distance'],
          add: e.payload.doc.data()['address'],
          open: e.payload.doc.data()['openingHours'],
          close: e.payload.doc.data()['closingHours'],
          photo: e.payload.doc.data()['photoURL'],
         }as Events
       });
       console.log(this.eventList)
       this.dataSource = new MatTableDataSource(this.eventList)
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;
     });
   
   }

   applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  add(club){
    this.route.navigate(['/updateEvent'],{queryParams:{key:club.key,name:club.name,add:club.add,close:club.close,open:club.open}})
  }
  eventDelete(key) {
    this.mydata.eventDelete(key);
    alert("You chose to delete the club");
  }
  addEv(){
    this.route.navigateByUrl('/menu/previousEvents')
  }
  ngOnInit() {
  }

}
