const mongoose = require('mongoose');

const pokeDepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastAccessed: { type: Date, default: Date.now },
});

//making a collection named Pokedepartment
const Pokedepartment = mongoose.model('Pokedepartment', pokeDepartmentSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// Note that two documents can have the same name value
//(in class, will find anything since nothing was entered in the .find object)

Pokedepartment.find({})
  .exec()
  .then(async collection => {
    if (collection.length === 0) {
      const results = await Pokedepartment.insertMany(
        [
          { name: 'Potions' },
          { name: 'Food' },
          { name: 'Tms' },
          { name: 'Hms' },
          { name: 'Pokeballs' },
          { name: 'Stat Boosts' },
          { name: 'Key Items' },
        ]
      );
      return console.log('Pokedepartments inserted', results);
    }
    return console.log('Already populated');
  })
  .catch(err => handleError(err));

module.exports = Department;
