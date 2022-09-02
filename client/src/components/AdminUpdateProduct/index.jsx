import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate  , Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import {getProductDetails, editProduct } from '../../redux/actions'
import "./UpdateProduct.css";
import Button from 'react-bootstrap/Button';

const validate = (input) => {
  const errors = {}
  if(!input.brandI) errors.brandI = "Por favor escriba la marca"
  if(!input.modelI) errors.modelI = "Por favor escriba el modelo"
  if(!input.descriptionI) errors.descriptionI = "Por favor escribe una descripción"
  if(!input.imageI) errors.imageI = "Por favor agregue una imagen"
  if(!input.specsI.length && input.specsI.length < 20) errors.specsI = "Por favor agregue hasta 20 especificaciones"
  if(!input.benchmarkI && input.benchmarkI < 1) errors.benchmarkI = "Por favor agregue el numero beachmarck mayor a 0"
  if(!input.priceI && input.priceI < 1) errors.priceI = "Por favor agregue un precio mayor a 0" 
  if(!input.stockI && input.stockI < 1 ) errors.stockI = "Por favor agregue stock mayor a 0"  
  if(!input.categoryI  ) errors.categoryI = "Por favor agregue una categoría"
  return errors;
}

export default function UpdateProduct()
{
    const dispatch = useDispatch()
    const { idProduct } = useParams();
    const details = useSelector (state => state.details)

    useEffect(() => {
        dispatch(getProductDetails(idProduct))
    }, [dispatch, idProduct])

 
  const productCategories = useSelector((state) => state.allCategories)
   
  let navigate = useNavigate ();
  const [errors, setErrors] = useState({})
 
 
  const [input, setInput] = useState({
    brandI:details.brand,
    modelI:details.model,
    imageI: details.image,
    descriptionI: details.description,
    specsI:details.specs,
    benchmarkI: details.benchmark ,
    priceI:details.price,
    stockI:details.stock,
    categoryI: details.category,
    specI: ""
  })

  const handleSpecs = (e) =>{
    e.preventDefault();
    var array = [...input.specsI]
    array.push(input.specI)
    // console.log('ver', ver[0])
    setInput({
      ...input,
      specsI:array
    })
    const validations = validate(input);
    setErrors(validations)
     }

function handleDelete(i) {
//     if(input.specsI.length === 0) 
//     {
//         setInput({
//             ...input,
//             specsI: []
//           });
//     }
//     else
//    { 
    setInput({
      ...input,
      specsI: input.specsI.filter((el) => el !== i),
    });
    // }
  }
  
// function handleSelect(e) {
//     setInput({ ...input, categoryI: [ e.target.value] });
//   }

  const handleChange = (e) => {
    e.preventDefault();
    setInput((prevInput) => {
      const newInput = { ...prevInput,   [e.target.name]: e.target.value  }
      const validations = validate(newInput);
      setErrors(validations)
      return newInput
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(errors).length > 0) {
      alert("Info required is missing");
    } else if (
      input.brandI === ''  && 
      input.modelI === '' &&
      input.descriptionI === '' && 
      input.benchmarkI === 0 && 
      input.priceI < 1 &&
      input.stockI < 1 && 
      input.categoryI === '' &&
      !input.specsI.lengt ) {
      
      alert("Por favor complete los datos del formulario correspondientemente");}
    else {
      try{
        if (input.brandI === details.brand){input.brandI=false}
        if (input.modelI === details.model){input.modelI=false}
        if (input.imageI === details.image){input.imageI=false}
        if (input.descriptionI === details.description){input.descriptionI=false}
        if (JSON.stringify(input.specsI) === JSON.stringify(details.specs)){input.specsI=false}
        if (input.benchmarkI === details.benchmark){input.benchmarkI=false}
        if (input.priceI === details.price){input.priceI=false}
        if (input.categoryI === details.category){input.categoryI=false}

      dispatch(editProduct(idProduct, input.brandI,input.modelI,input.imageI,input.descriptionI,input.specsI,input.benchmarkI,input.priceI,input.stockI,input.categoryI))    
   
        alert(`Tu producto '${input.brandI}' fue editado!`)
        navigate('/adminpanel')
      } catch(err) {
        // alert(err)
        console.log(err)
  
      }
     }
  }

return (
  <div className="">
    {/* <div>
      <NavBar />
    </div> */}

    <div className="activityCardContainer">
      <div className="activityCard">
        <div className="activityTitle">
        </div>  

        <form className="formActivity" onSubmit={handleSubmit}>

            
          <span className='titleCreateActivity'> Edit Product </span>


          <div className="inputActivities">
            <label className='labelActivity'> Brand </label>
            <input
              className="i"
              type="text"
              placeholder= "Add a brand"
              value={input.brandI}
              name="brandI"
              onChange={handleChange}
            />
            {errors.brandI && <p className="e">{errors.brandI}</p>}
          </div>
          


          <div className="inputActivities">
            <label> Model </label>
            <input
              className="i"
              type="text"
              value={input.modelI}
              name="modelI"
              placeholder={details.modelI}
              onChange={handleChange}
            />
            {errors.modelI && <p className="e">{errors.modelI}</p>}
          </div>



          <div className="inputActivities">
            <label> Image </label>
            <input
              className="i"
              type="text"
              value={input.imageI}
              name="imageI"
              placeholder="Modifique la imagen..."
              onChange={handleChange}
            />
            {errors.imageI && <p className="e">{errors.imageI}</p>}
          </div>



             <div className="inputinputActivities">
            <label> Description </label>
            <input
              className="i"
              type="text"
              value={input.descriptionI}
              name="descriptionI"
              placeholder={details.descriptionI}
              onChange={handleChange}
            />
            {errors.descriptionI && <p className="e">{errors.descriptionI}</p>}
          </div>



          <div>
             <label  className="i" >Categories </label>
             <input
            //   className="i"
            //   type="text"
              value={input.categoryI}
              name="categoryI"
              placeholder={details.categoryI}
              onChange={handleChange}
            />
             <datalist id="category">
             {  productCategories.map(    (c) => ( <option  value={c}>{c}</option> )    )   }
             </datalist>
          {errors.categoryI && <p className="e">{errors.categoryI}</p>}
               </div>



          <div>
             <label  className="i" >Specs </label>
            <input
              className="i"
              type="text"
              name="specI"
              value={input.specI}
              placeholder="Agregue especificaciones"
              onChange={handleChange}
                  />

          {/* <button  type = "button" onClick={ () => handleSpecs } >Add Specification</button> */}
          <Button variant="primary" onClick={ handleSpecs }>Add Specification</Button>
          </div>


          <div className="textArea">
            {input.specsI && input.specsI.map((s) => (
              <div className='countrieAndButton'>
                
                <input className='btnDelete' type='button' value='X' onClick={() => handleDelete(s)}/>
                <p className='pOfCountry'>{s}</p>
              </div>
            ))}
          </div>
          {errors.specsI && <p className="e">{errors.specsI}</p>}



          <div>
            <button className='btnActivity' type="submit">Save Edition</button>
          </div>




        </form>
      </div>
    </div>
  </div>
);

}