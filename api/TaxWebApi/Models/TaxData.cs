using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxWebApi.Models
{
    public class TaxData
    {
        public int Base { get; set; }
        public int Max { get; set; }
        public float Tax { get; set;}
    }
}
