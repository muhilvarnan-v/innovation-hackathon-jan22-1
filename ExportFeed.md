# Open standards based format for external data feeds - Proposal

## Architecture Diagram
![Architecture Diagram](/exportFeedDiagram.jpg)

### API's Schema

#### Add Connector
```
EndPoint: /connectors/add
Method: POST
Payload:
 - Name
 - WebhookURL
 - AllowedActions: ['catalog.product.create', 'catalog.product.update', 'catalog.product.update.price', 'catalog.product.update.quantity']
Response:	
 - ID
 - Name
 - WebhookURL
 - AllowedActions: 'catalog.product.create', 'catalog.product.update', 'catalog.product.update.price', 'catalog.product.update.quantity']
```

#### List Connectors
```
EndPoint: /connectors
Method: GET
Response:	Array[]
 - ID
 - Name
 - WebhookURL
 - AllowedActions: 'catalog.product.create', 'catalog.product.update', 'catalog.product.update.price', 'catalog.product.update.quantity']
```

#### Get a Connector
```
EndPoint: /connectors/{id}
Method: GET
Response:	
 - ID
 - Name
 - WebhookURL
 - AllowedActions: 'catalog.product.create', 'catalog.product.update', 'catalog.product.update.price', 'catalog.product.update.quantity']
```

#### Update a Connector
```
EndPoint: /connectors/{id}
Method: PUT
Payload:
 - Name
 - WebhookURL
 - AllowedActions: ['catalog.product.create', 'catalog.product.update', 'catalog.product.update.price', 'catalog.product.update.quantity']
Response:	
 - ID
 - Name
 - WebhookURL
 - AllowedActions: 'catalog.product.create', 'catalog.product.update', 'catalog.product.update.price', 'catalog.product.update.quantity']
```

#### delete a Connector
```
EndPoint: /connectors/{id}
Method: DELETE
Response:	 null
```

