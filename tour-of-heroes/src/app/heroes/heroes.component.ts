import { Component, OnInit, inject } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { HEROES } from '../mock-heroes';
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
  imports: [
    CommonModule,
    RouterLink,
    HeroDetailComponent
  ]
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }

  add(name: string) {
    name = name.trim();
    if (!name) { return; }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      })
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
