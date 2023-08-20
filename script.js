const navbarToggle = document.getElementById("navbarToggle");
const navbarMenu = document.getElementById("navbarMenu");

navbarToggle.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
  const navbarLinks = document.querySelectorAll(".navbar-menu a");

  navbarLinks.forEach((link) => {
    link.addEventListener("click", scrollToSection);
  });

  function scrollToSection(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const offset = targetSection.offsetTop - 50; // Adjust the offset as needed

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const projectContainer = document.getElementById("myproject");

  // Fetch the JSON data
  fetch("/json/project-data.json")
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the JSON data and create project containers
      data.forEach((item) => {
        const project = document.createElement("div");
        project.className = "project";
        project.innerHTML = `
            <h3>${item.title}</h3>
            <img src="${item.imgPath}" alt="${item.title}" class="project-image">
            <a href="#" class="btn-dark">View Project</a>
          `;
        projectContainer.appendChild(project);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const skillsContainer = document.querySelector(".skills-container");

  fetch("/json/skills-data.json")
    .then((response) => response.json())
    .then((skillsData) => {
      const skillsList = document.createElement("ul");
      skillsList.className = "skills-list";

      skillsData.forEach((skill) => {
        const skillItem = document.createElement("li");
        const skillName = document.createElement("span");
        skillName.className = "skill-name";
        skillName.textContent = skill.name;

        const skillProgress = document.createElement("div");
        skillProgress.className = "skill-progress";

        const progressBar = document.createElement("div");
        progressBar.className = "skill-progress-bar";
        progressBar.style.width = skill.progress + "%";

        skillProgress.appendChild(progressBar);
        skillItem.appendChild(skillName);
        skillItem.appendChild(skillProgress);
        skillsList.appendChild(skillItem);
      });

      const skillsHeader = document.createElement("h2");
      skillsHeader.textContent = "Skills";
      skillsContainer.appendChild(skillsHeader);
      skillsContainer.appendChild(skillsList);
    })
    .catch((error) => {
      console.error("Error fetching skills data:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from data.json
  fetch("/json/resume-data.json")
    .then((response) => response.json())
    .then((data) => {
      const timelineContainer = document.querySelector(".timeline-container");

      Object.keys(data).forEach((key) => {
        const titleContent = document.createElement('h1');
        titleContent.textContent = key;
        titleContent.classList.add('title-content')

        const groupItem = document.createElement("div");
        groupItem.classList.add("group-item");
        groupItem.appendChild(titleContent)

        data[key].reverse().forEach((item) => {
          const timelineItem = document.createElement("div");
          timelineItem.classList.add("timeline-item");
          timelineItem.innerHTML = `
            <div class="timeline-connector"></div>
            <div class="timeline-icon">
                <i class="${item.iconClass}"></i>
                </div>
                <div class="timeline-content">
                <h2 class="timeline-title">${item.year}</h2>
                <h3 class="timeline-subtitle">${item.title}</h3>
                <p class="timeline-description">${item.subtitle}</p>
                </div>
                <div class="timeline-connector"></div>
                `;

          groupItem.appendChild(timelineItem);
        });
        timelineContainer.appendChild(groupItem);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});