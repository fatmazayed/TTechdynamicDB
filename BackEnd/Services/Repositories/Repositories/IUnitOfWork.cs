using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Repositories.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        void Commit();
        
        ICustomers _Customer { get; }
        ICustomerVehicleStatus _CustomerVehicleStatus { get; }
        
    }
}
