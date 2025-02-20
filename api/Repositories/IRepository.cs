namespace api.Repositories;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> BuscarTodosAsync(CancellationToken cancellationToken);
    Task<T?> BuscarPorIdAsync(int id, CancellationToken cancellationToken);
    Task<IEnumerable<T>> Buscar(Func<IQueryable<T>, IQueryable<T>> query, CancellationToken cancellationToken);
    Task<T> AdicionarAsync(T entity, CancellationToken cancellationToken);
    Task<T> AtualizarAsync(T entity, CancellationToken cancellationToken);
    Task<bool> DeletarAsync(int id, CancellationToken cancellationToken);
}
