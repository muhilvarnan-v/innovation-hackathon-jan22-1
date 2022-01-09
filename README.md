# innovation-hackathon-jan22 - Team Soochee

## Demo Video
 - [Video](https://drive.google.com/file/d/1cY25cpOymtANuhM6Pp4YQY9__uX78iNf/view)

## Submission Document
 - [Download](https://github.com/Open-network-for-digital-commerce/innovation-hackathon-jan22/raw/team-soochee/Team%20Soochee%20Submission%20Sheet-%20Innovation%20Track.xlsx)
 
### Services
 - Frontend - [README.md](/frontend/README.md)
 - Backend - [README.md](/backend/README.md)
 - VoiceToText - [README.md](/voiceToTextService/README.md)

## `Architecture Diagram`
![Architecture Diagram](/frontend/docs/images/architecture-diagram-FrontEnd.jpg)

### Schema

#### Store
 - id
 - name
 - contactNumberList
 - location
 - catalog

#### Master Catalogue Item
 - id
 - barcode
 - sku
 - weight
 - unit
 - mrp
 - image128
 - image256
 - parentCategory
 - subCategory
 - additionalInfo

#### Master Added Store catalog Item
 - id
 - masterId
 - price
 - quantity

#### Manual Added Store Catalogue Item
 - id
 - barcode
 - sku
 - weight
 - unit
 - mrp
 - image128
 - image256
 - parentCategory
 - subCategory
 - additionalInfo
 - price
 - quantity

### Proposal
- [Open standards based format for external data feeds](ExportFeed.md) 

#### Team
![team](/team.png)
