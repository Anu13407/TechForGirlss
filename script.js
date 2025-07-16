let clickCount = 0;
const maxClicks = 5;

document.addEventListener("DOMContentLoaded", () => {
  const submitted = localStorage.getItem("techForGirlsSubmitted");
  if (submitted === "true") {
    disableForm();
    document.getElementById("finalMessage").classList.remove("hidden");
  }
});

document.getElementById("shareBtn").addEventListener("click", () => {
  if (clickCount < maxClicks) {
    clickCount++;
    document.getElementById("clickCounter").textContent = `Click Count: ${clickCount}/${maxClicks}`;
    window.open("https://wa.me/?text=Hey%20Buddy,%20Join%20Tech%20For%20Girls%20Community", "_blank");
    if (clickCount === maxClicks) {
      alert("Sharing complete. Please continue.");
    }
  }
});

document.getElementById("registrationForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  if (clickCount < maxClicks) {
    alert("Please complete sharing before submitting.");
    return;
  }

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  formData.append("phone", document.getElementById("phone").value);
  formData.append("email", document.getElementById("email").value);
  formData.append("college", document.getElementById("college").value);
  formData.append("screenshot", document.getElementById("screenshot").files[0]);

  // Replace this with your actual Google Apps Script Web App URL
  const scriptURL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";

  try {
    await fetch(scriptURL, { method: "POST", body: formData });
    localStorage.setItem("techForGirlsSubmitted", "true");
    disableForm();
    document.getElementById("finalMessage").classList.remove("hidden");
  } catch (error) {
    alert("Submission failed. Please try again.");
  }
});

function disableForm() {
  document.querySelectorAll("input, button").forEach(el => el.disabled = true);
}
