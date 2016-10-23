using ETDAC.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EFApi.Controllers.Transaction
{
    [Authorize]
    [RoutePrefix("api/UserAccount")]
    public class UserAccountController : ApiController
    {
        // GET api/<controller>
        public RGD_Account Get()
        {
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    var account = ctx.RGD_Account.SingleOrDefault(x => x.email == User.Identity.Name);
                    return account;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Route("UserTransaction")]
        [HttpPost]
        public IEnumerable<RGD_Transaction> GetUserTransaction(RGD_Account user)
        {
            if (User.Identity.Name != ConfigurationManager.AppSettings["admin"])
            {
                return null;
            }
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    var transaction = ctx.RGD_Transaction.Where(x => x.useremail == user.email).OrderBy(x => x.useremail).ToList();
                    return transaction;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Route("AllAccount")]
        [HttpGet]
        public IEnumerable<RGD_Account> AllAccount()
        {
            if (User.Identity.Name != ConfigurationManager.AppSettings["admin"])
            {
                return null;
            }
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    var account = ctx.RGD_Account.OrderBy(x=>x.email).ToList();
                    return account;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        // GET api/<controller>/5
        public string Get(string email)
        {
            //if (User.Identity.Name != ConfigurationManager.AppSettings["admin"])
            //{
            //    return null;
            //}
            //try
            //{
            //    using (var ctx = new ETDB1Entities())
            //    {
            //        var transaction = ctx.RGD_Transaction.Where(x => x.useremail == email).OrderBy(x => x.useremail).ToList();
            //        return transaction;
            //    }
            //}
            //catch (Exception e)
            //{
            //    throw e;
            //}
            return email;
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