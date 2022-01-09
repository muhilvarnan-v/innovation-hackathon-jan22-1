# Rating Framework for a beckn network
In a beckn network, there can be rating provider (a bpp) which a domain agnostic bpp. (like domain agnostic bg )

Any subscriber of any domain can may a call to these endpoints
## /submit_rating 
Input:
Standard Beckn Request with "rating" object. (of "Rating" schema)
Auth : 
Default Signature authorizion 

Response: 
ACK 

Callback:
NONE

### Summary
Will take the rating object and publish to a queue. 
Rating collation subscriber, takes the entry, 

Summarizes the information at the object id that is rated. 
It can also persists to a distributed ledger at this point. All registries in the network will write to the ledger with thier private key signing.
  
  
## /rating_summary
Input:
Standard Beckn Request with "rating" object. (of "Rating" schema)
Auth : 
Default Signature authorizion 

Response: 
Rating (summary information) 

Callback:
NONE

### Summary 
Returns summarized information of the rated object. 



#### Supported Rating category
Buyer, Seller, Product. 