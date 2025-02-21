import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Heroi, Superpoder } from '../../models/heroi.model';
import { z } from 'zod';
import { tentarFormatarDataProgressivo } from '../../utils/formatadores/data.formatador';
import { tentarConverterStringParaData } from '../../utils/conversores/string-data.conversor';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { obterEditarHeroiFormularioSchema } from '../../schemas/obterHeroiFormularioSchema';
import { HeroiService } from '../../services/api/heroi.service';
import { MensagemService } from '../../services/ng/mensagem.service';
import dayJs from '../../utils/dayjs/dayjs.utils';

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
  superpoderes: Superpoder[] = [];

  constructor(
    private fb: FormBuilder,
    private heroiService: HeroiService,
    private dialogRef: MatDialogRef<HeroiFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Heroi>,
    private dateAdapter: DateAdapter<any>,
    private mensagemService: MensagemService
  ) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit(): void {
    this.carregarSuperpoderes();
    this.modoEdicao = !!this.data.id;

    const dataConvertida = dayJs(this.data.dataNascimento as unknown as string);
    const dataValor = dataConvertida.isValid() ? dataConvertida.toDate() : null;

    this.heroiForm = this.fb.group({
      id: [this.data.id],
      nome: [this.data.nome || '', [Validators.required]],
      nomeHeroi: [this.data.nomeHeroi || '', [Validators.required]],
      dataNascimento: [dataValor || null],
      altura: [
        this.data.altura || null,
        [Validators.required, Validators.min(0)],
      ],
      peso: [this.data.peso || null, [Validators.required, Validators.min(0)]],
      superpoderes: [this.data.superpoderes?.map((s) => s.id) || []],
    });
  }

  carregarSuperpoderes(): void {
    this.heroiService.getSuperpoderes().subscribe({
      next: (poderes) => (this.superpoderes = poderes),
      error: (erro) =>
        this.mensagemService.mostrarErro('Erro ao carregar superpoderes', erro),
    });
  }

  onSubmit(): void {
    if (this.heroiForm.invalid) {
      this.heroiForm.markAllAsTouched();
      return;
    }

    if (this.errosValidacao['dataNascimento']) {
      this.mensagemService.mostrarErro(
        `Erro de validação: ${this.errosValidacao['dataNascimento']}`
      );
      return;
    }

    const dadosHeroi = this.heroiForm.value;

    try {
      this.errosValidacao = {};

      if (this.modoEdicao) {
        obterEditarHeroiFormularioSchema().parse(dadosHeroi);
        this.heroiService.atualizarHeroi(dadosHeroi).subscribe({
          next: () => {
            this.dialogRef.close(true);
            this.mensagemService.mostrarSucesso(
              'Herói atualizado com sucesso!'
            );
          },
          error: (erro) =>
            this.mensagemService.mostrarErro('Erro ao atualizar herói', erro),
        });
      } else {
        obterEditarHeroiFormularioSchema().parse(dadosHeroi);
        this.heroiService.adicionarHeroi(dadosHeroi).subscribe({
          next: () => {
            this.dialogRef.close(true);
            this.mensagemService.mostrarSucesso(
              'Herói adicionado com sucesso!'
            );
          },
          error: (erro) =>
            this.mensagemService.mostrarErro('Erro ao adicionar herói', erro),
        });
      }
    } catch (erro) {
      console.error('Erro de validação:', { erro });
      if (erro instanceof z.ZodError) {
        this.mensagemService.mostrarErro('Erro de validação', erro);
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

    if (!input) return;
    const cursorPosition = input?.selectionStart || 0;
    const valorRaw = input?.value;

    const valorFormatado = tentarFormatarDataProgressivo(valorRaw).ou('');

    const novaPosicao =
      cursorPosition + (valorFormatado?.length - valorRaw?.length);

    const dataConvertida =
      tentarConverterStringParaData(valorFormatado).ouIgnorar();

    if (!dayJs(dataConvertida).isValid()) {
      this.errosValidacao['dataNascimento'] = 'Data inválida';
    } else if (dayJs(dataConvertida).isAfter(dayJs())) {
      this.errosValidacao['dataNascimento'] =
        'Date de nascimento não pode ser maior que a data atual';
    } else this.errosValidacao['dataNascimento'] = '';

    const heroiControl = this.heroiForm.get('dataNascimento');
    heroiControl?.patchValue(dataConvertida);
    heroiControl?.updateValueAndValidity();

    input.value = valorFormatado;
    requestAnimationFrame(() => {
      input?.setSelectionRange(novaPosicao, novaPosicao);
    });
  }
}
