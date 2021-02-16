using Data;
using Models;
using Services.Repositories.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Repositories
{
    public class Vehicles : Repository<VehiclesVM>, IVehicles
    {
        private readonly ApplicationDbContext context;

        public Vehicles(ApplicationDbContext context) : base(context)
        {
            this.context = context;
        }
    }
}
