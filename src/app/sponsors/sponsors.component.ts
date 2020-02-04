import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

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
  constructor(private route:Router,private data:DataService,private fb: FormBuilder,private storage: AngularFireStorage) { }

  onSubmit() {
    alert('Thanks!');
  }
  
  
  onFileSelected(event){
   this.selectedFile = event.target.files[0];

  }
  sponsor={
    name:'',
    Description:'',
    srcResult:''
  }
  submit(){
    this.data.sponsor(this.sponsor)
    console.log('done')
    this.route.navigateByUrl('menu/home')
  }
 

  imageUrl: string;
  onUpload(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.uploadViaFileChooser(file);// call helper method
    console.log("upload complete !");
  }
  uploadViaFileChooser(_image) {
    // this.openLoader();
    console.log('uploadToFirebase');
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + this.selectedFile.name);
      const uploadTask = fileRef.put(_image);
      uploadTask.on(
        'state_changed',
        (_snapshot: any) => {
          console.log(
            'snapshot progess ' +
            (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
          const progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
          if (progress === 100) {
            fileRef.getDownloadURL().then(uri => {
              this.imageUrl = uri;
              console.log('downloadurl', uri);
              
            });
             
          }
        },
        _error => {
          console.log(_error);
          reject(_error); 
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }  
      );
    });
  }
 


  ngOnInit() {
  }

}
