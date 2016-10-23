using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFClass
{
    class Program
    {
        static void Main(string[] args)
        {
            var item = new AspNetRoles();
            using (var model = new Model1())
            {
                item = model.AspNetRoles.FirstOrDefault();
                Console.WriteLine(item.AspNetUsers.FirstOrDefault().Email);
            }

        }
    }
}
