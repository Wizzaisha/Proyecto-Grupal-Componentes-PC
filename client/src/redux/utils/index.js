export function filterData(data, category, sortType, brands) {

    let productsData = data;

    
    sortItems(productsData, sortType);
    

    if (category.length > 0){
        productsData = productsData.filter(product => {
            return product.categoria === category;
        })
    }

    if (brands.length > 0){
        productsData = productsData.filter(product => {
            return brands.indexOf(product.marca) > -1;
        });
    }
    
    return productsData;
    

}

export function filterCurrentBrands(data, category){
    
    let brands = [];

    const filterData = data.filter(product => {
        return product.categoria === category;
    });


    filterData.forEach(element => {
        if (brands.indexOf(element.marca) === -1) brands.push(element.marca);
    });

    return brands;
    
}

export function sortItems(data, type) {
    switch(type){
        case "A - Z":
            return sortAscending(data, "marca");
            
        case "Z - A":
            return sortDescending(data, "marca");
            
        case "priceAsc":
            return sortAscending(data, "precio");
            
        case "priceDesc":
            return sortDescending(data, "precio");
            
        default:
            return data;
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