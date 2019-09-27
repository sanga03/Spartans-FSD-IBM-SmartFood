(function() {
  'use strict';

  angular.module('autocompleteList.demo', ['autocompleteList']).controller('demoCtrl', demoCtrl);


  function demoCtrl() {
    this.allPeople = [
      {
        firstName: 'Bert',
        lastName: 'Wilson',
        age: 34
      },
      {
        firstName: 'Ann',
        lastName: 'Hubbard',
        age: 56
      },
      {
        firstName: 'Merle',
        lastName: 'Nash',
        age: 65
      },
      {
        firstName: 'Sue',
        lastName: 'Park',
        age: 46
      },
      {
        firstName: 'William',
        lastName: 'Rhodes',
        age: 43
      },
      {
        firstName: 'Darrell',
        lastName: 'Lucas',
        age: 29
      },
      {
        firstName: 'Corey',
        lastName: 'Stone',
        age: 37
      },
      {
        firstName: 'Harry',
        lastName: 'Brooks',
        age: 39
      },
      {
        firstName: 'Nelson',
        lastName: 'Price',
        age: 21
      },
      {
        firstName: 'Rodney',
        lastName: 'Obrien',
        age: 24
      }
    ];

    this.selectedPeople = [
      [this.allPeople[0]],
      [this.allPeople[2]],
      [this.allPeople[4]],
    ];
  }
})();
