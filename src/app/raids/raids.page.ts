import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";

@Component({
    selector: 'app-raids',
    templateUrl: './raids.page.html',
    styleUrls: ['./raids.page.scss'],
})
export class RaidsPage implements OnInit {
    pokemon = 'rayquaza';
    level = '5';
    weather = 'NO_WEATHER';
    friendship = '4';
    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    toResults() {
        let extras: NavigationExtras = {
            queryParams: {
                pokemon: this.pokemon,
                level: this.level,
                weather: this.weather,
                friendship: this.friendship
            }
        };
        this.router.navigate(['tabs/results'], extras)
    }
}
