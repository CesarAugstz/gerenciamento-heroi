namespace api.Exceptions;

public abstract class ExcecaoBase(string message, int statusCode) : Exception(message)
{
    public int StatusCode { get; } = statusCode;
}
