import { House } from "./types";
import gryffindorImage from './gryffindor.png';
import hupplepuffImage from './hufflepuff.png';
import ravenclawImage from './ravenclaw.png';
import slytherinImage from './slytherin.png';

export const houses: House[] = [

{
  "animal": "Lion",
  "commonRoom": 'Gryffindor Tower',
  "element": "Fire",
  "founder": 'Godric Gryffindor',
  "ghost": 'Nearly Headless Nick',
  "heads": ['Minerva McGonagall', 'Albus Dumbledore'],
  "houseColors": ['Scarlet and gold'],
  "houseId": 'gryffindor',
  "name": 'Gryffindor',
  "traits": [
    "Courage",
    "Chivalry",
    "Nerve",
    "Daring",
    "Determination",
    "Bravery"
  ],
  image: gryffindorImage,
  "points": 0,
  id: undefined
},


  {
    "animal": "Serpent",
    "commonRoom": 'Slytehrin Dungeon',
    "element": "Water",
    "founder": 'Salazar Slytherin',
    "ghost": 'Bloody Baron',
    "heads": ['Severus Snape', 'Horace Slughorn', 'Abraham Ronen', 'Salazar Slytherin'],
    "houseColors": ['Green and silver'],
    "houseId": 'slytherin',
    "name": 'Slytherin',
    "traits": [
      "Cunning",
      "Ambition",
      "Resourcefulness",
      "Determination",
      "Pride",
      "Self-preservation",
      "Shrewdness"
    ],
    image: slytherinImage,
    "points": 0,
    id: undefined
  },
{
      "animal": "Badger",
      "commonRoom": 'Hufflepuff basement',
      "element": "Earth",
      "founder": 'Helga Hufflepuff',
      "ghost": 'Fat Friar',
      "heads": ['Pomona Sprout', 'Helga Hufflepuff'],
      "houseColors": ['Yellow and black'],
      "houseId": 'hufflepuff',
      "name": 'Hufflepuff',
      "traits": [
        "Loyalty",
        "Just",
        "Hard-working",
        "Patience",
        "Fairness",
        "Modesty"
      ],
      image: hupplepuffImage,
      "points": 0,
      id: undefined
    },


    {
      "animal": "Eagle",
      "commonRoom": 'Ravenclaw Tower',
      "element": "Air",
      "founder": 'Rowena Ravenclaw',
      "ghost": 'Grey Lady',
      "heads": ['Filius Flitwick', 'Rowena Ravenclaw'],
      "houseColors": ['Blue and bronze'],
      "houseId": 'ravenclaw',
      "name": 'Ravenclaw',
      "traits": [
        "Wit",
        "Learning",
        "Wisdom",
        "Acceptance",
        "Intelligence",
        "Creativity"
      ],
      image: ravenclawImage,
      "points": 0,
      id: undefined
    },
];