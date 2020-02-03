import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  selectedFile = null;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  sponsorForm= this.fb.group({

    name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
    Description: ['', Validators.required],
    srcResult: ['', Validators.required],

   
  });

  clubList:any;
  srcResult: any;
  uniqkey: string;
  name: any;
  constructor(private http: HttpClient,private data:DataService,private fb: FormBuilder,private storage: AngularFireStorage) { }

  onSubmit() {
    alert('Thanks!');
  }
  
  
  onFileSelected(event){
   this.selectedFile = event.target.files[0];

  }
onUplaod(){
// 
}
  // uploadFile(event) {
  //   const file = event.target.files[0];
  //   this.uniqkey = 'PIC' ;
  //   const filePath =this.uniqkey;;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);

    
  //   this.uploadPercent = task.percentageChanges();
 
  //   task.snapshotChanges().pipe(
  //       finalize(() => this.downloadURL = fileRef.getDownloadURL() )
  //    )
  //   .subscribe()

  // }
  Submit(sponsors){
    console.log(this.name)
  }
 
 


  ngOnInit() {
  }

}
