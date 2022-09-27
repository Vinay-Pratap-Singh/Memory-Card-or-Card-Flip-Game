// Accessing all the card items
let cards = document.querySelectorAll(".card");
// passing ind for tracking the index
cards.forEach((element, ind) => {
  element.addEventListener("click", () => flip(element, ind));
});

// An array for checking that the element pair is found or not
let solvedIndexes = [];

// first and second value to store first and second image to compare
// firstIndex and secondIndex to track the pair is found or not
let firstValue = "",
  secondValue = "",
  firstElement = "",
  secondElement = "";

// imageIndex to shuffle the images everytime
let imageIndex = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

// Counting the total solved to shuffle again
let totalSolved = 0;

// Shuffling the card randomly
function suffleCard() {
  let index = 0;
  imageIndex.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((element) => {
    //    console.log(element.lastChild.previousSibling.src);
    element.lastChild.previousSibling.src = `./images/img${imageIndex[index]}.jpg`;
    index++;
  });
}

// Calling shuffle card to randomize the images
suffleCard();

// function to flip the images and to match them
function flip(element, ind) {
  // checking that the element pair is already there or not
  if (solvedIndexes.includes(ind)) {
    console.log("RESTRICTED");
    return;
  }
  // pushing so that user can not click it again
  solvedIndexes.push(ind);

  // fliping the images
  element.firstChild.nextSibling.style.display = "none";
  element.lastChild.previousSibling.style.display = "block";

  // matching the values
  if (firstElement === "" && firstValue === "") {
    firstElement = element;
    firstValue = element.lastChild.previousSibling.src;
  } else if (secondElement === "" && secondValue === "") {
    secondElement = element;
    secondValue = element.lastChild.previousSibling.src;
  }

  if (firstValue !== "" && secondValue !== "") {
    if (firstValue === secondValue) {
      (firstValue = ""),
        (secondValue = ""),
        (firstElement = ""),
        (secondElement = "");
      totalSolved += 2;
    } else {
      solvedIndexes.pop();
      solvedIndexes.pop();
      setTimeout(() => {
        firstElement.firstChild.nextSibling.style.display = "block";
        firstElement.lastChild.previousSibling.style.display = "none";
        secondElement.firstChild.nextSibling.style.display = "block";
        secondElement.lastChild.previousSibling.style.display = "none";
        firstValue = "";
        secondValue = "";
        firstElement = "";
        secondElement = "";
      }, 1500);
    }
  }

  // checking that the all cards are solved or not
  if (totalSolved === 12) {
    setTimeout(() => {
      solvedIndexes = [];
      // flipping images again and resetting all the values to start new game
      cards.forEach((element) => {
        element.firstChild.nextSibling.style.display = "block";
        element.lastChild.previousSibling.style.display = "none";
      });
      totalSolved = 0;
      firstValue = "";
      secondValue = "";
      firstElement = "";
      secondElement = "";
      suffleCard();
    }, 1500);
  }
}