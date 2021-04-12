//----------------------------------------------------------------------------------------------------------------------
// Populate a default set of EotE Force Abilities
//----------------------------------------------------------------------------------------------------------------------

import * as Knex from 'knex';

//----------------------------------------------------------------------------------------------------------------------

export async function seed(knex : Knex) : Promise<void>
{
    // Inserts seed entries
    await knex('genesys_motivation').insert([
        {
            id: 1,
            name: 'Ambition',
            type: 'desire',
            description: 'Your character craves power and authority over others. The character may pursue privilege, social status, or rank to achieve this goal.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 2,
            name: 'Belonging',
            type: 'desire',
            description: 'Your character seeks to be liked by others and goes out of the way to make a good impression. Your character seeks to be accepted by a community or faction.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 3,
            name: 'Expertise',
            type: 'desire',
            description: 'Your character wants to excel in a chosen field or skill. To achieve perfection, your character practices constantly.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 4,
            name: 'Fame',
            type: 'desire',
            description: 'Your character seeks the limelight and wants to be famous. They pursue anything that can garner attention and praise.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 5,
            name: 'Justice',
            type: 'desire',
            description: 'Your character believes in a set of ethics that demands fair treatment for all. Your character is dedicated to righting inequality and protecting others’ rights.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 6,
            name: 'Knowledge',
            type: 'desire',
            description: 'Your character wishes to uncover knowledge that may have been lost, forgotten, or locked away. This information could pertain to the world, or it could pertain to your character’s past or origins.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 7,
            name: 'Love',
            type: 'desire',
            description: 'Your character seeks romantic affection and intimacy from another character. Your character might already have a true love or may strive to find someone to love and be loved by.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 8,
            name: 'Safety',
            type: 'desire',
            description: 'Your character values peace and comfort above all else. Perhaps they seek shelter, a steady source of food, or other material necessities, or they might seek emotional security in a place free from oppression and abuse.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 9,
            name: 'Vengeance',
            type: 'desire',
            description: 'Someone or something wronged your character in the past, and the character has sworn to exact revenge against the aggrieving party.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 10,
            name: 'Wealth',
            type: 'desire',
            description: 'Money or material possessions are the prime goal for your character. Your character may be active in business, trade, or the tried-and-true method of theft to increase their net worth.',
            reference: 'G-CRB:47',
            official: true,
            scope: 'public'
        },
        {
            id: 11,
            name: 'Change',
            type: 'fear',
            description: 'Your character finds routine and stability comforting, and fears changes that could upend their day-to-day routine.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 12,
            name: 'Commitment',
            type: 'fear',
            description: 'The idea of making promises or being relied on scares your character, who hates the idea that someone else is relying on them. This fear of commitment could manifest in relationships, on the job, or among family.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 13,
            name: 'Death',
            type: 'fear',
            description: 'The fear of death is deep and primal, and it drives a lot of our behaviors. There are a large number of ways this could manifest in your character, many of them similar to what you see in real life.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 14,
            name: 'Expression',
            type: 'fear',
            description: 'Your character has some behavior or means of expressing themself privately that they do not want the world to know about. The nature of that behavior is up to you. Keep the setting in mind when you come up with it, though.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 15,
            name: 'Failure',
            type: 'fear',
            description: 'Most people dislike failure, but some actively fear it. That fear may drive them to try to become absolutely perfect, or it may crush them into inaction. Maybe it does both.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 16,
            name: 'Humiliation',
            type: 'fear',
            description: 'Characters who are especially concerned with how others view them are particularly sensitive to potential humiliation. They go out of their way to avoid ever appearing wrong or foolish, even if that means missing out on exciting opportunities and experiences.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 17,
            name: 'Isolation',
            type: 'fear',
            description: 'Your character fears being isolated from other people and being doomed to live and die alone. Maybe this drives them to seek out relationships with anyone and everyone, even when a relationship is unpleasant or unhealthy.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 18,
            name: 'Nemesis',
            type: 'fear',
            description: 'Your character has a deadly foe, someone they fear (even if they don’t admit it). The nature of this enemy is up to you, but we suggest you consult with your GM. After all, your GM surely wants to bring this up in the game!',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 19,
            name: 'Obscurity',
            type: 'fear',
            description: 'Your character wishes to be remembered after they are gone and works tirelessly to secure their legacy.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 20,
            name: 'Poverty',
            type: 'fear',
            description: 'For your character, it’s all about wealth and security. They fear being without, and they work hard to amass money, supplies, and other valuable items to ensure their status.',
            reference: 'G-CRB:48',
            official: true,
            scope: 'public'
        },
        {
            id: 21,
            name: 'Adaptable',
            type: 'strength',
            description: 'No matter what life throws at your character, they always rise to the challenge. Your character is flexible and can handle nearly every situation, no matter how grim or strange the circumstances.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 22,
            name: 'Analytical',
            type: 'strength',
            description: 'Your character’s mind is like a computer, able to absorb a barrage of information and come to a logical conclusion. Your solutions always have the inarguable weight of reason, and you know how to pick your battles and when to bide your time.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 23,
            name: 'Courageous',
            type: 'strength',
            description: 'Fear has no place in your character’s heart. They laugh at danger and gladly push themself to confront what others flee from. Note that your character probably still has a Fear Motivation. It’s up to you whether that Fear is the one thing that can undo your character’s courage, or if this Strength pushes them to confront the source of their Fear no matter what.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 24,
            name: 'Curious',
            type: 'strength',
            description: 'Life is a million mysteries, and your character wants to learn about every one. Whether curiosity drives them to meet new people, explore distant locales, or learn fantastic new truths and ideas is up to you.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 25,
            name: 'Idealistic',
            type: 'strength',
            description: 'What ideals your character believes in are up to you, but to your character, those ideals are nothing short of sacred. Your character may feel that everyone should live up to those same ideals (and may be disappointed when people don’t), or they may be content to meet the standards they have set for themself.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 26,
            name: 'Independent',
            type: 'strength',
            description: 'When everyone else has failed or fallen, your character knows they can still count on themself. Your character may get along with others just fine but makes sure not to rely on others. That way, when things go wrong, your character is always prepared to deal with the situation and isn’t waiting for someone else to help.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 27,
            name: 'Patient',
            type: 'strength',
            description: 'Your character is always willing to wait and knows the power of being calm. By waiting for the right opportunity, your character avoids all manner of unpleasant and dangerous situations. However, when such an opportunity presents itself, your character acts swiftly and decisively.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 28,
            name: 'Spiritual',
            type: 'strength',
            description: 'It doesn’t matter so much what your character believes in: that depends a lot on your game’s setting. What’s important is that your character believes. Their belief gives them a solid mental bedrock they can always rely on.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 29,
            name: 'Wise',
            type: 'strength',
            description: 'Through years of experience and countless events, your character has developed that rare quality: wisdom. The wise understand the truths of how their world works. Just as importantly, they know that sometimes, with the right effort, those truths can be overcome.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 30,
            name: 'Witty',
            type: 'strength',
            description: 'Your character is extremely clever, with the right joke for a friend and the perfect insult for a foe. Some may love their company, while others loathe their cutting remarks, but none can deny that your character has the sharpest tongue around.',
            reference: 'G-CRB:49',
            official: true,
            scope: 'public'
        },
        {
            id: 31,
            name: 'Anger',
            type: 'flaw',
            description: 'Your character lashes out at themself or others with undue cause or with extreme force. They are quick to resort to physical force to solve their problems.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 32,
            name: 'Compulsion',
            type: 'flaw',
            description: 'This could be addiction, fascination, obsession, or another automatic behavior that is self-destructive or otherwise impedes your character’s ability to function and be healthy.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 33,
            name: 'Deception',
            type: 'flaw',
            description: 'Your character may be disloyal or a compulsive liar. They are concerned with their own wellbeing first and foremost, and they might always present themselves in the best possible light even when that isn’t the case.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 34,
            name: 'Greed',
            type: 'flaw',
            description: 'Your character is never satisfied with what they have, always wanting more. They are willing to flout the law or infringe upon others’ rights in order to get what they want.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 35,
            name: 'Laziness',
            type: 'flaw',
            description: 'Your character always seeks the path of least resistance and becomes intimidated by difficult or complex tasks.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 36,
            name: 'Ignorance',
            type: 'flaw',
            description: 'Your character lacks a basic knowledge base or understanding of a society’s norms. This may be due to your character’s upbringing or their recent travel to another area of the world. This could be more than just being "uneducated"; at some level, your character may be willfully ignorant.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 37,
            name: 'Intolerance',
            type: 'flaw',
            description: 'For whatever reason, your character harbors some prejudices toward a group of people. These may be relatively "minor" biases, or they may give rise to an intense emotion of hatred or revulsion. Whatever form it takes, remember that intolerance is based more in emotion than rationality.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 38,
            name: 'Pride',
            type: 'flaw',
            description: 'Pride does not always have to be a Flaw, but it can easily become one. Your character is arrogant, vain, or self-absorbed, or thinks highly of themself at the expense of others.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 39,
            name: 'Recklessness',
            type: 'flaw',
            description: 'Your character shows little regard for how their actions may affect themself or others, due either to low self esteem or lack of forethought. They are especially prone to dangerous or inconsiderate actions.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        },
        {
            id: 40,
            name: 'Timid',
            type: 'flaw',
            description: 'Your character is extremely risk averse, opting instead to take more thorough or tried-and-true approaches. They may take too long to act or may be unable to act at all in the face of new or intimidating challenges.',
            reference: 'G-CRB:50',
            official: true,
            scope: 'public'
        }
    ])
        .onConflict('id')
        .merge();
}

//----------------------------------------------------------------------------------------------------------------------
