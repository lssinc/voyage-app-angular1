(function() {
    'use strict';
    
    angular
        .module('launchpadApp.account')
        .factory('accountService', accountService);

    accountService.$inject = ['$http', 'authorizationService', '$q', 'API_URL'];

    function accountService($http, authorizationService, $q, API_URL) {        
     
         return  {
            login,
            register
         };

        function login(username, password) { 
            const content = "grant_type=password&username=" + username + "&password=" + password;  
         
            return $http.post(`${API_URL}/Token`, content, {
                headers: { 'Content-Type' :  'application/x-www-form-urlencoded'  }
            })
            .then(response => {
                authorizationService.setToken(response.data.access_token);
            });
        }

        function register(username, password) {
            const user = {
                email: username,
                password: password,
                confirmPassword: password
            };

            return $http.post(`${API_URL}/v1/account/register`, user)
                .then(response => response.data)
                .catch(failure => { 
                    return $q.reject(failure.data);
                });
        }    
    }        
})();




