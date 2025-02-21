import { Page } from '@playwright/test';
import { id } from 'fp-ts/lib/Refinement';
import { v4 } from 'uuid';

export class HeroiHelper {
  constructor(private page: Page) {}

  obterSuperpoderesBase() {
    return [
      {
        id: 1,
        nome: 'Super Força',
        descricao: 'Capacidade de exercer força muito além dos limites humanos',
      },
      { id: 2, nome: 'Voo', descricao: 'Habilidade de voar e levitar' },
      {
        id: 3,
        nome: 'Invisibilidade',
        descricao: 'Poder de ficar invisível aos olhos humanos',
      },
    ];
  }

  private async preencherFormulario(heroi: {
    nome?: string;
    nomeHeroi?: string;
    dataNascimento?: string;
    altura?: string;
    peso?: string;
    superpoderes?: string[]
  }) {
    if (heroi.nome) 
      await this.page.fill('input[formControlName="nome"]', heroi.nome);
    if (heroi.nomeHeroi)
      await this.page.fill('input[formControlName="nomeHeroi"]', heroi.nomeHeroi);
    if (heroi.dataNascimento)
      await this.page.fill('input[formControlName="dataNascimento"]', heroi.dataNascimento);
    if (heroi.altura)
      await this.page.fill('input[formControlName="altura"]', heroi.altura);
    if (heroi.peso)
      await this.page.fill('input[formControlName="peso"]', heroi.peso);

    if (heroi.superpoderes?.length) {
      await this.page.click('mat-select[formControlName="superpoderes"]');
      for (const poderId of heroi.superpoderes) {
        await this.page.locator('mat-option', {
          hasText: poderId,
        }).click();
      }
      await this.page.click('mat-select[formControlName="superpoderes"]', { 
        force: true 
      });
    }
  }

  async criarHeroi(heroi: {
    nome: string;
    nomeHeroi: string;
    dataNascimento: string;
    altura: string;
    peso: string;
    superpoderes?: string[]
  }) {
    await this.page.click('button:has-text("Adicionar Novo Herói")');
    await this.preencherFormulario(heroi);
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
      superpoderes?: string[]
    };
  }) {
    await this.page.click(
      `tr:has-text("${nomeHeroiAtual}") button mat-icon:has-text("edit")`
    );
    await this.preencherFormulario(novosDados);
    await this.page.click('button:has-text("Salvar")');
  }

  obterHeroiBase() {
    return {
      nome: v4(),
      nomeHeroi: v4(),
      dataNascimento: '01/01/1980',
      altura: '1.88',
      peso: '95',
      superpoderes: this.obterSuperpoderesBase().map(poder => poder.nome).slice(0, 2)
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
