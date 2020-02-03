import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previous-events',
  templateUrl: './previous-events.component.html',
  styleUrls: ['./previous-events.component.scss']
})
export class PreviousEventsComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  previousEventsForm= this.fb.group({

    name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
    Description: ['', Validators.required],
    // srcResult: ['', Validators.required],

   
  });
  uniqkey: string;

  constructor(private route:Router,private data:DataService,private fb: FormBuilder,private storage: AngularFireStorage) { }

  

  uploadFile(event) {
    const file = event.target.files[0];
    this.uniqkey = 'PIC' ;
    const filePath =this.uniqkey;;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
     )
    .subscribe()
  }
  events={
    name:'',
    Description:''
  }
  submit(){
 
    this.data.previousEvent(this.events)
    console.log('done')
    this.route.navigateByUrl('/menu/home')
  }
  
  ngOnInit() {
  }

}
