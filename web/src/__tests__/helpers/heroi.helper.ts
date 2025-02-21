import { Page } from '@playwright/test';
import { v4 } from 'uuid';

export class HeroiHelper {
  constructor(private page: Page) {}

  async criarHeroi(heroi: {
    nome: string;
    nomeHeroi: string;
    dataNascimento: string;
    altura: string;
    peso: string;
  }) {
    await this.page.click('button:has-text("Adicionar Novo Herói")');
    await this.page.fill('input[formControlName="nome"]', heroi.nome);
    await this.page.fill('input[formControlName="nomeHeroi"]', heroi.nomeHeroi);
    await this.page.fill(
      'input[formControlName="dataNascimento"]',
      heroi.dataNascimento
    );
    await this.page.fill('input[formControlName="altura"]', heroi.altura);
    await this.page.fill('input[formControlName="peso"]', heroi.peso);
    await this.page.click('button:has-text("Salvar")');
  }

  async editarHeroi({
    nomeHeroiAtual,
    novosDados,
  }: {
    nomeHeroiAtual: string;
    novosDados: {
      nome?: string;
      nomeHeroi?: string;
      dataNascimento?: string;
      altura?: string;
      peso?: string;
    };
  }) {
    await this.page.click(
      `tr:has-text("${nomeHeroiAtual}") button mat-icon:has-text("edit")`
    );

    if (novosDados.nome)
      await this.page.fill('input[formControlName="nome"]', novosDados.nome);
    if (novosDados.nomeHeroi)
      await this.page.fill(
        'input[formControlName="nomeHeroi"]',
        novosDados.nomeHeroi
      );
    if (novosDados.dataNascimento)
      await this.page.fill(
        'input[formControlName="dataNascimento"]',
        novosDados.dataNascimento
      );
    if (novosDados.altura)
      await this.page.fill(
        'input[formControlName="altura"]',
        novosDados.altura
      );
    if (novosDados.peso)
      await this.page.fill('input[formControlName="peso"]', novosDados.peso);

    await this.page.click('button:has-text("Salvar")');
  }

  obterHeroiBase() {
    return {
      nome: v4(),
      nomeHeroi: v4(),
      dataNascimento: '01/01/1980',
      altura: '1.88',
      peso: '95',
    };
  }

  async verificarHeroiNaLista(heroi: {
    nome: string;
    nomeHeroi: string;
    dataNascimento?: string;
    altura?: string;
    peso?: string;
  }) {
    await this.page.waitForSelector(`tr:has-text("${heroi.nome}")`);
    await this.page.waitForSelector(`tr:has-text("${heroi.nomeHeroi}")`);
    if (heroi.altura)
      await this.page.waitForSelector(`tr:has-text("${heroi.altura}")`);
    if (heroi.peso)
      await this.page.waitForSelector(`tr:has-text("${heroi.peso}")`);
  }

  async buscarHeroi(termo: string) {
    await this.page.fill(
      'input[placeholder="Digite o nome ou nome de herói"]',
      termo
    );
    await this.page.waitForTimeout(500);
  }
}
