describe('AutocompleteDirective', function() {
  var scope,
    elements = [],
    BASIC_TEMPLATE = '\
      <autocomplete-list\
        ng-model="selectedPeople"\
        items="allPeople"\
        item-text="item.firstName + \' \' + item.lastName">\
      </autocomplete-list>',
    CUSTOM_TEMPLATE = '\
      <autocomplete-list\
        ng-model="selectedPeople"\
        items="allPeople"\
        item-text="item.firstName + \' \' + item.lastName"\
        placeholder="This is a placeholder string">\
        <h1 class="person">{{ aclCtrl.itemText({item: item}) }}</h1>\
      </autocomplete-list>';

  beforeEach(module('autocompleteList'));

  // Generate the scope before each test
  beforeEach(inject(function($rootScope){
    scope = $rootScope.$new();
    scope.allPeople = [
      {
        firstName: 'Alan',
        lastName: 'A',
        age: 23
      },
      {
        firstName: 'Alan',
        lastName: 'B',
        age: 22
      },
      {
        firstName: 'Alan',
        lastName: 'C',
        age: 21
      },
      {
        firstName: 'Henry',
        lastName: 'Appleby',
        age: 20
      }
    ];
    scope.selectedPeople = [];
  }));

  // Clean up elements after tests
  afterEach(function() {
    elements.forEach(function(element) {
      element.remove();
    });
    elements = [];
  });


  describe('basic functionality', function() {
    it('should add an item', function() {
      var element = buildElement(BASIC_TEMPLATE);
      var ctrl = element.controller('autocompleteList');
      var list = element.find('md-list')[0];
      var listItems = list.querySelectorAll('md-list-item');
      expect(listItems.length).toBe(0);

      element.scope().$apply(function() {
        ctrl.selectedItemChange(scope.allPeople[1]);
      });

      var listItems = list.querySelectorAll('md-list-item');
      expect(scope.selectedPeople.length).toBe(1);
      expect(listItems.length).toBe(1);
    });

    it('should deselect an item', function() {
      scope.selectedPeople.push(scope.allPeople[0]);

      var element = buildElement(BASIC_TEMPLATE);
      var ctrl = element.controller('autocompleteList');
      var list = element.find('md-list')[0];
      var listItems = list.querySelectorAll('md-list-item');

      expect(listItems.length).toBe(1);

      element.scope().$apply(function() {
        ctrl.deselectItem(scope.allPeople[0]);
      });

      var listItems = list.querySelectorAll('md-list-item');
      expect(listItems.length).toBe(0);
    });

    it('should match both first and last names', function() {
      var element = buildElement(BASIC_TEMPLATE);
      var ctrl = element.controller('autocompleteList');
      var items;
      items = ctrl.matchingItems('Henry');
      expect(items.length).toBe(1);
      items = ctrl.matchingItems('Appleby');
      expect(items.length).toBe(1);
      items = ctrl.matchingItems('Henry Appleby');
      expect(items.length).toBe(1);
      items = ctrl.matchingItems('ry App');
      expect(items.length).toBe(1);
    });

    it('should match items case-insensitively', function() {
      var element = buildElement(BASIC_TEMPLATE);
      var ctrl = element.controller('autocompleteList');
      var items = ctrl.matchingItems('alan');
      expect(items.length).toBe(3);
    });
  });


  describe('using the basic template', function() {
    it('should render an autocomplete element', function() {
      var element = buildElement(BASIC_TEMPLATE);
      var autocomplete = element.find('md-autocomplete');
      expect(autocomplete.length).toBe(1);
    });

    it('should render a list of selected people', function() {
      scope.selectedPeople.push(scope.allPeople[0]);

      var element = buildElement(BASIC_TEMPLATE);
      var list = element.find('md-list')[0];
      var listItems = list.querySelectorAll('md-list-item');
      expect(listItems.length).toBe(1);

      var firstItemP = listItems[0].querySelector('p');
      expect(firstItemP).toBeTruthy();
      expect(firstItemP.innerHTML).toBe('Alan A');
    });

    it('should display the default placeholder string', function() {
      var element = buildElement(BASIC_TEMPLATE);
      var list = element.find('md-autocomplete');
      expect(list.attr('placeholder')).toBe('Search...');
    });
  });


  describe('using a template with custom content', function() {
    it('should render the content in each list item', function() {
      scope.selectedPeople.push(scope.allPeople[0]);

      var element = buildElement(CUSTOM_TEMPLATE);
      var list = element.find('md-list')[0];
      var listItems = list.querySelectorAll('md-list-item');
      expect(listItems[0].querySelector('h1.person')).not.toBeNull();
    });

    it('should display the custom placeholder string', function() {
      var element = buildElement(CUSTOM_TEMPLATE);
      var list = element.find('md-autocomplete');
      expect(list.attr('placeholder')).toBe('This is a placeholder string');
    });
  });


  function buildElement(str) {
    var element;
    inject(function($compile) {
      element = $compile(str)(scope);
      element.scope().$apply();
    });
    elements.push(element);
    return element;
  }
});
