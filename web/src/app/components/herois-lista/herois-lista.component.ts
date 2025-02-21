import { Component, OnInit } from '@angular/core';
import { Heroi } from '../../models/heroi.model';
import { MatDialog } from '@angular/material/dialog';
import { HeroiFormComponent } from '../heroi-form/heroi-form.component';
import { HeroiService } from '../../services/api/heroi.service';
import { MensagemService } from '../../services/ng/mensagem.service';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import dayJs from '../../utils/dayjs/dayjs.utils';

@Component({
  selector: 'app-herois-lista',
  templateUrl: './herois-lista.component.html',
  styleUrls: ['./herois-lista.component.scss'],
  standalone: false,
})
export class HeroisListaComponent implements OnInit {
  herois: Heroi[] = [];
  colunas = [
    'id',
    'nome',
    'nomeHeroi',
    'dataNascimento',
    'altura',
    'peso',
    'superpoderes',
    'acoes',
  ];

  constructor(
    private heroiService: HeroiService,
    private dialog: MatDialog,
    private mensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this.carregarHerois();
  }

  carregarHerois(): void {
    this.heroiService.getHerois().subscribe({
      next: (herois) => (this.herois = herois),
      error: (erro) =>
        this.mensagemService.mostrarErro('Erro ao carregar heróis', erro),
    });
  }

  formatarData(data?: string): string {
    try {
      if (!data) return '';
      return dayJs(data).format('DD/MM/YYYY');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return '';
    }
  }

  abrirFormulario(heroi?: Heroi): void {
    const dialogRef = this.dialog.open(HeroiFormComponent, {
      width: '600px',
      data: heroi ? { ...heroi } : {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.carregarHerois();
      }
    });
  }

  abrirConfirmacao(id: number): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '450px',
      panelClass: 'confirmacao-dialog-panel',
      disableClose: true,
      data: {
        titulo: 'Confirmar Exclusão',
        mensagem:
          'Tem certeza que deseja excluir este herói? Esta ação não pode ser desfeita.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.heroiService.excluirHeroi(id).subscribe({
          next: () => {
            this.carregarHerois();
            this.mensagemService.mostrarSucesso('Herói excluído com sucesso!');
          },
          error: (erro) => {
            this.mensagemService.mostrarErro(
              'Erro ao excluir herói: ' + erro.message
            );
          },
        });
      }
    });
  }

  excluirHeroi(id: number): void {
    this.abrirConfirmacao(id);
  }
}
