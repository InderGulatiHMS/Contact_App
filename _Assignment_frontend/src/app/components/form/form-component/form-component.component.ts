import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ApiserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent {
  constructor(private fb: FormBuilder, private service: ApiserviceService) {
  }
  
  FormData: any
  isUpdate : boolean = false
  alert: Boolean = false
  isSubmit: boolean = true
  class: string = ''
  alertMessage: string = ''
  submitClick : boolean =false

  ngOnInit() {
    this.FormData = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    })

    if (this.service.Datastore.length !== 0) {
      this.isUpdate = true
      this.isSubmit = false
      this.FormData.patchValue({
        // class: this.service.Datastore.class,
        firstName: this.service.Datastore.firstName,
        lastName: this.service.Datastore.lastName,
        email: this.service.Datastore.email

      })
    }
  }
  submitData() {
    if (this.FormData.valid) {
      this.service.AddData(this.FormData.value).subscribe(res => {
        this.class = 'alert-info'
        this.alertMessage = 'Data submitted'
        this.alertFlicker()
        this.FormData.reset()
      }, (error) => {
        this.class = 'alert-danger'
        if(error.error.errors?.Email){
        this.alertMessage = error.error.errors.Email[0]
        }else{
        this.alertMessage = error.error.error
          
        }
        this.alertFlicker()
      })
    }else{
      this.class = 'alert-info'
      this.alertMessage = 'Please enter a valid email address.'
      this.alertFlicker()
      this.submitClick = true
    }
  }
  
  updateData() {
    if (this.FormData.valid) {
      this.service.updateData(this.service.Datastore.id, this.FormData.value).subscribe(res => {
        this.class = 'alert-info'
        this.alertMessage = 'Data updated..'
        this.alertFlicker()
        this.service.Datastore = []
        this.isUpdate = false
        this.FormData.reset()
        this.isSubmit = true
        this.isUpdate = false
      }, err =>{
        this.class = 'alert-danger'
        this.alertMessage = 'something went wrong..'
        this.alertFlicker()
      });
    }
  }


  alertFlicker() {
    this.alert = true
    setTimeout(() => {
      this.alert = false
    }, 2000);
  }
}
