import React from "react";

export default class FetchProduct extends React.Component {
  state = {
    loading: true,
    product: null
  };

  async componentDidMount() {
    const url = "https://ceeawebapi.azure-api.net/myapi/products";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ product: data, loading: false });
  }

  render() 
  {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.product) {
      return <div>didn't get a person</div>;
    }

    const ProductData = ({ productPreview, ProductName, categoryName, categoryDescription, productCompany, productDescription, 
      productManual, productSpecification, productWarranty, productFeatures, productCreated}) => (
      <div>
        <img src={productPreview} alt="" width="50%"/>
        <div>
          <h2>{ProductName}</h2>
          <p>{"Product Company: " + productCompany}</p>
          <p>{"Product Description: " + productDescription}</p>
        </div>
      </div>
    );
  
    return (
      <div className="App">
        
      <div style={{ textAlign: "center" }}>
      <div>
        <p>"    "</p>
        <p>"    "</p>
        {this.state.product.map((product) => (
          <ProductData
            productPreview={product.productPreview}
            ProductName={product.ProductName}
            productCompany={product.productCompany}
            productDescription={product.productDescription}
          />
        ))}
      </div>

        <div style={{
          padding: "0 20px"
        }}>
        </div>
      </div>
    </div>
    );
  }
}
