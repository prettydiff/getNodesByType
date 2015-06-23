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
            if (typeof typeValue === "string") {
                typeValue = typeValue.toLowerCase();
            }
            if (typeValue === "all") {
                types = 0;
            } else if (typeValue === "element_node") {
                types = 1;
            } else if (typeValue === "attribute_node") {
                types = 2;
            } else if (typeValue === "text_node") {
                types = 3;
            } else if (typeValue === "cdata_section_node") {
                types = 4;
            } else if (typeValue === "entity_reference_node") {
                types = 5;
            } else if (typeValue === "entity_node") {
                types = 6;
            } else if (typeValue === "processing_instruction_node") {
                types = 7;
            } else if (typeValue === "comment_node") {
                types = 8;
            } else if (typeValue === "document_node") {
                types = 9;
            } else if (typeValue === "document_type_node") {
                types = 10;
            } else if (typeValue === "document_fragment_node") {
                types = 11;
            } else if (typeValue === "notation_node") {
                types = 12;
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
                        var atty = [],
                            a    = x.childNodes,
                            b    = a.length,
                            c    = 0,
                            d    = 0,
                            e    = 0;
                        for (c = 0; c < b; c += 1) {
                            if (a[c].nodeType === types || types === 0) {
                                output.push(a[c]);
                            }
                            if (a[c].nodeType === 1) {
                                if (types === 2 || types === 0) {
                                    atty = a[c].attributes;
                                    d    = atty.length;
                                    for (e = 0; e < d; e += 1) {
                                        output.push(atty[e]);
                                    }
                                }
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
