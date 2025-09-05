const doctorsList = document.getElementById("doctorsList");
const searchInput = document.getElementById("searchInput");
const specialityFilter = document.getElementById("specialityFilter");
const cityFilter = document.getElementById("cityFilter");
const langToggle = document.getElementById("langToggle");
const poweredBy = document.getElementById("poweredBy");

let currentLang = localStorage.getItem("lang") || "en";
let doctorsData = [];

// Load data
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    doctorsData = data;
    populateFilters();
    renderDoctors();
    updateLanguage();
  });

// Render doctor list
function renderDoctors() {
  const searchText = searchInput.value.toLowerCase();
  const speciality = specialityFilter.value;
  const city = cityFilter.value;

  doctorsList.innerHTML = "";

  doctorsData
    .filter(doc =>
      doc.name.toLowerCase().includes(searchText) &&
      (speciality === "" || doc.specialty === speciality) &&
      (city === "" || doc.city === city)
    )
    .forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.name;
      li.addEventListener("click", () => {
        localStorage.setItem("selectedDoctor", JSON.stringify(doc));
        window.location.href = "details.html";
      });
      doctorsList.appendChild(li);
    });
}

// Populate dropdowns
function populateFilters() {
  const specialities = [...new Set(doctorsData.map(d => d.specialty))];
  const cities = [...new Set(doctorsData.map(d => d.city))];

  specialities.forEach(spec => {
    const opt = document.createElement("option");
    opt.value = spec;
    opt.textContent = spec;
    specialityFilter.appendChild(opt);
  });

  cities.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    cityFilter.appendChild(opt);
  });
}

// Search/filter listeners
searchInput.addEventListener("input", renderDoctors);
specialityFilter.addEventListener("change", renderDoctors);
cityFilter.addEventListener("change", renderDoctors);

// Language update
function updateLanguage() {
  const t = translations[currentLang];

  document.getElementById("appTitle").textContent = t.title;
  searchInput.placeholder = t.searchPlaceholder;
  specialityFilter.options[0].textContent = t.speciality;
  cityFilter.options[0].textContent = t.city;
  poweredBy.textContent = t.powered + "example@mail.com";

  if (currentLang === "ar") {
    document.body.classList.add("rtl");
    langToggle.textContent = "English";
  } else {
    document.body.classList.remove("rtl");
    langToggle.textContent = "عربي";
  }

  localStorage.setItem("lang", currentLang);
}

// Toggle language
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  updateLanguage();
});

