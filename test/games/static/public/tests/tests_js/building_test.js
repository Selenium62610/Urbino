QUnit.test( "Building : creation Black House", function( assert ) {
  let building = new window.OpenXum.Urbino.Building(window.OpenXum.Urbino.Color.BLACK, window.OpenXum.Urbino.BuildingType.HOUSE, new window.OpenXum.Urbino.Coordinates(1, 1));


  assert.ok( building.coord().x() === 1, "X coordinate ok." );
  assert.ok( building.coord().y() === 1, "Y coordinate ok." );

  assert.ok( building.as_text() === 'h ', "As text ok." );
  assert.ok( building.to_string() === "Black House at (1,1)", "To string ok." );
});

QUnit.test( "Building : creation White Palace", function( assert ) {
  let building = new window.OpenXum.Urbino.Building(window.OpenXum.Urbino.Color.WHITE, window.OpenXum.Urbino.BuildingType.PALACE, new window.OpenXum.Urbino.Coordinates(8, 4));

  assert.ok( building.coord().x() === 8, "X coordinate ok." );
  assert.ok( building.coord().y() === 4, "Y coordinate ok." );

  assert.ok( building.as_text() === 'P ', "As text ok." );
  assert.ok( building.to_string() === "White Palace at (8,4)", "To string ok." );
});

QUnit.test( "Building : creation Black Tower", function( assert ) {
  let building = new window.OpenXum.Urbino.Building(window.OpenXum.Urbino.Color.BLACK, window.OpenXum.Urbino.BuildingType.TOWER, new window.OpenXum.Urbino.Coordinates(6, 8));

  assert.ok( building.coord().x() === 6, "X coordinate ok." );
  assert.ok( building.coord().y() === 8, "Y coordinate ok." );

  assert.ok( building.as_text() === 't ', "As text ok." );
  assert.ok( building.to_string() === "Black Tower at (6,8)", "To string ok." );
});

QUnit.test( "Building : clone", function( assert ) {
  let building = new window.OpenXum.Urbino.Building(window.OpenXum.Urbino.Color.WHITE, window.OpenXum.Urbino.BuildingType.TOWER, new window.OpenXum.Urbino.Coordinates(5, 5));

  assert.ok( building.coord().x() === 5, "X coordinate ok." );
  assert.ok( building.coord().y() === 5, "Y coordinate ok." );

  assert.ok( building.as_text() === 'T ', "As text ok." );
  assert.ok( building.to_string() === "White Tower at (5,5)", "To string ok." );

  let b2 = building.clone();

  assert.ok( b2.coord().x() === 5, "Cloned X coordinate ok." );
  assert.ok( b2.coord().y() === 5, "Cloned Y coordinate ok." );

  assert.ok( b2.as_text() === 'T ', "Cloned as text ok." );
  assert.ok( b2.to_string() === "White Tower at (5,5)", "Clones to string ok." );

});