/*global document*/
//a function to get DOM nodes by nodeType property.
//If you do not supply a value I will give you every DOM node.
//
//global examples:
//    var allComments = document.getNodesByType(8);
//    var allComments = document.getNodesByType("COMMENT_NODE");
//
//or use locally:
//    var a = document.getElementById("item");
//    item.getNodesByType(2);
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
(function wrapper() {
    var getNodesByType = function getNodesByType(typeValue) {
            "use strict";
            var types     = 0,
                valueTest = (typeof typeValue === "string") ? typeValue.toUpperCase() : "",
                root      = this;

            // Normalize string input for case insensitivity.
            if (typeof typeValue === "string") {
                typeValue = typeValue.toLowerCase();
            }

            // If input is a string and supported standard value
            // associate to the standard numeric type
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

            // If input is type string but the value is a supported number
            if (isNaN(valueTest) === false && (valueTest.length === 1 || valueTest === "10" || valueTest === "11" || valueTest === "12")) {
                types = Number(valueTest);
            }

            // If input is a supported number
            if (valueTest === "" && (typeValue === 0 || typeValue === 1 || typeValue === 2 || typeValue === 3 || typeValue === 4 || typeValue === 5 || typeValue === 6 || typeValue === 7 || typeValue === 8 || typeValue === 9 || typeValue === 10 || typeValue === 11 || typeValue === 12)) {
                types = typeValue;
            }

            // Identify the starting point. When used globally the root
            // element is the document's root, which is typically <html>.
            // When used locally this is the node on which the method is
            // executed against.
            if (root === document) {
                root = document.documentElement;
            }

            // A handy dandy function to trap all the DOM walking
            return (function getNodesByType_walking() {
                var output = [],
                    child  = function getNodesByType_walking_child(x) {
                        var atty = [],
                            a    = x.attributes,
                            b    = a.length,
                            c    = 0;
                        // Special functionality for attribute types.
                        if (b > 0 && (types === 2 || types === 0)) {
                            do {
                                output.push(a[c]);
                                c += 1;
                            } while (c < b);
                        }
                        a = x.childNodes;
                        b = a.length;
                        c = 0;
                        if (b > 0) {
                            do {
                                if (a[c].nodeType === types || types === 0) {
                                    output.push(a[c]);
                                }
                                if (a[c].nodeType === 1) {
                                    //recursion magic
                                    getNodesByType_walking_child(a[c]);
                                }
                                c += 1;
                            } while (c < b);
                        }
                    };
                child(root);
                return output;
            }());
        },
        getElementsByAttribute = function getElementsByAttribute(name, value) {
            var attrs = this.getNodesByType(2),
                out   = [];
            if (typeof name !== "string") {
                name = "";
            }
            if (typeof value !== "string") {
                value = "";
            }
            attrs.forEach(function getElementsByAttribute_loop(item) {
                if (item.name === name || name === "") {
                    if (item.value === value || value === "") {
                        out.push(item.ownerElement);
                    }
                }
            });
            return out;
        };

    // Create a document method
    document.getNodesByType         = getNodesByType;
    document.getElementsByAttribute = getElementsByAttribute;

    (function addToExistingElements() {
        var el = document.getNodesByType(1);
        el.forEach(function addToExistingElements_loop(item) {
            item.getNodesByType         = getNodesByType;
            item.getElementsByAttribute = getElementsByAttribute;
        });
    }());
    // Add this code as a method onto each DOM element

    // Ensure dynamically created elements get this method too
    Element.prototype.getNodesByType         = getNodesByType;
    Element.prototype.getElementsByAttribute = getElementsByAttribute;

}());
