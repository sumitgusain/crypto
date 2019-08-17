import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CryptoserviceService {
public cryptoCoins = "https://api.coingecko.com/api/v3/coins/";
public cryptoGlobal = "https://api.coingecko.com/api/v3/global";
public cryptoExchange = "https://api.coingecko.com/api/v3/exchanges";
 
 constructor(public http:HttpClient) { }
 getcryptocurrency(): Observable<any> {
 return this.http.get(this.cryptoCoins+"markets?vs_currency=usd").pipe(catchError(this.errorHandler));

}
getprice(id): Observable<any> {
  console.log(id);
return this.http.get(this.cryptoCoins + id + "/market_chart?vs_currency=usd&days=1").pipe(catchError(this.errorHandler));
}

getCoinDetail(id: string): any {
  let detailCryptocurrency = this.http.get(this.cryptoCoins+id);
  return detailCryptocurrency;
}

getGlobalData(): Observable<any> {
return this.http.get(this.cryptoGlobal).pipe(catchError(this.errorHandler));
}
  errorHandler(errorHandler: any): any {
    throw new Error("Unknown Error.");
  }
  
}
