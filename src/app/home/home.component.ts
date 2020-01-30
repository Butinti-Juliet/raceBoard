import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import * as Chart from 'chart.js';
import { MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  
  dataSource: any;
  displayedColumns: string[] = ['Clubname', 'Address', 'Opening time', 'Closing time','Action'];
  displayColumns: string[] = ['Eventname', 'Address','Distance', 'Opening time', 'Closing time','Action'];


 
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

  eventList:any[];
  bookedList:any[];
  constructor(private mydata:DataService,private firestore:AngularFirestore) { 
  
    this.rtnBooked();
   

  }
  clubSource: any;
  clubColumns: string[] = ['Clubname', 'Address', 'Opening time', 'Closing time','Action'];
  

  clubFilter(filterValue: string) {
    this.clubSource.filter = filterValue.trim().toLowerCase();
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

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
  eventDelete(key) {
    this.mydata.eventDelete(key);
    alert("You chose to delete the event");
  }
  update(){
    this.mydata.update(this.clubList,this.clubList[0].key);
    console.log("updated")
    
   }
 

 
  //  onUpdate(item) {
  //   this.router.navigate(['/update'], { queryParams: { key: item.key, name: item.name, address: item.address, open: item.open, close: item.close } })
  // }
  // update(item){
//   item.name="Mango";
//   item.price=10;
//   item.type="Fruits";
//   this.itemDoc = this.afs.doc<Item>('Grocery/3AnqLWbS2SVh4rtDQSHv');
//   this.itemDoc.update(item);
// }
  ngOnInit() {

  
  this.rtnClub();
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
        if (age == '10-21') {
          this.a = this.a + 1
          console.log(this.a)
        } else if (age == '26-31') {
          this.b = this.b + 1
          console.log(this.b)
        }
        else if (age == '31-38') {
          this.c = this.c + 1
          console.log(this.c)
        }
        else if (age == '38-45') {
          this.d = this.d + 1
          console.log(this.d)
        }
        else if (age == '45-50') {
          this.e = this.e + 1
          console.log(this.e)
        }
        else {
          this.f = this.f + 1
          console.log(this.f)
        }
      
    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: {
          labels: ['10-21', '21-26', '26-31', '31-38', '38-45', '45-50','50+'],
          datasets: [{
              label: '# of age group',
              data: [this.a, this.b, this.c, this.d, this.e, this.f],
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
