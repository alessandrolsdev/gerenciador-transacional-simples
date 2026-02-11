/**
 * @generated SignedSource<<d5e2251c37c85d5385e38691d27f4013>>
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
  "name": "category"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "description"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v5 = [
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
        "name": "category",
        "variableName": "category"
      },
      {
        "kind": "Variable",
        "name": "description",
        "variableName": "description"
      },
      {
        "kind": "Variable",
        "name": "type",
        "variableName": "type"
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "category",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
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
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppCreateTransactionMutation",
    "selections": (v5/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v4/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppCreateTransactionMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "f12979f0f0c7efafb89250cb34b604ea",
    "id": null,
    "metadata": {},
    "name": "AppCreateTransactionMutation",
    "operationKind": "mutation",
    "text": "mutation AppCreateTransactionMutation(\n  $amount: Float!\n  $userId: ID!\n  $description: String!\n  $type: String!\n  $category: String!\n) {\n  createTransaction(amount: $amount, userId: $userId, description: $description, type: $type, category: $category) {\n    id\n    amount\n    description\n    type\n    category\n    createdAt\n  }\n}\n"
  }
};
})();

node.hash = "5e02e91b0c50dbbf94ba87a03a2f321a";

export default node;
