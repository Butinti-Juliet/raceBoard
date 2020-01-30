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

      // this.key = params.key
      // console.log(this.key),

      // this.name = params.name
      // console.log(this.name),

      // this.address = params.add
      // console.log(this.address)

    
    })
  }
  
  // update(){
  //   this.data.update(this.bookedList,this.bookedList[0].key);
  //   console.log("updated")
    
  //  }

}
