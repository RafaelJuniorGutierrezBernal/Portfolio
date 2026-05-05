import { Component } from '@angular/core';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { Hero } from './features/hero/hero';
import { About } from './features/about/about';
import { Skills } from './features/skills/skills';
import { Projects } from './features/projects/projects';
import { Education } from './features/education/education';
import { Contact } from './features/contact/contact';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, About, Skills, Projects, Education, Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

