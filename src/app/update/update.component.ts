import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  clubList:any;
  key: '';
  name: '';
  address: '';
  constructor(private data:DataService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.rtnClub();
    this.route.queryParams.subscribe(params => {
      console.log(params)

      this.key = params.key
      console.log(this.key),

      this.name = params.name
      console.log(this.name),

      this.address = params.add
      console.log(this.address)

    
    })
  }
  rtnClub(){
    this.data.getClubChanges().subscribe(data=>{
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
    });

   }
  // update(){
  //   this.data.update(this.bookedList,this.bookedList[0].key);
  //   console.log("updated")
    
  //  }

}
