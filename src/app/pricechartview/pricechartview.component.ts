import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CryptoserviceService } from '../cryptoservice.service';
import * as Chart from 'chart.js';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-pricechartview',
  templateUrl: './pricechartview.component.html',
  styleUrls: ['./pricechartview.component.css']
})
export class PricechartviewComponent implements OnInit {

  chart: any;
  timestampData = [];
  pricesChangeData: any = [];
  coinid: string;
  loading: boolean =  false;

  constructor(private route: ActivatedRoute, public http: CryptoserviceService, private spinner:NgxSpinnerService) {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
   }

  public drawChart(): any {
    let canvas: any = document.getElementById("canvasChart");
    let ctx = canvas.getContext('2d');
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.timestampData,
        datasets: [
          {
            data: this.pricesChangeData,
            label: this.coinid,
            borderColor: 'rgba(8, 103, 136, 1)',
            borderWidth: 2,
            borderJoinStyle: 'round',
            fill: true,
            backgroundColor: 'rgba(8, 103, 136, 0.4)',
            pointBorderColor: 'rgba(221, 28, 26, 1)',
            pointBackgroundColor: 'white',
            pointHoverRadius: 3,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderWidth: 3,
            pointHoverBorderColor: 'rgba(221, 28, 26, 1)'
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  getCoins24h():any {
    this.loading =  true;
    const id = this.route.snapshot.paramMap.get('id').toString();
    this.coinid = id;
    this.http.getprice(id).subscribe(
      priceData => {
        console.log(priceData)
        this.timestampData = priceData.prices.map(timeList => {
          let jsdate = new Date(timeList[0]);
          return jsdate.getHours() + ":00";
        });
        this.timestampData = this.timestampData.filter((value, index, array) => !array.filter((v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index).length);
        console.log(this.timestampData)
        this.pricesChangeData = priceData.prices.map(priceList => priceList[1]);
        console.log(this.pricesChangeData)
        this.drawChart();
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      }
    )
  }

  ngOnInit() {
    this.getCoins24h();
  }
}
