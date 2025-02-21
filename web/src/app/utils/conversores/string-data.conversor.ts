import dayjs from 'dayjs';
import * as E from 'fp-ts/Either';
import { criarFuncaoSafe } from '../fp-ts/criar-funcao-safe';

interface Args {
  formato?: string;
}

export function converterStringParaData(
  data: string,
  opcoes: Args = {}
): E.Either<Error, Date> {
  try {
    if (!(typeof data === 'string')) return E.left(new Error('Data inválida'));
    if (!data) return E.left(new Error('Data inválida'));

    const { formato = 'DDMMYYYY' } = opcoes;

    const dataLimpa = data.replace(/\D/g, '').substring(0, 8);

    const dataConvertidaDayjs = dayjs(dataLimpa, formato, true);

    return E.right(dataConvertidaDayjs.toDate());
  } catch (error) {
    console.error('Erro ao converter string para data:', error);
    return E.left(new Error('Data inválida'));
  }
}

export const tentarConverterStringParaData = criarFuncaoSafe(
  converterStringParaData
);
