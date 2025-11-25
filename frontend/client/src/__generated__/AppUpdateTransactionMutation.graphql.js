/**
 * @generated SignedSource<<222f2e6bcf03afc7933112dc772a7bb4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "amount"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "amount",
        "variableName": "amount"
      },
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "updateTransaction",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "amount",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppUpdateTransactionMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppUpdateTransactionMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "233b5a4914c1737b1b539499f931825f",
    "id": null,
    "metadata": {},
    "name": "AppUpdateTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation AppUpdateTransactionMutation(\n  $id: ID!\n  $amount: Float\n  $description: String\n) {\n  updateTransaction(id: $id, amount: $amount, description: $description) {\n    id\n    amount\n    description\n  }\n}\n"
  }
};
})();

node.hash = "d553473b4e01cda63716a2a599b4866b";

export default node;
