using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EFApi.EnumCollection;
using ETDAC.Model;

namespace EFApi.Controllers.Transaction
{
    [Authorize]
    [RoutePrefix("api/Transaction")]
    public class TransactionStatusController : ApiController
    {
        // GET api/<controller>
        public string Get()
        {
            var rs = new Random().Next(0, 3);
            return ((TransactionStatus)rs).ToString();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            try
            {
                //User.Identity.Name
                using (var ctx = new ETDB1Entities())
                {
                    var result = ctx.RGD_Transaction.Where(x => x.useremail == User.Identity.Name && x.id == id).FirstOrDefault();
                    return result.status;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

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