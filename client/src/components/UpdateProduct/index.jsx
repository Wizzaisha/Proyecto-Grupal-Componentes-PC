import React, { useEffect, useState } from 'react'
import style from './UpdateProduct.css'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct } from '../redux/action'
//import axios from 'axios'


const validate = (input) => {
  const errors = {}
  if(!input.brandI) errors.brandI = "Por favor escriba la marca"
  if(!input.modelI) errors.modelI = "Por favor escriba el modelo"
  if(!input.descriptionI) errors.descriptionI = "Por favor escribe una descripción"
  if(!input.imageI) errors.imageI = "Por favor agregue una imagen"
  if(!input.specsI.length ) errors.specsI = "Por favor agregue alguna especificación"
  if(!input.benchmarkI) errors.benchmarkI = "Por favor agregue el numero beachmarck"
  if(!input.priceI ) errors.priceI = "Por favor agregue un precio" 
  if(!input.stockI ) errors.stockI = "Por favor agregue stock" 
  if(!input.categoryI ) errors.categoryI = "Por favor agregue una categoría" 
  return errors;
}

export default function UpdateProduct(id, brand,model,image,description,specs,benchmark,price,stock,category){
  const dispatch = useDispatch()
  const productCategories = useSelector((state) =>  state.allCategories)
   
  const history = useHistory();
  const [errors, setErrors] = useState({})
//editProduct(id, brand,model,image,description,specs,benchmark,price,stock,category)
  let categprias = productCategories.map((e) => e.name)
  const [input, setInput] = useState({
    brandI:brand,
    modelI:model,
    imageI: image,
    descriptionI: description,
    specsI:specs,
    benchmarkI: benchmark ,
    priceI:price,
    stockI:stock,
    categoryI: category,
  })

  // useEffect(()=>{
  //   dispatch(getGenres())
  // },[dispatch])
  
  const handleChange = (e) => {
    e.preventDefault();
    setInput((prevInput) => {   
      const newInput = { ...prevInput,   [e.target.name]: e.target.value  }
      const validations = validate(newInput);
      setErrors(validations)
      return newInput
    });
  };

  const handleSpecs =(e)=>{
    let array= input.specsI
    let ver= array.indexOf(e.target.value)
    console.log('ver', ver)
    if(ver>=0){array.splice(ver,1)}
    else{array.push(e.target.value)}
    setInput({
      ...input,
      specsI:array
    })
    // console.log('arrayPlat', arrayPlat)
    const validations = validate(input);
    setErrors(validations)
     }

  const handleCategory = (e) => {
    let newArray = input.categoryI
    let find = newArray.indexOf(e.target.value);   
    console.log('find', find) 
    if (find >= 0) { newArray.splice(find, 1)} 
    else { newArray.push(e.target.value) }
    setInput({
        ...input,
        gameGenres2: newArray
    });
    const validations = validate(input);
    setErrors(validations)
}

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (Object.values(errors).length > 0) {
      alert("Info required is missing");
    } else if (
      input.brandI === ''  && 
      input.modelI === '' &&
      input.descriptionI === '' && 
      input.benchmarkI === 0 && 
      input.priceI === 0 &&
      input.stockI === 0 && 
      input.categoryI === '' &&
      !input.specsI.lengt ) {
      
      alert("Por favor complete los datos del formulario");}
    else {
      try{
        if (input.brandI === brand){input.brandI=false}
        if (input.modelI === model){input.modelI=false}
        if (input.imageI === image){input.imageI=false}
        if (input.descriptionI === description){input.descriptionI=false}
        if (JSON.stringify(input.specsI) === JSON.stringify(specs)){input.specsI=false}
        if (input.benchmarkI === benchmark){input.benchmarkI=false}
        if (input.priceI === price){input.priceI=false}
        if (input.categoryI === category){input.categoryI=false}

        // dispatch(editProduct(id, input.brandI,input.modelI,input.imageI,input.descriptionI,input.specsI,input.benchmarkI,input.priceI,input.stockI,input.categoryI))    
   
        alert(`Tu producto '${input.brand}' fue editado!`)
        history.push('/adminpanel')
      } catch(err) {
        // alert(err)
        console.log(err)
  
      }
     }
  }

  return (
    
    <div className={style.contGrid}>
      <div className={style.back}>&nbsp;</div>
      
      <div className={style.titulo}>
        <span>Edicion de producto</span>
          
            <Link to='/home'>
              <button className={style.btn}>Volver al Home</button>
            </Link>    
      </div>
      
      <div className={style}>
        <div className={style }>
        <form onSubmit={ handleSubmit }>
        
        <div className={style}>
          <label> Nombre del Juego: </label></div>
        {/* <div> */}
          <span>
              <input 
              autoComplete='off'
              className={style.input}
              name='name' 
              placeholder='Ingrese un nombre'
              type="text" 
              value={ input.name } 
              onChange={ handleChange } />
              { errors.name && <p className="error">{ errors.name }</p> }
          </span>
          {/* </div> */}
          
          <div className={style.label}><label> Descripcion: </label></div>
          <div ><span>
            <textarea
              className={style.textarea}
              type='text'
              placeholder='Ingrese una descripcion'
              name='description'
              value={ input.description }
              onChange={ handleChange }
              />
             {errors.description && <p>{ errors.description }</p>} 
          </span></div>
          
          <div className={style.label}><label> Fecha de Lanzamiento: </label></div>
          <div><span>
            <input
            className={style.input}
            type='date'
            min='1998-12-31'
            placeholder='Ingrese fecha aa-mm-dd'
            name='released'
            value={input.released}
            onChange={ handleChange }
            />
             {errors.released && <p>{ errors.released }</p>}
            </span></div>

            <div className={style.label}><label>Rating: </label></div>
            <div ><span>
            <input
            autoComplete='off'
            className={style.input}
            type='number'
            min='0'
            max='5'
            name='rating'
            value={ input.rating }
            onChange={ handleChange }
            placeholder='valor de 0 a 5'
            />
             {errors.rating && <p>{ errors.rating }</p>}
             </span></div>

          <div className={style.check}><label> Plataforma permitidas: puedes seleccionar hasta 5 plataformas </label>
          <div>
          {/* {arrayPlat.map(plat=> {
            return(
              <div className={style.checkbox}>
                <ul><li>
              <input              
              type='checkbox'
              id={plat}
              name={plat}
              value={ plat }
              disabled ={input.platform.length > 4 && !input.platform.includes(plat)} 
              selected={ input.platform.includes(plat) } onChange={ handlePlatform }
              />
              <label for={plat} >{plat}</label>
              </li></ul>
              </div>
              )})
            } */}
            </div></div>
            <div>{errors.platform && <p>{ errors.platform }</p>} </div>
            

            <div /*className={style}*/><label> Categorias: puedes seleccionar 1 categoría</label>
 
                  {/* <select name='select' onChange={(e)=>handleGenre(e)} defaultValue="default"> */}
                  <option value='default' disabled='disabled'>Categorias</option>
                 
                  categprias.map((cat)=>(
                        <option key={ cat } value={ cat  }>
                          {cat }
                        </option>
                      ))
                  </select>
                </div>
 
{console.log('ver que carga', input)}
          
          <div className={style.Btn}>
            <button type="submit" disabled={
              errors.name || 
              errors.description ||
              errors.released ||
              errors.rating ||
              errors.platform ||
              errors.genres 
              }>Crear</button>
          </div>
        </form>
          
        </div>
        
      </div>
      <div className={style.back2}>&nbsp;</div>
    </div>
  )
}