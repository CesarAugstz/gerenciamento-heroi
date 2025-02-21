import { Component, OnInit } from '@angular/core';
import { Heroi } from '../../models/heroi.model';
import { HeroiService } from '../../services/heroi.service';
import { MatDialog } from '@angular/material/dialog';
import { HeroiFormComponent } from '../heroi-form/heroi-form.component';

@Component({
  selector: 'app-herois-lista',
  templateUrl: './herois-lista.component.html',
  styleUrls: ['./herois-lista.component.scss'],
  standalone: false,
})
export class HeroisListaComponent implements OnInit {
  herois: Heroi[] = [];
  colunas = ['id', 'nome', 'nomeHeroi', 'dataNascimento', 'altura', 'peso', 'superpoderes', 'acoes'];


  constructor(
    private heroiService: HeroiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarHerois();
  }

  carregarHerois(): void {
    this.heroiService.getHerois().subscribe(herois => {
      this.herois = herois;
    });
  }

  abrirFormulario(heroi?: Heroi): void {
    const dialogRef = this.dialog.open(HeroiFormComponent, {
      width: '600px',
      data: heroi ? { ...heroi } : {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarHerois();
      }
    });
  }

  excluirHeroi(id: number): void {
    if (confirm('Tem certeza que deseja excluir este herói?')) {
      this.heroiService.excluirHeroi(id).subscribe(() => {
        this.carregarHerois();
      });
    }
  }
}