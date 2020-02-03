import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../services/data.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

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
    // srcResult: ['', Validators.required],

   
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
    Description:''
  }
  submit(){
    this.data.sponsor(this.sponsor)
    console.log('done')
    this.route.navigateByUrl('menu/home')
  }
  /////
  // onFileSelected() {
  //   const inputNode: any = document.querySelector('#file');
  
  //   if (typeof (FileReader) !== 'undefined') {
  //     const reader = new FileReader();
  
  //     reader.onload = (e: any) => {
  //       this.srcResult = e.target.result;
  //     };
  
  //     reader.readAsArrayBuffer(inputNode.files[0]);
  //   }
  // }

 


  ngOnInit() {
  }

}
