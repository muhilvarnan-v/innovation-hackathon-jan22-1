import React, { Component } from 'react'
import axios from 'axios'

export class PostForm extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            categoryid:50,
            categoryName:"Electronic",
            categoryDescription:"Sample home appliances",
            channel:"Test Record",
            ProductId:50,
            ProductName:"",
            categoryid1:50,
            productDescription:"",
            productManual: "Auto Restart",
            productSpecification:"",
            productWarranty:"",
            productFeatures: "Sample Text",
            productModel: "",
            productCompany:"",
            productPreview: "",
            productCreated: "2021-08-23T00:00:00",
            productAuthor: "Bosch"
        }
    }

    changeHandler = (e) =>{
        this.setState({[e.target.name]:e.target.value})
    }

    submitHandler = (e) =>{
        e.preventDefault()
        console.log(this.state)
        axios.post('https://ceeaapim.azure-api.net/myapi/products',this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error =>{
                console.log(error)
            })
    }
    
    render() {
        const {userID, title, body} = this.state

        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <input type="text" name="userID" 
                        value={userID} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input type="text" name="title" 
                        value={title} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input type="text" name="body" 
                        value={body} onChange={this.changeHandler}/>
                    </div>
                    <button type="Submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default PostForm
