using System.Text.Json;
using api.Exceptions;

namespace api.Middleware;

public class ErrorHandlingMiddleware(RequestDelegate next)
{
    private readonly RequestDelegate _next = next;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ExcecaoBase ex)
        {
            context.Response.StatusCode = ex.StatusCode;
            context.Response.ContentType = "application/json";

            var errorResponse = new { message = ex.Message, statusCode = ex.StatusCode };

            await context.Response.WriteAsJsonAsync(errorResponse);
        }
        catch (Exception ex)
        {

            System.Console.WriteLine("middleware erro");
            System.Console.WriteLine(ex.Message);
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var errorResponse = new { message = "Erro interno do servidor", statusCode = 500 };

            await context.Response.WriteAsJsonAsync(errorResponse);
        }
    }
}
