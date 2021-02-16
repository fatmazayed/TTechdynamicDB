using Data;
using Models;
using Services.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Repositories
{
    public class CustomerVehicleStatus : Repository<CustomerVehicleStatusVM>, ICustomerVehicleStatus
    {
        private readonly ApplicationDbContext context;

        public CustomerVehicleStatus(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }
    }
}
