import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Heroi } from '../../models/heroi.model';
import { HeroiService } from '../../services/heroi.service';
import { z } from 'zod';
import { obterHeroiFormularioSchema } from '../../schemas/obterHeroiFormularioSchema';
import {
  formatarDataProgressivo,
  tentarFormatarDataProgressivo,
} from '../../utils/formatadores/data.formatador';
import dayjs from 'dayjs';
import { tentarConverterStringParaData } from '../../utils/conversores/string-data.conversor';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-heroi-form',
  templateUrl: './heroi-form.component.html',
  styleUrls: ['./heroi-form.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  standalone: false,
})
export class HeroiFormComponent implements OnInit {
  heroiForm!: FormGroup;
  modoEdicao: boolean = false;
  errosValidacao: Record<string, string> = {};

  constructor(
    private fb: FormBuilder,
    private heroiService: HeroiService,
    private dialogRef: MatDialogRef<HeroiFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Heroi>,
    private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.modoEdicao = !!this.data.id;

    this.heroiForm = this.fb.group({
      id: [this.data.id],
      nome: [this.data.nome || '', [Validators.required]],
      nomeHeroi: [this.data.nomeHeroi || '', [Validators.required]],
      dataNascimento: [this.data.dataNascimento],
      altura: [
        this.data.altura || null,
        [Validators.required, Validators.min(0)],
      ],
      peso: [this.data.peso || null, [Validators.required, Validators.min(0)]],
    });

    console.log('oninit', {
      formvalordata: this.heroiForm.value.dataNascimento,
    });
  }

  onSubmit(): void {
    if (this.heroiForm.invalid) {
      this.heroiForm.markAllAsTouched();
      return;
    }

    const dadosHeroi = this.heroiForm.value;

    try {
      obterHeroiFormularioSchema().parse(dadosHeroi);
      this.errosValidacao = {};

      if (this.modoEdicao) {
        this.heroiService.atualizarHeroi(dadosHeroi).subscribe({
          next: () => this.dialogRef.close(true),
          error: (erro) => console.error('Erro ao atualizar herói:', erro),
        });
      } else {
        this.heroiService.adicionarHeroi(dadosHeroi).subscribe({
          next: () => this.dialogRef.close(true),
          error: (erro) => console.error('Erro ao adicionar herói:', erro),
        });
      }
    } catch (erro) {
      console.error('Erro de validação:', { erro });
      if (erro instanceof z.ZodError) {
        this.errosValidacao = {};
        erro.errors.forEach((e) => {
          const campo = e.path[0].toString();
          this.errosValidacao[campo] = e.message;
        });
      }
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  formatarData(event?: Event): void {
    const input = event?.target as HTMLInputElement | null;

    const valorForm = this.heroiForm.value.dataNascimento;

    if (!input) return;
    const cursorPosition = input?.selectionStart || 0;
    const valorRaw = input?.value ?? valorForm;

    const valorFormatado = tentarFormatarDataProgressivo(valorRaw).ou('');

    const novaPosicao =
      cursorPosition + (valorFormatado?.length - valorRaw?.length);

    this.heroiForm.patchValue({
      dataNascimento: tentarConverterStringParaData(valorFormatado).ouIgnorar(),
    });

    input.value = valorFormatado;
    requestAnimationFrame(() => {
      input?.setSelectionRange(novaPosicao, novaPosicao);
    });
  }
  mudouData(event?: Event): void {}
}
