import { Component, enableProdMode } from '@angular/core';

enableProdMode()

require('./variables.scss');

@Component({
	selector: 'application',
	templateUrl: './app.component.html',
	providers: [ ]
})

export class AppComponent {

}