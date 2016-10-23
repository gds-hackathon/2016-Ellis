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
    [RoutePrefix("api/Transaction")]
    public class TransactionController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<RGD_Transaction> Get()
        {
            try
            {
                //User.Identity.Name
                using (var ctx = new ETDB1Entities())
                {
                    if (User.Identity.Name == ConfigurationManager.AppSettings["admin"])
                    {
                        return ctx.RGD_Transaction.OrderByDescending(x=>x.createdate).ToList();
                    }
                    var result = ctx.RGD_Transaction.Where(x => x.useremail == User.Identity.Name);
                    if (result.Any())
                    {
                        return result.OrderByDescending(x => x.createdate).ToList();
                    }
                    return null;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // GET api/<controller>/5
        public RGD_Transaction Get(int id)
        {
            try
            {
                //User.Identity.Name
                using (var ctx = new ETDB1Entities())
                {
                    var result = ctx.RGD_Transaction.Where(x => x.id == id);
                    if (result.Any())
                    {
                        return result.FirstOrDefault();
                    }
                    return null;
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // POST api/<controller>
        public void Post([FromBody]RGD_Transaction value)
        {
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    var tran = ctx.RGD_Transaction.SingleOrDefault(x => x.id == value.id);
                    var mer = ctx.RGD_Merchant.SingleOrDefault(x => x.name == value.merchantname);
                    var account = ctx.RGD_Account.SingleOrDefault(x => x.email == User.Identity.Name);
                    var adminID = ConfigurationManager.AppSettings["admin"];
                    var adminAccount = ctx.RGD_Account.SingleOrDefault(x => x.email == adminID);
                    if (tran != null)
                    {
                        tran.merchantname = value.merchantname;
                        tran.status = value.status;
                        tran.amount = value.amount;
                        tran.changedate = DateTime.Now;
                        tran.merchantname = value.merchantname;
                        if (mer != null)
                        {
                            tran.discount = mer.discount;
                            tran.companypayamount = value.amount * mer.companyPayRate ?? 0;
                            tran.userpayamount = value.amount - tran.companypayamount;
                        }
                        else
                        {
                            tran.discount = 1;
                            tran.companypayamount = 0;
                            tran.userpayamount = value.amount;
                        }
                    }
                    //account balance
                    account.balance = account.balance - tran.userpayamount;
                    adminAccount.balance = adminAccount.balance - tran.companypayamount;
                    ctx.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
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