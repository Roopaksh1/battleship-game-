import Ship from '../modules/ship';

describe('ship', () => {
  const ship = Ship('carrier');

  test('ship type is carrier', () => {
    expect(ship.id).toBe('carrier')
  })

  test('ship length is 5', () => {
    expect(ship.length).toBe(5);
  });

  test('2 hits', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  })

  test('4 hits', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  })

  test('5 hits', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  })

  test('6 hits', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  })
});
