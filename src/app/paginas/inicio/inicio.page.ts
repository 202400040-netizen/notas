import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage {
  notas: any[] = [];

  constructor(private nav: NavController) {
    this.cargar();
  }

  ionViewWillEnter() {
    this.cargar();
  }

  cargar() {
    const data = localStorage.getItem('notas');
    this.notas = data ? JSON.parse(data) : [];
  }
  
  guardar() {
    localStorage.setItem('notas', JSON.stringify(this.notas));
  }

  nueva() {
    this.nav.navigateForward('/nota/0');
  }

  editar(id: number) {
    this.nav.navigateForward('/nota/' + id);
  }

  borrar(id: number) {
    if (confirm('¿Borrar nota?')) {
      this.notas = this.notas.filter(n => n.id !== id);
      this.guardar();
    }
  }
}