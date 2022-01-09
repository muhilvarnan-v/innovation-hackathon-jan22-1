# Open standards based format for external data feeds - Proposal

## Architecture Diagram

### API's Schema

```
EndPoint: /connectors/add
Method: Post
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

