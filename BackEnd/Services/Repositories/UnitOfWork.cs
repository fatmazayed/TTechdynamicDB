using Data;
using Services.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext db;
        public ICustomers _Customer { get; private set; }
        public ICustomerVehicleStatus _CustomerVehicleStatus { get; private set; }

        public UnitOfWork(ApplicationDbContext db)
        {
            this.db = db;

            _Customer = new Customers(db);
            _CustomerVehicleStatus = new CustomerVehicleStatus(db);
        }

        public void Commit()
        {
            db.SaveChanges();
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}
