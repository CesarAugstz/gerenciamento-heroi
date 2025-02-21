import { describe, it, expect } from 'vitest';
import {
  converterStringParaData,
  tentarConverterStringParaData,
} from './string-data.conversor';
import E from 'fp-ts/lib/Either';
import dayjs from 'dayjs';

describe('converterStringParaData', () => {
  it('casos de sucesso', () => {
    const valoresAConverter = [
      ['01/01/2020', new Date(2020, 0, 1)],
      ['02/02/2023', new Date(2023, 1, 2)],
      ['31/12/2025', new Date(2025, 11, 31)],
    ];

    valoresAConverter.forEach(([valor, esperado]) => {
      const resultado = converterStringParaData(valor as any);
      expect(resultado).toEqual(E.right(esperado));
    });
  });

  it('casos de erro data inválida', () => {
    const valoresInvalidos = [
      undefined,
      null,
      '',
      '32/01/2023',
      '13/13/2023',
      '01/01/202',
      '01/01/20',
      '01/01/2',
      '01/01',
      '01/0',
      '01',
      '123',
    ];

    valoresInvalidos.forEach((valor) => {
      const resultado = converterStringParaData(valor as string);
      expect(resultado).toEqual(E.left(new Error('Data inválida')));
    });
  });

  it('casos de erro formato inválido', () => {
    const valoresInvalidos = [
      '01/01/2020 12:34:56',
      '01/01/2020 12:34',
      '01/01/2020 12',
      '01/01/2020 12:34:56.789',
    ];
    valoresInvalidos.forEach((valor) => {
      const resultado = converterStringParaData(valor as string);
      expect(resultado).toEqual(E.left(new Error('Data inválida')));
    });
  });

  it('deve aceitar formatos personalizados', () => {
    const valoresAConverter: [string, string, Date][] = [
      ['01/01/2020', 'DD/MM/YYYY', new Date(2020, 0, 1)],
      ['02/02/2023', 'DD/MM/YYYY', new Date(2023, 1, 2)],
      ['2002/02/02', 'YYYY/MM/DD', new Date(2002, 1, 2)],
      ['2002-02-02', 'YYYY-MM-DD', new Date(2002, 1, 2)],
      ['10102020', 'DDMMYYYY', new Date(2020, 9, 10)],
    ];

    valoresAConverter.forEach(([valor, formato, esperado]) => {
      const resultado = converterStringParaData(valor, { formato });
      expect(resultado).toEqual(E.right(esperado));
    });
  });
});
