QUnit.test( "Engine : init", function( assert ) {
  let engine = new window.OpenXum.Urbino.Engine();

  let c = 0;
  for(let i = 0; i < 9*9; i++){
    if(engine._board[i] === 0)
      c++;
  }

  assert.ok( c === 81, "Board init ok." );

  c = 0;
  for(i = 0; i < engine._architects.length; i++){
    if(engine._architects[i].coord().x() === -1 && engine._architects[i].coord().y() === -1)
      c++;
  }

  assert.ok( c === engine.nbArchitects, "Architects init ok." );
});

QUnit.test( "Engine : textBoard", function( assert ) {
  let engine = new window.OpenXum.Urbino.Engine();

  let t = "";
  for(let i = 0; i < 9*9; i++){
    t += "  ";
    if(i%9 == 8)
      t += "\n";

  }

  assert.ok( engine.textBoard() === t, "Empty board display ok." );
});