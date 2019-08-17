import { Component, OnInit } from '@angular/core';
import { CryptoserviceService } from '../cryptoservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chart from 'chart.js';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-comparisonview',
  templateUrl: './comparisonview.component.html',
  styleUrls: ['./comparisonview.component.css']
})
export class ComparisonviewComponent implements OnInit {

  chart: any;
  coinpricedata: any = [];
  timestampData = [];
  priceChangeA: any = [];
  priceChangeB: any = [];
  cryptocurrencyA: any = [];
  cryptocurrencyB: any = [];
  displaycheckbox: boolean = false;
  cheched: boolean = false;
  count: number = 0;
  coinA: any = [];
  coinB: any = [];
  flag = 0;
  loading: boolean =  false;

  constructor(private http: CryptoserviceService, private route: ActivatedRoute, private router: Router,private spinner:NgxSpinnerService) {
    this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 9000);
   }

  getSpecificData(coinValue): any {
    this.loading =  true;
    if (this.flag == 1) {
      this.http.getprice(coinValue).subscribe(
        coin1Data => {
          this.coinB = coin1Data;
        }
      )
    } else {
      this.http.getprice(coinValue).subscribe(
        coin1Data => {
          this.coinA = coin1Data;
          this.flag = this.flag + 1;
        }
      )
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params != undefined) {
          this.cryptocurrencyA = params.coin1;
          this.cryptocurrencyB = params.coin2;
        }
      }
    );

    this.getSpecificData(this.cryptocurrencyA);

    setTimeout(() => {
      this.getSpecificData(this.cryptocurrencyB);
    }, 5000);

    setTimeout(() => {
      this.chartDetails();
    }, 8000);
  }

  public chartDetails() {
    this.timestampData = this.coinA.prices.map(timeList => {
      let jsdate = new Date(timeList[0]);
      return jsdate.getHours() + ":00";
    });
    this.timestampData = this.timestampData.filter((value, index, array) => !array.filter((v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index).length);
    this.priceChangeA = this.coinA.prices.map(priceList => priceList[1]);
    this.priceChangeB = this.coinB.prices.map(priceList => priceList[1]);
    this.loading = false;
    this.drawChart();
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
            data: this.priceChangeA,
            borderColor: "rgba(218, 85, 82, 1)",
            label: this.cryptocurrencyA,
            fill: true,
            borderWidth: 3,
            borderJoinStyle: 'round',
            backgroundColor: 'rgba(218, 85, 82, 0.4)',
            pointBorderColor: 'rgba(218, 85, 82, 1)',
            pointBackgroundColor: 'white',
            pointHoverRadius: 3,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderWidth: 3,
            pointHoverBorderColor: 'rgba(218, 85, 82, 1)'
          },
          {
            data: this.priceChangeB,
            borderColor: 'rgba(43, 158, 179, 1)',
            label: this.cryptocurrencyB,
            fill: true,
            borderWidth: 3,
            borderJoinStyle: 'round',
            backgroundColor: 'rgba(43, 158, 179, 0.6)',
            pointBorderColor: 'rgba(8, 103, 136, 1)',
            pointBackgroundColor: 'white',
            pointHoverRadius: 3,
            pointHoverBackgroundColor: 'white',
            pointHoverBorderWidth: 3,
            pointHoverBorderColor: 'rgba(8, 103, 136, 1)'
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
}