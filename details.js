const container = document.getElementById("doctorDetails");
const backButton = document.getElementById("backButton");
const poweredByDetails = document.getElementById("poweredByDetails");

const lang = localStorage.getItem("lang") || "en";
const t = translations[lang];

// Back button
backButton.textContent = t.back;
backButton.addEventListener("click", () => window.history.back());

poweredByDetails.textContent = t.powered + "example@mail.com";

// Show doctor details
const doc = JSON.parse(localStorage.getItem("selectedDoctor"));
if (doc) {
  container.innerHTML = `
    <p><strong>${t.name}:</strong> ${doc.name}</p>
    <p><strong>${t.specialty}:</strong> ${doc.specialty}</p>
    <p><strong>${t.cityLabel}:</strong> ${doc.city}</p>
    <p><strong>${t.workplace}:</strong> ${doc.workplace}</p>
    <p><strong>${t.schedule}:</strong> ${doc.schedule}</p>
    <p><strong>${t.note}:</strong> ${doc.note}</p>

    <div class="doctor-buttons">
      <a href="tel:${doc.contact}"><i class="fas fa-phone"></i> ${t.call}: ${doc.contact}</a>
      <a href="${doc.location}" target="_blank"><i class="fas fa-map-marker-alt"></i> ${t.map}</a>
      <a href="mailto:${doc.email}"><i class="fas fa-envelope"></i> ${t.email}: ${doc.email}</a>
    </div>
  `;
} else {
  container.innerHTML = `<p>No doctor selected.</p>`;
}

