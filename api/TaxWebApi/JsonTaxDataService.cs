using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxWebApi.Models;
using Newtonsoft.Json;
using System.IO;

namespace TaxWebApi
{
    /// <summary>
    /// Reads tax data from JSON files
    /// </summary>
    public class JsonTaxDataService : ITaxDataService
    {
        public List<TaxData> GetFederalTaxData()
        {
            //read file FED.json
            var filePath = "Data\\FED.json";
            var fileData = File.ReadAllText(filePath);

            var taxData = JsonConvert.DeserializeObject<List<TaxData>>(fileData);

            return taxData;
        }

        public List<TaxData> GetTaxDataForProvince(string province)
        {
            //read file with a name of the province
            var filePath = string.Format("Data\\{0}.json", province);
            var fileData = File.ReadAllText(filePath);

            var taxData = JsonConvert.DeserializeObject<List<TaxData>>(fileData);

            return taxData;
        }
    }
}
