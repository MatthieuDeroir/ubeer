const { SQL: { Beer, Brewery, Format } } = require('../../models');
const MongoBeer = require('../../models/mongo/beerSchema'); // Assurez-vous d'importer le modèle MongoDB

const handleCommand = async (command) => {
    const parsedCommand = JSON.parse(command);


    if (parsedCommand.action === 'createBeer') {
        const beerData = parsedCommand.data;
        
        const mongoBeer = new MongoBeer({
            id : beerData.id,
            name: beerData.name,
            style: beerData.style,
            type: beerData.type,
            abv: beerData.abv,
            ibu: beerData.ibu,
            price: beerData.price,
            description: beerData.description,
            image: beerData.imageUrl,
            brewery: beerData.brewery,
            format: beerData.format,
        });


        try {
            const savedBeer = await mongoBeer.save();
            console.log(`Beer with ID ${beerData.id} saved to MongoDB`);
        } catch (error) {
            console.error("Failed to save beer to MongoDB:", error);
        }
    } else if (parsedCommand.action === 'deleteBeer') {
        const beerId = parsedCommand.data.id;

        try {
            const deletedBeer = await MongoBeer.findOneAndDelete({ id : beerId});
            console.log(`Beer with ID ${beerId} deleted from MongoDB`);
            console.log(deletedBeer);
        } catch (error) {
            console.error("Failed to delete beer from MongoDB:", error);
        }
    }
};

module.exports = { handleCommand };
