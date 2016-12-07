# getNodesByType
a custom DOM method to get nodes by node type

When the code is run a method `getNodesByType` will be attached to all element node types in the current DOM tree and the document object.

Execute the method with either a numeric value or a node type name.

    document.getNodesByType(1);                          // get all element nodes in the document
    document.getNodesByType("TEXT_NODE");                // get all text nodes in the document

    var item = document.getElementById("item");
    item.getNodesByType("COMMENT_NODE");                 // get all child comment node types
    item.getNodesByType(1);                              // get all child element node types

Updated with a new method: `getElementsByAttribute(name, value)`

    document.getElementsByAttribute("class", "segment"); // get all elements with a class attribute of value segment
    document.getElementsByAttribute("src", "");          // get all elements with a src attribute of any value

    var item = document.getElementById("item");
    item.getElementsByAttribute("id");                   // get all child elements with an id attribute of any value
    item.getElementsByAttribute("", "purple_alien");     // get all child elements with any attribute whose value is purple_alien

Both the name and value arguments of `getElementsByAttribute` are optional.

Here are the supported node types and their corresponding numeric values:

* 0 - all nodes (non standard)
* 1 - "ELEMENT_NODE"
* 2 - "ATTRIBUTE_NODE"
* 3 - "TEXT_NODE"
* 4 - "CDATA_SECTION_NODE"
* 5 - "ENTITY_REFERENCE_NODE"
* 6 - "ENTITY_NODE"
* 7 - "PROCESSING_INSTRUCTION_NODE"
* 8 - "COMMENT_NODE"
* 9 - "DOCUMENT_NODE"
* 10 - "DOCUMENT_TYPE_NODE"
* 11 - "DOCUMENT_FRAGMENT_NODE"
* 12 - "NOTATION_NODE"

All of the above node types remain valid types in the W3C specifications, but the WHATWG HTML5 group has deprecated these types:

* 2 - "ATTRIBUTE_NODE"
* 4 - "CDATA_SECTION_NODE"
* 5 - "ENTITY_REFERENCE_NODE"
* 6 - "ENTITY_NODE"
* 12 - "NOTATION_NODE"
