import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RaidsService {

  constructor(private http: HttpClient) {}

  callPokerBattlerWs(): Observable<any> {
    const url = 'https://fight.pokebattler.com/raids/defenders/TOGETIC/levels/RAID_LEVEL_4/attackers/levels/35/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC?sort=TIME&weatherCondition=NO_WEATHER&dodgeStrategy=DODGE_REACTION_TIME&aggregation=AVERAGE&randomAssistants=-1&friendLevel=FRIENDSHIP_LEVEL_4';
    return this.http.get<any>(url);
  }
  async callPokerBattlerWsA(pokemon_level: number, target: string, raid_level: number, weather_condition: string, friendship: number): Promise<any> {
    const url = `https://fight.pokebattler.com/raids/defenders/${target.toUpperCase()}/levels/RAID_LEVEL_${raid_level}/attackers/levels/${pokemon_level}/strategies/CINEMATIC_ATTACK_WHEN_POSSIBLE/DEFENSE_RANDOM_MC?sort=TIME&weatherCondition=${weather_condition}&dodgeStrategy=DODGE_REACTION_TIME&aggregation=AVERAGE&randomAssistants=-1&friendLevel=FRIENDSHIP_LEVEL_${friendship}`;
    return await this.http.get<any>(url).toPromise();
  }

}
