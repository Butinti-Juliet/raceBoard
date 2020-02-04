import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import * as Chart from 'chart.js';
import { MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  
  dataSource: any;
  displayedColumns: string[] = ['Name', 'Address', 'Email', 'Age','Gender'];

 
  MatTableEventSource: any
  myChart:any = [];
  chart:any = [];
  clubList: any;
  array: any
  boy: number=0;
  girl: number=0;
  other: number=0;
  a: number=0;
  b: number=0;
  c: number=0;
  d: number=0;
  e: number=0;
  f: number=0;
  g: number=0;
  h: number=0;
  i: number=0;
  j: number=0;
  k: number=0;

  userList:any[];
  eventList:any[];
  bookedList:any[];
  constructor(private mydata:DataService,private firestore:AngularFirestore,private router: Router) { 
    // this.rtnEvents();
   
    this.rtnBooked();
   

  }
  
  //  booked events
  bookedSource: any;
  bookedColumns: string[] = ['Name', 'Address', 'Price', 'Tickets','Total','Payed'];
  

  bookedFilter(filterValue: string) {
    this.bookedSource.filter = filterValue.trim().toLowerCase();
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
      this.bookedSource = new MatTableDataSource(this.bookedList)
    });
   }
   approve(myevents) {
this.mydata.booking(myevents);
// console.log(this.mydata.booking(myevents))
  }

   clubDelete(key) {
    this.mydata.clubDelete(key);
    alert("You chose to delete the club");
  }
  bookedDelete(key) {
    this.mydata.bookedDelete(key);
    alert("You chose to delete the club");
  }
  eventDelete(key) {
    this.mydata.eventDelete(key);
    alert("You chose to delete the event");
  }
  clubUpdate(item){
    
   
      this.router.navigate(['/update'], { queryParams:{key: item.key, name: item.name, address: item.add}})
    
   }
 

   rtnUsers(){
    this.mydata.getUserChanges().subscribe(data=>{
      this.userList=data.map(e=>{
        return{
          key:e.payload.doc.id,
          name: e.payload.doc.data()['displayName'],
          add: e.payload.doc.data()['address'],
          email: e.payload.doc.data()['Email'],
          gender: e.payload.doc.data()['gender'],
          age: e.payload.doc.data()['Age'],
        }as Users;
      });
      console.log(this.userList)
 
      this.dataSource = new MatTableDataSource(this.userList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

   }

   
  ngOnInit() {

  
  this.rtnUsers();
  this.genderDB();
  this.ageDB();
  this. clubOwners();
  this. rtnBooked();
  }

  theUser;
  theClub;
 
  clubOwners(){
    this.theUser=this.firestore.collection('users').valueChanges().subscribe((user: any)=>{
      console.log(user.uid)
      // for (let i = 0; i < user.length; i++) {
      //   let uid = user[i].uid;
      //   console.log('uid',uid)
      // }
    });
    this.theClub=this.firestore.collection('clubs').valueChanges().subscribe((club: any)=>{
      // for (let i = 0; i < club.length; i++) {
      //   let uid = club[i].userID;
      //   console.log('uid',uid)
      // }
    
    });
  console.log(this.theUser);
  console.log(this.theClub)

  }
  
  eventOwners(){

  }
  ageDB(){
    this.firestore.collection('users').valueChanges().subscribe((data: any) => {
      // this.b = this.b + 1
      for (let i = 0; i < data.length; i++) {
        let age = data[i].Age;
       
        // calculation for gender
        if (age >= 15 &&age<=20  ) {
          this.a = this.a + 1
          console.log(this.a)
        } else if (age >= 21 &&age<=25 ) {
          this.b = this.b + 1
          console.log(this.b)
        }
        else if (age >= 26 &&age<=30 ) {
          this.c = this.c + 1
          console.log(this.c)
        }
        else if (age >= 31 &&age<=35 ) {
          this.d = this.d + 1
          console.log(this.d)
        }
        else if (age >= 36 &&age<=40 ) {
          this.e = this.e + 1
          console.log(this.e)
        }
        else if (age >= 41 &&age<=45 ) {
          this.f = this.f + 1
          console.log(this.f)
        }
        else if (age >= 46 &&age<=50 ) {
          this.g = this.g + 1
          console.log(this.g)
        }
        else if (age >= 51 &&age<=55 ) {
          this.h = this.h + 1
          console.log(this.h)
        }
        else if (age >= 56 &&age<=60 ) {
          this.i = this.i + 1
          console.log(this.i)
        }
        else if (age >= 61 &&age<=70 ) {
          this.j = this.j + 1
          console.log(this.j)
        }
        else {
          this.k = this.k + 1
          console.log(this.k)
        }
      
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['15-20', '21-25', '26-30', '31-35', '36-40', '41-45','46-50','51-55','56-60','60+'],
        datasets: [{
            label: '# of age group',
            data: [this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i, this.j],
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
         
        });
  }});

  }
  genderDB(){
  
    this.firestore.collection('users').valueChanges().subscribe((data: any) => {
     
      for (let i = 0; i < data.length; i++) {
        let gender = data[i].gender;
       
        // calculation for gender
        if (gender == 'Male') {
          this.boy = this.boy + 1
          console.log(this.boy)
        } else if (gender == 'Female') {
          this.girl = this.girl + 1
          console.log(this.girl)
        }
        else {
          this.other = this.other + 1
          console.log(this.other)
        }
  
        this.chart = new Chart('chart', {
          type: 'pie',
          data: {
            labels: ['male', 'female', 'prefer not to say'],
            datasets: [{
              label: '# Gender statistics',
              data: [this.boy, this.girl, this.other],
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
         
        });
  }});
}

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

}
