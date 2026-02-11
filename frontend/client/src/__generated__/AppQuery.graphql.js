/**
 * @generated SignedSource<<9d4aa5008c08dd16bc8455ae51d366e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "userId",
    "value": "1"
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "id",
        "value": "1"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      }
    ],
    "storageKey": "user(id:\"1\")"
  },
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "Summary",
    "kind": "LinkedField",
    "name": "summary",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalIncome",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "totalExpense",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "balance",
        "storageKey": null
      }
    ],
    "storageKey": "summary(userId:\"1\")"
  },
  {
    "alias": null,
    "args": (v1/*: any*/),
    "concreteType": "Transaction",
    "kind": "LinkedField",
    "name": "transactions",
    "plural": true,
    "selections": [
      (v0/*: any*/),
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
    "storageKey": "transactions(userId:\"1\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "5784b43c9f165c890e6c9aa0815a0139",
    "id": null,
    "metadata": {},
    "name": "AppQuery",
    "operationKind": "query",
    "text": "query AppQuery {\n  user(id: \"1\") {\n    id\n    name\n    email\n  }\n  summary(userId: \"1\") {\n    totalIncome\n    totalExpense\n    balance\n  }\n  transactions(userId: \"1\") {\n    id\n    amount\n    description\n    type\n    category\n    createdAt\n  }\n}\n"
  }
};
})();

node.hash = "dc30f49ef62eee9508ed5232f21b2f79";

export default node;
