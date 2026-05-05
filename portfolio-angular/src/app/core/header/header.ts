import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isMenuOpen = false;
  isScrolled = false;
  isDarkMode = true;
  private platformBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformBrowser = isPlatformBrowser(platformId);
    if (this.platformBrowser) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        this.isDarkMode = storedTheme === 'dark';
      } else {
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      this.applyTheme();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.platformBrowser) {
      this.isScrolled = window.scrollY > 10;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    if (this.platformBrowser) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  private applyTheme() {
    if (this.platformBrowser) {
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    }
  }
}
