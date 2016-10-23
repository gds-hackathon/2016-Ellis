using ETDAC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EFApi.EnumCollection;

namespace EFApi.Controllers.Transaction
{
    [Authorize]
    [RoutePrefix("api/Payment")]
    public class PaymentController : ApiController
    {
        // GET api/<controller>
        public string Get()
        {
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    var tran = new RGD_Transaction()
                    {
                        useremail = User.Identity.Name,
                        status = TransactionStatus.pending.ToString(),
                        createdate = DateTime.Now
                    };
                    ctx.RGD_Transaction.Add(tran);
                    ctx.SaveChanges();
                    return tran.id.ToString();
                }
            }
            catch (Exception e)
            {
                throw e;
                return null;
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            try
            {
                var value = new RGD_Transaction() {id=id };
                using (var ctx = new ETDB1Entities())
                {
                    //mock data
                    value.status = TransactionStatus.success.ToString();
                    value.amount = new Random().Next(5, 50);
                    var mrid = new Random().Next(1, ctx.RGD_Merchant.Count());
                    value.merchantname = ctx.RGD_Merchant.SingleOrDefault(x => x.id == mrid).name;


                    var tran = ctx.RGD_Transaction.SingleOrDefault(x => x.id == value.id);
                    var mer = ctx.RGD_Merchant.SingleOrDefault(x => x.name == value.merchantname);
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
                            tran.companypayamount = value.amount * mer.companyPayRate;
                            tran.userpayamount = value.amount - tran.companypayamount;
                        }
                    }
                    ctx.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return "success";
        }

        // POST api/<controller>
        public void Post([FromBody]RGD_Transaction value)
        {
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    //var tran = new RGD_Transaction()
                    //{
                    //    useremail = User.Identity.Name,
                    //    status = TransactionStatus.pending.ToString(),
                    //    createdate = DateTime.Now
                    //};
                    var tran = ctx.RGD_Transaction.SingleOrDefault(x=>x.id == value.id);
                    var mer = ctx.RGD_Merchant.SingleOrDefault(x => x.name == value.merchantname);
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
                            tran.companypayamount = value.amount * mer.companyPayRate;
                            tran.userpayamount = value.amount - tran.companypayamount;
                        }
                    }
                    ctx.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        [Route("mimicScan")]
        public void MimicScan([FromBody]RGD_Transaction value)
        {
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    //mock data
                    value.status = TransactionStatus.success.ToString();
                    value.amount = new Random().Next(5, 50);
                    var mrid = new Random().Next(1, ctx.RGD_Merchant.Count());
                    value.merchantname = ctx.RGD_Merchant.SingleOrDefault(x => x.id == mrid).name;


                    var tran = ctx.RGD_Transaction.SingleOrDefault(x => x.id == value.id);
                    var mer = ctx.RGD_Merchant.SingleOrDefault(x => x.name == value.merchantname);
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
                            tran.companypayamount = value.amount * mer.companyPayRate;
                            tran.userpayamount = value.amount - tran.companypayamount;
                        }
                        else
                        {
                            tran.discount = 1;
                            tran.companypayamount = 0;
                            tran.userpayamount = value.amount;
                        }
                    }
                    ctx.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }



        [Route("mimicScanRecharge")]
        public void mimicScanRecharge([FromBody]RGD_Transaction value)
        {
            try
            {
                using (var ctx = new ETDB1Entities())
                {
                    //mock data
                    value.status = TransactionStatus.success.ToString();
                    value.amount = 0 - new Random().Next(5, 50);
                    value.merchantname = "Recharge";


                    var tran = ctx.RGD_Transaction.SingleOrDefault(x => x.id == value.id);
                    var mer = ctx.RGD_Merchant.SingleOrDefault(x => x.name == value.merchantname);
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
                            tran.companypayamount = value.amount * mer.companyPayRate;
                            tran.userpayamount = value.amount - tran.companypayamount;
                        }
                        else
                        {
                            tran.discount = 1;
                            tran.companypayamount = 0;
                            tran.userpayamount = value.amount;
                        }
                    }
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