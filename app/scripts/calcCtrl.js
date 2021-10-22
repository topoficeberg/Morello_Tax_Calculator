var app = angular.module("calcApp", []);

app.controller("calcCtrl", function($scope) {
    $scope.employmentIncome = 0;
    $scope.selfEmploymentIncome = 0;
    $scope.totalIncome = 100000;
    $scope.totalTax = 30000;
    $scope.provTax = 10000;
    $scope.fedTax = 20000;
    $scope.netIncome = 70000;

    //list of provinces
    $scope.provinces = [
        {code: 'AB', name: 'Alberta'},
        {code: 'BC', name: 'British Columbia'},
        {code: 'MB', name: 'Manitoba'},
        {code: 'NB', name: 'New Brunswick'},
        {code: 'NL', name: 'Newfoundland and Labrador'},
        {code: 'NS', name: 'Nova Scotia'},
        {code: 'NT', name: 'Northwest Territories'},
        {code: 'NU', name: 'Nunavut'},
        {code: 'ON', name: 'Ontario'},
        {code: 'PE', name: 'Prince Edward Island'},
        {code: 'QB', name: 'Quebec'},
        {code: 'SK', name: 'Saskatchewan'},
        {code: 'YT', name: 'Yukon'}
    ]

    //update total income when either Employment or SDelf-Employment income changes
    $scope.updateTotal = function() {
        $scope.totalIncome = $scope.employmentIncome + $scope.selfEmploymentIncome;
    }

    let data = [{
        type: "bar",
        name: "Federal tax",
        x: ["2020", "2021"],
        y: [0, $scope.fedTax]
    },
    {
        type: "bar",
        name: "Provincial tax",
        x: ["2020", "2021"],
        y: [0, $scope.provTax]
    },
    {
        type: "bar",
        name: "After tax income",
        x: ["2020", "2021"],
        y: [$scope.totalIncome, $scope.netIncome]
    }];

    let layout = {barmode: 'stack'};
    Plotly.newPlot('chart-container', data, layout);

    //on Province change
    $scope.provinceOnChange = function() {
        if ($scope.selectedProvince == null)
        {
            return;
        }

        alert($scope.selectedProvince.code);
    }
});