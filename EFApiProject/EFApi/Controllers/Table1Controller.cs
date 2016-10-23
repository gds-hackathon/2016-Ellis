using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ETDAC.Model;
using System.Threading.Tasks;

namespace EFApi.Controllers
{
    [Authorize]
    [RoutePrefix("api/table1")]
    public class Table1Controller : ApiController
    {
        // GET api/<controller>
        public IEnumerable<Table1> Get()
        {
            using (var ctx = new ETDB1Entities())
            {
                var tk = ctx.RGD_Transaction;
                var c = tk.Count();
                return ctx.Table1.ToList();
            }
        }


        // GET api/<controller>/5
        public Table1 Get(int id)
        {
            using (var ctx = new ETDB1Entities())
            {
                return ctx.Table1.Where(x => x.id == id).FirstOrDefault();
            }
        }
        //public async Task<Table1> Get(int id)
        //{
        //    using (var ctx = new ETDB1Entities())
        //    {
        //        return await ctx.Table1.Where(x => x.id == id).FirstOrDefault();
        //    }
        //}

        // POST api/<controller>
        public void Post([FromBody]RGD_Transaction value)
        {
            using (var ctx = new ETDB1Entities())
            {
                var item = ctx.Table1.SingleOrDefault(x => x.id == value.id);
                ctx.SaveChanges();
            }
        }
        //public void Post([FromBody]Table1 value)
        //{
        //    using (var ctx = new ETDB1Entities())
        //    {
        //        var item = ctx.Table1.Single(x => x.id == value.id);
        //        item.name = value.name;
        //        ctx.SaveChanges();
        //    }
        //}


        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}