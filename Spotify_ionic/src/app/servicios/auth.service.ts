import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  login(email:string, password:string){

    return new Promise((resolve, rejected)=>{
      this.AFauth.signInWithEmailAndPassword(email,password).then(user=>{
        console.log(user)
      }).catch(err=>rejected(err));
    });

  }

  onLogout(){
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  register(email: string, password: string, name: string, lastname: string){
    return new Promise ((resolve, reject)=>{
      this.AFauth.createUserWithEmailAndPassword(email,password).then(res=>{
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({
          name: name,
          lastname: lastname,
          uid: uid,
          email: email
        })
        resolve(res)
      }).catch(err => reject(err))
    })

  }
}
