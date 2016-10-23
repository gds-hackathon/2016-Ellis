using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EFApi.Controllers
{
    public class Base64_2DCodeController : ApiController
    {
        // GET api/<controller>
        public string Get()
        {
            var img64 = @"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAACMCAIAAAAhotZpAAADQ0lEQVR4nO2dQY7kMAgAN6v9/5d7rr6wAwKSVKvq2Eo7ni4RZAcz1+fz+SPv5u/TE5DfURIAJQFQEgAlAVASACUBUBIAJQFQEgAlAfiXuei6rvEbR3uG573Oa6qfR2Nm5hBx5+9wYiQBUBIAJQFI5aSTzvun6Jme+Ty6b5SfOnPL/I0bv0OEkQRASQCUBKCck04yz9bq872zTuqM2WHqd4gwkgAoCYCSALRy0gZTueTOdc82RhIAJQFQEoBX5KQof0yth6pziMZ/CiMJgJIAKAlAKydNPa87tQmdPFSdz9T1VYwkAEoCoCQA5Zy0UXvWqWWYqs2bquXbwEgCoCQASgJwvWFv6qRaL1BdS3WueQojCYCSACgJQPl80p3rlWgOmfG3a+2iuVXPXWUwkgAoCYCSAJTXSZ1nejU3dM7VZu7byVWd3FPNT0YSACUBUBKAlZw01aNh6r4b3DlnIwmAkgAoCUBr767z3afWK9u9iDr3jTCSACgJgJIApHLSRm+66jhVOmdsO9dkcO/uC1ESACUBSO3dba+TTqrzib67sd6aut6c9IUoCYCSAIz1u5vqTZcZP/ruVB35Ru14Z41lJAFQEgAlAWidme30O4jqtqPrM+NU79XpD5u5plrvHmEkAVASACUBaO3dVZ/vU/UFd+4HRtzZT89IAqAkAEoC0KpxmNo3i/quVudTZbsmcGocIwmAkgAoCcB6LXh1nI13TlWm1lVTNYRGEgAlAVASgPI6qbq+2Tiv0+mV0NlvPNmo8YswkgAoCYCSAIy9T4qY6o8XjZlhKg9l2OglYSQBUBIAJQF4RV/wqbOoG71W78zZEUYSACUBUBKA8vukKaJ9v6n+qhtM7RlWMZIAKAmAkgCUzydN1ThUx5+qHZ8aM2KjbtBIAqAkAEoCMNbHIWKqjiC6vnM2dqq39zZGEgAlAVASgFZOmmKjP9DUfau5qnPuKsJIAqAkAEoC8Iqc1Ok71/k/FNWzwFP7cvZg/UKUBEBJANb7glfH2f6/FZm5Zb47VQefwUgCoCQASgLQ6sE6xfbaZaq/+FPnpYwkAEoCoCQArzifJP/HSAKgJABKAqAkAEoCoCQASgKgJABKAqAkAEoC8AMWm3QeRQWeIgAAAABJRU5ErkJggg==";
            return img64;
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
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