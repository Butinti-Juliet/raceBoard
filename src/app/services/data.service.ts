import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  private clubDoc: AngularFirestoreDocument<Club>;
  private bookedDoc: AngularFirestoreDocument<Events>;
  constructor(private db: AngularFirestore) { }
  getClubChanges() {
    return this.db.collection('clubs').snapshotChanges();
    
  }
  getEventsChanges() {
    return this.db.collection('events').snapshotChanges();
    
  }
 
  getBokedChanges() {
    return this.db.collection('bookedEvents').snapshotChanges();
    
  }
  getUserChanges() {
    return this.db.collection('users').valueChanges();
    
  }
  // delete(key){
  //   this.db.doc('clubs/' + key).delete();
    
  // }
  clubDelete(key){

    this.clubDoc = this.db.doc<Club>('clubs/'+key);
    // this.clubDoc.update(objectA);
    this.clubDoc.delete();
  }
  bookedDelete(key){

    this.bookedDoc = this.db.doc<Events>('bookedEvents/'+key);
    
    this.bookedDoc.delete();
  }
  eventDelete(key){

    this.clubDoc = this.db.doc<Club>('events/'+key);
    // this.clubDoc.update(objectA);
    this.clubDoc.delete();
  }
  update(objectA,key){

    this.clubDoc = this.db.doc<Club>('club/'+key);
    this.clubDoc.update(objectA);
  }
}