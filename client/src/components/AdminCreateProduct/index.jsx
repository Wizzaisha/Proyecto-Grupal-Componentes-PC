import "./AdminCreateProduct.css";
import React,{useState, useEffect} from "react";
// import {Link,useHistory} from 'react-router-dom'
import {getAllCategories, createProduct } from '../../redux/actions'
import {useDispatch, useSelector} from 'react-redux';
import Axios from "axios"
// import Button from 'react-bootstrap/Button';
// import {Link,useHistory} from 'react-router-dom'



function validate(input){
    const price=parseInt(input.price)
    const stock=parseInt(input.stock)
    const benchmark=parseInt(input.benchmark)

    let errors={}
    // BRAND
    if(!input.brand.length){
        errors.brand="Ingrese Brand"
    }
    //MODEL
    if(!input.model.length){
        errors.model="Ingrese un Model"
    }
    //IMG
    if(!input.image.length){
        errors.image="Ingrese una img"
    }
    //PRICE
    if(!price){
        errors.price="Ingrese un numero"
    }
    if(price===0){
        errors.price="Ingrese un valor mayor a 0"
    }
    //STOCK
    if(!stock){
        errors.stock="Ingrese un numero"
    }
    if(stock===0){
        errors.stock="Ingrese un valor mayor a 0"
    }
    if(stock>501){
        errors.stock="Ingrese un valor menor a 500"
    }
    //benchmark
    if(!benchmark){
        errors.benchmark="Ingrese un numero entre el 1-300"
    }
    if(benchmark===0){
        errors.benchmark="Ingrese un valor mayor a 0"
    }
    if(benchmark>300){
        errors.benchmark="Ingrese un valor menor a 300"
    }
    
    return errors
}


function AdminCreateProduct() {

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
    alert ("Ingrese un specs")
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
if(errors){
    alert ("Rellena los campos, revisa los errores")
}else{
    dispatch(createProduct(input))
}

    
    
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
        <div>
            <div>
             <p>Create Product</p>
            </div>
            <form onSubmit={(e)=>handleSubmit(e)}
           >
                <div>
                    <label>Brand:</label>
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
                <label>Model:</label>
                    <input type="text" 
                    value={input.model}
                    name="model"
                    onChange={(e)=>handleChange(e)}></input>
                    {errors.model &&(
                        <p className="danger">{errors.model}</p>
                    )}
                </div>

                <div>
                <label>Image:</label>
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
                <label>Description:</label>
                    <textarea type="text" 
                    value={input.description}
                    name="description"
                    rows='4'
                    onChange={(e)=>handleChange(e)}></textarea>
                </div>

                <div>
                <label>Specs:</label>
                    <input 
                    
                    name="specsI"
                    id="specs"
                    onChange={handleChange}></input>
                    <button   onClick={handleSpecs}>+</button>
                </div>

                <div>
                <label>Benchmark:</label>
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
                <label>Price:</label>
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
                <label>Stock:</label>
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

                <div>
                <input type="button"  value="New Category" onClick={handleNew}></input>
                <input type="button" value="Add Category" onClick={handleAdd}></input>
                </div>

             <div id="add">
             <select onChange={handleSelect} defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>Category</option>
                {allCategories.map((c)=>(<option key={c} value={c}>{c}</option>))}
                </select>
                <input id="+" type="button" value="+" onClick={handleButtonCategory}></input>
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
               <input id="+" type="button" value="+" onClick={handleButtonCategory}></input>
                </div>
                <br/>

                <div>
                    <button type='submit'className="btn" onClick={handleSubmit}>Crear Product</button>
                </div>              
            </form>
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




<div className="container1">
            <div className={`containerRow1`}>
                <div>
                    <img src={input.image? input.image : "https://resizer.iproimg.com/unsafe/880x/filters:format(webp)/https://assets.iprofesional.com/assets/jpg/2020/05/496625.jpg"} className="img1" alt="img" />
                    <input className="btnDelete" type="button" value="X" onClick={handleDeleteImage}/>
                </div>
                <div className='start1'>
                    <h3>Description</h3>
                    <p className='description1'>{input.description}</p>
                    <h3>Specs</h3>
                    <div className="specs1">
                        {input.specs && input.specs.map((e) => { return <li key={e}>{e}
                        <input className='btnDelete' type='button' value='X' onClick={() => handleDeleteSpecs(e)}></input></li> 
                    
                    }
                    )}


                    </div>
                </div>
            </div>
            <div className="containerColumn2">
                <h1>{`${input.category} ${input.brand} ${input.model}`}</h1>
                <h3>Brand: {input.brand}</h3>
                <h3>Model: {input.model}</h3>
                <h3>Category:</h3>
                <h2>{input.category}<input className="btnDelete" type="button" value="X" onClick={handleDelete} /></h2>
                <h3>${input.price}</h3>
                <p>{`Stock available: (${input.stock} available)`} </p>
            </div>
        </div>





      
        
           
        </div>
        
    )
}
export default AdminCreateProduct;