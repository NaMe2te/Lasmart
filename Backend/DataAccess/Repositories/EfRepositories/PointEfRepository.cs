using DataAccess.DBContexts;
using DataAccess.Entities;

namespace DataAccess.Repositories.EfRepositories;

public class PointEfRepository : BaseEfRepository<Point>
{
    public PointEfRepository(DatabaseContext databaseContext) 
        : base(databaseContext) { }
}