import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-url-shortner',
  templateUrl: './url-shortner.component.html',
  styleUrls: ['./url-shortner.component.css']
})
export class UrlShortnerComponent implements OnInit {
  sht_Url:string=""
  error:any
  constructor(private http : ServiceService,private formBuilder: FormBuilder) { }
  urlForm :any

  ngOnInit(): void {
    this.urlForm = this.formBuilder.group({
      Url: ['']})
  }
  //Mthod for calling function for gettin short url
  short_Url(){
    this.http.short_Url(this.urlForm.value).subscribe(response =>{
      this.sht_Url=response},
      error => {
        this.error=error
      }
    )}
    

}
