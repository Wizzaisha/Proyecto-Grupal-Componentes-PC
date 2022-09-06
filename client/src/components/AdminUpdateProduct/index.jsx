import React, {  useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct } from '../../redux/actions'
import "./UpdateProduct.css";
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

const validate = (input) => {
  const errors = {}
  if(!input.brand) errors.brand = "Por favor escriba la marca"
  if(!input.model) errors.model = "Por favor escriba el modelo"
  if(!input.description) errors.description = "Por favor escribe una descripción"
  if(!input.image) errors.image = "Por favor agregue una imagen"
  if(!input.specs.length && input.specs.length < 20) errors.specs = "Por favor agregue hasta 20 especificaciones"
  if(!input.benchmark || input.benchmark < 1) errors.benchmark = "Por favor agregue el numero beachmarck mayor a 0"
  if(!input.price || input.price < 1) errors.price = "Por favor agregue un precio mayor a 0" 
  if(!input.stock || input.stock < 1 ) errors.stock = "Por favor agregue stock mayor a 0"  
  if(!input.category  ) errors.category = "Por favor agregue una categoría"
  return errors;
}

export default function UpdateProduct()
{
    const dispatch = useDispatch()
    const { idProduct } = useParams();
    var navigate = useNavigate ();

//Exit

const exit = (e) =>{
    e.preventDefault();
      navigate('/adminpanel/list-product');
     }

  //Inputs
  const [errors, setErrors] = useState({})
   
  const details = useSelector (state => state.details)

  const [input, setInput] = useState({
    brand:details.brand,
    model:details.model,
    image: details.image,
    description: details.description,
    specs:details.specs,
    benchmark: details.benchmark ,
    price:details.price,
    stock:details.stock,
    category: details.category, 
  })

  const [spetial, setSpetial] = useState({
    spec:""
  })
  //Image

const[loading,setLoading]=useState(false)

const uploadImage=(files)=>{
        const formData= new FormData()
        
        const inputImagen=document.getElementById("jpg");
        const inputRuta= inputImagen.value
        const permiido=/(.jpg|.jpeg)$/i;
       
        if(!permiido.exec(inputRuta))
        {
         alert ("Select an image extension jpg")
         // inputImagen.value="";
        }
        // if(!input.image.length)
        // {
         formData.append("file",files[0])
         formData.append("upload_preset","pghenryy")
         setLoading(true)
      
         Axios.post("https://api.cloudinary.com/v1_1/dmmvgeakg/image/upload", formData).then((response)=>
         setInput({
          ...input,
          image:response.data.secure_url
         }))
         setLoading(false)
        // }
        // if(input.image.length){
        //  alert ("image select")
        //  inputImagen.value=""  }
     }

//Specs

const handleSpetial = (e) =>{
    e.preventDefault();
    setSpetial({    
       spec: e.target.value 
    })
     }

const handleSpecs = (e) =>
{
    e.preventDefault();
    var array = [...input.specs]
    if(spetial.spec !== '')
    {
    array.push(spetial.spec)
    setInput({ ...input, specs:array  })
    const validations = validate(input);
    setErrors(validations)
    }
}

function handleDeleteSpec(i) {
    setInput({
      ...input,
      specs: input.specs.filter((el) => el !== i),
    });
  }

//Categories

const productCategories = useSelector((state) => state.allCategories)

function handleSelectCategory(e){

    setInput({
        ...input,
        category:e.target.value
    })
}

function handleButtonCategory(){
if(input.category.length)
{
    document.getElementById("inputCategory").style.display="block" 
}else{
    alert ("add category")
}}

function handleNew(){
   
        document.getElementById("caja").disabled=false
        document.getElementById("new").style.display="block"
        document.getElementById("add").style.display="none"
    
    // if(input.category.length){
    //     document.getElementById("caja").disabled=true
    //     document.getElementById("inputCategory").style.display="block"
    //     alert("Category Cread")
    // }
}
function handleAdd(){
   
        document.getElementById("add").style.display="block"
        document.getElementById("new").style.display="none"
   
        document.getElementById("inputcategory").style.display="block"
        // alert ("Category Select")
   

}

//Rest
  const handleChange = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = { ...prevInput,   [e.target.name]: e.target.value  }
      const validations = validate(newInput);
      setErrors(validations)
      return newInput
    });
  };

//Submit

const clearInputs = () =>{
      
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

const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(errors).length > 0) {
      alert("Info required is missing");
    } else if (
      input.brand === ''  && 
      input.model === '' &&
      input.description === '' && 
      input.benchmark === 0 && 
      input.price < 1 &&
      input.stock < 1 && 
      input.category === '' &&
      !input.specs.lengt ) {
      
      alert("Por favor complete los datos del formulario correspondientemente");}
    else {
        const name = input.brand+ " " + input.model
      try{

        dispatch(editProduct(idProduct, input))
  
        alert(`Tu producto '${name}' fue editado!`)
   


        navigate('/adminpanel/list-product')
      } catch(err) {
        // alert(err)
        console.log(err)
  
      }
     }
  clearInputs () 

  }

//Render

return (
  <div className="">

    <div className="activityCardContainer">
      <div className="activityCard">
        <div className="activityTitle">
        </div>  

        <form className="formActivity" onSubmit={handleSubmit}>

            
          <span className='titleCreateActivity'> Edit Product </span>
          <Button variant="primary" onClick={ exit }>Go back</Button>

          <div className="inputActivities">
            <label className='labelActivity'> Brand </label>
            <input
              className="i"
              type="text"
              placeholder= "Add a brand"
              value={input.brand}
              name="brand"
              onChange={handleChange}
            />
            {errors.brand && <p className="e">{errors.brand}</p>}
          </div>
          


          <div className="inputActivities">
            <label> Model </label>
            <input  className="i"
              type="text"
              value={input.model}
              name="model"
              placeholder={details.model}
              onChange={handleChange} />
            {errors.model && <p className="e">{errors.model}</p>}
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
                            loading?(<h3>Cargando Imagen...</h3>):(<img src={input.image}style={{width:"100px"}}/>)
                        }
                    </div>
               
                </div>


            <div className="inputinputActivities">
            <label> Description </label>
            <input
              className="i"
              type="text"
              value={input.description}
              name="description"
              placeholder={details.description}
              onChange={handleChange}
            />
            {errors.description && <p className="e">{errors.description}</p>}
          </div>



          <div>
          <label> Category </label>
          <br/>
                <input type="button"  value="New Category" onClick={handleNew}></input>
                <input type="button" value="Set Category" onClick={handleAdd}></input>
                </div>

             <div id="add">
             <select onChange={handleSelectCategory} defaultValue={input.category}>
                <option value="DEFAULT" disabled>{input.category}</option>
                {productCategories.map((c)=>(<option key={c} value={c}>{c}</option>))}
                </select>
             </div>

                <div id="new" >
                <input 
                value={input.category.toUpperCase()} 
                onChange={handleChange}
                name="category" 
                type="text"
                id="caja"
                disabled={true} 
                ></input>
               <input id="+" type="button" value="+" onClick={handleButtonCategory}></input>
                </div>



          <div>
             <label  className="i" >Specs </label>
            <input
              className="i"
              type="text"
              name="spec"
              value={spetial.spec}
              placeholder="Agregue especificaciones"
              onChange={handleSpetial}
                  />


          <Button variant="primary" onClick={ handleSpecs }>Add Specification</Button>
          </div>


          <div className="textArea">
            {input.specs && input.specs.map((s) => (
              <div className='countrieAndButton'>
                
                <input className='btnDelete' type='button' value='X' onClick={() => handleDeleteSpec(s)}/>
                <p className='pOfCountry'>{s}</p>
              </div>
            ))}
          </div>
          {errors.specs && <p className="e">{errors.specs}</p>}



          <div>
            <button className='btnActivity' type="submit">Save Edition</button>
          </div>




        </form>
      </div>
    </div>
  </div>
);

}