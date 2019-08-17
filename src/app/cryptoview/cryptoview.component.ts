import { Component, OnInit } from '@angular/core';
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoserviceService } from '../cryptoservice.service';
import { ToastrService } from 'ngx-toastr';
import 'hammerjs';

@Component({
  selector: 'app-cryptoview',
  templateUrl: './cryptoview.component.html',
  styleUrls: ['./cryptoview.component.css']
})
export class CryptoviewComponent implements OnInit {
  title = 'crypto-currency-list';
  currencylistarray: any = [];
  priceData: any = [];
  p: number = 1;
  coins: any = [];
  sortprice: any = [];
  sortMarketData: any = [];
  priceTempData: any = [];
  marketTempData: any = [];
  direction:any=[];
  value:any=[];

  //Array for favorites
  favoriteData: any = [];
  favoriteId: any = [];

  //properties for checkbox
  displaycheckbox: boolean = false;
  checked = false;
  count: number = 0;

  //properties for chart view
  chart: any;
  timestampData = [];
  pricesChangeData: any = [];

  //slider values for price change
  priceminValue: number = 0;
  pricemaxValue: number = 40000;
  priceoptions: Options = {
    floor: 0,
    ceil: 40000,
    step: 10
  };

  //slider values for price change
  marketminValue: number = 0;
  marketmaxValue: number = 100000000;
  marketoptions: Options = {
    floor: 0,
    ceil: 100000000,
    step: 10000
  };

  //loader property
  loading: boolean = false;

  constructor(
    private http: CryptoserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
) { }

  //method to display all crypto currency
  public displaycurrency(): any {
    this.loading = true;
    this.http.getcryptocurrency().subscribe(
      data => {
        this.currencylistarray = data;
        this.priceTempData = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.loading = false;
      }
    )
  }


  public checkboxdisplay() {
    this.displaycheckbox = !this.displaycheckbox;
  }


  public checkvalue(event, idvalue) {
    if (event.checked === true) {
      this.count++;
      for (let dm in this.currencylistarray) {
        if (this.currencylistarray[dm].id == idvalue) {
          this.coins.push(this.currencylistarray[dm]);
        }

      }
    }
    if (event.checked === false) {
      this.count--;
      for (let del in this.coins) {
        if (this.coins[del].id == idvalue) {
          this.coins.splice(del, 1);
        }
      }
    }
    if (this.coins.length == 2) {
      this.count = 2;
    } else {
      this.toastr.info("Please select exactly two cryptocurrency to compare");
    }
  }


  public comparecoins() {
    this.router.navigate(['/comparison'], { queryParams: { coin1: this.coins[0].id, coin2: this.coins[1].id } });
  }

 
  showpricepage(e, idvalue) {
    this.router.navigate(['/priceview', idvalue]);
  }

  onUserChangeStart(changeContext: ChangeContext, value): void {
    if (value == "price") {
      this.priceminValue = changeContext.value;
    } else {
      this.marketminValue = changeContext.value;
    }
  }

  onUserChangeEnd(changeContext: ChangeContext, value): void {
    if (value == 'price') {
      this.pricemaxValue = changeContext.highValue;
    } else {
      this.marketmaxValue = changeContext.highValue;
    }
  }

  onUserChange(changeContext: ChangeContext, value): void {
    this.sortprice = this.sortingCoinPrice(value);
    this.currencylistarray = this.sortprice;
  }

  sortingCoinPrice(value): any {
    let sortPriceData = [];

    if (value == "price") {
      for (let x in this.priceTempData) {
        if (this.priceTempData[x].current_price <= this.pricemaxValue && this.priceTempData[x].current_price >= this.priceminValue) {
          sortPriceData.push(this.priceTempData[x]);
        }
      }
    } else {
      for (let x in this.priceTempData) {
        if (this.priceTempData[x].market_cap <= this.marketmaxValue && this.priceTempData[x].market_cap >= this.marketminValue) {
          sortPriceData.push(this.priceTempData[x]);
        }
      }
    }
    return sortPriceData;
  }

  sortfunction(direction, sortvalue): any {
    function ascendingcompare(price1, price2) {
      if (price1.current_price > price2.current_price) {
        return 1;
      }
      if (price1.current_price < price2.current_price) {
        return -1;
      }
      return 0;
    }

    function descendingcompare(price1, price2) {
      if (price1.current_price < price2.current_price) {
        return 1;
      }
      if (price1.current_price > price2.current_price) {
        return -1;
      }
      return 0;
    }

    function ascendingmarketcapcompare(market1, market2) {
      if (market1.market_cap > market2.market_cap) {
        return 1;
      }
      if (market1.market_cap < market2.market_cap) {
        return -1;
      }
      return 0;
    }

    function descendingmarketcapcompare(market1, market2) {
      if (market1.market_cap < market2.market_cap) {
        return 1;
      }
      if (market1.market_cap > market2.market_cap) {
        return -1;
      }
      return 0;
    }

    if (sortvalue == 'price') {
      if (direction == 'asc') {
        this.priceTempData.sort(ascendingcompare);
      } else {
        this.priceTempData.sort(descendingcompare);
      }
    } else {
      if (direction == 'asc') {
        this.priceTempData.sort(ascendingmarketcapcompare);
      } else {
        this.priceTempData.sort(descendingmarketcapcompare);
      }
    }
  }

  displaysort(direction, sortvalue): any {
    this.sortfunction(direction, sortvalue);
  }

  displaymarketsort(direction, sortvalue): any {
    this.sortfunction(direction, sortvalue);
  }

  addfavorite(idvalue): any {
    let flag = 0;
    for (let x in this.priceTempData) {
      if (this.priceTempData[x].id == idvalue) {
        for (let a in this.favoriteData) {
          if (this.favoriteData[a].id == idvalue) {
            this.toastr.info("Already added to Favorites");
            flag++;
          }
        }
        if (flag == 0) {
          this.favoriteData.push(this.priceTempData[x]);
          this.favoriteId.push(this.priceTempData[x].id);
          localStorage.setItem("favoriteId", this.favoriteId);
          this.toastr.success("Successfully added to Favorites");
        }
      }
    }
  }

  removefavorite(idvalue): any {
    for (let y in this.favoriteData) {
      if (this.favoriteData[y].id == idvalue) {
        this.favoriteData.splice(y, 1);
        break;
      }
    }
    for (let z in this.favoriteId) {
      if (this.favoriteId[z] == idvalue) {
        this.favoriteId.splice(z, 1);
        if(this.favoriteId.length <= 0) {
          localStorage.removeItem('favoriteId');
        } else {
        localStorage.setItem("favoriteId", this.favoriteId);
        }
        break;
      }
    }
    this.toastr.success("Successfully removed from Favorites");
    return this.checkingFav(idvalue);
  }

  checkingFav(id): any {
    return this.favoriteId.includes(id);
  }

  checkfavoriteID(): any {
    let favoriteid = localStorage.getItem("favoriteId");
    if (favoriteid) {
      this.favoriteId = favoriteid.split(',');
    }
  }

  displaycoindetail(e, coinid): any {
    this.router.navigate(['/coindetailview', coinid]);
  }

  ngOnInit() {
    this.displaycurrency();
    this.checkfavoriteID();
  }
}




