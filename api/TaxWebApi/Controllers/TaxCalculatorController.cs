using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxWebApi.Models;

namespace TaxWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxCalculatorController : ControllerBase
    {
        private readonly ITaxDataService _taxDataService;

        public TaxCalculatorController(ITaxDataService taxDataService)
        {
            _taxDataService = taxDataService;
        }

        [HttpGet("calculate")]
        public ActionResult<CalculatedTax> Get(int totalIncome, string province)
        {
            if (province == null || province == "")
            {
                throw new HttpResponseException { Message = "Province is empty"};
            }

            var provTaxBrackets = _taxDataService.GetTaxDataForProvince(province);
            var fedTaxBrackets = _taxDataService.GetFederalTaxData();

            var taxResult = new CalculatedTax();
            taxResult.FederalTax = CalculateTax(fedTaxBrackets, totalIncome);
            taxResult.ProvincialTax = CalculateTax(provTaxBrackets, totalIncome);

            return taxResult;
        }

        private double CalculateTax(List<TaxData> taxData, int totalIncome)
        {
            //removed all irrelevant tax brackets and ordered
            var relevantBrackets = taxData.Where(b => totalIncome > b.Base).OrderBy(b => b.Base).ToList<TaxData>();

            var totalTax = 0.0;

            foreach (var bracket in relevantBrackets)
            {
                //if income within a bracket - calculate the differece and apply tax. Otherwise, just apply tax to a difference between max and base of the bracket
                var bracketIncome = (totalIncome <= bracket.Max) ? totalIncome - bracket.Base : bracket.Max - bracket.Base;
                totalTax += (bracketIncome * bracket.Tax) / 100;
            }

            return totalTax;
        }


    }
}
