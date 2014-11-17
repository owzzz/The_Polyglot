//third party libraries alias configurations for browserify

var vendorPath = "./Build/assets/js/vendor/";

module.exports = [
    vendorPath + 'jquery/dist/jquery.min.js:jquery',
    vendorPath + 'angular/angular.min.js:angular',
    vendorPath + 'angular-route/angular-route.min.js:angular-route',
];