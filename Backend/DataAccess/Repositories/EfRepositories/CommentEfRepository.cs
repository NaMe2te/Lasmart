using DataAccess.DBContexts;
using DataAccess.Entities;

namespace DataAccess.Repositories.EfRepositories;

public class CommentEfRepository : BaseEfRepository<Comment>
{
    public CommentEfRepository(DatabaseContext databaseContext)
        : base(databaseContext) { }
}