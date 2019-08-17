import { Component } from '@angular/core';
import { CryptoserviceService } from './cryptoservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  globalList: [];
  constructor( private cryptoservice: CryptoserviceService, private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): any {
   this.cryptoservice.getGlobalData().subscribe(
        data => {
          this.globalList = data;
          console.log(data);
        }
      )
    }



 
  }

