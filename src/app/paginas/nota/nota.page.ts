import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class NotaPage {
  id = 0;
  titulo = '';
  contenido = '';
  esNueva = true;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.esNueva = this.id === 0;

    if (!this.esNueva) {
      this.cargar();
    }
  }

  cargar() {
    const notas = JSON.parse(localStorage.getItem('notas') || '[]');
    const nota = notas.find((n: any) => n.id === this.id);
    if (nota) {
      this.titulo = nota.titulo;
      this.contenido = nota.contenido;
    }
  }

  guardar() {
    const notas = JSON.parse(localStorage.getItem('notas') || '[]');

    if (this.esNueva) {
      this.id = Date.now();
      notas.push({ id: this.id, titulo: this.titulo, contenido: this.contenido });
    } else {
      const i = notas.findIndex((n: any) => n.id === this.id);
      if (i > -1) {
        notas[i].titulo = this.titulo;
        notas[i].contenido = this.contenido;
      }
    }

    localStorage.setItem('notas', JSON.stringify(notas));
    this.router.navigate(['/inicio']);
  }
}