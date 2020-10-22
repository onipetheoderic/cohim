export const Contract = {
    project_name:"Kogi Road Construction",
    contract_type:"bridge",
    date_awarded: '12th January 2020',
    state: 'Kogi',
    lga: 'Adavi',
    contracts_handled_by_contractor:[
        {state:"Kogi", lga:"Adavi", zone:'12', contract_name:'Kogi Road Construction'},
        {state:"Abuja", lga:"Jabi", zone:'12', contract_name:'Kogi Road Construction'},
        {state:"Oyo", lga:"Bodija", zone:'12', contract_name:'Kogi Road Construction'},       
    ],
    zone:'b012',
    project_length:2000,
    name_of_contractor:"Julius Berger",    
    images:["https://images.freeimages.com/images/large-previews/629/bulldozer-1224459.jpg",
            "https://asphaltinc.com/wp-content/uploads/2015/10/AsphaltPaving-1030x688.jpeg",
            "https://www.bccourier.com/wp-content/uploads/2020/02/Road-Bitumen.jpg"
            ],
    stages_construction: [
        {stage:"Break Ground", value:30},
        {stage:"Painting", value:50},
        {stage:"Compaction of Soil", value:60},
        {stage:"Pour Abutment", value:100},
        {stage:"Priming", value:20},
    ],
    contract_sum: 2000000,
    epd:20,
    current_percentage:10,
    contractors_default:true,
    internal_default:true,
    amount_paid_so_far: 100000,
    daily_contract_budget:10000,
    accumulated_daily_budget:20,


}