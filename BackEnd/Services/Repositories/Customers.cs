using Data;
using Models;
using Services.Repositories.Repositories;

namespace Services.Repositories
{
    public class Customers : Repository<CustomersVM>, ICustomers
    {
        private readonly ApplicationDbContext context;

        public Customers(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }
    }
}
