import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoserviceService } from '../cryptoservice.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-coindetailview',
  templateUrl: './coindetailview.component.html',
  styleUrls: ['./coindetailview.component.css']
})
export class CoindetailviewComponent implements OnInit {

  public coindata:any;

  constructor(
    private route: ActivatedRoute,
    private http: CryptoserviceService,
    private spinner:NgxSpinnerService) {
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);

     }

  ngOnInit() {

    this.getCoinDetail();
  }

  getCoinDetail(): void {
    const id = this.route.snapshot.paramMap.get('id').toString();
    this.http.getCoinDetail(id).subscribe(
      coindata => {
        this.coindata = coindata;
        console.log(coindata);
      }
    )
  }
}
