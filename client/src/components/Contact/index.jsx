import { useAuth } from "../context/authContext";
import "./Contact.css";



function Contact() {
const auth = useAuth()
console.log(auth.user)

    return (
        <div>
            <p>Contact</p>
        </div>
    )
}

export default Contact;