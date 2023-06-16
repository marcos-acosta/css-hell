# Intended solutions

### Level 1 ("round peg, round hole")

Assign `margin-left` (or `padding-left`) to Peg A.

### Level 2 ("connect the dots")

Assign `margin-left` and `rotate: 45deg` to Div 1.

### Level 3 ("incompatible")

Assign `margin-top` and `flex-direction: row-reverse` to Div 1.

### Level 4 ("why are you running?")

Assign `order: -1` to Hole A so it sits to the left of Peg A. Then, give Peg A negative `margin-left`. It's also possible to assign `order: 1` to Peg A and negative `margin-right` to Hole A.

### Level 5 ("the scroll of truth")

Assign `position: fixed` to Peg A. Then, push the CSS Editor into the bottom-right corner to generate scrolling room. Scroll Peg A into Hole A.
