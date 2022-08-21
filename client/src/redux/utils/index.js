export function filterData(data, category, sortType, brands) {    
    

    if (sortType.length > 0){
        
        sortItems(data, sortType);
    }

    if (brands.length > 0 && category.length > 0){
        
        return data.filter(product => {
            return product.category === category && brands.indexOf(product.brand) > -1;;
        })
    } 

    if (category.length > 0){
        
        return data.filter(product => {
            return product.category === category;
        })
    } 
    
    if (brands.length === 0 && category.length === 0){
        return data;
    }


}

export function filterCurrentBrands(data, category){
    
    let brands = [];

    const filterData = data.filter(product => {
        return product.category === category;
    });


    filterData.forEach(element => {
        if (brands.indexOf(element.brand) === -1) brands.push(element.brand);
    });

    return brands;
    
}

export function sortItems(data, type) {
    switch(type) {
        case "A - Z":
            sortAscending(data, "brand");
            break;
        case "Z - A":
            sortDescending(data, "brand");
            break;
        case "priceAsc":
            sortAscending(data, "price");
            break;
        case "priceDesc":
            sortDescending(data, "price");
            break;
        default:
            return "Property not found";
    }
}


function sortAscending(data, property) {
    data.sort((a, b) => {
        if (a[property] > b[property]) return 1;
        if (a[property] < b[property]) return -1;
        return 0;
    });
}

function sortDescending(data, property) {
    data.sort((a, b) => {
        if (a[property] < b[property]) return 1;
        if (a[property] > b[property]) return -1;
        return 0;
    });
}