import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  private readonly MAX_MESSAGE_LENGTH = 150;
  
  constructor(private snackBar: MatSnackBar) {}

  private tratarErro(error: unknown): string {
    if (!error) return '';

    if (error instanceof Error) {
      return this.formatLongMessage(error.message);
    }
    return 'Ocorreu um erro desconhecido.';
  }

  private formatLongMessage(message: string): string {
    if (message.length <= this.MAX_MESSAGE_LENGTH) {
      return message;
    }
    return message.substring(0, this.MAX_MESSAGE_LENGTH) + '...';
  }

  mostrarSucesso(mensagem: string): void {
    this.snackBar.open(this.formatLongMessage(mensagem), 'Fechar', {
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

    this.snackBar.open(this.formatLongMessage(mensagemFormatada), 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-erro', 'multiline-snackbar'],
    });
  }
}