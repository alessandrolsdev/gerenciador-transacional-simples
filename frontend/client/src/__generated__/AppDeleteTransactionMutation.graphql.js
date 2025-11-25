/**
 * @generated SignedSource<<4611ce55394ce7ec84fd827f48518f48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "deleteTransaction",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AppDeleteTransactionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AppDeleteTransactionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5f98161c6bcae20dcd5f1c33adfd8b84",
    "id": null,
    "metadata": {},
    "name": "AppDeleteTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation AppDeleteTransactionMutation(\n  $id: ID!\n) {\n  deleteTransaction(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

node.hash = "a318baa2f9625657e7b2e9a515fd9a54";

export default node;
