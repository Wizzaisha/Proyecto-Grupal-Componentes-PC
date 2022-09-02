
// falta controlar buton "Send"

import { useAuth } from "../context/authContext";

import "./Contact.css";
import Form from 'react-bootstrap/Form';
import React,{useState} from "react";


    // function validate(input){
    //     let desabilitar=false;
    //     if(!input.name){
    //         desabilitar=true;
    //     }
    //     if(!input.email){
    //         desabilitar=true;
    //     }
    //     if(!input.affair){
    //         desabilitar=true;
    //     }
    //     if(!input.message){
    //         desabilitar=true;
    //     }
    //     if(desabilitar===true){
    //         btn.disabled=true;
    //     } else{
    //        btn.disabled=false; 
    //     }
       
        
    // }

    // let btn=document.querySelector('button');

    // function validate(input){
    //     let desabilitar=false;
    //     if(input.name===""){
    //         desabilitar=true;
    //     }
    //     if(desabilitar===true){
    //         btn.disabled=true;
    //     }else{
    //         btn.disabled=false;
    //     }
    // }

    // Form.addEventListener("keyup", validate)

function Contact() {
const auth = useAuth()


    
    const [input,setInput]=useState({
        name:"",
        email:"",
        affair:"",
        message:"",
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    
function handleB(){
let button=document.getElementById("button")
button.disabled=true
if(input.name && input.email && input.affair && input.message){
    button.disabled=false
}

    }








    


    return (
        <div className="container border" 
        style={{marginTop:"0px",
        width:'100%',
        height:'30%',
        backgroundImage:'url("https://www.rdstation.com/blog/wp-content/uploads/sites/2/2017/09/thestocks.jpg")',
        backgroundPosition:'center',
        backgroundSize:'cover'
        }}>
            <div>
            <h1 style={{marginTop:'10px'}}>Contact</h1>
            </div>
           
            <Form className="row" style={{margin:'25px 85px 75px 100px' }} onChange={handleB}
            action="https://formsubmit.co/proyectofinalhenry2022@gmail.com" method="POST" id="form">
                
                <label>Name</label>
                 <input type="text" name="name" id="name"  placeholder="Enter name" className="form-control" value={input.name} onChange={handleChange}></input>



                <label>Email</label>
                <input type='email' name='email'  placeholder="Enter Email" className="form-control" value={input.email} onChange={handleChange}></input>
            

                <label>Affair</label>
                <input type="text" name="affair"  placeholder="Enter theme" className="form-control" value={input.affair} onChange={handleChange} ></input>


                <label>Message</label>
                <textarea name='message' rows='4' className="form-control" placeholder="Enter your query" value={input.message} onChange={handleChange}/>
               
                <button className="form-control btn btn-primary" style={{marginTop:'10px'}}  id="button" disabled>Send</button>


                {/* input de personalizacion     */}
            <input type="hidden" name="_next" value="http://localhost:3000/store"/>
            <input type="hidden" name="_captcha" value="false"/> 
              

                 </Form>
        </div>
    )
}

export default Contact;