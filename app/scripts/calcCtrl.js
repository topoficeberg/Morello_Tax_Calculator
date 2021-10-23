var app = angular.module("calcApp", []);

var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

//assign settings from environment (simulated in env.js)
app.constant('__env', env);

app.controller("calcCtrl", function($scope, $http, __env) {
    $scope.employmentIncome = 0;
    $scope.selfEmploymentIncome = 0;
    $scope.totalIncome = 0;
    $scope.totalTax = 0;
    $scope.provTax = 0;
    $scope.fedTax = 0;
    $scope.netIncome = 0;
    $scope.employmentIncomeSlider = 0;
    $scope.selfEmploymentIncomeSlider = 0;
    $scope.apiService = new ApiService(__env);
    $scope.changed = false;

    //list of provinces
    $scope.provinces = __env.provinces;

    //update total income when either Employment or SDelf-Employment income changes
    $scope.updateTotal = function() {
        $scope.selfEmploymentIncomeSlider = ($scope.selfEmploymentIncome == null) ? 0 : $scope.selfEmploymentIncome;
        $scope.employmentIncomeSlider = ($scope.employmentIncome == null) ? 0 : $scope.employmentIncome;
        $scope.totalIncome = $scope.employmentIncome + $scope.selfEmploymentIncome;
        $scope.changed = true;
    }

    $scope.updateFromSlider = function() {
        $scope.employmentIncome = $scope.employmentIncomeSlider;
        $scope.selfEmploymentIncome = $scope.selfEmploymentIncomeSlider;
        $scope.updateTotal();
        $scope.changed = true;
    }

    $scope.getChartData = function(){
        let data = {
            labels: [""],
            datasets: [{
                label: "Federal tax",
                data: [$scope.fedTax],
                backgroundColor: "#f74"
                },
                {
                    label: "Provincial tax",
                    data: [$scope.provTax],
                    backgroundColor: "#86f"
                },
                {
                    label: "After tax income",
                    data: [$scope.netIncome],
                    backgroundColor: "#5d5"
                }]
        };

        return data;
    }

    let data = $scope.getChartData();

    $scope.chart = new Chart('chart-canvas', {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    });

    //on Province change
    $scope.provinceOnChange = function() {
        if ($scope.selectedProvince == null)
        {
            return;
        }

        $scope.changed = true;
        
        $scope.calculateTaxes();
    }

    //callback function to set taxes from response
    $scope.updateTaxes = function(response) {
        $scope.provTax = response.provincialTax;
        $scope.fedTax = response.federalTax;
        $scope.totalTax = $scope.provTax + $scope.fedTax;
        $scope.netIncome = $scope.totalIncome - $scope.totalTax;
        $scope.changed = false;

        $scope.chart.data = $scope.getChartData();
        $scope.chart.update();
    }

    //event handler. initiates api request.
    $scope.calculateTaxes = function() {
        if (!$scope.changed)
            return;
        
        $scope.apiService.calculateTaxes($http, $scope.totalIncome, $scope.selectedProvince.code, $scope.updateTaxes);
    }
});

class ApiService {
    constructor(__env) {
        this.__env = __env;
        
        this.calculateTaxes = function calculateTaxes(http, income, province, callback) {
            var config = {headers: {'Access-Control-Allow-Origin': '*'}}

            return http
                .get(__env.apiUrl + 'taxcalculator/calculate?totalincome=' + income + '&&province=' + province, config)
                .then(function (response) {
                    callback(response.data);
                },
                    function (response) {
                        alert('Error, processing API request: ' + response.message);
                    }
                );
        };
    }
};

// Inject dependencies
ApiService.$inject = ['__env'];