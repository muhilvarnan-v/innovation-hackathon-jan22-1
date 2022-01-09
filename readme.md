# <div align="center"> `beckn-catalog-management` </div>

> Submission for ONDC Grand Hackathon (Challenge 1 - Digitization of Catalogs)
>
> **Team Makers42**
>
> - Siddhant K (@kineticdesigner42) - grade 7
> - Vedant K (@gamemaker1) - grade 10

This is a Beckn-powered Svelte web component that enables voice based search and
creation of items in a crowdsourced product catalog. It is built using Svelte
and split into modular components that can be embedded in your application
easily. It uses the Webkit Speech Recognition API built into Chromium-based
browsers and fuzzy search to return useful search results.

[![Interface Design](assets/interface.png)](<https://www.figma.com/file/pFLTxI3eLXvnoVyPqCYZZm/ONDC-Hackathon-Design-(Makers42)?node-id=48%3A592>)

## Challenge

### Product Schema

> Define a schema (appropriate for at least 1000 items - an item being a retail
> SKU) for an online catalog for retail.

An example of a product represented in the schema is as follows:

```json
{
	"id": "k155@Nm1X3dFry1tJ@M",
	"name": "Kissan Mixed Fruit Jam",
	"description": "Kissan Mixed Fruit Jam is a delicious blend of 8 different fruits Pineapple, Orange, Apple, Grape, Mango, Pear, Papaya, and Banana.",
	"image": {
		"thumbnail": "/images/products/kissan-mixed-fruit-jam.thumbnail.png",
		"fullsize": "/images/products/kissan-mixed-fruit-jam.fullsize.png"
	},
	"category": "tH151Sj@m",
	"quantity": {
		"magnitude": 500,
		"unit": "grams"
	},
	"price": {
		"amount": 144.15,
		"currency": "INR"
	},
	"inventory": 3,
	"payment": ["upi", "cash", "credit-card", "debit-card", "neft"]
	"channel": "online"
}
```

### Interface

> Develop an intuitive interface, using text or voice or image input or a
> combination of these, for digitizing an item that currently exists in the
> store.

We spoke to a kirana shop owner and the following insights drove the direction
of the prototype:

- The kirana store owner is always on the move around the shop - hence voice on
  the move coupled with easy selection from a list needs to form the basis for
  the user experience
- When they add a product to their store catalog, it is easier for them to
  select a product out of a crowdsourced catalog, and change the quantity and
  price instead of filling out everything.
- If an item is not present in the crowdsourced catalog, they can create a
  product listing and contribute it back to the crowdsourced catalog so that
  others can benefit from it.

[![Wireframes](assets/wireframes.png)](<https://www.figma.com/file/pFLTxI3eLXvnoVyPqCYZZm/ONDC-Hackathon-Design-(Makers42)?node-id=53%3A631>)

[![Visual Design](assets/visual-design.png)](<https://www.figma.com/file/pFLTxI3eLXvnoVyPqCYZZm/ONDC-Hackathon-Design-(Makers42)?node-id=48%3A592>)

## Usage

To use the web app, follow these instructions:

- Install `node`: [This guide](https://nodejs.org/en/download/package-manager/)
  will help you install Node. Make sure you are using the
  [active LTS version](https://github.com/nodejs/Release#release-schedule) of
  Node.
- Install `pnpm`: [This guide](https://pnpm.io/installation) will help you
  install PNPM.
- Download the source code: Run `pnpx degit gamemaker1/beckn-catalog-management`
  in a new folder to download the source code.
- Install dependencies: Run `pnpm install` in terminal in the project folder.
- Run the project: Run `pnpm watch` in terminal and open
  [`http://localhost:8080`](http://localhost:8080) in your browser to see the
  web app in action.

## Implementation Status

- [x] A schema that describes a product.
- [x] A web component that enables a kirana store owner to:
  - [x] search their catalog with voice input.
  - [x] add a new product to the catalog.
- [ ] API server with endpoints to retrieve and update the crowdsourced catalog.

## License

Copyright 2022 Vedant K <https://github.com/gamemaker1>, Siddhant K
<https://github.com/kineticdesigner42>

This project is licensed under the MIT license. Take a look at the
[`license.md`](license.md) file for the full license text.
