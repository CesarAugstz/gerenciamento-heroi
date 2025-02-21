namespace api.Exceptions;

public class HeroiNaoEncontradoException(string message = "Herói não encontrado")
    : ExcecaoBase(message, 404) { }

public class HeroiJaExisteException(string message = "Já existe um herói com esse nome")
    : ExcecaoBase(message, 400) { }

public class SuperpoderNaoEncontradoException(string message = "Superpoder não encontrado")
    : ExcecaoBase(message, 404) { }

public class HeroiInvalidoException(string message = "Dados do herói são inválidos")
    : ExcecaoBase(message, 400) { }
