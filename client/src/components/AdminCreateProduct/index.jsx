import "./AdminCreateProduct.css";
import React,{useState, useEffect} from "react";
// import {Link,useHistory} from 'react-router-dom'
import {getAllCategories, createProduct } from '../../redux/actions'
import {useDispatch, useSelector} from 'react-redux';
import Axios from "axios"
import {Link,useNavigate} from "react-router-dom"

// import{Link,useHistory} from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
// import {Link,useHistory} from 'react-router-dom'



function validate(input){
    const price=parseInt(input.price)
    const stock=parseInt(input.stock)
    const benchmark=parseInt(input.benchmark)

    let errors={}
    // BRAND
    if(!input.brand.length){
        errors.brand="Enter brand Brand"
    }
    //MODEL
    if(!input.model.length){
        errors.model="Enter un Model"
    }
    //IMG
    if(!input.image.length){
        errors.image="Enter una image"
    }
    //PRICE
    if(!price){
        errors.price="Enter a data of type number"
    }
    if(price===0){
        errors.price="Enter a value greater than 0"
    }
    //STOCK
    if(!stock){
        errors.stock="Enter a data of type number"
    }
    if(stock===0){
        errors.stock="Enter a value greater than 0"
    }
    if(stock>501){
        errors.stock="Enter a value less than 500"
    }
    //benchmark
    if(!benchmark){
        errors.benchmark="Enter a value between 1 and 300"
    }
    if(benchmark===0){
        errors.benchmark="Enter a value greater than 0"
    }
    if(benchmark>300){
        errors.benchmark="Enter a value less than 300"
    }
    //decription
    if(input.description.length<20){
        errors.description="Enter a description of at least 20 letters"
    }
    //specs
    if(input.specs.length<2){
        errors.specs="enter at least 3 specifications"
    }
    //category
    if(!input.category.length){
        errors.category="Enter category"
    }
    
    return errors
}


function AdminCreateProduct() {
    const navigate=useNavigate()

    const[errors,setErrors]=useState({})
   
    // const history=useHistory()

    const dispatch=useDispatch();
    const allCategories = useSelector(state => state.allCategories);
    const[loading,setLoading]=useState(false)



    const [input,setInput]=useState({
        brand:"",
        model:"",
        image:"",
        description:"",
        specs:[],
        specsI:"",
        benchmark:0,
        price:0,
        stock:0,
        category:""
    })
    

    useEffect(()=>{
        dispatch(getAllCategories())
    },[dispatch])

function handleChange(e){
  
    setInput({
        ...input,
        [e.target.name]:e.target.value,
    })
    setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
    }))
    console.log(input)
    
    
   
}
function handleSelect(e){

    setInput({
        ...input,
        category:e.target.value
    })
}

function handleDelete(e){
 if(input.category.length){
    // document.getElementById("inputCategory").style.display="none"
    // document.getElementById("caja").value=""
 }   
setInput({
    ...input,
    category:""
})
}

function handleDeleteSpecs(e){
    setInput({
        ...input,
        specs:input.specs.filter((s)=>s!==e)
    })
}


function handleNew(){
    if(!input.category.length){
        document.getElementById("caja").disabled=false
        document.getElementById("new").style.display="block"
        document.getElementById("add").style.display="none"
    }
    if(input.category.length){
        document.getElementById("caja").disabled=true
        // document.getElementById("inputCategory").style.display="block"
        alert("Category Cread")
    }
}
function handleAdd(){
 if(!input.category.length){
        document.getElementById("add").style.display="block"
        document.getElementById("new").style.display="none"
    }else{
        // document.getElementById("inputCategory").style.display="block"
        alert ("Category Select")
    }

}
function handleSpecs(e){
e.preventDefault()
const inputSpecs=document.getElementById("specs")

if(!inputSpecs.value){
    alert ("Enter specs")
}

var array=[...input.specs]
if(input.specs.includes(inputSpecs.value)){
    alert ("specs select")
}else if (inputSpecs.value){
 array.push(input.specsI)
    setInput({
        ...input,
        specs:array
    })
}



inputSpecs.value=""
}

function handleButtonCategory(){
    const inputCategory=document.getElementById("caja")
    if(input.category.length)
    {
        // document.getElementById("inputCategory").style.display="block" 
        document.getElementById("caja").disabled=true
        inputCategory.value=""
        
    }else{
        alert ("add category")
      
    }}






 

//-------------------
const uploadImage=(files)=>{
   const formData= new FormData()
   
   const inputImagen=document.getElementById("jpg");
   const inputRuta= inputImagen.value
   const permiido=/(.jpg|.jpeg)$/i;
  
   if(!input.image.length && !permiido.exec(inputRuta)){
    alert ("Select un jpg")
    // inputImagen.value="";
   }
   if(!input.image.length){
    formData.append("file",files[0])
    formData.append("upload_preset","pghenryy")
    setLoading(true)
 
    Axios.post("https://api.cloudinary.com/v1_1/dmmvgeakg/image/upload", formData).then((response)=>
    setInput({
     ...input,
     image:response.data.secure_url
    }))
    setLoading(false)

   }
   if(input.image.length){
    alert ("image select")
    inputImagen.value=""
   }


}
function handleDeleteImage(){
    setInput({
        ...input,
        image:""
    })
}
//------------------pghenryy



    
function handleSubmit(e){
    e.preventDefault()
if(errors.brand!== undefined ||
    errors.model !== undefined||
    errors.image !==undefined||
    errors.price !== undefined||
    errors.category!==undefined||
    errors.description!==undefined||
    errors.specs!==undefined||
    errors.benchmark!==undefined
    ){
    alert ("Check the errors")
}else if(!input.brand.length ||
    !input.model.length ||
    !input.image.length ||
    !input.description.length ||
    !input.specs.length ||
    !input.price.length ||
    !input.benchmark.length ||
    !input.category.length )
    {
        alert ("Fill in the empty fields")
    }
else if(errors.brand!== undefined ||
    errors.model !== undefined||
    errors.image !==undefined||
    errors.price !== undefined||
    errors.category!==undefined||
    errors.description!==undefined||
    errors.specs!==undefined||
    errors.benchmark!==undefined ||
    input.brand.length ||
    input.model.length ||
    input.image.length ||
    input.description.length ||
    input.specs.length ||
    input.price.length ||
    input.benchmark.length ||
    input.category.length
    ){
    dispatch(createProduct(input))
    alert("Product created")
    navigate("/store");
    
}
// falta que no se cree el producto con los campos vacios

    
    
    // history.push('/store')
  
    // setInput({
    //     brand:"",
    //     model:"",
    //     image:"",
    //     description:"",
    //     specs:[],
    //     benchmark:0,
    //     price:0,
    //     stock:0,
    //     category:""
    // })
    
}


    return (
        <div >
            <div className="hola">
            <h4 className="tx4">Create Product</h4>
            <form onSubmit={(e)=>handleSubmit(e)}
           >
                <div style={{margin: 0}}>
                    <label className="label tx3">Brand:</label>
                    <input type="text" 
                    value={input.brand}
                    name="brand"
                    id="brand"
                    onChange={(e)=>handleChange(e)}
                    ></input>
                    {errors.brand &&(
                        <p className="danger">{errors.brand}</p>
                    )}
                </div>

                <div>
                <label className="label tx3">Model:</label>
                    <input type="text" 
                    value={input.model}
                    name="model"
                    onChange={(e)=>handleChange(e)}></input>
                    {errors.model &&(
                        <p className="danger">{errors.model}</p>
                    )}
                </div>

                <div>
                <label className="label tx3">Image:</label>
                <br></br>
                <label>Suba una imagen local</label>
                    <input
                    id="jpg"
                    type="file"
                    onChange={(e)=>{
                        uploadImage(e.target.files)
                    }}
                    ></input>
                    <br></br>
                    <label>Ingrese la url de la imagen:</label>
                    <input type="text"
                    value={input.image}
                    name="image"
                    onChange={handleChange}></input>
                    {/* <div className="photopost">
                        {
                            loading?(<h3>Cargando Imagenes...</h3>):(<img src={input.image}style={{width:"100px"}}/>)
                        }
                    </div> */}
               {
                errors.image &&(
                    <p className="danger">{errors.image}</p>
                )
               }
                </div>
                
                <div>
                <label className="label tx3">Description:</label>
                    <textarea type="text" 
                    value={input.description}
                    name="description"
                    rows='4'
                    onChange={(e)=>handleChange(e)}></textarea>
                                   {
                errors.description &&(
                    <p className="danger">{errors.description}</p>
                )
               }
                </div>

                <div>
                <label className="label tx3">Specs:</label>
                    <input 
                    
                    name="specsI"
                    id="specs"
                    onChange={handleChange}></input>
                    <button   onClick={handleSpecs} className="bg4 tx1">+</button>
                    {
                errors.specs &&(
                    <p className="danger">{errors.specs}</p>
                )
               }
                </div>

                <div>
                <input type="button"  value="New Category" onClick={handleNew} className="bg4 tx1"></input>
                <input type="button" value="Add Category" onClick={handleAdd} className="bg4 tx1"></input>
                {
                errors.category &&(
                    <p className="danger">{errors.category}</p>
                )
               }
                </div>

             <div id="add">
             <select className="bg4 tx1" onChange={handleSelect} defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>Category</option>
                {allCategories.map((c)=>(<option key={c} value={c}>{c}</option>))}
                </select>
                <input id="+" type="button" value="+" onClick={handleButtonCategory} className="bg4 tx1"></input>
             </div>


                <div id="new">
                    
                
                <input 
                // value={input.category.toUpperCase()} 
                onChange={handleChange}
                name="category" 
                type="text"
                id="caja"
                disabled={true} 
                ></input>
               <input id="+" type="button" value="+" onClick={handleButtonCategory} className="bg4"></input>
                </div>

                <div>
                <label className="label tx3">Benchmark:</label>
                    <input type="text" 
                    value={input.benchmark}
                    name="benchmark"
                    id="benchmark"
                    onChange={handleChange}></input>
                                   {
                errors.benchmark &&(
                    <p className="danger">{errors.benchmark}</p>
                )
               }
                </div>

                <div>
                <label className="label tx3">Price:</label>
                    <input type="text" 
                    value={input.price}
                    name="price"
                    id="price"
                    onChange={handleChange}></input>
                  {
                errors.price &&(
                    <p className="danger">{errors.price}</p>
                )
               }
                </div>

                <div>
                <label className="label tx3">Stock:</label>
                    <input type="text" 
                    value={input.stock}
                    name="stock"
                    onChange={(e)=>handleChange(e)}></input>
                 {
                errors.stock &&(
                    <p className="danger">{errors.stock}</p>
                )
               }
                </div>


                <br/>

                <div>
                   {/* <Link to={'/adminpanel/create-product'}> */}
                   <button className="btn btn-primary button3 bg3 border-0" onClick={handleSubmit}>Crear Product</button>
                   {/* </Link> */}
                </div>    
                          
            </form>
            </div>
            {/* <div id="inputCategory"> */}
            {/* {input.category}
                <button onClick={handleDelete}>x</button>
            </div> */}



            {/* <div className="textArea" >
            {input.specs && input.specs.map((s) => (
              <div className='' key={s}>
                
                <input className='btnDelete' type='button' value='X' onClick={() => handleDeleteSpecs(s)}/>
                <p className='pOfCountry'>{s}</p> 
              </div>
            ))}
          </div> */}
          {/* <div>
          <p>Brand</p>
                {input.brand}
          <p>Model</p>
                {input.model}

            <p>Image</p>
          {
               loading?(<h3>Cargando Imagenes...</h3>):(<img src={input.image}style={{width:"250px"}}/>)
            }
            <p>Category</p>
            <div id="inputCategory" className="">
            <input className="btnDelete" type="button" value="X" onClick={handleDelete} />
                <p className="pOfContry">{input.category}</p>
            </div>

          </div> */}




{/* <div className="container">
            <div className={`containerRow1`}>
            
                <div className="d-flex flex-column" style={{ width: '65%' }}>
                <input className="btnDelete" type="button" value="X" onClick={handleDeleteImage}/>
                    <img src={input.image? input.image : "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/05/496625.jpg"} className="img1" alt="img" />
                </div>
                
                <div className='start1'>
                    <h3 className="tx4">Description</h3>
                    <p className='description1'>{input.description}</p>
                    <h3 className="tx4">Specs</h3>
                    <div className="specs1">
                        {input.specs && input.specs.map((e) => { return <li key={e}>{e}
                        <input className='btnDelete' type='button' value='X' onClick={() => handleDeleteSpecs(e)}></input></li> 
                    
                    }
                    )}


                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10 ps-4" style={{ width: '35%' }}>
                <h1 className="tx4">{`${input.category} ${input.brand} ${input.model}`}</h1>
                <div className="d-flex flex-column align-items-start justify-content-around" style={{ height: '60%', width:'300%' }}>
                <h3>Brand: {input.brand}</h3>
                <h3>Model: {input.model}</h3>
                <h3>Category:</h3>
                <h2>{input.category}<input className="btnDelete" type="button" value="X" onClick={handleDelete} /></h2>
                </div>
                <h3>${input.price}</h3>
                <p>{`Stock available: (${input.stock} available)`} </p>
            </div>
        </div>
 */}

<div className="container">
                <div className="row detailsContainer d-flex flex-column align-items-center">
                    <div className="card col-12 d-flex flex-sm-column flex-md-row align-items-center justify-content-center">
                        <div className="d-flex flex-column" style={{ width: '65%' }}>
 
                            {input.stock === 0 ? <h3 style={{ color: "red" }}>Out of stock</h3> : null}
                            
                            <div className="flex-column" style={{ width: '65%' }}>
                                {/* <img src={input.image} */}
                           
                                <img src={input.image ? input.image : "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/05/496625.jpg"} className="imgDetail" alt="img" />
                                <input className="btnDelete" type="button" value="X" onClick={handleDeleteImage}/>
                            </div>
                            
                            <div className='d-flex flex-column m-5 align-items-start'>
                                <h3 className='tx4'>Description</h3>
                                <p className='description'>{input.description}</p>
                                <h3 className='tx4'>Specs</h3>
                                <div className="specs">
                                {input.specs && input.specs.map((e) => { return <li key={e}>{e}
                        <input className='btnDelete' type='button' value='X' onClick={() => handleDeleteSpecs(e)}></input></li> 
                           }
                           )}
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-around border-start border-dark border-opacity-10 ps-4" style={{ width: '35%' }}>
                            <div className="d-flex flex-column align-items-start justify-content-around" style={{ height: '60%' }}>
                                <h1 className="d-flex flex-column align-items-start tx4">{`${input.category} ${input.brand} ${input.model}`}</h1>
                                <h4>Brand: {input.brand}</h4>
                                <h4>Model: {input.model}</h4>
                                <h4>Price: ${input.price}</h4>
                                <h4>Category: {input.category}<input className="btnDelete" type="button" value="X" onClick={handleDelete} /></h4>
                            </div>
                            <div className="d-flex flex-column" style={{ width: '100%' }}>
                                <p className={`align-self-center ${input.stock < 5 ? 'text-danger fw-bold ' : null}`}>{`Stock available: (${input.stock} available)`} </p>
                                <div className="input-group">
                                    <button type="button" className="btn btn-outline-primary" value={'-'}>-</button>
                                    <input aria-label="Example text with two button addons" className="text-center form-control" value="1" />
                                    <button type="button" className="btn btn-outline-primary" value={'+'} >+</button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary button3 bg3 border-0" >Add to cart</button>
                        </div>
                    </div>

                </div>

            

        </div>



      
        
           
        </div>
        
    )
}
export default AdminCreateProduct;