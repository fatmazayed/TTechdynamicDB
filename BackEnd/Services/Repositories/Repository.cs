using Services.Repositories.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext context;
        internal DbSet<T> dbset;
        public Repository(DbContext Context)
        {
            context = Context;
            this.dbset = context.Set<T>();
        }

        #region Get All Data
        public IQueryable<T> Query()
        {
            return dbset.AsQueryable();
        }
        public IEnumerable<T> GetAll()
        {
            return dbset.ToList();
        }
        public ICollection<T> GetAll_Collection()
        {
            return dbset.ToList();
        }
        public async Task<ICollection<T>> GetAllAsync()
        {
            return await dbset.ToListAsync();
        }

        #endregion

        #region Filter
        public IEnumerable<T> Filter(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "", int? page = null, int? pageSize = null)
        {
            IQueryable<T> query = dbset;
            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            if (includeProperties != null)
            {
                foreach (
                    var includeProperty in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }

            if (page != null && pageSize != null)
            {
                query = query.Skip((page.Value - 1) * pageSize.Value).Take(pageSize.Value);
            }

            return query.ToList();
        }
        public ICollection<T> FindAll(Expression<Func<T, bool>> match)
        {
            return dbset.Where(match).ToList();
        }
        public async Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> filter, string includeProperties = "")
        {
            IQueryable<T> query = await dbset.Where(filter).ToListAsync() as IQueryable<T>;
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includeProperty);
                }
            }
            return query.ToList();
        }
        public IQueryable<T> FindBy(Expression<Func<T, bool>> expression)
        {
            return dbset.Where(expression);
        }
        public async Task<T> FindAsync(Expression<Func<T, bool>> match)
        {
            return await dbset.SingleOrDefaultAsync(match);
        }
        #endregion

        #region Get By Id
        public T GetById(int id)
        {
            return dbset.Find(id);
        }
        public T GetByUniqueId(string id)
        {
            return dbset.Find(id);
        }
        public T Find(Expression<Func<T, bool>> match)
        {
            return dbset.SingleOrDefault(match);
        }
        public async Task<T> GetByIdAsync(int id)
        {
            return await dbset.FindAsync(id);
        }
        public async Task<T> GetByUniqueIdAsync(string id)
        {
            return await dbset.FindAsync(id);
        }
        public T GetFirstOrDefault(Expression<Func<T, bool>> filter = null, string includeProperties = null)
        {
            IQueryable<T> query = dbset;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            // includeProperties Seprate by comma
            if (includeProperties != null)
            {
                foreach (var includePropertie in includeProperties.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
                {
                    query = query.Include(includePropertie);
                }
            }

            return query.FirstOrDefault();
        }

        #endregion

        #region Add New
        public void Insert(T entity)
        {
            dbset.Add(entity);
        }

        public int InsertData(T entity)
        {
            Insert(entity);
            return context.SaveChanges();
        }

        public async Task Create(T entity)
        {
            await dbset.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public T Add(T entity)
        {
            dbset.Add(entity);
            context.SaveChanges();
            return entity;
        }

        public async Task<T> AddAsync(T entity)
        {
            dbset.Add(entity);
            await context.SaveChangesAsync();
            return entity;
        }
        #endregion

        #region Delete
        public void Remove(int Id)
        {
            var entity = GetById(Id);
            if (entity != null)
            {
                dbset.Remove(entity);
            }
        }
        public int Remove(T entity)
        {
            dbset.Remove(entity);
            return context.SaveChanges();
        }
        public int RemoveData(int Id)
        {
            Remove(Id);
            return context.SaveChanges();
        }
        public void Delete(T entity)
        {
            dbset.Remove(entity);
        }
        public int Removeall(IEnumerable<T> entity)
        {
            dbset.RemoveRange(entity);
            return context.SaveChanges();
        }
        public async Task Delete(int id)
        {
            var entity = await GetByIdAsync(id);
            dbset.Remove(entity);
            await context.SaveChangesAsync();
        }
        public async Task<int> DeleteAsync(T entity)
        {
            dbset.Remove(entity);
            return await context.SaveChangesAsync();
        }
        #endregion

        #region Update
        public int Edit(T entity)
        {
            UpdateData(entity);
            return context.SaveChanges();
        }
        public T Update(T updated)
        {
            if (updated == null)
            {
                return null;
            }

            dbset.Attach(updated);
            context.Entry(updated).State = EntityState.Modified;
            context.SaveChanges();

            return updated;
        }
        public async Task<T> UpdateAsync(T updated)
        {
            if (updated == null)
            {
                return null;
            }

            dbset.Attach(updated);
            context.Entry(updated).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return updated;
        }
        public async Task Update(int id, T entity)
        {
            UpdateData(entity);
            await context.SaveChangesAsync();
        }
        public void UpdateData(T entity)
        {
            dbset.Update(entity);
        }
        #endregion

        public int Count()
        {
            return dbset.Count();
        }

        public async Task<int> CountAsync()
        {
            return await dbset.CountAsync();
        }

        public bool Exist(Expression<Func<T, bool>> predicate)
        {
            var exist = dbset.Where(predicate);
            return exist.Any() ? true : false;
        }

        #region Functions with Long paramters
        public T GetById(long id)
        {
            return dbset.Find(id);
        }
        public long RemoveData(long Id)
        {
            Remove(Id);
            return context.SaveChanges();
        }
        public void Remove(long Id)
        {
            var entity = GetById(Id);
            if (entity != null)
            {
                dbset.Remove(entity);
            }
        }


        #endregion

        #region Functions with string paramters
        public T GetById(Guid id)
        {
            return dbset.Find(id);
        }
        public void Remove(Guid Id)
        {
            var entity = GetById(Id);
            if (entity != null)
            {
                dbset.Remove(entity);
            }
        }
        public int RemoveData(Guid Id)
        {
            Remove(Id);
            return context.SaveChanges();
        }
        #endregion

    }
}
