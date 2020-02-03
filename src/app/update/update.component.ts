import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
// import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  clubList={
    key: '',
    name: '',
    address: '',
    open:'',
    close:''
  };
 
  
  constructor(private fb:FormBuilder ,private data:DataService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.rtnClub();
    this.route.queryParams.subscribe(params => {
      console.log(params)

      this.clubList.key = params.key
      console.log(this.clubList.key),

      this.clubList.name = params.name
      console.log(this.clubList.name),

      this.clubList.address = params.add
      console.log(this.clubList.address),

      this.clubList.open = params.open
      console.log(this.clubList.open)

      this.clubList.close = params.close
      console.log(this.clubList.close)
    
    })
  }
  
  update(){
    this.data.clubUpdate(this.clubList,this.clubList.key);
    console.log("updated")
    
   }

}
