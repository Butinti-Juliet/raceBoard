import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  updateForm= this.fb.group({

    name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
    Address: ['', Validators.required],
    open: ['', Validators.required],
    close: ['', Validators.required],
   
  });

  clubList:any;
  constructor(private data:DataService,private fb: FormBuilder) { }

  onSubmit() {
    alert('Thanks!');
  }



  ngOnInit() {
    this.rtnClub();
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
  // Update(){

    
  //   console.log(this.clubList)
  // }


}
