import "./StarsComponent.css";



function StarsComponent(props) {


    const arr = [1, 2, 3, 4, 5];

    return (
        <div>
            {arr.map((star, index) => {
                index += 1;
                
                return (
                    <span key={index} className={`star ${props.rating === 0 ? "off" : index <= props.rating ? "starOn" : "starOff"}`}>&#9733;</span>
                );
            })}
        </div>
    )
}


export default StarsComponent;