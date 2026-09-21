const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".content-section");
const shortcuts = document.querySelectorAll("[data-open]");

const projectModal = document.getElementById("projectModal");
const letterClose = document.getElementById("letterClose");

const characterBar = document.getElementById("characterBar");

const letterTitle = document.getElementById("letterTitle");
const letterDescription = document.getElementById("letterDescription");
const letterRole = document.getElementById("letterRole");
const letterTech = document.getElementById("letterTech");
const letterFeatures = document.getElementById("letterFeatures");

const letterLink = document.getElementById("letterLink");
const letterProjectLink = document.getElementById("letterProjectLink");

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

function openSection(sectionId) {

  sections.forEach(section => {
    section.classList.remove("active");
  });

  tabs.forEach(tab => {
    tab.classList.remove("active");
  });

  const section = document.getElementById(sectionId);

  const tab = document.querySelector(
    `.tab[data-section="${sectionId}"]`
  );

  if (section) {
    section.classList.add("active");
  }

  if (tab) {
    tab.classList.add("active");
  }

  if (
    sectionId === "home" ||
    sectionId === "about" ||
    sectionId === "skills"
  ) {
    characterBar.style.display = "none";
  } else {
    characterBar.style.display = "grid";
  }
}

openSection("home");

// top tabs
tabs.forEach(tab => {

  tab.addEventListener("click", () => {
    openSection(tab.dataset.section);
  });

});


// clickable inventory shortcuts
shortcuts.forEach(item => {

  item.addEventListener("click", () => {
    openSection(item.dataset.open);
  });

});


// 10-block skill bars
document.querySelectorAll(".level-bar").forEach(bar => {

  const level = Number(bar.dataset.level);

  for (let i = 1; i <= 10; i++) {

    const segment = document.createElement("span");

    segment.className = "level-segment";

    if (i <= level) {
      segment.classList.add("filled");
    }

    bar.appendChild(segment);
  }

});

const projectData = {

  route66: {
    title: "Route 66",
    description:
      "A gas price monitoring system that helps users check fuel prices and identify price increases and rollbacks at different gas stations.",

    role:
      "UI Designer and Mobile Developer",

    tech:
      "Java, XML, JavaScript, MongoDB, Google Maps API",

    features: [
      "View and compare gas station prices",
      "Track price increases and rollbacks",
      "Map-based gas station locations",
      "Mobile interface for users"
    ],

    link: "https://route66.dcism.org"
  },


  marketplace: {
    title: "Carolinian Marketplace",

    description:
      "A web-based marketplace designed for students to buy and sell items within the university community.",

    role:
      "UI Designer and Front-End Developer",

    tech:
      "PHP, HTML, CSS, JavaScript, MariaDB",

    features: [
      "Post items for sale",
      "Browse student listings",
      "User account system",
      "Organized product categories"
    ],

    link: "https://carolinianmarket.dcism.org"
  },


  kikays: {
    title: "Kikay's Kusina",

    description:
      "A web-based food ordering system that allows customers to browse menu items and place orders online.",

    role:
      "UI Designer and SQL Contributor",

    tech:
      "PHP, HTML, CSS, JavaScript, MariaDB",

    features: [
      "Food menu browsing",
      "Online ordering",
      "Order management",
      "Database-driven menu items"
    ],

    link: "https://kikaykusina.dcism.org"
  },

  junimo: {
    title: "Junimo Journal",

    description:
      "A Stardew Valley helper website designed to help players track items, organize tasks, and manage their in-game progress through a simple and clean interface.",

    role:
      "UI Designer and Front-End Developer",

    tech:
      "HTML, CSS, JavaScript",

    features: [
      "Villager information and gift tracker",
      "Crop profit calculator",
      "Community Center bundle checklist",
      "Museum donation checklist"
    ],

    link: "https://gabbaee.github.io/Junimo_Journal/"
  }

};


document.querySelectorAll(".project-card").forEach(card => {

  card.addEventListener("click", () => {

    const projectId = card.dataset.project;

    const project = projectData[projectId];

    if (!project) {
      return;
    }


    letterTitle.textContent = project.title;
    letterDescription.textContent = project.description;
    letterRole.textContent = project.role;
    letterTech.textContent = project.tech;

    if (project.link) {
      letterLink.href = project.link;
      letterProjectLink.style.display = "flex";
    } else {
      letterProjectLink.style.display = "none";
    }

    letterFeatures.innerHTML = "";

    project.features.forEach(feature => {
      const item = document.createElement("li");
      item.textContent = feature;
      letterFeatures.appendChild(item);
    });

    projectModal.classList.add("show");

  });

});


letterClose.addEventListener("click", () => {
  projectModal.classList.remove("show");
});


projectModal.addEventListener("click", event => {

  if (event.target === projectModal) {
    projectModal.classList.remove("show");
  }

});


document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    projectModal.classList.remove("show");
  }

});

const songs = [
  "audio/Calico Desert.mp3",
  "audio/Load Game.mp3",
  "audio/Overture.mp3",
  "audio/Pelican Town.mp3",
  "audio/Settling In.mp3",
  "audio/Spring.mp3",
  "audio/Summer.mp3"
];

backgroundMusic.volume = 0.05;

let currentSong = -1;
let autoplayBlocked = false;


function chooseRandomSong() {

  let newSong;

  do {
    newSong = Math.floor(Math.random() * songs.length);
  } while (
    newSong === currentSong &&
    songs.length > 1
  );

  currentSong = newSong;
  backgroundMusic.src = songs[currentSong];
}


chooseRandomSong();


function tryAutoplay() {

  backgroundMusic.play()
    .then(() => {

      musicButton.classList.remove("muted");

    })
    .catch(() => {

      autoplayBlocked = true;
      musicButton.classList.add("muted");

    });

}


tryAutoplay();

document.addEventListener("click", (event) => {

  if (
    autoplayBlocked &&
    !event.target.closest("#musicButton")
  ) {

    backgroundMusic.play();

    autoplayBlocked = false;

    musicButton.classList.remove("muted");

  }

});

backgroundMusic.addEventListener("ended", () => {

  chooseRandomSong();
  backgroundMusic.play();

});

musicButton.addEventListener("click", (event) => {

  event.stopPropagation();

  if (backgroundMusic.paused) {

    backgroundMusic.play();

    autoplayBlocked = false;

    musicButton.classList.remove("muted");

  } else {

    backgroundMusic.pause();

    musicButton.classList.add("muted");

  }

});
