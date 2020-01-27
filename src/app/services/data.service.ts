import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private db: AngularFirestore) { }
  getClubChanges() {
    return this.db.collection('clubs').snapshotChanges();
    
  }
  getUserChanges() {
    return this.db.collection('users').valueChanges();
    
  }
  delete(key){
    this.db.doc('clubs/' + key).delete();
    
  }
}