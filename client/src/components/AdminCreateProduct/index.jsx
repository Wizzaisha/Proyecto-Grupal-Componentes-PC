import "./AdminCreateProduct.css";
import React,{useState, useEffect} from "react";
// import {Link,useHistory} from 'react-router-dom'
import {getAllCategories, createProduct } from '../../redux/actions'
import {useDispatch, useSelector} from 'react-redux';
import Axios from "axios"



function AdminCreateProduct() {

    const dispatch=useDispatch();
    const allCategories = useSelector(state => state.allCategories);
    const[loading,setLoading]=useState(false)



    const [input,setInput]=useState({
        brand:"",
        model:"",
        image:"",
        description:"",
        specs:[],
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
        [e.target.name]:e.target.value
    })
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
    document.getElementById("inputCategory").style.display="none"
    document.getElementById("caja").value=""
 }   
setInput({
    ...input,
    category:""
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
        document.getElementById("inputCategory").style.display="block"
        alert("Category Cread")
    }
}
function handleAdd(){
    if(!input.category.length){
        document.getElementById("add").style.display="block"
        document.getElementById("new").style.display="none"
    }else{
        document.getElementById("inputCategory").style.display="block"
        alert ("Category Select")
    }

}
function handleSpecs(e){
    setInput({
        ...input,
        specs:(e.target.value).split(",")
        
    })


}

function handleButtonCategory(){
    if(input.category.length)
    {
        document.getElementById("inputCategory").style.display="block" 
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
//------------------pghenryy
// function handleBenchmark(){
//     const valor=document.getElementById("benchmark").value
//     const num=parseInt(valor)
//     if(num){
//         setInput({
//             ...input,
//             benchmark:num
//         })
//     }
// }
    
function handleSubmit(e){


    dispatch(createProduct(input))
  
    setInput({
        brand:"",
        model:"",
        image:"",
        description:"",
        specs:[],
        benchmark:0,
        price:0,
        stock:0,
        category:""
    })
    
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
                    onChange={(e)=>handleChange(e)}></input>
                </div>

                <div>
                <label>Model:</label>
                    <input type="text" 
                    value={input.model}
                    name="model"
                    onChange={(e)=>handleChange(e)}></input>
                </div>

                <div>
                <label>Image:</label>
                    <input
                    id="jpg"
                    type="file"
                    onChange={(e)=>{
                        uploadImage(e.target.files)
                    }}
                    ></input>
                    <div className="photopost">
                        {
                            loading?(<h3>Cargando Imagenes...</h3>):(<img src={input.image}style={{width:"100px"}}/>)
                        }
                    </div>
               
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
                    value={input.specs}
                    name="specs"
                    onChange={(e)=>handleSpecs(e)}></input>
                </div>

                <div>
                <label>Benchmark:</label>
                    <input type="text" 
                    value={input.benchmark}
                    name="benchmark"
                    id="benchmark"
                    onChange={handleChange}></input>
                </div>

                <div>
                <label>Price:</label>
                    <input type="text" 
                    value={input.price}
                    name="price"
                    onChange={(e)=>handleChange(e)}></input>
                </div>

                <div>
                <label>Stock:</label>
                    <input type="text" 
                    value={input.stock}
                    name="stock"
                    onChange={(e)=>handleChange(e)}></input>
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

                <div>
                    <button type='submit' onClick={handleSubmit}>Crear Product</button>
                </div>              
            </form>
            <div id="inputCategory">
            {input.category}
                <button onClick={handleDelete}>x</button>
            </div>

           
        </div>
        
    )
}
export default AdminCreateProduct;