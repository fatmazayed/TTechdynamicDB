using System;
using System.ComponentModel;
using System.Linq;

namespace Utilities
{
    public class GlobalEnum
    {
        public enum SystemMessage
        {

            [Description("SomeThing Went Wrong"), AmbientValue(0)]
            ExceptionHappened = 0,

            [Description("Added failed"), AmbientValue(1)]
            AddFaild = 1,

            [Description("Added Succeeded"), AmbientValue(2)]
            AddedSucceeded = 2,

            [Description("Updated Succeeded"), AmbientValue(3)]
            UpdatedSucceeded = 3,


            [Description("Updated failed"), AmbientValue(4)]
            Updatedfailed = 4,

            [Description("No Data Found"), AmbientValue(5)]
            NoDataFound = 5,

            [Description("Deleted failed"), AmbientValue(6)]
            Deletedfailed = 6,

            [Description("Deleted Succeeded"), AmbientValue(7)]
            DeletedSucceeded = 7,

            [Description("Published Successfuly"), AmbientValue(8)]
            PublishedSucceeded = 8,

            [Description("Data Dublicated"), AmbientValue(9)]
            DublicatedData = 9,


        }

        public enum Status_Type
        {
            ON = 1,
            OFF = 2,

        }

        /// <summary>
        /// For Constant Data in the System
        /// </summary>
        public enum SystemConstant
        {
            GetCustomerVehicleStatus = 10,
        }


        public static string GetEnumDescription<T>(object value)
        {
            Type type = typeof(T);
            string name = Enum.GetName(typeof(T), value);
            var enumName = Enum.GetNames(type).Where(f => f.Equals(name, StringComparison.CurrentCultureIgnoreCase)).Select(d => d).FirstOrDefault();

            if (enumName == null)
            {
                return string.Empty;
            }
            var field = type.GetField(enumName);
            var customAttribute = field.GetCustomAttributes(typeof(DescriptionAttribute), false);
            return customAttribute.Length > 0 ? ((DescriptionAttribute)customAttribute[0]).Description : enumName;
        }

    }
}
