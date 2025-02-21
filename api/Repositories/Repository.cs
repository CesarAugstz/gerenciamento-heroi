using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class Repository<T>(ApplicationDbContext context) : IRepository<T>
    where T : class
{
    private readonly ApplicationDbContext _context = context;
    private readonly DbSet<T> _dbSet = context.Set<T>();

    public async Task<IEnumerable<T>> BuscarTodosAsync(CancellationToken cancellationToken)
    {
        return await _dbSet.ToListAsync(cancellationToken);
    }

    public async Task<T?> BuscarPorIdAsync(int id, CancellationToken cancellationToken)
    {
        return await _dbSet.FindAsync([id], cancellationToken);
    }

    public async Task<IEnumerable<T>> Buscar(
        Func<IQueryable<T>, IQueryable<T>> query,
        CancellationToken cancellationToken
    )
    {
        return await query(_dbSet).ToListAsync(cancellationToken);
    }

    public async Task<T> AdicionarAsync(T entity, CancellationToken cancellationToken)
    {
        await _dbSet.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<T> AtualizarAsync(T entity, CancellationToken cancellationToken)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return entity;
    }

    public async Task<bool> DeletarAsync(int id, CancellationToken cancellationToken)
    {
        var entity = await BuscarPorIdAsync(id, cancellationToken);
        if (entity == null)
            return false;

        _dbSet.Remove(entity);
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }
}
