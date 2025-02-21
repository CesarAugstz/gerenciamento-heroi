import * as E from 'fp-ts/Either'
import { describe, it, expect } from 'vitest'
import { criarFuncaoSafe } from './criar-funcao-safe'

describe('criarFuncaoSafe', () => {
  const dividir = (
    numerador: number,
    denominador: number
  ): E.Either<Error, number> =>
    denominador === 0
      ? E.left(new Error('Divisão por zero'))
      : E.right(numerador / denominador);

  const tentarDividir = criarFuncaoSafe(dividir);

  it('ou deve retornar o resultado para operação válida', () => {
    const resultado = tentarDividir(10, 2).ou(0);
    expect(resultado).toBe(5);
  });

  it('ou deve retornar valor padrão em caso de erro', () => {
    const resultado = tentarDividir(10, 0).ou(0);
    expect(resultado).toBe(0);
  });

  it('ouIgnorar deve retornar o resultado para operação válida', () => {
    const resultado = tentarDividir(10, 2).ouIgnorar();
    expect(resultado).toBe(5);
  });

  it('ouIgnorar deve retornar null em caso de erro', () => {
    const resultado = tentarDividir(10, 0).ouIgnorar();
    expect(resultado).toBe(null);
  });

  it('ouErro deve retornar o resultado para operação válida', () => {
    const resultado = tentarDividir(10, 2).ouErro();
    expect(resultado).toBe(5);
  });

  it('ouErro deve lançar erro para operação inválida', () => {
    expect(() => tentarDividir(10, 0).ouErro()).toThrowError('Divisão por zero');
  });
});
