QUnit.test( "Coordinates : creation", function( assert ) {
  let coord = new window.OpenXum.Urbino.Coordinates(2, 2);

  assert.ok( coord.x() === 2, "X coordinate ok." );
  assert.ok( coord.y() === 2, "Y coordinate ok." );
  assert.ok( coord.to_string() === "(2,2)", "Coordinates to string ok." );

});

QUnit.test( "Coordinates : clone & equals", function( assert ) {
  let coord = new window.OpenXum.Urbino.Coordinates(1, 5);

  assert.ok( coord.x() === 1, "X coordinate ok." );
  assert.ok( coord.y() === 5, "Y coordinate ok." );
  assert.ok( coord.to_string() === "(1,5)", "Coordinates to string ok." );

  let coord_copy = coord.clone();

  assert.ok( coord_copy.x() === 1, "Cloned X coordinate ok." );
  assert.ok( coord_copy.y() === 5, "Cloned Y coordinate ok." );

  assert.ok( coord.equals(coord_copy) === true, "Coordinates equal to copy ok." );


});

QUnit.test( "Coordinates : new & equals", function( assert ) {
  let coord = new window.OpenXum.Urbino.Coordinates(8, 8);

  assert.ok( coord.x() === 8, "X coordinate ok." );
  assert.ok( coord.y() === 8, "Y coordinate ok." );
  assert.ok( coord.to_string() === "(8,8)", "Coordinates to string ok." );

  let new_coord = new window.OpenXum.Urbino.Coordinates(8, 8);
  assert.ok( new_coord.x() === 8, "New X coordinate ok." );
  assert.ok( new_coord.y() === 8, "New Y coordinate ok." );
  assert.ok( new_coord.to_string() === "(8,8)", "Coordinates to string ok." );

  assert.ok( coord.equals(new_coord) === true, "Coordinates equal to copy ok." );

});

QUnit.test( "Coordinates : new & not equals", function( assert ) {
  let coord = new window.OpenXum.Urbino.Coordinates(8, 8);

  assert.ok( coord.x() === 8, "X coordinate ok." );
  assert.ok( coord.y() === 8, "Y coordinate ok." );
  assert.ok( coord.to_string() === "(8,8)", "Coordinates to string ok." );

  let new_coord = new window.OpenXum.Urbino.Coordinates(5, 8);
  assert.ok( new_coord.x() === 5, "New X coordinate ok." );
  assert.ok( new_coord.y() === 8, "New Y coordinate ok." );
  assert.ok( new_coord.to_string() === "(5,8)", "Coordinates to string ok." );

  assert.ok( coord.equals(new_coord) === false, "Coordinates equal to copy ok." );

});