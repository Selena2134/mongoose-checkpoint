const mongoose = require('mongoose');
const express = require('express');
const app = express();

//  se connecter a la base de données 
mongoose.connect(`mongodb://127.0.0.1/Users_checkpoint`);

// shema de la personne 
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });

  // Créer un modèle Person à partir du schéma de la personne 
const Person = mongoose.model('Person', personSchema);

// créer et enregistrer une personne 

const createPerson = (done) => {
    const person = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger']
    });
  
    person.save((err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

  
  // Création de plusieurs personnes 
const arrayOfPeople = [
    { name: 'Alice', age: 25, favoriteFoods: ['Sushi', 'Pasta'] },
    { name: 'Bob', age: 40, favoriteFoods: ['Steak', 'Salad'] }
  ];
  
  const createPeople = (done) => {
    Person.create(arrayOfPeople, (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

  // Recherche toutes les personnes avec  un prénom
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // Recherche une seule personne 
  const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };

  // Recherche une personne par id
const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // Mise à jour d'une personne par id
  const findEditThenSave = (personId, done) => {
    const foodToAdd = 'Hamburger';
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      person.favoriteFoods.push(foodToAdd);
      person.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
      });
    });
  };
  
  // Mise à jour d'un document à l'aide de model.findOneAndUpdate()
  const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate(
      { name: personName },
      { age: ageToSet },
      { new: true }, // Pour retourner le document mis à jour
      (err, data) => {
        if (err) return console.error(err);
        done(null, data);
      }
    );
  };
  
  // Suppression d'un document par id
  const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // Suppression de plusieurs documents 
  const removeManyPeople = (done) => {
    const nameToRemove = 'Mary';
    Person.remove({ name: nameToRemove }, (err, data) => {
      if (err) return console.error(err);
      done(null, data);
    });
  };
  
  // Recherche en chaîne pour affiner les résultats de recherche
  const queryChain = (done) => {
    const foodToSearch = 'Burritos';
    Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, data) => {
        if (err) return console.error(err);
        done(null, data);
      });
  };
  

  module.exports = {
    createPerson,
    createPeople,
    findPeopleByName,
    findOneByFood,
    findPersonById,
    findEditThenSave,
    findAndUpdate,
    removeById,
    removeManyPeople,
    queryChain
  };

  app.listen(3000);