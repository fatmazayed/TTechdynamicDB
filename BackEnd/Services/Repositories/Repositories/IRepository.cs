using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Services.Repositories.Repositories
{
    public interface IRepository<T> where T : class
    {
        #region Get All Data
        IEnumerable<T> GetAll();

        IQueryable<T> Query();

        ICollection<T> GetAll_Collection();

        Task<ICollection<T>> GetAllAsync();

        IEnumerable<T> Filter(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "",
            int? page = null,
            int? pageSize = null);

        Task<ICollection<T>> FindAllAsync(Expression<Func<T, bool>> filter = null, string includeProperties = "");
        #endregion

        #region Get Data By ID
        T GetById(int id);

        Task<T> GetByIdAsync(int id);

        T GetByUniqueId(string id);

        Task<T> GetByUniqueIdAsync(string id);

        T Find(Expression<Func<T, bool>> match);

        Task<T> FindAsync(Expression<Func<T, bool>> match);

        ICollection<T> FindAll(Expression<Func<T, bool>> match);

        IQueryable<T> FindBy(Expression<Func<T, bool>> expression);

        T GetFirstOrDefault(Expression<Func<T, bool>> filter = null, string includeProperties = null);

        #endregion

        #region Add New
        T Add(T entity);
        Task<T> AddAsync(T entity);
        Task Create(T entity);
        void Insert(T entity);
        int InsertData(T entity);
        #endregion

        #region Update
        T Update(T updated);
        void UpdateData(T entity);
        Task<T> UpdateAsync(T updated);
        Task Update(int id, T entity);
        int Edit(T entity);
        #endregion

        #region Remove
        void Delete(T entity);
        Task<int> DeleteAsync(T entity);
        void Remove(int Id);
        Task Delete(int id);
        int Remove(T entity);
        int RemoveData(int Id);
        int Removeall(IEnumerable<T> entity);
        #endregion

        int Count();
        Task<int> CountAsync();
        bool Exist(Expression<Func<T, bool>> predicate);

        #region Functions with Long paramters
        T GetById(long id);
        long RemoveData(long Id);
        void Remove(long Id);
        #endregion

        #region Functions with string paramters
        T GetById(Guid id);
        int RemoveData(Guid Id);
        void Remove(Guid Id);
        #endregion
    }
}
