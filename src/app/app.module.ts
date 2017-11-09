import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { Carousel } from './components/carousel';



@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule
	],
	declarations: [
		AppComponent,
		Carousel
	],
	bootstrap: [
		AppComponent
	],
	providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule {

}