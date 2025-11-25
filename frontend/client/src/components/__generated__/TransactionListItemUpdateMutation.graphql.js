/**
 * @generated SignedSource<<f8621db459c00b0f964533a0ae0cde08>>
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
    "name": "TransactionListItemUpdateMutation",
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
    "name": "TransactionListItemUpdateMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "a36717dc9da3b0ff2e6f92c5801cdb35",
    "id": null,
    "metadata": {},
    "name": "TransactionListItemUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation TransactionListItemUpdateMutation(\n  $id: ID!\n  $amount: Float\n  $description: String\n) {\n  updateTransaction(id: $id, amount: $amount, description: $description) {\n    id\n    amount\n    description\n  }\n}\n"
  }
};
})();

node.hash = "b4775635fad11436eb2b79cbc59f7ea3";

export default node;
