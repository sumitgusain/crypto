import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptoviewComponent } from './cryptoview/cryptoview.component';
import { CryptoserviceService } from './cryptoservice.service';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Ng5SliderModule } from 'ng5-slider';
import { FavouriteComponent } from './favourite/favourite.component';
import { ComparisonviewComponent } from './comparisonview/comparisonview.component';
import { ChartsModule } from 'ng2-charts';
import { PricechartviewComponent } from './pricechartview/pricechartview.component';
import { CoindetailviewComponent } from './coindetailview/coindetailview.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    CryptoviewComponent,
    FavouriteComponent,
    ComparisonviewComponent,
    PricechartviewComponent,
    CoindetailviewComponent
   
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    MatCheckboxModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule,
    Ng5SliderModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      tapToDismiss: true,
      progressBar:true,
      easeTime: 0.5,
      timeOut: 2000
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'view', component:CryptoviewComponent},
      {path:'',redirectTo:'view',pathMatch:'full'},
      {path:'comparison',component:ComparisonviewComponent},
      {path:'priceview/:id',component:PricechartviewComponent},
      {path:'coindetailview/:id',component:CoindetailviewComponent},
      {path:'fav',component:FavouriteComponent}
    ])
  ],
  providers: [CryptoserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
