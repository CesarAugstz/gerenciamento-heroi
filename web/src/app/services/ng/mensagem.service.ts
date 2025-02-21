import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  constructor(private snackBar: MatSnackBar) {}

  private tratarErro(error: unknown): string {
    if (!error) return '';

    if (error instanceof Error) {
      return error.message;
    }
    return 'Ocorreu um erro desconhecido.';
  }

  mostrarSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      
      panelClass: ['snackbar-sucesso'],
    });
  }

  mostrarErro(mensagem: string, erro?: unknown): void {
    console.error('Erro:', erro);

    let mensagemFormatada = mensagem;
    if (erro) mensagemFormatada += `: ${this.tratarErro(erro)}`;

    this.snackBar.open(mensagemFormatada, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-erro'],
    });
  }
}
