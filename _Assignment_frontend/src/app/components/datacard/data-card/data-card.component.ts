import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiserviceService } from 'src/app/services/apiservice.service';
import { contactInfo } from './data-card.model'


@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent {
  constructor(private service: ApiserviceService, private router: Router) {

  }

  data = ''
  Data: contactInfo[] = []
  alert : boolean = false
  alertMessage : string = ''
  class : string = ''

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.service.GetData().subscribe((data: contactInfo[]) => {
      this.Data = data
      
    })
  }

  deleteData(id: any) {
    this.service.deleteData(id).subscribe(res => {
      this.getData()
      this.class = 'alert-danger'
      this.alertMessage = 'data deleted....'
      this.alertFlicker()
    } , err=>{
      this.class = 'alert-danger'
      this.alertMessage = 'Something went wrong.'
      this.alertFlicker()
    })
  }

  savedata(data: any) {
    this.service.saveData(data)
    this.router.navigate(['/'])
  }

  alertFlicker() {
    this.alert = true
    setTimeout(() => {
      this.alert = false
    }, 2000);
  }
}
