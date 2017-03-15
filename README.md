# Final Project

Dinosaur card matching game.

## Game Design

### Logic

```
BEGIN

Choose first player

Get initial cards

Repeat until both players pass:

  Opt to pass for rest of round

  Select card

  Update round power

  Switch players

End round:

  Update game score

  End game if 3rd round or player has won 2

  Switch players if not last round

  Goto get initial cards

END
```

### Actions

```
Set up state : choose first player; get initial cards and display them

REQUEST_ALL_POSSIBLE_CARDS

RECEIVE_ALL_POSSIBLE_CARDS

BUILD_PLAYER_HANDS


SET_NEXT_PLAYER

SET_PLAYER_PASS


Select and place card; update round power; update game score; check for end of round or game:

PLAY_CARD
```
