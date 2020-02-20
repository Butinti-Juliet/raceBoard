import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-previous-events',
  templateUrl: './previous-events.component.html',
  styleUrls: ['./previous-events.component.scss']
})
export class PreviousEventsComponent implements OnInit {


  juiletFile = "";

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  previousEventsForm= this.fb.group({

    name: ['', Validators.compose([Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30), Validators.required])],
    Description: ['', Validators.required],
     srcResult: ['', Validators.required],
     url:  ['', Validators.required],

   
  });
  uniqkey: string;
  fileRef: any;
  task: any;
  downloadU: any;
  photoURL: any;

  constructor(private route:Router,private data:DataService,private fb: FormBuilder,private storage: AngularFireStorage) { }

  

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
  events={
    name:'',
    Description:'',
    srcResult:''
  }
  submit(){
 
    this.data.previousEvent(this.events)
    console.log('done')
    this.route.navigateByUrl('/menu/home')
  }

  selectedFile;
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

  files: any = [];

  uploadFile(event) {
    // for (let index = 0; index < event.length; index++) {
    //   const element = event[index];
    //   this.files.push(element.name)
    // }  



    this.juiletFile = event[0].name;
    this.uniqkey = this.juiletFile + 'Logo';
    const filePath = this.uniqkey;
    this.fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, this.juiletFile);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadU = this.fileRef.getDownloadURL().subscribe(urlPath => {
          console.log(urlPath);
          this.photoURL = urlPath
          console.log(this.urlPath, "fighter");

        });
      })
    ).subscribe();

    console.log(this.juiletFile);

  }
  urlPath(urlPath: any, arg1: string) {
    throw new Error("Method not implemented.");
  }
  // deleteAttachment(index) {
  //   this.files.splice(index, 1)
  //   this.route.navigateByUrl('menu/sponsors')

  // }

  fileName: string = "";
  upload(event) {
    let file = <File>event.target.files[0];
    this.fileName = file.name;

    console.log(this.fileName);
    console.log(event.target.value);

    let fr = new FileReader(); fr.onload = (event: any) => {
      let base64 = event.target.result;
      let pic = base64.split(',')[1];
      console.log(base64)
    }
    fr.readAsDataURL(file);


  }

  
  ngOnInit() {
  }

}
