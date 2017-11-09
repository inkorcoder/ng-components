import { Component, enableProdMode } from '@angular/core';
require('./variables.scss');

enableProdMode()

@Component({
	selector: 'application',
	templateUrl: './app.component.html',
	providers: [ ]
})

export class AppComponent {

}