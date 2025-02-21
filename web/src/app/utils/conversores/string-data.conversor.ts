import * as E from 'fp-ts/Either';
import { criarFuncaoSafe } from '../fp-ts/criar-funcao-safe';
import dayJs from '../dayjs/dayjs.utils';

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

    const { formato = 'DD/MM/YYYY' } = opcoes;

    const dataConvertidaDayjs = dayJs(data, formato, true);

    if (!dataConvertidaDayjs.isValid())
      return E.left(new Error('Data inválida'));

    return E.right(dataConvertidaDayjs.toDate());
  } catch (error) {
    console.error('Erro ao converter string para data:', error);
    return E.left(new Error('Data inválida'));
  }
}

export const tentarConverterStringParaData = criarFuncaoSafe(
  converterStringParaData
);
