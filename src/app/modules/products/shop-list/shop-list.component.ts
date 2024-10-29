import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var $: any; // Declara jQuery
declare function appInit($: any): void; // Declara la función

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Suscribirse a los eventos de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.initializeScripts();
    });
  }

  ngAfterViewInit(): void {
    this.initializeScripts(); // Llama a la función al inicializar la vista
  }

  private initializeScripts(): void {
    // Asegúrate de que se ejecute después de que el DOM esté listo
    setTimeout(() => {
      appInit($);
    }, 100);
  }
}
