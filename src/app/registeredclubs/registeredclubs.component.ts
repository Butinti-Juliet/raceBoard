import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DataService } from '../services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeredclubs',
  templateUrl: './registeredclubs.component.html',
  styleUrls: ['./registeredclubs.component.scss']
})
export class RegisteredclubsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  
  dataSource: any;
  displayedColumns: string[] = ['Clubname', 'Address', 'Opening time', 'Closing time','Action'];
  clubList;
 
  // this.router.navigateByUrl('registration');

  constructor(private route:Router,private mydata:DataService,private firestore:AngularFirestore,public dialog: MatDialog) { 
    this.rtnClub();
   
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
          // photo: e.payload.doc.data()['photoURL'],
        }as Club;
      });
      console.log(this.clubList)
 
      this.dataSource = new MatTableDataSource(this.clubList)
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
    this.route.navigate(['/updateClub'],{queryParams:{key:club.key,name:club.name,add:club.add,close:club.close,open:club.open}})
  }
  clubDelete(key) {
    this.mydata.clubDelete(key);
    alert("You chose to delete the club");
  // this.openDialog();
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(RegisteredclubsComponent, {
  //     width: '250px',
     
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
     
  //   });
  // }


  ngOnInit() {
  }

}
