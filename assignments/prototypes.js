/*
  Object oriented design is commonly used in video games.  For this part of the assignment
  you will be implementing several classes with their correct inheritance heirarchy.

  In this file you will be creating three classes: GameObject, CharacterStats, Humanoid.  
  At the bottom of this file are 3 objects that all inherit from Humanoid.  Use the objects at the bottom of the page to test your classes.
  
  Each class has unique properites and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string 'Object was removed from the game.'
  * 
*/
const GameObject = function (options) {
  this.createdAt = new Date();
  this.dimensions = {
    length: options.dimensions.length,
    width: options.dimensions.width,
    height: options.dimensions.height
  }
}
GameObject.prototype.destroy = function() {
  console.log(`${this.name} was removed from the game.`);
  // this = null;
  return `${this.name} was removed from the game.`;
}
const game = new GameObject({
  dimensions: {
  length: 2,
  width: 1,
  height: 1,
}})
console.log(game);

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
const CharacterStats = function(options) {
  GameObject.call(this, options);
  this.hp =options.hp;
  this.name = options.name;
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.constructor = CharacterStats;
CharacterStats.prototype.takeDamage = function(){
  return `${this.name} took damage.`;
}
// const character = new CharacterStats({
//   dimensions: {
//     length: 2,
//     width: 1,
//     height: 1,
//   },
//   hp: 5,
//   name: 'Bruce'
// })
// console.log(character.takeDamage());
// console.log(character.destroy());

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
const Humanoid = function(options) {
  CharacterStats.call(this, options);
  this.faction = options.faction;
  this.weapons = options.weapons;
  this.language = options.language;
  this.health = options.health || 3;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.constructor = Humanoid;
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
}
Humanoid.prototype.isAlive = function() {
  console.log(`from is ${this.name}.alive()`);
  this.health === 0 ? this.destroy() : console.log(`${this.name} continues alive!`);
}

/*
  * Inheritance chain: Humanoid -> CharacterStats -> GameObject
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

//Test you work by uncommenting these 3 objects and the list of console logs below:


  // const mage = new Humanoid({
  //   createdAt: new Date(),
  //   dimensions: {
  //     length: 2,
  //     width: 1,
  //     height: 1,
  //   },
  //   hp: 5,
  //   name: 'Bruce',
  //   faction: 'Mage Guild',
  //   weapons: [
  //     'Staff of Shamalama',
  //   ],
  //   language: 'Common Toungue',
  // });

  // const swordsman = new Humanoid({
  //   createdAt: new Date(),
  //   dimensions: {
  //     length: 2,
  //     width: 2,
  //     height: 2,
  //   },
  //   hp: 15,
  //   name: 'Sir Mustachio',
  //   faction: 'The Round Table',
  //   weapons: [
  //     'Giant Sword',
  //     'Shield',
  //   ],
  //   language: 'Common Toungue',
  // });

  // const archer = new Humanoid({
  //   createdAt: new Date(),
  //   dimensions: {
  //     length: 1,
  //     width: 2,
  //     height: 4,
  //   },
  //   hp: 10,
  //   name: 'Lilith',
  //   faction: 'Forest Kingdom',
  //   weapons: [
  //     'Bow',
  //     'Dagger',
  //   ],
  //   language: 'Elvish',
  // });

  // console.log(mage.createdAt); // Today's date
  // console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  // console.log(swordsman.hp); // 15
  // console.log(mage.name); // Bruce
  // console.log(swordsman.faction); // The Round Table
  // console.log(mage.weapons); // Staff of Shamalama
  // console.log(archer.language); // Elvish
  // console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  // console.log(mage.takeDamage()); // Bruce took damage.
  // console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


// Stretch task: 
// * Create Villian and Hero classes that inherit from the Humanoid class.  
const Villan = function(options) {
  Humanoid.call(this, options);
}
Villan.prototype = Object.create(Humanoid.prototype);
Villan.prototype.constructor = Villan;

const Hero = function(options) {
  Humanoid.call(this, options);
}
Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.constructor = Hero;

/* Give the Hero and Villians different methods that could 
  be used to remove health points from objects which could 
  result in destruction if health gets to 0 or drops below 0;
*/
Villan.prototype.darkness = function(hero) {
  if(hero.health===0) {
    console.log(`${hero.name} is death.`);
  } else { 
    hero.health -= 1;
    console.log(`${this.name} strikes ${hero.name}`);
    hero.isAlive();
  }
}

Hero.prototype.brightness = function(villan) {
  if(villan.health===0) {
    console.log(`${villan.name} is death.`)
  } else { 
    --villan.health;
    console.log(`${this.name} strikes ${villan.name}`);
    villan.isAlive();
  }
}
// * Create two new objects, one a villian and one a hero and fight it out with methods!
const superVillan = new Villan({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  hp: 5,
  name: 'Bad-boy',
  faction: 'Darkness',
  weapons: [
    'Staff of Shamalama',
  ],
  language: 'Common Toungue',
});
console.log(superVillan.health);

const superHero = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  hp: 10,
  name: 'The-savior',
  faction: 'Good ones',
  weapons: [
    'Bow',
    'Dagger',
  ],
  language: 'Elvish',
});
// console.log(superHero.health);

/** BATTEL FIELD */
// superVillan.darkness(superHero);
// console.log(superHero.health);
// superVillan.darkness(superHero);
// console.log(superHero.health);
// superVillan.darkness(superHero);
// console.log(superHero.health);
// superVillan.darkness(superHero);
// console.log(superHero.health);

// superHero.brightness(superVillan);
// console.log(superVillan.health);
// superHero.brightness(superVillan);
// console.log(superVillan.health);
// superHero.brightness(superVillan);
// console.log(superVillan.health);
// superHero.brightness(superVillan);
// console.log(superVillan.health);
