# Intended solutions

These are the solutions I had in mind while designing the levels :) I don't plan on updating this doc every time a different solution is found, so no need to create a PR in those case. I'm sure there's lots of alternate solutions!

### Level 1: round peg, round hole

Assign `margin-left` (or `padding-left`) to PEG A.

### Level 2: connect the dots

Assign `margin-left` and `rotate: 45deg` to DIV 1.

### Level 3: feels like we only go backwards

Assign `margin-top` and `flex-direction: row-reverse` to DIV 1.  
_Alternate Albany Solution: Assign `overflow: hidden` and `resize: both` to DIV 1, then resize to a slightly larger rectangle. Then, delete both properties and add `writing-mode: vertical-rl` and, with a bit of luck, there is some `rotate` value for which all pegs and corresponding holes overlap._

### Level 4: why are you running?

Assign `order: -1` to HOLE A so it sits to the left of PEG A. Then, give PEG A negative `margin-left`. It's also possible to assign `order: 1` to PEG A and negative `margin-right` to HOLE A.

### Level 5: the scroll of truth

Assign `position: fixed` to PEG A. Then, push the CSS Editor into the bottom-right corner to generate scrolling room. Scroll PEG A into HOLE A.
_Alternative solution: Assign `all: inherit` to PEG A. Congratulations, the peg now covers the entire page._

### Level 6: breathing room

Assign large `padding` to PEG A. Then, assign `resize: both` to DIV 1 and expand it such that PEG A overlaps with HOLE A and PEG B overlaps with HOLE B.  
_Alternate solution: Apply `resize: both` to DIV 1, then resize the div to be about 50% bigger. Then, delete the `resize` property, and add `margin-left` such that PEG B overlaps with HOLE B. Then, apply `margin-top` to PEG A so it overlaps with HOLE A._

### Level 7: figure of speech

Assigning `writing-mode: vertical-rl` to DIV 1 and `word-spacing: 20vw` to TEXT 1 will do the trick.

### Level 8: hard choices

Assign `word-spacing` or `text-indent` to DIV 1 such that PEG B overlaps with HOLE B. Then, resize the window such that PEG A overlaps with HOLE A (TEXT 1 has a fixed font size, whereas TEXT 2 is sized relative to the viewport width).

### Level 9: don't mind me

Assign `padding-top: 20vw` to the fake title.

### Level 10: floating

Assign `clear: left` to DIV 4, `block-size: 13vw` to DIV 2, and `block-size: 42vw` to DIV 3.

### Level 11: round peg, round hole (XTREME)

Same solution as Level 1 except PEG A is invisible.

### Level 12: gridlock

One solution is to assign `margin-top: 2vw` to DIV 3 and set DIV 1's `grid-template` to `0 0 / 0`.

### Level 13: the Gauntlet™

Add `hyphens: auto` to DIV 1, resize the window so PEG A and B overlap with their respective holes, and then assign negative `margin-right` to TEXT 3 so PEG C overlaps with HOLE C.

### Level 14: conic-gradient madness

One solution: add `padding-left` to DIV 1.

### Level 15: goodbye

There's a resizable div in the top-left corner.

### Level 16: this is not a level

Just scroll.
