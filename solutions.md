# Intended solutions

### Level 1: round peg, round hole

Assign `margin-left` (or `padding-left`) to PEG A.

### Level 2: connect the dots

Assign `margin-left` and `rotate: 45deg` to DIV 1.

### Level 3: incompatible

Assign `margin-top` and `flex-direction: row-reverse` to DIV 1.

### Level 4: why are you running?

Assign `order: -1` to HOLE A so it sits to the left of PEG A. Then, give PEG A negative `margin-left`. It's also possible to assign `order: 1` to PEG A and negative `margin-right` to HOLE A.

### Level 5: the scroll of truth

Assign `position: fixed` to PEG A. Then, push the CSS Editor into the bottom-right corner to generate scrolling room. Scroll PEG A into HOLE A.

### Level 6: direct manipulation

Assign large `padding` to PEG A. Then, assign `resize: both` to DIV 1 and expand it such that PEG A overlaps with HOLE A.
