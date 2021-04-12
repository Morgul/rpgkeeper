# Dungeons and Dragons 4th Edition

This is the design document for the `dnd4e` system. I've written this system about four times, now, here's hoping I'll 
get it right this time around.

## Data

The key to getting `dnd4e` right is figuring out how to store the data in a database correctly. If I can correctly store
characters, the UI can be tweaked or molded as needed.

### Character Model

The basic overview of the model is this:

```javascript
var Character = trivialModels.define({
    baseChar: types.String({ pk: true }),
    
    // Basic Biographic info
    class: types.String(),
    race: types.String(),
    size: types.Enum({ values: ['T', 'S', 'M', 'L', 'H', 'G'] }),
    level: type.Number({ integer: true }),
    age: type.Number({ integer: true }),
    gender: types.Enum({ values: ['M', 'F', 'O'] }),
    alignment: types.Enum({ values: ['LG', 'G', 'U', 'E', 'CE'] }),
    speed: type.Number({ integer: true }),
    languages: types.Array({
        schema:{
            language: types.String({ required: true }),
            script: types.String()
        },
        default: []
    }),
    paragonPath: types.String(),
    epicDestiny: types.String(),
    
    // Abilities
    strength: type.Number({ integer: true }),
    constitution: type.Number({ integer: true }),
    dexterity: type.Number({ integer: true }),
    intelligence: type.Number({ integer: true }),
    wisdom: type.Number({ integer: true }),
    charisma: type.Number({ integer: true }),
    
    // Defenses
    acAbility: types.String({ default: 'strength' }),
    
    // Health
    hp: types.Object({
        schema: {
            max: types.Number({ integer: true }),
            nonlethal: types.Number({ integer: true }),
            current: types.Number({ integer: true }),
            temp: types.Number({ integer: true })
        }
    }),
    surges: types.Object({
        schema: {
            perDay: types.Number({ integer: true }),
            current: types.Number({ integer: true }),
            secondWindAvailable: type.Boolean({ default: true })
        }
    }),
    
    // Additional Character details
    experience: types.Number({ integer: true }),
    wealth: types.Number(),
    skills: types.Array({
        schema: {
            name: types.String({ required: true }),
            armorPenalty: types.Number({ integer: true }),
            trained: type.Boolean({ default: true }),
            removed: type.Boolean({ default: false })
        },
        default: []
    }),
    powers: types.Array({
        schema: {
            powerID: types.String({ required: true }),
            used: types.Number({ integer: true, default: 0 }),
            maxUses: types.Number({ integer: true, default: 1 }),
            rolls: types.Array({
                schema: {
                    name: types.String({ required: true }),
                    expression: types.String({ required: true })
                },
                default: []
            }),
            notes: types.String()
        },
        default: []
    }),
    feats: types.Array({
        schema: {
            featID: types.String({ required: true }),
            notes: types.String()
        },
        default: []
    }),
    bonuses: types.Array({
        schema: {
            name: types.String({ required: true }),
            type: types.String({ required: true, default: 'untyped' }),
            value: types.Number({ integer: true, required: true }),
            source: types.String(),
            stacks: type.Boolean({ default: false })
        },
        default: []
    }),
    equipment: types.Array({
        schema: {
        
        },
        default: []
    }),
    pools: types.Array({
        schema: {
            name: types.String({ required: true }),
            value: types.Number({ integer: true, required: true }),
            max: types.Number({ integer: true }),
            reset: types.Number({ integer: true })
        },
        default: [
            { name: 'Action Points', value: 1 }
        ]
    }),
    
    // Misc
    rolls: types.Array({
        schema: {
            name: types.String({ required: true }),
            expression: types.String({ required: true })
        },
        default: []
    }),
    notes: types.Array({
        schema: {
            name: types.String({ required: true }),
            content: types.String({ required: true })
        },
        default: []
    }),
    conditions: types.Array({
        schema: {
            condition: types.String({ required: true }),
            duration: types.String({ default: 'Unspecified.' })
        },
        default: []
    })
});
```

This data model should allow for things like custom skills, equipment, a rich bonus system, various pools 
(action points, power points, etc), and yet not be so free form as to be impossible to use. Several of the pieces of 
this model have their own design and schemas; they can be found in the sections below.

#### Languages

This is an array of objects, with the language name and the name of the script used to write it (_pg 25, PHb1_). The 
schema is very simple:

```javascript
var schema = {
    language: types.String({ required: true }),
    script: types.String()
};
```

If a `script` property is not there, the `language` property should be used instead.

#### Defenses

Defenses in `dnd4e` are the result of pure calculation. Fortitude, Reflex, and Will can be entirely handled by the bonus
system (See 'Bonuses', below). AC, however, has one additional piece of information we need to know: what ability mod do
you add? To store this, we use the `acAbility` property.

The calculation for defenses (in psuedo code) should be:

```javascript
var ac = 10 + Math.floor(level / 2) + abilities[acAbility].mod + bonuses.get('ac');
var fortitude = 10 + Math.floor(level / 2) + bonuses.get('fortitude');
var reflex = 10 + Math.floor(level / 2) + bonuses.get('reflex');
var will = 10 + Math.floor(level / 2) + bonuses.get('will');
```

#### HP

Hit points have a maximum, a current value, and temporary HP:

```javascript
var schema = {
    max: types.Number({ integer: true }),
    current: types.Number({ integer: true }),
    temp: types.Number({ integer: true })
};
```

From this we can calculate our Bloodied and Surge Value:

```javascript
var bloodied = Math.floor(hp.max / 2);
var surgeValue = Math.floor(hp.max / 4);
```

_Note: The `dnd4e` rules don't actually handle the case of hp.max being less than 4 (which would give a Surge Value of 0.
While technically, this is broken and the coded could be modified with a `|| 1` added to the calculation; I feel that if
the game designers didn't consider it, then the only reason you're ever encounter it is if you enter something 
incorrectly. The code won't blow up on 0, so I feel no strong urge to fix this._

#### Surges

Surges have a limited number per day, a current value.

```javascript
var schema = {
    perDay: types.Number({ integer: true }),
    current: types.Number({ integer: true }),
    secondWindAvailable: type.Boolean({ default: true })
};
```

The `secondWindAvailable` property indicates whether or not a second wind is _available_.

#### Wealth

This represents the amount of gold you have. I don't want to dick around with doing type conversions.

#### Skills

There is a default list of skills in `dnd4e`, however some campaigns may add skills. Because of this, it's much more
efficient to simply store a list of changes to the default skills, rather than a complete list of the skills. Each skill
has the following schema:

```javascript
var schema = {
    name: types.String({ required: true }),
    armorPenalty: types.Number({ integer: true }),
    trained: type.Boolean({ default: true }),
    removed: type.Boolean({ default: false })
};
```

As per everything else, bonuses are handled via the Bonus system, and all we store is a list of any skills that have
been modified. We rely on the UI to know what the default list of skills are, and to match our list up.

Special note: we support a `removed` property to indicate the user removed once of the default skills. (This should only
be used for default skills.)

#### Powers

Powers are basically just a reference to a Power model, with some metadata:

```javascript
var schema = {
    powerID: types.String({ required: true }),
    used: types.Number({ integer: true, default: 0 }),
    maxUses: types.Number({ integer: true, default: 1 }),
    notes: types.String()
};
```

This way we can store the number of times the power's been used, as well as the maximum number of uses, along with any 
rolls, and notes about the power.

#### Feats

Feats, like powers, are just a reference to a Feat model, with some metadata:

```javascript
var schema = {
    featID: types.String({ required: true }),
    notes: types.String()
};
```

There's nothing super special to store with feats, other than notes.

#### Bonuses

A 'bonus' is some value (possibly negative) that is added to a basic stat in order to get the final value. Bonuses 
themselves are fairly straightforward:

```javascript
var schema = {
    name: types.String({ required: true }),
    type: types.String({ required: true, default: 'untyped' }),
    value: types.Number({ integer: true, required: true }),
    source: types.String(),
    stacks: type.Boolean({ default: false })
};
```

Each bonus has a name, this is what will be used in the code (or user input) to reference the bonus by. All bonuses have 
a type (for stacking logic) and a value. Additionally, the bonus can list where it came from (useful to the player) and
a bonus can indicate that it stacks with other bonuses of the same type. (This is rare, and generally only exists in
homebrew material.)

The `BonusService` will have the following methods:

* `load(bonusesArray)` - Takes an array of bonuses, clearing previous bonuses and calculated values
* `add(bonus)` - Takes a bonus object, clearing the calculated value for the bonus of that name
* `get(bonusName)` - Calculates (and caches) the total bonus for that name, and returns the value
* `recalculate(bonusName)` - clears the cached value for the bonus of that name. If no name is passed, clears entire cache

It will be in charge of maintaining and calculating all bonuses for the character. (It will need to implement correct
bonus stacking logic, which is not simple, to say the least.)

#### Equipment

...

#### Pools

Pools are, essentially named, positive integers that may or may not have an upper bound. All characters have atleast an
'Action Points' pool.

```javascript
var schema = {
    name: types.String({ required: true }),
    value: types.Number({ integer: true, required: true }),
    max: types.Number({ integer: true }),
    reset: types.Number({ integer: true })
};
```

The `reset` property is the value the pool resets to.

#### Rolls

A roll is simply a named dice expression.

```javascript
var schema = {
    name: types.String({ required: true }),
    expression: types.String({ required: true })
};
```

#### Notes

Notes are simply named markdown files.

```javascript
var schema = {
    name: types.String({ required: true }),
    content: types.String({ required: true })
};
```

#### Conditions

Conditions are a simple construct to help the player keep track of effects on their character. They are super simple,
and designed to be very flexible.

```javascript
var schema = {
    condition: types.String({ required: true }),
    duration: types.String({ default: 'Unspecified.' })
};
```

Suggestions have been made to integrate them into the bonus system, but I feel that would add too much complexity for
very little gain at the moment.
