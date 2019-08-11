db.food.inerst({
    name: 'Boiled Egg',
    amount: 1,
    type: 'breakfast',
    cuisine: 'egg',
    calorie: 80
})

db.restaurant.insert({
    email: 'dummyRestaurant@gmail.com',
    username: 'dummyres1',
    adminpass: 'hashPass',
    rating: 4.5,
    locality: 'Nagavara',
    menu: [
        ObjectId("5d47d24c737b4bbbffb88dad"),
        ObjectId("5d47cfda737b4bbbffb88dac")
    ]
    
})

 db.restaurant.find().forEach(function(restaurant) { 
    restaurant.menu.forEach((item)=>{
       print(db.food.find({_id:item}))  
    })
} )