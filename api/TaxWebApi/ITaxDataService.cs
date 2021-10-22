using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxWebApi.Models;

namespace TaxWebApi
{
    /// <summary>
    /// Interface for classes to retrieve tax data
    /// </summary>
    public interface ITaxDataService
    {
        List<TaxData> GetTaxDataForProvince(string province);
        List<TaxData> GetFederalTaxData();
    }
}
