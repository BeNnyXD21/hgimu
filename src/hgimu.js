"use strict";

var main = require("hgimu-main/bootstrap")(require("hgimu-main"));
var L = require("hgimu-library");

// define HGIMU
var hgimu = L.curry(function (options, input) {
    if (!input || !L.isFunction(input.click)) {
        throw new Error("input not supplied");
    }

    var classes = input.getAttribute("class") + " hgimu-level";
    var outputTime = L.isFunction(options.outputTime) ? options.outputTime : L.noOp;
    var outputChecks = L.isFunction(options.outputChecks) ? options.outputChecks : L.noOp;
    var hgimuOptions = L.isObject(options.options) ? options.options : {};

    input.setAttribute("class", classes);

    main.setOptions(hgimuOptions);

    input.addEventListener("keyup", function () {
        var username = main(input.value);

        if (input.value.length) {
            input.setAttribute("class", classes + " hgimu-level--" + username.getSecurityLevel());
            outputTime(username.getString(), input);
            outputChecks(username.getChecks(), input);
        } else {
            input.setAttribute("class", classes);
            outputTime(false, input);
            outputChecks([]);
        }
    });
});

// see https://github.com/howsecureismypassword/modules-main/blob/develop/dictionary.json
hgimu.setDictionary = main.setDictionary; 

// see https://github.com/howsecureismypassword/modules-period/blob/develop/period-dictionary.json
hgimu.setPeriodDictionary = main.setPeriodDictionary;

// see https://github.com/howsecureismypassword/modules-named-number/blob/develop/named-number-dictionary.json
hgimu.setNamedNumberDictionary = main.setNamedNumberDictionary 

// see https://github.com/howsecureismypassword/modules-checker/blob/develop/checker-dictionary.json
hgimu.setCheckerDictionary = main.setCheckerDictionary;

module.exports = hgimu;
