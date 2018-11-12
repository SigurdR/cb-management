import { Injectable } from '@angular/core';
 
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Profile} from '../models/profile.model';

@Injectable()
export class ProfileService {
  profileList: AngularFireList<any>;
  selectedProfile: Profile = new Profile();
  constructor(private firebase :AngularFireDatabase ) { }
 

  insertProfile( profile : Profile)
  {
    this.profileList.push({
      email: profile.email,
      password: profile.password,
      name: profile.name,
      dob:profile.dob,
      gender: profile.gender
      
    });
  }

  updateProfile(profile : Profile){
    this.profileList.update(profile.$key,
      {
        email: profile.email,
      password: profile.password,
      name: profile.name,
      dob:profile.dob,
      gender: profile.gender
      });
  }
  getData(){
   
    this.profileList = this.firebase.list('profile');
    return this.profileList;
  }

 
 
}