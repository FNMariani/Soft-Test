const app = new PIXI.Application({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.view);

//-----------
//MENU
//Buttons
const buttonsContainer = new PIXI.Container();
app.stage.addChild(buttonsContainer);

const playCardsButton = new PIXI.Text('CARDS');
playCardsButton.x = Math.round(app.screen.width / 2) - Math.round(playCardsButton.width / 2);
playCardsButton.y = Math.round(app.screen.height / 2) - Math.round(playCardsButton.height / 2) - 50;
buttonsContainer.addChild(playCardsButton);

const playTextButton = new PIXI.Text('TEXT');
playTextButton.x = Math.round(app.screen.width / 2) - Math.round(playTextButton.width / 2);
playTextButton.y = Math.round(app.screen.height / 2) - Math.round(playTextButton.height / 2);
buttonsContainer.addChild(playTextButton);

const playParticlesButton = new PIXI.Text('PARTICLES');
playParticlesButton.x = Math.round(app.screen.width / 2) - Math.round(playParticlesButton.width / 2);
playParticlesButton.y = Math.round(app.screen.height / 2) - Math.round(playParticlesButton.height / 2) + 50;
buttonsContainer.addChild(playParticlesButton);

const returnMenuButton = new PIXI.Text('MENU');
returnMenuButton.x = Math.round(app.screen.width) - Math.round(returnMenuButton.width / 2) - 70;
returnMenuButton.y = Math.round(returnMenuButton.height / 2);
returnMenuButton.visible = false;
app.stage.addChild(returnMenuButton);

// Set the interactivity
playCardsButton.eventMode = 'static';
playCardsButton.cursor = 'pointer';
playCardsButton.addListener('pointerdown', () =>
{
    startCards();
});

playTextButton.eventMode = 'static';
playTextButton.cursor = 'pointer';
playTextButton.addListener('pointerdown', () =>
{
    startText();
});

playParticlesButton.eventMode = 'static';
playParticlesButton.cursor = 'pointer';
playParticlesButton.addListener('pointerdown', () =>
{
    startParticles();
});

returnMenuButton.eventMode = 'static';
returnMenuButton.cursor = 'pointer';
returnMenuButton.addListener('pointerdown', () =>
{
    returnToMenu();
});

function changeButtonVisibility(newVisibility)
{  
    for (let i = buttonsContainer.children.length-1; i>=0; i--) 
    {
        buttonsContainer.children[i].visible = newVisibility;
    }
    returnMenuButton.visible = !newVisibility;
}


let lastIntervalId;
// create main container
sceneContainer = new PIXI.Container();
app.stage.addChild(sceneContainer);

function returnToMenu()
{
    clearInterval(lastIntervalId);
    while(sceneContainer.children[0]) {
        sceneContainer.removeChild(sceneContainer.children[0])
    }
    changeButtonVisibility(true);
}


//-----------
//CARDS
// Function to start playing.
function startCards()
{
    const cardContainer = new PIXI.Container();
    sceneContainer = cardContainer;
    app.stage.addChild(cardContainer);

    changeButtonVisibility(false);

    //Create 144 sprite cards
    const cardsQty = 144;
    const cards = [];
    const initialXOffset = 0;
    const initialYOffset = 50;  

    let endMovement = false;
    const cardsTextures = [
        PIXI.Texture.from('images/card_clubs_K.png'),
        PIXI.Texture.from('images/card_clubs_Q.png'),
        PIXI.Texture.from('images/card_clubs_J.png'),
        PIXI.Texture.from('images/card_clubs_10.png'),
        PIXI.Texture.from('images/card_clubs_09.png'),
        PIXI.Texture.from('images/card_clubs_08.png'),
        PIXI.Texture.from('images/card_clubs_07.png'),
        PIXI.Texture.from('images/card_clubs_06.png'),
        PIXI.Texture.from('images/card_clubs_05.png'),
        PIXI.Texture.from('images/card_clubs_04.png'),
        PIXI.Texture.from('images/card_clubs_03.png'),
        PIXI.Texture.from('images/card_clubs_02.png'),
        PIXI.Texture.from('images/card_clubs_A.png'),
    ];

    function moveCardTo(card, newX ,newY)
    {
        if (endMovement)
        {
            clearInterval(lastIntervalId);
            console.log("stop");
            return;
        } 

        cardIndex--;
        secondStackX += 1;
        secondStackY += 2;

        card.parent.addChild(card);

        const time = 2000; // 2 seconds tween
        //Show sprite
        const nextcard = new PIXI.Texture(cardsTextures[Math.floor(Math.random() * cardsTextures.length)]);
        cards[cardIndex+1].texture = nextcard;
        tweenTo(card, 'x', newX, time, backout(0.5), null, null);
        tweenTo(card, 'y', newY, time, backout(0.5), null, cardsComplete);
    }

    for (let i = 0; i < cardsQty; i++) 
    {
        CreateCard(initialXOffset + i, initialYOffset + (i*2));
    }

    function CreateCard(posX, posY)
    {
        const card = PIXI.Sprite.from('images/card_back.png');

        card.x = posX;
        card.y = posY;
        cards.push(card);

        sceneContainer.addChild(card);
    }
    let cardIndex = cards.length-1;
    let secondStackX = 100;
    let secondStackY = 50;

    function cardsComplete()
    {
        if(cardIndex === -1)
        {
            endMovement = true;
        }
    }
    
    //Move card every 1 second
    const seconds = 1;
    const moveCard = delay => {
        clearInterval(lastIntervalId);
        lastIntervalId = setInterval(() => {
        moveCardTo(cards[cardIndex], secondStackX, secondStackY);
        }, delay);
    };
    moveCard(seconds * 1000);
}


//EMOTES
function startText()
{
    const textContainer = new PIXI.Container();
    sceneContainer = textContainer;
    app.stage.addChild(textContainer);

    changeButtonVisibility(false);

    //Load textures
    const textTextures = [
        PIXI.Texture.from('images/emotes/emote_cash.png'),
        PIXI.Texture.from('images/emotes/emote_faceAngry.png'),
        PIXI.Texture.from('images/emotes/emote_faceHappy.png'),
        PIXI.Texture.from('images/emotes/emote_faceSad.png'),
        PIXI.Texture.from('images/emotes/emote_heart.png'),
        PIXI.Texture.from('images/emotes/emote_heartBroken.png'),
    ];

    const text = new PIXI.Text('cash');
    text.x = Math.round(app.screen.width / 2) - Math.round(text.width / 2);
    text.y = Math.round(app.screen.height / 2) - Math.round(text.height / 2);
    textContainer.addChild(text);

    const image = PIXI.Sprite.from(textTextures[0]);
    image.scale.set(3);
    image.x = Math.round(app.screen.width / 2) + Math.round(text.width / 2) + Math.round(image.width / 2);
    image.y = Math.round(app.screen.height / 2) - Math.round(image.height / 2);
    textContainer.addChild(image);

    const words = ["cash", "faceAngry", "faceHappy", "faceSad", "heart", "heartBroken"]; 

    function generateText()
    {
        let rIndex = Math.floor(Math.random() * words.length);
        text.text = words[rIndex];
        let fsize = Math.random() * 10 + 14;
        text.style.fontSize =  fsize + "px";
        text.x = Math.round(app.screen.width / 2) - Math.round(text.width / 2);
        text.y = Math.round(app.screen.height / 2) - Math.round(text.height / 2);

        image.texture = textTextures[rIndex]
        image.x = Math.round(app.screen.width / 2) + Math.round(text.width / 2) + Math.round(image.width / 2);
        image.y = Math.round(app.screen.height / 2) - Math.round(image.height / 2);
    };

    //Generate text every 2 seconds
    const seconds = 2;
    const generateTextInterval = delay => {
        clearInterval(lastIntervalId);
        lastIntervalId = setInterval(() => {
        generateText();
        }, delay);
    };
    generateTextInterval(seconds * 1000);
}

function startParticles()
{
    console.log("StartParticles()");
}



  

//----------------
//Create FPS text
const fpsTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 32,
    fontWeight: 'bold',
    fill: ['#00ff00']
});
fpsText = new PIXI.Text("60", fpsTextStyle);
app.stage.addChild(fpsText);

let elapsed = 0.0;
app.ticker.add((delta) => {
    //Update FPS
    fpsText.text = app.ticker.FPS.toFixed(0);
});


//----------
//Helper functions
const tweening = [];

function tweenTo(object, property, target, time, easing, onchange, oncomplete)
{
    const tween = {
        object,
        property,
        propertyBeginValue: object[property],
        target,
        easing,
        time,
        change: onchange,
        complete: oncomplete,
        start: Date.now(),
    };

    tweening.push(tween);

    return tween;
}

// Listen for animate update.
app.ticker.add((delta) =>
{
    const now = Date.now();
    const remove = [];

    for (let i = 0; i < tweening.length; i++)
    {
        const t = tweening[i];
        const phase = Math.min(1, (now - t.start) / t.time);
        t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1)
        {
            t.object[t.property] = t.target;
            if (t.complete) t.complete(t);
            remove.push(t);
        }
    }
    for (let i = 0; i < remove.length; i++)
    {
        tweening.splice(tweening.indexOf(remove[i]), 1);
    }
});

// Basic lerp funtion.
function lerp(a1, a2, t)
{
    return a1 * (1 - t) + a2 * t;
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount)
{
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
}