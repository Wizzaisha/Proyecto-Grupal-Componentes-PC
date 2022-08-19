
import {
    ACTION_TEST,
    ADD_TO_CART,
    REMOVE_FROM_CART
} from "../actions";

const initialState = {
    products: [
    {
        id: 5,
        background_image: "https://http2.mlstatic.com/D_NQ_NP_933418-MLA40865317836_022020-V.webp",
        marca: "Sony",
        modelo: "WH-CH510",
        precio: 11,
        description: "Sony, sin lugar a dudas es una de las marcas más reconocidas en el mundo por la fabricación de dispositivos de audio. Su gama de auriculares se caracteriza por brindar siempre una gran experencia de uso en sus usuarios y ofrecer una alta calidad en todos los componentes de sus reproductores. Esto hace que puedas notar un gran sonido desde su primer uso.El formato perfecto para vos al ser on-ear se apoyan en tus orejas cómodamente y ofrecen una gran calidad de sonido. Usalos en viajes largos o actividades al aire libre. Bluetooth de última generaciónCon la versión de bluetooth 5.0 tenés un montón de beneficios para aprovechar. En comparación a su antecesor BT 4.2, podrás obtener velocidades de transmisión de hasta 2.2 Mbps de datos y alcanzar una distancia máxima de 200 metros de conexión. Pero una de las novedades más sobresalientes es que con su modo dual tendrás la posibilidad de reproducir audio al mismo tiempo en dos dispositivos diferentes.",
        bentchmark: 95,
        especificaciones: ["Inalambrico: Sí", "Color: Negro", "Formato: In-ear"],
        categoria: "Headsets",
        stock: 99
    },
    
    {
        id: 4,
        background_image: "https://http2.mlstatic.com/D_NQ_NP_785994-MLA46540771007_062021-V.webp",
        marca: "JBL",
        modelo: "Tune 510BT",
        precio: 64.99,
        description: "Disfruta estos auriculares JBL de ultima generación!.",
        bentchmark: 75,
        especificaciones: ["Inalambrico: Sí", "Color: Negro", "Formato: In-ear"],
        categoria: "Headsets",
        stock: 33
    },
    
    {
        id: 3,
        background_image: "https://http2.mlstatic.com/D_NQ_NP_630172-MLA48751441285_012022-V.webp",
        marca: "Logitech",
        modelo: "G Series G435",
        precio: 19,
        description: "Experimentá la adrenalina de sumergirte en la escena de otra manera! Tener auriculares específicos para jugar cambia completamente tu experiencia en cada partida. Con los Logitech G435 no te perdés ningún detalle y escuchás el audio tal y como fue diseñado por los creadores. El formato perfecto para vos el diseño over-ear brinda una comodidad insuperable gracias a sus suaves almohadillas. Al mismo tiempo, su sonido envolvente del más alto nivel se convierte en el protagonista de la escena.",
        bentchmark: 104,
        especificaciones: ["Inalambrico: No", "Color: Negro y amarillo", "Formato: Over-ear"],
        categoria: "Headsets",
        stock: 88
    },
    
    {
        id: 2,
        background_image: "https://http2.mlstatic.com/D_NQ_NP_962972-MLA42763657387_072020-V.webp",
        marca: "Noga",
        modelo: "Aris NG-BT469",
        precio: 11,
        description: "Estos auriculares Noga son una excelente opcion para aquellos usuarios exigentes con la calidad de sonido",
        bentchmark: 12,
        especificaciones: ["Inalambrico: Sí", "Color: Verde y negro", "Formato: In-ear"],
        categoria: ["Headsets"],
        stock: 99
    },
    
    {
        id: 1,
        background_image: "https://http2.mlstatic.com/D_NQ_NP_822527-MLA47583335665_092021-V.webp",
        marca: "Audio-Technica",
        modelo: "M-Series ATH-M40x",
        precio: 6.99,
        description: "El formato perfecto para vos. El diseño over-ear brinda una comodidad insuperable gracias a sus suaves almohadillas. Al mismo tiempo, su sonido envolvente del más alto nivel se convierte en el protagonista de la escena.",
        bentchmark: 8,
        especificaciones: ["Inalambrico: No", "Color: Negro", "Formato: Over-ear"],
        categoria: "Headsets",
        stock: 12
    },
    {
        id: 4,
        background_image: "https://http2.mlstatic.com/D_NQ_NP_785994-MLA46540771007_062021-V.webp",
        marca: "JBL",
        modelo: "Tune 510BT",
        precio: 64.99,
        description: "Disfruta estos auriculares JBL de ultima generación!.",
        bentchmark: 75,
        especificaciones: ["Inalambrico: Sí", "Color: Negro", "Formato: In-ear"],
        categoria: "Headsets",
        stock: 33
    }],
    cart:[]
}

const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case ACTION_TEST:
            console.log(action.payload);
            break;

        case ADD_TO_CART:
                // Selecciono y guardo en una constante el objeto elegido para agregar al carrito
                var chosenProduct = state.products.find(p => p.id === action.payload)
                
                // Aca busco si existe el producto buscandolo por ID entre los que se encuentran dentro del array «cart» del estado global...
                // Negamos el resultado del condicional ya que solo en caso de que arroje undefined (no exista) vamos a solicitar que  nos retorne el 
                // estado «cart» con el producto actual agregado. De lo contrario retorna el estado tal cual esta

                if(!state.cart.find(p => p.id === action.payload)) return {...state, cart: [...state.cart, chosenProduct]};

                // else
                return {...state}

        case REMOVE_FROM_CART:
                // Esto filtra el estado «cart» y retorna una copia sin el producto que coincida con el ID pasado por payload

                return {...state, cart: state.cart.filter(p => p.id != action.payload)};

                
        default: 
            return {...state}
    }
}

export default rootReducer;