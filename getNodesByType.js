/*global document*/
//a function to get DOM nodes by nodeType property.
//If you do not supply a value I will give you every DOM node.
//
//example:
// var allComments = document.getNodesByType(8);
// or
// var allComments = document.getNodesByType("COMMENT_NODE");
//
//The accepted string values are the actual node type names, so that the
//typeValue argument can be supplied dynamically from other code.
//
//
// Please try http://prettydiff.com/ for all your web development needs!
//
//
//Keep in mind that the following node types are valid in the W3C DOM
//standards, but have been deprecated in the WHATWG DOM specification.
//
// 2 - ATTRIBUTE_NODE
// 4 - CDATA_SECTION_NODE
// 5 - ENTITY_REFERENCE_NODE
// 6 - ENTITY_NODE
// 12 - NOTATION_NODE
//
//This means all node types are still valid in the standard, but the
//deprecated types may not be retrievable from certain DOM
//implementations.
//
(function () {
    var getNodesByType = function (typeValue) {
            "use strict";
            var types     = 0,
                valueTest = (typeof typeValue === "string") ? typeValue.toUpperCase() : "",
                root      = this;
            switch (typeValue) {
            case "ALL":
                types = 0;
                break;
            case "ELEMENT_NODE":
                types = 1;
                break;
            case "ATTRIBUTE_NODE":
                types = 2;
                break;
            case "TEXT_NODE":
                types = 3;
                break;
            case "CDATA_SECTION_NODE":
                types = 4;
                break;
            case "ENTITY_REFERENCE_NODE":
                types = 5;
                break;
            case "ENTITY_NODE":
                types = 6;
                break;
            case "PROCESSING_INSTRUCTION_NODE":
                types = 7;
                break;
            case "COMMENT_NODE":
                types = 8;
                break;
            case "DOCUMENT_NODE":
                types = 9;
                break;
            case "DOCUMENT_TYPE_NODE":
                types = 10;
                break;
            case "DOCUMENT_FRAGMENT_NODE":
                types = 11;
                break;
            case "NOTATION_NODE":
                types = 12;
                break;
            }
            if (isNaN(valueTest) === false && (valueTest.length === 1 || valueTest === "10" || valueTest === "11" || valueTest === "12")) {
                types = Number(valueTest);
            }
            if (valueTest === "" && (typeValue === 0 || typeValue === 1 || typeValue === 2 || typeValue === 3 || typeValue === 4 || typeValue === 5 || typeValue === 6 || typeValue === 7 || typeValue === 8 || typeValue === 9 || typeValue === 10 || typeValue === 11 || typeValue === 12)) {
                types = typeValue;
            }
            if (root === document) {
                root = document.documentElement;
            }
            return (function () {
                var output = [],
                    child  = function (x) {
                        var a = x.childNodes,
                            b = a.length,
                            c = 0;
                        for (c = 0; c < b; c += 1) {
                            if (a[c].nodeType === types || types === 0) {
                                output.push(a[c]);
                            }
                            if (a[c].nodeType === 1) {
                                child(a[c]);
                            }
                        }
                    };
                child(root);
                return output;
            }());
        },
        el             = [],
        len            = 0,
        a              = 0;
    document.getNodesByType = getNodesByType;
    el                      = document.getNodesByType(1);
    len                     = el.length;
    for (a = 0; a < len; a += 1) {
        el[a].getNodesByType = getNodesByType;
    }
}());