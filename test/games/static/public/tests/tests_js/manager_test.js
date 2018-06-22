QUnit.test( "Manager : creation", function( assert ) {
  let manager = new window.OpenXum.Urbino.Manager();
  manager.initMap();

  assert.ok(manager.map().get('h') == 18, "Black Houses ok");
  assert.ok(manager.map().get('p') == 6, "Black Palace ok");
  assert.ok(manager.map().get('t') == 3, "Black Tower ok");
  assert.ok(manager.map().get('H') == 18, "White Houses ok");
  assert.ok(manager.map().get('P') == 6, "White Houses ok");
  assert.ok(manager.map().get('T') == 3, "White Houses ok");
});

QUnit.test( "Manager : remove piece", function( assert ) {
  let manager = new window.OpenXum.Urbino.Manager();
  manager.initMap();

  manager.removePiece(1, 0);
  assert.ok(manager.map().get('h') == 17, "Black Houses ok");

  manager.removePiece(1, 1);
  assert.ok(manager.map().get('H') == 17, "White Houses ok");

  manager.removePiece(2, 0);
  assert.ok(manager.map().get('p') == 5, "Black Palace ok");

  manager.removePiece(2, 0);
  manager.removePiece(2, 0);
  manager.removePiece(2, 0);
  assert.ok(manager.map().get('p') == 2, "Black Palace ok");
});

QUnit.test( "Manager : enough piece", function( assert ) {
  let manager = new window.OpenXum.Urbino.Manager();
  manager.initMap();

  manager.removePiece(3, 0);
  manager.removePiece(3, 0);
  manager.removePiece(3, 0);
  assert.ok(manager.map().get('t') == 0, "Black Tower ok");
  assert.ok(manager.enoughPiece(3, 0) == false, "Not enough Black Tower ok");

  manager.removePiece(2, 1);
  manager.removePiece(2, 1);
  manager.removePiece(2, 1);
  manager.removePiece(2, 1);
  manager.removePiece(2, 1);
  assert.ok(manager.enoughPiece(2, 1) == true, "Enough White Palace ok");
  manager.removePiece(2, 1);
  assert.ok(manager.map().get('P') == 0, "White Palace ok");
  assert.ok(manager.enoughPiece(2, 1) == false, "Not enough White Palace ok");
});