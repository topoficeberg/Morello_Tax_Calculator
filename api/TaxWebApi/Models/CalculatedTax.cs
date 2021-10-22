using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxWebApi.Models
{
    public class CalculatedTax
    {
        public double FederalTax { get; set; } 
        public double ProvincialTax { get; set; }
    }
}
