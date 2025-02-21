import * as E from 'fp-ts/Either';

export function criarFuncaoSafe<E extends Error, A, P extends any[]>(
  fn: (...args: P) => E.Either<E, A>
): (...args: P) => {
  ou: (defaultValue: A) => A;
  ouIgnorar: () => A | null;
  ouErro: () => A;
} {
  return (...args: P) => {
    const result = fn(...args);
    return {
      ou: (defaultValue: A) => E.getOrElse(() => defaultValue)(result),
      ouIgnorar: () => E.getOrElseW(() => null)(result),
      ouErro: () =>
        E.getOrElseW((error) => {
          throw error;
        })(result),
    };
  };
}
