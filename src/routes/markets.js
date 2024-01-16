const { Router }  = require('express');

const router = Router();

const superMarkets = [
    {
        id:1,
        store: 'whole Foods',
        miles:0.6,
    },
    {
        id:2,
        store:'Trader Joes',
        miles:0.8
    },
    {
        id:3,
        store:'Fish Marktes',
        miles:0.6
    },
    {
        id:4,
        store: 'Eton',
        miles:1.6,
    },
    {
        id:5,
        store:'Marche Center',
        miles:4.6
    },
    {
        id:6,
        store:'Mirabelle',
        miles:12.6
    }
]

router.get('/',(request,response) => {
    response.send(superMarkets);
})

router.get('/:miles',(request,response) => {
     
    const { miles } = request.params;
    const tempMiles = parseFloat(miles);
    const result = superMarkets.filter((markets) => {
        if (markets.miles > tempMiles)
        {
            response.cookie(`Miles : `,markets.miles,{maxAge : 10000});
            return markets.miles;
        }
    })
    console.log("This is Cookies :",request.cookies);
    response.send(result);
})



module.exports = router;