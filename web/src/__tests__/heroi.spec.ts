import { test, expect } from '@playwright/test';
import { HeroiHelper } from './helpers/heroi.helper';
import { v4 } from 'uuid';


test.describe('Operações CRUD de Herói', () => {
  let heroiHelper: HeroiHelper;

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
    heroiHelper = new HeroiHelper(page);
  })

  test('fluxo completo do herói: criar, verificar, editar e verificar novamente', async () => {

    const heroiInicial = heroiHelper.obterHeroiBase();

    await test.step('criar herói', async () => {
      await heroiHelper.criarHeroi(heroiInicial);
    });

    await test.step('verificar herói criado', async () => {
      await heroiHelper.verificarHeroiNaLista(heroiInicial);
    });

    const dadosAtualizados = {
      nome: 'Bruce Wayne Atualizado',
      nomeHeroi: v4(),
      altura: '1.89',
      peso: '96',
    };

    await test.step('editar herói', async () => {
      await heroiHelper.editarHeroi({
        nomeHeroiAtual: heroiInicial.nomeHeroi,
        novosDados: dadosAtualizados,
      });
    });

    await test.step('verificar herói atualizado', async () => {
      await heroiHelper.verificarHeroiNaLista(dadosAtualizados);
    });

    await test.step('buscar e verificar herói', async () => {
      await heroiHelper.buscarHeroi(dadosAtualizados.nomeHeroi);
      await heroiHelper.verificarHeroiNaLista(dadosAtualizados);
    });
  });

  test('deve validar formulário', async ({ page }) => {
    await test.step('tentar salvar formulário vazio', async () => {
      await page.click('button:has-text("Adicionar Novo Herói")');
      await page.click('button:has-text("Salvar")');
    });

    await test.step('verificar mensagens de erro', async () => {
      const erros = await page.locator('mat-error').allTextContents()
      expect(erros).toEqual([
        'Nome é obrigatório',
        'Nome de herói é obrigatório',
        'Altura é obrigatória',
        'Peso é obrigatório',
      ]);
    });
  });

  test('deve filtrar heróis na lista', async ({ page }) => {
    const heroi = heroiHelper.obterHeroiBase();
    
    await test.step('criar herói para busca', async () => {
      await heroiHelper.criarHeroi(heroi);
    });

    await test.step('realizar busca com dados', async () => {
      await heroiHelper.buscarHeroi(heroi.nomeHeroi);
    });

    await test.step('verificar resultados com dados', async () => {
      await expect(page.locator('table')).toContainText(heroi.nomeHeroi);
    });

    const termoUnico = v4()
    await test.step('verificar resultados sem dados', async () => {
      await heroiHelper.buscarHeroi(termoUnico);
    });

    await test.step('verificar resultados sem dados', async () => {
      const semResultadosLocator = await page.locator('.no-data-message')

      await expect(semResultadosLocator).toBeVisible();
      await expect(semResultadosLocator).toContainText(
        `Nenhum herói encontrado para "${termoUnico}"`
      );
    });
});});
