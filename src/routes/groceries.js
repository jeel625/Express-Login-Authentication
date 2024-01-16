const {Router} = require('express');

const router = Router();
const groceryList = [
    {
        item:'Milk',
        quantity:2
    },
    {
        item:'Ice-Cream',
        quantity:5
    },
    {
        item:'Pop-tarts',
        quantity:19
    },
    {
        item:'Apple',
        quantity:2
    },
    {
        item:'Banana',
        quantity:5
    },
    {
        item:'Chocolates',
        quantity:19
    },
]

router.get('',(req, res) => {  //res.send => this is used to send the response to the user or server
    res.send(groceryList);
})

router.post('/',(req,res) => {
    console.log(req.body);
    groceryList.push(req.body);
    res.send(201);
});

router.get('/:item',(request,response) =>{
    const {item} =  request.params

    const result = groceryList.find( (g) => { return g.item === item })

    console.log(item);
    response.send(result);
})

router.get('/shopping/cart',(request,response) => {
    const { cart } = request.session;
    console.log('cart');

    if(!cart){
        response.send('You have no cart session')
    }else{
        response.send(cart);
    }
})
router.post('/shopping/cart/item',(request,response) => {
    const { item, quantity } = request.body;
    const cartItem = {item,quantity};

    const { cart } = request.session;
    if(cart){
        request.session.cart.items.push(cartItem)
    }else{
        request.session.cart = {
            items : [cartItem],
        };
    }
    response.send(request.sessionID);
})


module.exports = router;