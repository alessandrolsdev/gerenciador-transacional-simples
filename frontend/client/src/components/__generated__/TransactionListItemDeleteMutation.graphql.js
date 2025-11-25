/**
 * @generated SignedSource<<bb1b92da50365ba52ef2e55a1567954a>>
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
    "name": "TransactionListItemDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TransactionListItemDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e533cb462e4afa7159af21db9af30acd",
    "id": null,
    "metadata": {},
    "name": "TransactionListItemDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation TransactionListItemDeleteMutation(\n  $id: ID!\n) {\n  deleteTransaction(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

node.hash = "725cf0eeef2af6c7fe1a93409c9e2a0e";

export default node;
