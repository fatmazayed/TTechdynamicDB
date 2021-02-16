//using DocumentFormat.OpenXml.Wordprocessing;
//using LinqToDB;
//using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Linq;
using System.Data.Linq.Mapping;

namespace Data
{
    public class AppDbContext : DataContext
    {
        public Table<Member> MemberTable;
        public AppDbContext(string connection) : base(connection) { }
    }

    [Table(Name = "Member")]
    public class Member
    {
         [Column(IsPrimaryKey = true, IsDbGenerated =true)]
        
        public int Id;
        [Column]
        public string Name;
        [Column]
        public int Age;

        [Column]
        public string Phone;
        [Column]
        public string Password;
        [Column]
        public string CompanyName;        
    }
}
