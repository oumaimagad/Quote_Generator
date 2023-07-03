
const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector(".new"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
favBtn=document.querySelectorAll(".favorite"),
listBtn=document.querySelectorAll(".list"),
synth = speechSynthesis;

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});



quoteBtn.addEventListener("click", randomQuote);

const favoriteQuotes = []; // Step 1: Create an array to store favorite quotes
    
// Step 2: Add event listener to "Favorite" button
favBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const quote = quoteText.innerText;
    if (!favoriteQuotes.includes(quote)) {
      favoriteQuotes.push(quote);
      updateFavoriteList(); // Update the displayed favorite list
    }
  });
});

// Step 3: Implement function to display the favorite list
function updateFavoriteList() {
  const favoriteListElement = document.querySelector(".favorite-quotes-list");
  favoriteListElement.innerHTML = ""; // Clear the list before updating

  favoriteQuotes.forEach((quote, index) => {
    const li = document.createElement("li");
    li.innerText = `${index + 1}. ${quote}`;
    favoriteListElement.appendChild(li);
  });
}

// Step 4: Add event listener to "List" button
listBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateFavoriteList();
    document.querySelector(".favorite-list").classList.toggle("active");
  });
});

