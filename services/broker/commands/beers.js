

const beerCommand = {
    composeBeer: async (beer) => {
        
        console.log(`Composing beer: ${beer}`);  
    },
    pushBeer: async (beer) => {
        console.log(`Pushing beer: ${beer}`);
    },

    fetchBeer: async (beer) => {
        console.log(`Fetching beer: ${beer}`);
    }
};

module.exports = beerCommand;