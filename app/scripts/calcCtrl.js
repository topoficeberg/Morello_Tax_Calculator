var app = angular.module("calcApp", []);

var env = {};

// Import variables if present (from env.js)
if(window){  
  Object.assign(env, window.__env);
}

//assign settings from environment (simulated in env.js)
app.constant('__env', env);

class ApiService {
    constructor(__env) {
        this.calculateTaxes = function calculateTaxes(income, province) {
            return $http
                .get(__env.apiUrl + 'taxcalculator/calculate?totalincome=' + income + '&&province=' + province)
                .then(function (response) {
                    return response;
                },
                    function (response) {
                        alert(response.message);
                    }
                );
        };
    }
};

// Inject dependencies
ApiService.$inject = ['__env'];

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

    //list of provinces
    $scope.provinces = __env.provinces;

    //update total income when either Employment or SDelf-Employment income changes
    $scope.updateTotal = function() {
        $scope.selfEmploymentIncomeSlider = ($scope.selfEmploymentIncome == null) ? 0 : $scope.selfEmploymentIncome;
        $scope.employmentIncomeSlider = ($scope.employmentIncome == null) ? 0 : $scope.employmentIncome;
        $scope.totalIncome = $scope.employmentIncome + $scope.selfEmploymentIncome;
    }

    $scope.updateFromSlider = function() {
        $scope.employmentIncome = $scope.employmentIncomeSlider;
        $scope.selfEmploymentIncome = $scope.selfEmploymentIncomeSlider;
        $scope.updateTotal();
    }

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

    const stackedBar = new Chart('chart-canvas', {
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
    }).$inject = ['__env'];

    //on Province change
    $scope.provinceOnChange = function() {
        if ($scope.selectedProvince == null)
        {
            return;
        }


    }
});

function updateEmploymentInput(){

}