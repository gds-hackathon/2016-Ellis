using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFClass3
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var ctx = new Model.AngularJSAuthEntities())
            {
                var item = ctx.AspNetUsers.FirstOrDefault();
                Console.Write(item.Email);
            }
        }
    }
}
