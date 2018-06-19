QUnit.test( "Architect : creation", function( assert ) {
  let architect = new window.OpenXum.Urbino.Architect(new window.OpenXum.Urbino.Coordinates(1, 1));

  assert.ok(architect.coord().x() == 1, "X coordinate ok.");
  assert.ok(architect.coord().y() == 1, "Y coordinate ok.");

  assert.ok(architect.as_text() === 'A ', "As text ok.");

  assert.ok(architect.to_string() === "Architect at (1,1)", "To string ok.");

});

QUnit.test( "Architect : to", function( assert ) {
  let architect = new window.OpenXum.Urbino.Architect(new window.OpenXum.Urbino.Coordinates(2, 3));

  assert.ok(architect.coord().x() == 2, "X coordinate ok.");
  assert.ok(architect.coord().y() == 3, "Y coordinate ok.");

  architect.to(5, 5);

  assert.ok(architect.coord().x() == 5, "X coordinate ok.");
  assert.ok(architect.coord().y() == 5, "Y coordinate ok.");

});

QUnit.test( "Architect : lineView 1", function( assert ) {
  let moves;
  let architect = new window.OpenXum.Urbino.Architect(new window.OpenXum.Urbino.Coordinates(0, 0));
  let engine = new window.OpenXum.Urbino.Engine();

  assert.ok(architect.coord().x() == 0, "X coordinate ok.");
  assert.ok(architect.coord().y() == 0, "Y coordinate ok.");

  let view = architect.lineView(engine._board);

  moves = [
    new window.OpenXum.Urbino.Coordinates(0, 1),
    new window.OpenXum.Urbino.Coordinates(0, 2),
    new window.OpenXum.Urbino.Coordinates(0, 3),
    new window.OpenXum.Urbino.Coordinates(0, 4),
    new window.OpenXum.Urbino.Coordinates(0, 5),
    new window.OpenXum.Urbino.Coordinates(0, 6),
    new window.OpenXum.Urbino.Coordinates(0, 7),
    new window.OpenXum.Urbino.Coordinates(0, 8),

    new window.OpenXum.Urbino.Coordinates(1, 1),
    new window.OpenXum.Urbino.Coordinates(2, 2),
    new window.OpenXum.Urbino.Coordinates(3, 3),
    new window.OpenXum.Urbino.Coordinates(4, 4),
    new window.OpenXum.Urbino.Coordinates(5, 5),
    new window.OpenXum.Urbino.Coordinates(6, 6),
    new window.OpenXum.Urbino.Coordinates(7, 7),
    new window.OpenXum.Urbino.Coordinates(8, 8),

    new window.OpenXum.Urbino.Coordinates(1, 0),
    new window.OpenXum.Urbino.Coordinates(2, 0),
    new window.OpenXum.Urbino.Coordinates(3, 0),
    new window.OpenXum.Urbino.Coordinates(4, 0),
    new window.OpenXum.Urbino.Coordinates(5, 0),
    new window.OpenXum.Urbino.Coordinates(6, 0),
    new window.OpenXum.Urbino.Coordinates(7, 0),
    new window.OpenXum.Urbino.Coordinates(8, 0),
  ];

  assert.ok(moves.length === view.length, "Lengths ok");
  let ok = 0;
  for(let i = 0; i < moves.length; i++){
    if(view[i].equals(moves[i])){
      ok++;
    }
  }

  assert.ok(ok === moves.length, "Lineview ok.");
});

QUnit.test( "Architect : lineView 2", function( assert ) {
  let moves;
  let architect = new window.OpenXum.Urbino.Architect(new window.OpenXum.Urbino.Coordinates(1, 2));
  let engine = new window.OpenXum.Urbino.Engine();
  engine._board[engine.getIndex(1, 4)] = 1;
  engine._board[engine.getIndex(3, 4)] = 1;
  engine._board[engine.getIndex(5, 2)] = 1;


  assert.ok(architect.coord().x() == 1, "X coordinate ok.");
  assert.ok(architect.coord().y() == 2, "Y coordinate ok.");

  let view = architect.lineView(engine._board);
  
  moves = [
    new window.OpenXum.Urbino.Coordinates(0, 2),
    new window.OpenXum.Urbino.Coordinates(0, 3),

    new window.OpenXum.Urbino.Coordinates(1, 3),
    new window.OpenXum.Urbino.Coordinates(2, 3),

    new window.OpenXum.Urbino.Coordinates(2, 2),
    new window.OpenXum.Urbino.Coordinates(3, 2),
    new window.OpenXum.Urbino.Coordinates(4, 2),

    new window.OpenXum.Urbino.Coordinates(2, 1),
    new window.OpenXum.Urbino.Coordinates(3, 0),
    new window.OpenXum.Urbino.Coordinates(1, 1),
    new window.OpenXum.Urbino.Coordinates(1, 0),
    new window.OpenXum.Urbino.Coordinates(0, 1),
  ];

  assert.ok(moves.length === view.length, "Lengths ok");
  let ok = 0;
  for(let i = 0; i < moves.length; i++){
    if(view[i].equals(moves[i])){
      ok++;
    }
  }

  assert.ok(ok === moves.length, "Lineview ok.");
});