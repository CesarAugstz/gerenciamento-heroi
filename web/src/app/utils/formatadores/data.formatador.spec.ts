import { describe, it, expect } from 'vitest';
import { formatarDataProgressivo, tentarFormatarDataProgressivo } from './data.formatador';
import E from 'fp-ts/lib/Either';

describe('formatarDataProgressivo', {}, () => {
  it('casos de sucesso', () => {
    const valoresAFormatar = [
      ['0101202012345', '01/01/2020'],
      ['010120201', '01/01/2020'],
      ['01012020', '01/01/2020'],
      ['02022023', '02/02/2023'],
      ['0202203', '02/02/203'],
      ['020220', '02/02/20'],
      ['02022', '02/02/2'],
      ['0202', '02/02'],
      ['02', '02'],
      ['0', '0'],
    ];
    valoresAFormatar.forEach(([valor, esperado]) => {
      const resultado = formatarDataProgressivo(valor);
      expect(resultado).toEqual(E.right(esperado));
    });
  });
  it('casos de erro', () => {
    const valoresAFormatar = [undefined, null];

    valoresAFormatar.forEach((valor) => {
      const resultado = formatarDataProgressivo(valor as unknown as string);
      expect(resultado).toEqual(E.left(new Error('Data inválida')));
    });
  });
});

describe('tentarFormatarDataProgressivo', () => {
  it('ou deve retornar a data formatada para entrada válida', () => {
    const resultado = tentarFormatarDataProgressivo('01012023').ou('');
    expect(resultado).toBe('01/01/2023');
  });

  it('ou deve retornar valor padrão em caso de erro', () => {
    const resultado =
      tentarFormatarDataProgressivo(undefined).ou('Data inválida');
    expect(resultado).toBe('Data inválida');
  });

  it('ouIgnorar deve retornar a data formatada para entrada válida', () => {
    const resultado = tentarFormatarDataProgressivo('01012023').ouIgnorar();
    expect(resultado).toBe('01/01/2023');
  });

  it('ouIgnorar deve retornar null em caso de erro', () => {
    const resultado = tentarFormatarDataProgressivo(null as unknown as string).ouIgnorar();
    expect(resultado).toBe(null);
  });

  it('ouErro deve retornar a data formatada para entrada válida', () => {
    const resultado = tentarFormatarDataProgressivo('01012023').ouErro();
    expect(resultado).toBe('01/01/2023');
  });

  it('ouErro deve lançar erro para entrada inválida', () => {
    expect(() =>
      tentarFormatarDataProgressivo(undefined).ouErro()
    ).toThrowError('Data inválida');
  });
});
