import * as E from 'fp-ts/Either';
import { criarFuncaoSafe } from '../fp-ts/criar-funcao-safe';

export function formatarDataProgressivo(
  data?: string
): E.Either<Error, string> {
  if (!(typeof data === 'string')) return E.left(new Error('Data inválida'));

  if (data === null || data === undefined) return E.left(new Error('Data inválida'));

  const dataLimpa = data.replace(/\D/g, '').substring(0, 8);
  const dia = dataLimpa.substring(0, 2);
  const mes = dataLimpa.substring(2, 4);
  const ano = dataLimpa.substring(4, 8);

  if (dataLimpa.length <= 2) return E.right(dia);
  if (dataLimpa.length <= 4) return E.right(`${dia}/${mes}`);
  return E.right(`${dia}/${mes}/${ano}`);
}

export const tentarFormatarDataProgressivo = criarFuncaoSafe(
  formatarDataProgressivo
);
