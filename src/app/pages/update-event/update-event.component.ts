import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

 
  
  eventList={
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

      this.eventList.key = params.key
      console.log(this.eventList.key),

      this.eventList.name = params.name
      console.log(this.eventList.name),

      this.eventList.address = params.add
      console.log(this.eventList.address),

      this.eventList.open = params.open
      console.log(this.eventList.open)

      this.eventList.close = params.close
      console.log(this.eventList.close)
    
    })
  }
  // clubUpdate
  update(eventList){
    this.data.eventUpdate(eventList,eventList.key);
    console.log("updated")
    alert("event updated");
    this.router.navigateByUrl('menu/registeredevents')
   }

}
