var SpaceTrail = SpaceTrail || {};
var discoveredItems = [];

SpaceTrail.UI = {};
// Show notification in the message box

SpaceTrail.UI.notify = function(message, type) {
  var modal = document.getElementById("modal");
  if (modal.className === "") {
    document.getElementById("purchased-item-list").innerHTML =
      '<div class="purchased-item">' + message + type + "</div>";
  }
  document.getElementById("message-line").innerHTML =
    '<div class="update-' +
    type +
    '">Day ' +
    Math.ceil(this.caravan.day) +
    ": " +
    message +
    "</div>" +
    document.getElementById("message-line").innerHTML;
};

// refresh visual caravan stats
SpaceTrail.UI.refreshStats = function() {
  var rocketLocation = this.caravan.distance / 50;
  //modify the dom
  document.getElementById("stat-day").innerHTML = Math.ceil(this.caravan.day);
  document.getElementById("stat-distance").innerHTML = Math.floor(
    this.caravan.distance
  );
  document.getElementById("stat-crew").innerHTML = this.caravan.crew;
  document.getElementById("stat-spaceShip").innerHTML = this.caravan.spaceShip;
  document.getElementById("stat-food").innerHTML = Math.ceil(this.caravan.food);
  document.getElementById("stat-money").innerHTML = "$" + this.caravan.money;
  document.getElementById("shop-stat-money").innerHTML =
    "$" + this.caravan.money;
  document.getElementById("stat-firepower").innerHTML = this.caravan.firepower;
  document.getElementById("stat-weight").innerHTML =
    Math.ceil(this.caravan.weight) + "/" + this.caravan.capacity;
  //  document.getElementById('rocket-img').style.left = this.caravan.distance / SpaceTrail.finalDistance) + '%';
  document.getElementById("rocket-img").style.left = rocketLocation + "%";
};

SpaceTrail.UI.createBtns = function() {
  var newGoBtn = document.createElement("button");
  var newLeaveBtn = document.createElement("button");
  var parentBtnDiv = document.querySelector(".control-buttons");
  //creates the buttons
  newGoBtn.setAttribute("id", "go");
  newLeaveBtn.setAttribute("id", "runaway");
  parentBtnDiv.appendChild(newGoBtn);
  parentBtnDiv.appendChild(newLeaveBtn);
};

SpaceTrail.UI.removeBtns = function() {
  var parentBtnDiv = document.querySelector(".control-buttons");
  while (parentBtnDiv.firstChild) {
    parentBtnDiv.removeChild(parentBtnDiv.firstChild);
  }
};

SpaceTrail.UI.showDiscovery = function(landmark) {
  this.landmark = landmark;
  discoveredItems.push("" + landmark + "");

  this.createBtns();

  var modalDiv = document.getElementById("modal-fly");
  var modalHeader = document.getElementById("modal-header");
  var modalBody = document.getElementById("modal-body");
  var goBtn = document.getElementById("go");
  var avoid = document.getElementById("runaway");
  modalDiv.classList.remove("hidden");

  if (landmark === "Planet Mars") {
    modalHeader.innerText = "You made it to the " + landmark;
    modalBody.innerText =
      "Choose whether you want to land on the planet Mars or continue traveling.";
    goBtn.innerHTML = "Land on Planet Mars | Add +2 Days";
    avoid.innerHTML = "Avoid Stopping";
    // goBtn.addEventListener('click', this.plantFlag.bind(this));
    goBtn.addEventListener("click", this.marsGame.bind(this));
    avoid.addEventListener("click", this.runaway.bind(this));
  } else if (landmark === "Asteroid Belt") {
    modalHeader.innerText = "You made it to the landmark " + landmark;
    modalBody.innerText =
      "You can go around the asteroid field and add 3 days to your journey or take the risk of crashing and go through. Use your arrow keys to control the spaceship";
    goBtn.innerHTML = "Go Through";
    avoid.innerHTML = "Avoid asteroid field | add +3 Days";
    goBtn.removeEventListener("click", this.plantFlag.bind(this));
    goBtn.addEventListener("click", this.go.bind(this));
    avoid.addEventListener("click", this.runaway.bind(this));
  }
};

SpaceTrail.UI.marsGame = function() {
  console.log("Mars THE GAME START");
  this.removeBtns();
  var modalDiv = document.getElementById("modal-fly");
  // Set the background
  var mainRocket = document.getElementById("rocket-img");
  mainRocket.style.opacity = 0;
  var marsImg = document.getElementById("game-result");
  marsImg.classList.add("mars-game-bg");

  //Create the button div container
  var btnDiv = document.createElement("div");
  btnDiv.classList.add("mars-game-btns");
  marsImg.appendChild(btnDiv);

  var cameraDiv = document.createElement("div");
  cameraDiv.classList.add("camera");
  var camera = document.createElement("i");
  camera.classList.add("fas");
  camera.classList.add("fa-camera-retro");
  cameraDiv.appendChild(camera);
  marsImg.appendChild(cameraDiv);

  cameraDiv.addEventListener("click", function() {
    if (!states.galleryIsActive) {
      takePicture();
    }
  });

  var btnTitle = document.createElement("div");
  btnTitle.setAttribute("id", "btn-title");
  var btnTitle = document.createElement("div");
  btnTitle.setAttribute("id", "btn-title");
  var btnA = document.createElement("button");
  btnA.setAttribute("id", "btn-a");
  var btnB = document.createElement("button");
  btnB.setAttribute("id", "btn-b");
  var btnC = document.createElement("button");
  btnC.setAttribute("id", "btn-c");
  var btnD = document.createElement("button");
  btnD.setAttribute("id", "btn-d");

  //The initial starting text
  // btnA.innerText = 'A) sample test A';
  // btnB.innerText = 'B) sample asdtest B';
  // btnC.innerText = 'C) asd';
  // btnD.innerText = 'D) sample test D';

  btnDiv.appendChild(btnTitle);
  btnDiv.appendChild(btnA);
  btnDiv.appendChild(btnB);
  btnDiv.appendChild(btnC);
  btnDiv.appendChild(btnD);

  var states = {
    currentStage: 1,
    currentImg: "images/mars_space_station.jpg",
    galleryIsActive: false,
    atShip: true,
    flagPlanted: false,
    backBtnAdded: false,
    craterDiscovered: false
  };

  var btnTxt = {
    // btnTitle: 'You have landed, what do you want to do?',
    btnA: "Explore",
    btnB: "Plant Flag",
    btnC: "Take a picture",
    btnD: "Return to space"
  };

  function updateText() {
    if (states.currentStage === 1) {
      btnTitle.innerHTML = "You have landed, what do you want to do?";
    }
    btnA.innerHTML = btnTxt.btnA;
    btnB.innerHTML = btnTxt.btnB;
    btnC.innerHTML = btnTxt.btnC;
    btnD.innerHTML = btnTxt.btnD;
  }

  function addBackButton() {
    var div = document.createElement("div");
    var parent = document.querySelector(".mars-game-btns");
    div.classList.add("mars-game-back-btns");
    div.innerHTML = "Return To Rocket";
    parent.appendChild(div);
    states.backBtnAdded = true;
    div.addEventListener("click", function() {
      states.currentStage--;
      changeBackground("images/mars_space_station.jpg");
      checkChanges();
      updateButtons();
      // if(states.backBtnAdded === true && states.currentStage === 1) {
      //   var parentDiv = document.getElementById('mars-game-btns');
      //   parentDiv.removeChild(parentDiv.lastChild);
      // }
    });
  }

  function landRocket() {
    var parentDiv = document.getElementById("game-result");
    var newImg = document.createElement("img");
    newImg.classList.add("rocket-img-game");
    newImg.src = "images/rocket.png";
    parentDiv.appendChild(newImg);
    setTimeout(() => {
      newImg.src = "images/rocket_land.png";
    }, 4500);
  }

  function launchRocket() {
    var landedRocket = document.querySelector(".rocket-img-game");
    landedRocket.src = "images/rocket.png";
    landedRocket.classList.remove("rocket-img-game");
    landedRocket.classList.add("rocket-img-game-launch");
    setTimeout(() => {
      landedRocket.style.display = "none";
    }, 4000);
  }

  function updateButtons() {
    if (states.currentStage === 1) {
      btnTxt.btnA = "Explore";
      btnTxt.btnB = "Plant Flag";
      btnTxt.btnC = "Unknown";
      btnTxt.btnD = "Go back to space";
      updateText();
    } else if (states.currentStage === 2) {
      btnTxt.btnA = "Take a quick break";
      btnTxt.btnB = "Go to rock field";
      btnTxt.btnC = "Go to large crater";
      btnTxt.btnD = "Go to empty field";
      updateText();
    }
  }

  function checkChanges() {
    //check rocket
    var rocket = document.querySelector(".rocket-img-game");
    var rocket = document.querySelector(".rocket-img-game");
    if (states.currentStage === 1) {
      rocket.style.opacity = "1";
    } else if (states.currentStage === 2) {
      rocket.style.opacity = "0";
    }

    //Checks flag
    var flag = document.querySelector(".game-flag");
    if (states.currentStage === 1 && states.flagPlanted === true) {
      flag.style.opacity = "1";
      btnB.style.opacity = ".65";
    }
    if (states.currentStage === 2 && states.flagPlanted === true) {
      flag.style.opacity = "0";
      btnB.style.opacity = "1";
    }

    //Checks for if the back button should show
    var btn = document.querySelector("div.mars-game-back-btns");
    if (states.backBtnAdded === true && states.currentStage === 1) {
      btn.style.opacity = "0";
      // parentDiv.removeChild(parentDiv.lastChild);
    }

    if (states.backBtnAdded === true && states.currentStage === 2) {
      btn.style.opacity = "1";
      // parentDiv.removeChild(parentDiv.lastChild);
    }
  }

  function changeBackground(imgUrl, title) {
    this.imgUrl = imgUrl;
    this.title = title;
    var titleText = document.getElementById("btn-title");
    var marsBg = document.querySelector(".mars-game-bg");
    states.currentImg = imgUrl;
    titleText.innerHTML = title;
    marsBg.style.background = 'url("' + imgUrl + '")';
  }

  function checkForClick(e) {
    this.e = e;
    //Controls all A related scenarios
    if (e.target.id === "btn-a") {
      if (e.target.id === "btn-a" && states.currentStage === 1) {
        states.currentStage++;
        states.atShip = false;
        checkChanges();
        updateButtons();
        changeBackground(
          "images/explore.jpg",
          "You decided to go on a Journey. Where do you want to go?"
        );
        if (!states.backBtnAdded) {
          addBackButton();
        }
      } else if (e.target.id === "btn-a" && states.currentStage === 2) {
        // states.currentStage--
        changeBackground(
          "images/mars_person.jpg",
          "You decided to sit down on a rock and take a break."
        );
        checkChanges();
        updateButtons();
      }
    }

    //Controls all B related scenarios
    if (e.target.id === "btn-b") {
      checkChanges();
      if (
        e.target.id === "btn-b" &&
        states.currentStage === 1 &&
        states.flagPlanted === false
      ) {
        SpaceTrail.UI.plantFlag("planets", "flag");
        SpaceTrail.UI.plantFlag("game-result", "game-flag");
        btnB.style.opacity = ".65";
        btnB.style.cursor = "initial";
        states.flagPlanted = true;
        updateButtons();
      } else if (e.target.id === "btn-b" && states.currentStage === 2) {
        checkChanges();
        updateButtons();
        changeBackground(
          "images/mars_rocks.jpg",
          "You arrived at a rock field created from a crashed asteroid."
        );
      }
    }

    //Controls all C related scenarios
    if (e.target.id === "btn-c" && states.currentStage === 2) {
      checkChanges();
      if (!states.craterDiscovered) {
        SpaceTrail.Game.createDiscoveryItem("Hellas Impact Crater");
      }
      states.craterDiscovered = true;
      changeBackground(
        "images/mars_crater.jpg",
        "You arrived at the largest crater on mars known as the Hellas Impact Crater. It is over 1,400 miles wide."
      );
    }

    //Controls all D related scenarios
    if (e.target.id === "btn-d" && states.currentStage === 1) {
      launchRocket();
      setTimeout(() => {
        modalDiv.classList.add("hidden");
        marsImg.classList.remove("mars-game-bg");
        SpaceTrail.UI.removeChildren("game-result");
        mainRocket.style.opacity = 1;
        SpaceTrail.Game.resumeJourney();
      }, 5400);
    } else if (e.target.id === "btn-d" && states.currentStage === 2) {
      checkChanges();
      changeBackground(
        "images/Mars_bg.jpg",
        "You take a look at the vast view of the Mars great plains."
      );
    }

    // if(states.backBtnAdded === true && states.currentStage === 1) {
    //   var btn = document.querySelector('div.mars-game-back-btns');
    //   btn.style.opacity = '0;';
    // }

    //Adds a back button if on stage 2
  }

  function takePicture() {
    var marsBg = document.querySelector(".mars-game-bg");
    var bg = getComputedStyle(marsBg);
    var duration = bg.animationDuration;
    marsBg.classList.add("flash");
    setTimeout(() => {
      marsBg.classList.remove("flash");
    }, 1400);

    function addToGallery() {
      var parent = document.getElementById("modal-fly");
      var mainDiv = document.createElement("div");
      mainDiv.classList.add("gallery-container");
      parent.appendChild(mainDiv);
      // mainDiv.innerHTML = 'TEST';

      var galleryImage = document.createElement("img");
      galleryImage.classList.add("gallery-image");
      galleryImage.src = states.currentImg;
      mainDiv.appendChild(galleryImage);

      var imgBtns = document.createElement("div");
      imgBtns.classList.add("img-buttons");
      mainDiv.appendChild(imgBtns);

      var deleteImgBtn = document.createElement("button");
      deleteImgBtn.classList.add("img-btn");
      deleteImgBtn.classList.add("delete");
      deleteImgBtn.innerHTML = "Delete Photo";
      var addImgBtn = document.createElement("button");
      addImgBtn.classList.add("img-btn");
      addImgBtn.classList.add("add");
      addImgBtn.innerHTML = "Add Photo";

      deleteImgBtn.addEventListener("click", function() {
        parent.removeChild(parent.lastChild);
        states.galleryIsActive = false;
      });

      imgBtns.appendChild(deleteImgBtn);
      imgBtns.appendChild(addImgBtn);
    }

    addToGallery();
    states.galleryIsActive = true;
  }

  var allBtns = document.querySelectorAll(".mars-game-btns button");
  allBtns.forEach(btn => btn.addEventListener("click", checkForClick));

  // var states.currentStage = 1;
  // updateText();
  updateButtons();
  landRocket();
  checkForClick();
};

SpaceTrail.UI.removeChildren = function(parent) {
  this.parent = parent;
  var parentEl = document.getElementById(parent);
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

SpaceTrail.UI.plantFlag = function(parentClass, divClass, width, x, y) {
  this.parentClass = parentClass;
  this.divClass = divClass;
  this.width = width;
  this.x = x;
  this.y = y;

  //Add flag to the landmark
  // var modalDiv = document.getElementById('modal-fly');
  var parentDiv = document.getElementById(parentClass);
  var newImg = document.createElement("img");
  newImg.classList.add(divClass);
  newImg.src = "images/flag2.png";
  parentDiv.appendChild(newImg);
  // this.removeBtns();
  // modalDiv.classList.add('hidden');
  // SpaceTrail.Game.resumeJourney();
};

// SpaceTrail.UI.takePicture = function() {
//   var marsBg = document.querySelector(".mars-game-bg");
//   var bg = getComputedStyle(marsBg);
//   var duration = bg.animationDuration;
//   marsBg.classList.add('flash');
//   setTimeout(()=>  {
//     marsBg.classList.remove('flash');
//   }, 1400);

//   function addToGallery() {
//     var parent = document.getElementById('modal-fly');
//     var mainDiv = document.createElement('div');
//     mainDiv.classList.add('gallery-container');
//     parent.appendChild(mainDiv);
//     mainDiv.innerHTML = 'TEST';

//     var galleryImage = document.createElement('div');
//     galleryImage.classList.add('gallery-image');
//     mainDiv.appendChild(galleryImage);

//   }

//   addToGallery();
// }

//creates the Asteroid game
SpaceTrail.UI.go = function() {
  console.log("CLICK THE GAME START");
  this.removeBtns();
  var fcanvas = document.getElementById("flappy-canvas");
  var fctx = fcanvas.getContext("2d");
  var parentContainer = document.getElementById("attack").offsetWidth;
  fcanvas.width = parentContainer;
  fcanvas.classList.remove("hidden");

  //load images
  var bird = new Image();
  var bg = new Image();
  var fg = new Image();
  var pipeNorth = new Image();
  var pipeSouth = new Image();
  var gameOver;
  var madeSafely;

  //pipe coordinates
  var pipe = [];
  pipe[0] = {
    x: fcanvas.width,
    y: 0
  };

  //draww images
  var bX = 10;
  var bY = 150;
  var gap = 85;
  bird.src = "images/rocketSmall.png";
  bg.src = "images/bgBig.png";
  pipeNorth.src = "images/cometNorth.png";
  pipeSouth.src = "images/cometSouth.png";

  document.body.addEventListener("keydown", function(e) {
    var keycodes = [37, 38, 39, 40];
    if (keycodes.includes(e.keyCode)) {
      e.preventDefault();
    }
    keys[e.keyCode] = true;
  });
  document.body.addEventListener("keyup", function(e) {
    e.preventDefault();
    keys[e.keyCode] = false;
  });

  var velY = 0,
    velX = 0,
    speed = 2,
    friction = 0.95,
    keys = [];
  function draw() {
    if (keys[38]) {
      if (velY > -speed) {
        velY--;
      }
    }

    if (keys[40]) {
      if (velY < speed) {
        velY++;
      }
    }
    if (keys[39]) {
      if (velX < speed) {
        velX++;
      }
    }
    if (keys[37]) {
      if (velX > -speed) {
        velX--;
      }
    }

    velY *= friction;
    bY += velY;
    velX *= friction;
    bX += velX;

    //prevent flappy from moving outside the canvas
    var offset = 30;

    if (bX >= fcanvas.width - offset) {
      bX = fcanvas.width - offset;
    } else if (bX <= 5) {
      bX = 5;
    }
    if (bY > fcanvas.height - offset) {
      bY = fcanvas.height - offset;
    } else if (bY <= 5) {
      bY = 5;
    }

    var gravity = 0;

    var constant = pipeNorth.height + gap;
    fctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
      fctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);

      fctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
      pipe[i].x--;

      //controls how close each column is from each other. The higher the number the closer
      if (pipe[i].x == 500) {
        pipe.push({
          x: fcanvas.width,
          y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
        });
      }

      //check for game win
      if (pipe.length === 8) {
        SpaceTrail.Caravan.spaceShip += 1;
        madeSafely = true;
        console.log("Made it safely");
        fctx.clearRect(0, 0, fcanvas.width, fcanvas.height);
        gameOver = true;
      }

      var collisionCheck = {
        one: bX + bird.width >= pipe[i].x,
        two: bX <= pipe[i].x + pipeNorth.width,
        northCollide: bY <= pipe[i].y + pipeNorth.height,
        southCollide: bY + bird.height >= pipe[i].y + constant
      };
      //check for collision
      if (
        collisionCheck.one &&
        collisionCheck.two &&
        (collisionCheck.northCollide || collisionCheck.southCollide)
      ) {
        // location.reload();
        SpaceTrail.Caravan.spaceShip += 1;
        madeSafely = false;
        console.log("Lost a ship");
        console.log(collisionCheck);
        fctx.clearRect(0, 0, fcanvas.width, fcanvas.height);
        gameOver = true;
      }
    }

    fctx.drawImage(fg, 0, fcanvas.height - fg.height);
    fctx.drawImage(bird, bX, bY);
    bY += gravity;
    if (!gameOver) {
      requestAnimationFrame(draw);
    } else {
      var gameResult = document.getElementById("game-result");
      fcanvas.classList.add("hidden");
      gameResult.classList.remove("hidden");
      if (!madeSafely) {
        gameResult.style.color = "red";
        gameResult.innerHTML =
          "You crashed into an asteroid! You lose  Space Ship";
        setTimeout(() => {
          document.getElementById("modal-fly").classList.add("hidden");

          gameResult.classList.add("hidden");
          SpaceTrail.Game.resumeJourney();
          console.log("game over");
        }, 1850);
      } else {
        gameResult.style.color = "green";
        gameResult.innerHTML = "You made it successfully and saved 3 days";
        setTimeout(() => {
          document.getElementById("modal-fly").classList.add("hidden");

          gameResult.classList.add("hidden");
          SpaceTrail.Game.resumeJourney();
          console.log("game over");
        }, 1400);
      }
    }
  }

  draw();
};

SpaceTrail.UI.runaway = function(landmark) {
  this.landmark = landmark;
  this.removeBtns();
  //remove event listener
  console.log("close");

  if (marsIsDiscovered) var gameResult = document.getElementById("game-result");
  gameResult.classList.remove("hidden");
  gameResult.style.color = "red";
  gameResult.innerHTML = "You avoided the planet";

  setTimeout(() => {
    document.getElementById("modal-fly").classList.add("hidden");
    gameResult.classList.add("hidden");
    SpaceTrail.Game.resumeJourney();
    console.log("game over");
  }, 1400);
};

//show shop
SpaceTrail.UI.showShop = function(products) {
  //get shop area

  var shopDiv = document.getElementById("modal");
  shopDiv.classList.remove("hidden");

  //init the shop just once
  if (!this.shopInitiated) {
    //event delegation
    shopDiv.addEventListener("click", function(e) {
      //what was clicked
      var target = e.target || e.src;

      //exit button
      if (target.tagName == "BUTTON") {
        //resume journey
        shopDiv.classList.add("hidden");
        SpaceTrail.UI.game.resumeJourney();
      } else if (target.tagName == "DIV" && target.className.match(/product/)) {
        SpaceTrail.UI.buyProduct({
          item: target.getAttribute("data-item"),
          qty: target.getAttribute("data-qty"),
          price: target.getAttribute("data-price")
        });
      }
    });

    this.shopInitiated = true;
  }

  //clear existing content
  var prodsDiv = document.getElementById("prods");
  prodsDiv.innerHTML = "";
  console.log("products", products);
  //show products
  var product;
  for (var i = 0; i < products.length; i++) {
    product = products[i];

    prodsDiv.innerHTML +=
      '<div class="product"> <img src="' +
      product.img +
      '" width="100" /> <div class="product-item" data-qty="' +
      product.qty +
      '" data-item="' +
      product.item +
      '" data-price="' +
      product.price +
      '">' +
      product.qty +
      " " +
      product.item +
      " - $" +
      product.price +
      "</div> </div>";
  }
  //  for(var i=0; i < products.length; i++) {
  //   product = products[i];
  //   prodsDiv.innerHTML += '<div class="product-item" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
  //   }
};

//buy product
SpaceTrail.UI.buyProduct = function(product) {
  //check we can afford it
  if (product.price > SpaceTrail.UI.caravan.money) {
    SpaceTrail.UI.notify("Not enough money", "negative");
    return false;
  }

  SpaceTrail.UI.caravan.money -= product.price;

  SpaceTrail.UI.caravan[product.item] += +product.qty;

  SpaceTrail.UI.notify(
    "Bought " + product.qty + " x " + product.item,
    "positive"
  );

  SpaceTrail.UI.prodsDiv.classList.add("hidden");

  //update weight
  SpaceTrail.UI.caravan.updateWeight();

  //update visuals
  SpaceTrail.UI.refreshStats();
};

//show attack
// SpaceTrail.UI.showAttack = function() {
//   var attackDiv = document.getElementById('modal-fly');
//   attackDiv.classList.remove('hidden');

//     //run away
//     document.getElementById('runaway').addEventListener('click', this.runaway.bind(this));
//     document.getElementById('go').addEventListener('click', this.go.bind(this));
//   // }
// };

//  for(var i=0; i < products.length; i++) {
//   product = products[i];
//   prodsDiv.innerHTML += '<div class="product-item" data-qty="' + product.qty + '" data-item="' + product.item + '" data-price="' + product.price + '">' + product.qty + ' ' + product.item + ' - $' + product.price + '</div>';
//   }
