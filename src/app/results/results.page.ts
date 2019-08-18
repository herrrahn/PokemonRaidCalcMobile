import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RaidsService} from "./raids.service";
import {ListPokemon, Pokemon} from "./list.pokemon";
import {__await} from "tslib";

@Component({
    selector: 'app-results',
    templateUrl: './results.page.html',
    styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
    private lastName: string;
    private lastLevel: number;

    constructor(private route: ActivatedRoute, private router: Router,
                private raidService: RaidsService) {
    }

    poks: ListPokemon = new ListPokemon();
    dataStr: string;
    data: any;
    data20: any;
    data25: any;
    data30: any;
    data35: any;
    data40: any;
    name = '';
    level = 0;

    weather: string = 'NO_WEATHER';
    friendship = 4;
    show_pokemon_list: boolean = false;

    async ngOnInit() {

    }

    ionViewWillEnter() {
        this.route.queryParams.subscribe(async params => {
            if (params) {
                this.name = params.pokemon;
                this.level = params.level;
                this.weather = params.weather;
                this.friendship = params.friendship;

                if (this.name && ((this.name != this.lastName) || (this.level != this.lastLevel))) {
                    this.lastName = this.name;
                    this.lastLevel = this.level;
                    this.poks.pokemons = [];
                    await this.callData();
                }
            }
        });
    }

    async callData() {

        this.poks.pokemons = [];

//    this.data20 = await this.raidService.callPokerBattlerWsA(20, this.name, this.level, this.weather);
//    this.data20 = this.data20['attackers']['0']['randomMove']['defenders'];
//    this.data = this.data20;
//    this.prepareList();

//    this.data25 = await this.raidService.callPokerBattlerWsA(25, this.name, this.level, this.weather);
//    this.data25 = this.data25['attackers']['0']['randomMove']['defenders'];
//    this.data = this.data25;
//    this.prepareList();

        this.data30 = await this.raidService.callPokerBattlerWsA(30, this.name, this.level, this.weather, this.friendship);
        this.data30 = this.data30['attackers']['0']['randomMove']['defenders'];
        this.data = this.data30;
        this.prepareList();

        this.data35 = await this.raidService.callPokerBattlerWsA(35, this.name, this.level, this.weather, this.friendship);
        this.data35 = this.data35['attackers']['0']['randomMove']['defenders'];
        this.data = this.data35;
        this.prepareList();

        this.data40 = await this.raidService.callPokerBattlerWsA(40, this.name, this.level, this.weather, this.friendship);
        this.data40 = this.data40['attackers']['0']['randomMove']['defenders'];
        this.data = this.data40;
        this.prepareList();

        this.sortList();

    }

    prepareList() {
        for (let i = 29; i >= 0; i--) {
            this.poks.pokemons.push(this.buildPokemon(Array.of(this.data[i])));
        }
    }

    private buildPokemon(pokemonData: any[]): Pokemon {

        const pokemon = new Pokemon();
        pokemon.name = pokemonData['0']['pokemonId'];
        pokemon.level = pokemonData['0']['stats']['level'];

        let moveset = pokemonData['0']['byMove']['0'];

        let indexBestMoveSet = 0;
        while (moveset !== null) {
            let auxi = pokemonData['0']['byMove'][indexBestMoveSet + 1];
            if (auxi === undefined) {
                break;
            }
            indexBestMoveSet++;
            moveset = auxi;
        }
        pokemon.timeToWin = moveset['result']['effectiveCombatTime'];
        pokemon.deaths = moveset['result']['effectiveDeaths'];
        pokemon.bestMoveFast = moveset['move1'];
        pokemon.bestMoveFast = pokemon.bestMoveFast.replace('_FAST', '').replace('_', ' ');
        pokemon.bestMoveCharge = moveset['move2'];
        pokemon.bestMoveCharge = pokemon.bestMoveCharge.replace('_CHARGE', '').replace('_', ' ');

        return pokemon;
    }

    sortList() {
        this.poks.pokemons.sort(this.compare);
    }

    private compare(a, b) {
        if (a.timeToWin < b.timeToWin) {
            return -1;
        }
        if (a.timeToWin > b.timeToWin) {
            return 1;
        }
        return 0;
    }


    getMinPlayer(time: number) {
        if (this.level == 5) {
            if (time < 280) return "SOLO"; else if (time < 560) return "DUO"; else if (time < 840) return "TRIO"; else
                return "4+";
        } else {
            if (time < 170) return "SOLO"; else if (time < 340) return "DUO"; else if (time < 510) return "TRIO"; else
                return "4+";
        }
    }

    selectPokemon(pokemon: string) {
        this.name = pokemon;
        this.show_pokemon_list = false;
    }

}
