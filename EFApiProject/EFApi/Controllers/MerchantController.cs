using ETDAC.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EFApi.Controllers
{
    //[Authorize]
    [RoutePrefix("api/Merchant")]
    public class MerchantController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<RGD_Merchant> Get()
        {
            try
            {
                //User.Identity.Name
                using (var ctx = new ETDB1Entities())
                {
                    return ctx.RGD_Merchant.ToList();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        // GET api/<controller>/5
        public RGD_Merchant Get(int id)
        {
            try
            {
                //User.Identity.Name
                using (var ctx = new ETDB1Entities())
                {
                    return ctx.RGD_Merchant.Where(x=>x.id==id).FirstOrDefault();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Route("data")]
        public string GetMerchantData()
        {
            dynamic dynEO = new ExpandoObject();
            dynEO.number = 20;

            Dictionary<string, string> result = new Dictionary<string, string>();
            List<string> items = new List<string>();
            List<string> data = new List<string>();
            using (var ctx = new ETDB1Entities())
            {
                var cc = ctx.sp_getMerchantBoard();

                foreach (var r in cc)
                {
                    items.Add(r.Merchant);
                    data.Add(r.Amount.ToString());
                    //result.Add(r.Merchant, r.Amount.ToString());
                }
            }
            dynEO.items = items;
            dynEO.data = data;
            var s = JsonConvert.SerializeObject(dynEO);
            return s;
        }


        [Route("trandata")]
        public string GetMerchantTranData()
        {
            dynamic dynEO = new ExpandoObject();
            dynEO.number = 20;

            Dictionary<string, string> result = new Dictionary<string, string>();
            List<string> items = new List<string>();
            List<string> data = new List<string>();
            using (var ctx = new ETDB1Entities())
            {
                var cc = ctx.sp_getTransactionBoard();

                foreach (var r in cc)
                {
                    items.Add(r.merchantname+"-"+r.createdate);
                    data.Add(r.amount.ToString());
                    //result.Add(r.Merchant, r.Amount.ToString());
                }
            }
            dynEO.items = items;
            dynEO.data = data;
            var s = JsonConvert.SerializeObject(dynEO);
            return s;
        }

        // POST api/<controller>
        public IHttpActionResult Post([FromBody]RGD_Merchant value)
        {
            try
            {
                //User.Identity.Name
                using (var ctx = new ETDB1Entities())
                {
                    var m = ctx.RGD_Merchant.Where(x => x.id == value.id).FirstOrDefault();
                    if (m == null)
                    {
                        m = new RGD_Merchant();
                        m.createdate = DateTime.Now;
                        ctx.RGD_Merchant.Add(m);
                    }
                    else
                    {
                        m.changedate = DateTime.Now;
                    }

                    m.name = value.name;
                    m.address = value.address;
                    m.companyPayRate = value.companyPayRate;
                    m.discount = value.discount;
                    m.phone = value.phone;

                    ctx.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            return Ok();
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