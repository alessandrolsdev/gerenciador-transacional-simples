/**
 * @generated SignedSource<<33296d96f8e29eb4e0fe638c79667867>>
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
  "name": "userId"
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
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "createTransaction",
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
    "name": "AppCreateTransactionMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppCreateTransactionMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "17781812c1dedb626b3291cc2b2eee2a",
    "id": null,
    "metadata": {},
    "name": "AppCreateTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation AppCreateTransactionMutation(\n  $amount: Float!\n  $userId: ID!\n  $description: String!\n) {\n  createTransaction(amount: $amount, userId: $userId, description: $description) {\n    id\n    amount\n    description\n  }\n}\n"
  }
};
})();

node.hash = "bf6422ca923388df6fe536374d94b7c1";

export default node;
