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
      data.reverse().forEach((item) => {
        const project = document.createElement("div");
        project.className = "project";
        if (item.linkProject) {
          project.innerHTML = `
                <h3>${item.title}</h3>
                <img src="${item.imgPath}" alt="${item.title}" class="project-image" />
                <a href="${item.linkProject}" class="btn-dark" style="text-align:center;" target="_blank">View Project</a>`;
        } else {
          project.innerHTML = `
                <h3>${item.title}</h3>
                <img src="${item.imgPath}" alt="${item.title}" class="project-image" />`;
        }
        projectContainer.appendChild(project);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const skillsContainerFirst = document.querySelector(
    ".skills-container-first"
  );
  const skillsContainerSecond = document.querySelector(
    ".skills-container-second"
  );

  // Fetch the JSON file from the server
  fetch("/json/skills-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((skillsData) => {
      const middleIndex = Math.ceil(
        skillsData.frontendDeveloperSkills.length / 2
      );
      const firstHalf = skillsData.frontendDeveloperSkills.slice(
        0,
        middleIndex
      );
      const secondHalf = skillsData.frontendDeveloperSkills.slice(middleIndex);

      populateSkills(skillsContainerFirst, firstHalf);
      populateSkills(skillsContainerSecond, secondHalf);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });

  function populateSkills(container, skills) {
    let content = `<ul class="container-listskills">`; // Use <ul> for ordered list (numbered)

    skills.forEach((skillCategory) => {
      content += `<li><strong>${skillCategory.category.replaceAll(
        "_",
        " "
      )}:</strong>`; // 50% width for each column
      content += "<ul>";

      skillCategory.skills.forEach((skill) => {
        content += `<li><strong>${skill.name.replaceAll("_", " ")}:</strong> ${
          skill.description
        }`;

        if (skill.items) {
          content += "<ul>";
          skill.items.forEach((item) => {
            content += `<li>${item}</li>`;
          });
          content += "</ul>";
        }

        content += "</li>";
      });

      content += "</ul></li>";
    });

    content += "</ul>";
    container.innerHTML += content; // Append the content to the container
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from data.json
  fetch("/json/resume-data.json")
    .then((response) => response.json())
    .then((data) => {
      const timelineContainer = document.querySelector(".timeline-container");

      Object.keys(data).forEach((key) => {
        const titleContent = document.createElement("h1");
        titleContent.textContent = key;
        titleContent.classList.add("title-content");

        const groupItem = document.createElement("div");
        groupItem.classList.add("group-item");
        groupItem.appendChild(titleContent);

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

document.addEventListener("DOMContentLoaded", () => {
  fetch("json/certificate-data.json")
    .then((response) => response.json())
    .then((data) => {
      const certificateContainer = document.querySelector(
        ".certificate-container"
      );

      data.forEach((certificate) => {
        const certificateItem = document.createElement("div");
        certificateItem.classList.add("certificate-item");

        const certificateImg = document.createElement("img");
        certificateImg.src = certificate.imagePaths.certificate;
        certificateImg.alt = certificate.certificateType;
        certificateImg.classList.add("certificate-document");

        const logoImg = document.createElement("img");
        logoImg.src = certificate.imagePaths.logo;
        logoImg.alt = certificate.institution;
        logoImg.classList.add("certificate-logo");

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");

        const certificateTitle = document.createElement("h3");
        certificateTitle.textContent = certificate.certificateType;

        const institutionName = document.createElement("p");
        institutionName.textContent = certificate.institution;

        const completionYear = document.createElement("p");
        completionYear.textContent = `Completed in ${certificate.completionYear}`;

        descriptionDiv.appendChild(certificateTitle);
        descriptionDiv.appendChild(institutionName);
        descriptionDiv.appendChild(completionYear);

        certificateItem.appendChild(certificateImg);
        certificateItem.appendChild(logoImg);
        certificateItem.appendChild(descriptionDiv);

        certificateContainer.appendChild(certificateItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching or populating data:", error);
    });
});
