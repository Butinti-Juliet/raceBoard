// import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-update-club',
  templateUrl: './update-club.component.html',
  styleUrls: ['./update-club.component.scss']
})
export class UpdateClubComponent implements OnInit {

  
  clubList={
    key: '',
    name: '',
    address: '',
    open:'',
    close:''
  };
 
  
  constructor(private fb:FormBuilder ,private data:DataService,private route: ActivatedRoute, private router: Router) { }
  updateForm= this.fb.group({

    name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
    Address: ['', Validators.required],
    open: ['', Validators.required],
    close: ['', Validators.required],
   
  });

 
  onSubmit() {
    alert('Thanks!');
  }



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
  // clubUpdate
  update(clubList){
    this.data.clubUpdate(clubList,clubList.key);
    console.log("updated")
    alert("club updated");
    this.router.navigateByUrl('menu/registeredclubs')
   }

}
