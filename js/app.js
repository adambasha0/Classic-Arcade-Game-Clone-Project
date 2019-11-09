// Enemies our player must avoid
var Enemy = function(x, y, sp) {
    // load image of enemy, "sp" is the random speed assigned to each enemy
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.sp = sp = 150 + Math.floor(Math.random() * 100);
};

collisions_count = 0; //count number of collisions
// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplies the speed by the dt parameter on the x axis
    this.x += this.sp*dt;

    // update the move of enemy, enemy will reappear again from the left when it is off canvos from right
    if (this.x > 400) {
        this.x = -40;
    };
    // (collision detector) - reset the player position (new game) when player collides with either one of enemies
    if (player.xLoc - this.x < 70 && player.yLoc - this.y < 70) {
        setTimeout(() => { 
            player.yLoc = 430;
            player.xLoc = 200;
        }, 50);
        collisions_count +=  1;
        console.log(collisions_count);
        gameover();
    };       
};

// if player collides with enemy, display game over message
function gameover() {
    if (collisions_count > 2) {
        let collision_Paragraph = document.createElement("P");
        setTimeout(() => { 
            document.body.appendChild(collision_Paragraph);
            collision_Paragraph.style.color = "red";
            collision_Paragraph.style.fontSize = "30px";
            collision_Paragraph.innerHTML = "Game Over";
        }, 10);   
        // delete the congratulation message 1 second after
        setTimeout(() => { 
            document.body.removeChild(collision_Paragraph);
        }, 1000);
        // reset the counter of collisions after the player loses the game
        collisions_count = 0;
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// to count number of wins 
let count = 0; 

class Player {
    constructor(xLoc, yLoc) {
      this.xLoc = xLoc;
      this.yLoc = yLoc;
      this.character = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.character), this.xLoc, this.yLoc);
    }

    update(){
        
    }
    //allows the user to press up, down, left, right keyboard keys to change the position of the player in the game
    handleInput(kPress) {
        if (kPress == 'left' && this.xLoc != 0) {
            this.xLoc -= 100;
        } else if (kPress == 'right' && this.xLoc != 400) {
            this.xLoc += 100;
        } else if (kPress == 'up' && this.yLoc != -20) {
            this.yLoc -= 90;
        } else if (kPress == 'down' && this.yLoc != 430) {
            this.yLoc += 90;
        };

        // Create a <p> element to display congratulation message when game is won (when player reaches the blue zone)
        let paragraph = document.createElement("P");
        document.body.appendChild(paragraph);
        paragraph.style.color = "blue";
        paragraph.style.fontSize = "30px";
        // sets the location of the player to start point when the player reach the sea(blue zone)
        if  (this.yLoc <=-20) {
            setTimeout(() => { 
                this.yLoc = 430;
                this.xLoc = 200;
                count += 1;
                paragraph.innerHTML = "Congratulations: you won😀 <br> Number of wins: " + count;
                //reset the counter of collisions after the player wins the game
                collisions_count = 0;
            }, 100);   

            // delete the congratulation message 1 second after
            setTimeout(() => { 
                document.body.removeChild(paragraph);
            }, 1000);
        };
    }
}

// Now instantiate your objects.
var enemy1 = new Enemy(60, 65);
var enemy2 = new Enemy(145, 140);
var enemy3 = new Enemy(225, 220);
var enemy4 = new Enemy(200, 200);

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player, and provide the initial location of the player
let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(200, 430);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});





/*
 speedInc();
    function speedInc() {
        if (count > 1) {
            this.sp = 500 + Math.floor(Math.random() * 1000);
            console.log(this.sp);
    
        };
    }
*/

// increase speed of enemy when the player wins 
/*
function intermediate() {
    if (count >= 2) {
        this.sp = 200 + Math.floor(Math.random() * 150);
        allEnemies.push(enemy4);
    
    };
};
*/


