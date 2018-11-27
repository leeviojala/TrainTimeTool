import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatTabsModule, MatAutocompleteModule, MatListModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabViewComponent } from './tab-view/tab-view.component';
import { Station } from './models/station.model';
import { HttpClientModule } from '@angular/common/http';
import { TrainservicesService } from './trainservices.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TabViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
     MatCheckboxModule,
      MatInputModule,
       MatTabsModule,
        FormsModule,
         MatAutocompleteModule,
          MatInputModule, ReactiveFormsModule,
           MatAutocompleteModule,
            CommonModule,
            MatListModule
  ],
  providers: [TrainservicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
