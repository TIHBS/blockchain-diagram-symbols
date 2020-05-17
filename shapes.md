# Resulting shapes:

<style>
    svg {
        width: 100%;
        height: 100px;
        background-color: white;
        border: solid white;
        border-width: 7px;
        overflow: visible;
    }
    svg > g {
        fill: white;
        stroke: black;
    }
    svg > g > text {
        fill: black;
        stroke: none;
        text-anchor: middle;
        font-size: 12px;
    }
</style>

Only shapes with at least 10% are drawn for each element. With the exception that at least two shapes for each element are drawn.

Some element specifications do not imply a shape and are not drawn. This includes '2d', 'isometric', '3d', 'numbered', 'with hashes' and '"tx"'.

**License:** All of the following svg images may be used for any (lawful) purpose without mentioning the original author.

## nodes

1. **circle**               (41/87)     47.1 %
2. pc                   (20/87)     23.0 %
3. 2d                   (13/87)     14.9 %
4. rectangle            (12/87)     13.8 %
5. smart phone          (12/87)     13.8 %
6. rounded corners      (9/87)      10.3 %

<svg>
    <g>
        <circle cx="30" cy="30" r="30"></circle>
        <text x="30" y="75">1. circle</text>
    </g>
    <g transform="translate(70)">
        <ellipse cx="30" cy="51" rx="16" ry="5"></ellipse>
        <rect x="27" y="39" width="6" height="12" rx="0"></rect>
        <rect x="0" y="0" width="60" height="40" rx="2"></rect>
        <rect stroke="none" fill="gray" x="2" y="2" width="56" height="36" rx="1"></rect>
        <text x="30" y="75">2. pc</text>
    </g>
    <g transform="translate(140)">
        <rect x="5" y="0" width="50" height="60"></rect>
        <text x="30" y="75">4. rectangle</text>
    </g>
    <g transform="translate(210)">
        <rect x="15" y="10" width="30" height="50" rx="2"></rect>
        <rect stroke="none" fill="gray" x="17" y="12" width="26" height="39" rx="1"></rect>
        <circle cx="30" cy="55" r="2.3"></circle>
        <text x="30" y="75">5. phone</text>
    </g>
    <g transform="translate(280)">
        <rect x="5" y="0" width="50" height="60" rx="5"></rect>
        <text x="30" y="75">5. rounded</text>
    </g>
</svg>

## node links

1. **line**     (60/68)     88.2 %
2. circle   (8/68)      11.8 %

<svg>
    <g>
        <circle cx="5" cy="30" r="5"></circle>
        <circle cx="55" cy="30" r="5"></circle>
        <line x1="10" y1="30" x2="50" y2="30"></line>
        <text x="30" y="75">1. line</text>
    </g>
    <g transform="translate(70)">
        <circle fill="none" cx="30" cy="30" r="25"></circle>
        <circle cx="5" cy="30" r="5"></circle>
        <circle cx="55" cy="30" r="5"></circle>
        <circle cx="30" cy="5" r="5"></circle>
        <circle cx="30" cy="55" r="5"></circle>
        <text x="30" y="75">2. circle</text>
    </g>
</svg>

## blocks

1. 2d           (46/81)     56.8 %
2. **cube**         (32/81)     39.5 %
3. rectangle    (28/81)     34.6 %
4. **isometric**    (19/81)     23.5 %
5. 3d           (15/81)     18.5 %
6. numbered     (15/81)     18.5 %
7. with hashes  (10/81)     12.3 %

<svg>
    <g>
        <path d="M 0,60 h 50 l 10,-10 v -50 h -50 l -10,10 z m 0,-50 h 50 l 10,-10 m -10,10 v 50"></path>
        <text x="30" y="75">2. cube</text>
    </g>
    <g transform="translate(70)">
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60"></rect>
        <text x="30" y="75">3. rectangle</text>
    </g>
</svg>

## links

1. **direct block contact**     (23/55)     41.8 %
2. line                     (20/55)     36.4 %
3. arrow                    (13/55)     23.6 %

<svg>
    <g>
        <rect x="5" y="25" width="10" height="10"></rect>
        <rect x="15" y="25" width="10" height="10"></rect>
        <rect x="25" y="25" width="10" height="10"></rect>
        <rect x="35" y="25" width="10" height="10"></rect>
        <rect x="45" y="25" width="10" height="10"></rect>
        <text x="30" y="75">1. contact</text>
    </g>
    <g transform="translate(70)">
        <circle cx="5" cy="30" r="5"></circle>
        <circle cx="55" cy="30" r="5"></circle>
        <line x1="10" y1="30" x2="50" y2="30"></line>
        <text x="30" y="75">2. line</text>
    </g>
    <g transform="translate(140)">
        <circle cx="5" cy="30" r="5"></circle>
        <circle cx="55" cy="30" r="5"></circle>
        <line x1="10" y1="30" x2="50" y2="30"></line>
        <path stroke="none" fill="black" d="M 50,30 l -7,-3 l 0,6 z"></path>
        <text x="30" y="75">3. arrow</text>
    </g>
</svg>

## transactions

1. rectangle    (16/42)     38.1 %
2. ‘tx’         (13/42)     31.0 %
3. coin         (6/42)      14.3 %

<svg>
    <g>
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60"></rect>
        <text x="30" y="75">1. rectangle</text>
    </g>
    <g transform="translate(70)">
        <circle cx="30" cy="30" r="25"></circle>
        <circle cx="30" cy="30" r="21"></circle>
        <text x="30" y="35">$</text>
        <text x="30" y="75">3. coin</text>
    </g>
</svg>

Additional shapes consided:

<svg>
    <g transform="translate(0)">
        <polygon points="17,0 43,0 60,17 60,43 43,60 17,60 0,43 0,17" />
        <text x="30" y="75">octagon</text>
    </g>
    <g transform="translate(70)">
        <polygon points="0,30 14,0 46,0 60,30 46,60 14,60"></polygon>
        <text x="30" y="75">hexagon</text>
    </g>
    <g transform="translate(140)">
        <polygon points="5,0 40,0 55,15 55,60 20,60 5,45"></polygon>
    </g>
    <g transform="translate(210)">
        <polygon points="30,0 60,25 48,60 12,60 0,25"></polygon>
        <text x="30" y="75">pentagon</text>
    </g>
    <g transform="translate(280)">
        <path d="M 5,20 h 50 v 20 h -50 z"></path>
        <ellipse cx="30" cy="30" rx="10" ry="7.5"></ellipse>
    </g>
    <g transform="translate(350)">
        <circle cx="30" cy="30" r="25"></circle>
        <rect x="26" y="26" width="8" height="8"></rect>
    </g>
</svg>

## blockchain

1. **rectangle**            (18/39)     46.2 %
1. circle               (6/39)      15.4 %
1. rounded corners      (4/39)      10.3 %
1. wavy bottom          (4/39)      10.3 %
1. wavy top             (4/39)      10.3 %

<svg>
    <g>
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60"></rect>
        <text x="30" y="75">1. rectangle</text>
    </g>
    <g transform="translate(70)">
        <circle cx="30" cy="30" r="30"></circle>
        <text x="30" y="75">2. circle</text>
    </g>
    <g transform="translate(140)">
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60" rx="5"></rect>
        <text x="30" y="75">3. rounded</text>
    </g>
    <g transform="translate(210)">
        <path d="M 0,15 c 20,-20 40,20 60,0 l 0,40 l -60,0 z"></path>
        <text x="30" y="75">4. wavy top</text>
    </g>
    <g transform="translate(280)">
        <path d="M 0,45 c 20,-20 40,20 60,0 l 0,-40 l -60,0 z"></path>
        <text x="30" y="75">4. wavy b.</text>
    </g>
</svg>

Additional shape considered:

<svg>
    <g>
        <path d="M 0,40 h 16.666666 l 3.333333,-3.333333 v -16.666666 h -16.666666 l -3.333333,3.333333 z m 0,-16.666666 h 16.666666 l 3.333333,-3.333333 m -3.333333,3.333333 v 16.666666"></path>
        <path d="M 16.666666,40 h 16.666666 l 3.333333,-3.333333 v -16.666666 h -16.666666 l -3.333333,3.333333 z m 0,-16.666666 h 16.666666 l 3.333333,-3.333333 m -3.333333,3.333333 v 16.666666"></path>
        <path d="M 33.333333,40 h 16.666666 l 3.333333,-3.333333 v -16.666666 h -16.666666 l -3.333333,3.333333 z m 0,-16.666666 h 16.666666 l 3.333333,-3.333333 m -3.333333,3.333333 v 16.666666"></path>
        <!-- chains -->
        <path fill="black" d="M 6,28.333333 h 4.666666 c 5,0 5,6.666666 0,6.666666 h -4.666666 c -5,0 -5,-6.666666 0,-6.666666 z m 0,5 h 4.666666 c 2.333333,0 2.333333,-3.333333 0,-3.333333 h -4.666666 c -2.333333,0 -2.333333,3.333333 0,3.333333 z"></path>
        <path fill="black" d="M 22.666666,28.333333 h 4.666666 c 5,0 5,6.666666 0,6.666666 h -4.666666 c -5,0 -5,-6.666666 0,-6.666666 z m 0,5 h 4.666666 c 2.333333,0 2.333333,-3.333333 0,-3.333333 h -4.666666 c -2.333333,0 -2.333333,3.333333 0,3.333333 z"></path>
        <path fill="black" d="M 39.333333,28.333333 h 4.666666 c 5,0 5,6.666666 0,6.666666 h -4.666666 c -5,0 -5,-6.666666 0,-6.666666 z m 0,5 h 4.666666 c 2.333333,0 2.333333,-3.333333 0,-3.333333 h -4.666666 c -2.333333,0 -2.333333,3.333333 0,3.333333 z"></path>
        <polyline stroke-width="2" points="11,31.666666 22.2,31.666666"></polyline>
        <polyline stroke-width="2" points="27.666666,31.666666 38.866666,31.666666"></polyline>
        <text x="25" y="75">icon</text>
    </g>
</svg>

## smart contracts

1. rectangle        (11/37)     29.7 %
2. **document icon**    (7/37)      18.9 %

<svg>
    <g>
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60"></rect>
        <text x="30" y="75">1. rect.</text>
    </g>
    <g transform="translate(70)">
        <path fill="gray" d="M 5,0 l 42,0 l 8,8 l 0,52 l -50,0 z M 47,0 l 0,8 l 8,0"></path>
        <text x="30" y="75">2. document</text>
    </g>
</svg>

## actors

1. **user icon**        (21/26)     80.8 %
2. stick figure     (3/26)      11.5 %

Decorators for roles?

<svg>
    <g>
        <circle cx="30" cy="15" r="17"></circle>
        <path d="M 0,60 c 0,-30 7,-30 16,-30 l 14,12 l 14,-12 c 9,0 16,0 16,30 z"></path>
        <text x="30" y="75">1. user</text>
    </g>
    <g transform="translate(70)">
        <path d="M 30,17 l 0,26 M 20,60 l 10,-18 l 10,18 M 18,22 l 12,5 l 12,-5"></path>
        <circle cx="30" cy="9" r="8"></circle>
        <text x="30" y="75">2. stick figure</text>
    </g>
</svg>

## block verification

1. **checkmark**        (20/21)     95.2 %
2. color scale      (1/21)      4.8 %

<svg>
    <g>
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60"></rect>
        <text x="45" y="15">✅</text>
        <text x="30" y="75">1. checkmark</text>
    </g>
    <g transform="translate(70)">
        <rect fill="green" x="5" y="25" width="10" height="10"></rect>
        <rect fill="greenyellow" x="15" y="25" width="10" height="10"></rect>
        <rect fill="yellow" x="25" y="25" width="10" height="10"></rect>
        <rect fill="orange" x="35" y="25" width="10" height="10"></rect>
        <rect fill="red" x="45" y="25" width="10" height="10"></rect>
        <text x="30" y="75">2. color</text>
    </g>
</svg>

## wallet

1. **wallet icon**      (11/16)     68.8 %
2. rectangle        (2/16)      12.5 %

<svg>
    <g>
        <path d="M 5,20 l 50,0 l 0,16 l -10,0 c -8,0 -8,8 0,8 l 10,0 l 0,16 l -50,0 z M 5,20 l 42,-8 l 0,8"></path>
        <text x="30" y="75">1. wallet</text>
    </g>
    <g transform="translate(70)">
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60"></rect>
        <text x="30" y="75">2. rectangle</text>
    </g>
</svg>

## miners

1. rectangle            (5/10)      50.0 %
2. rounded corners      (4/10)      40.0 %
3. **pickaxe**              (2/10)      20.0 %

Pickaxe as modifier for a node

<svg>
    <g>
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60"></rect>
        <text x="30" y="75">1. rectangle</text>
    </g>
    <g transform="translate(70)">
        <rect stroke="black" fill="white" x="5" y="0" width="50" height="60" rx="5"></rect>
        <text x="30" y="75">2. rounded</text>
    </g>
    <g transform="translate(140)">
        <path d="M 28,10 l 4,0 l 0,45 l -4,0 z"></path>
        <path d="M 10,20 c 0,0 5,-5 15,-5 l 0,-2 l 10,0 l 0,2 c 10,0 15,5 15,5 c 0,0 -5,-2 -15,-2 l 0,1 l -10,0 l 0,-1 c -10,0 -15,2 -15,2 z"></path>
        <text x="30" y="75">2. pickaxe</text>
    </g>
</svg>
