(function (window) {
    window.__env = window.__env || {};
  
    // API url
    window.__env.apiUrl = 'http://localhost:5000/api/';
  
    // Base url
    window.__env.baseUrl = '/';

    window.__env.provinces = [
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
  
    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
  }(this));