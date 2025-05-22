const hamburger = document.querySelector(".hamburger");
const menubar = document.querySelector(".menubar");

hamburger.addEventListener("click", () => {
  menubar.classList.toggle("active");
  hamburger.classList.toggle("hamburger-active");
});

function renderIncidentCount() {
  const input = document.getElementById("incidentCountInput").value;
  try {
    const obj = eval("(" + input + ")");
    let tableHTML =
      "<table><thead><tr><th>Name</th><th>Incident Count</th></tr></thead><tbody>";
    for (const [name, count] of Object.entries(obj)) {
      tableHTML += `<tr><td>${name}</td><td>${count}</td></tr>`;
    }
    tableHTML += "</tbody></table>";

    const container = document.getElementById("incidentCountTable");
    container.innerHTML = tableHTML;
    copyHTMLToClipboard(tableHTML);
  } catch (e) {
    alert("Invalid JavaScript object. Please check the input.");
  }
}

function renderAgingIncidents() {
  const input = document.getElementById("agingIncidentsInput").value;
  try {
    const arr = eval("(" + input + ")");
    let tableHTML =
      "<table><thead><tr><th>Incident</th><th>Name</th><th>Date</th><th>Aging</th></tr></thead><tbody>";
    arr.forEach((item) => {
      let displayName =
        item.Name === "Bhagyashree R Sonawane"
          ? "Bhagyashree"
          : item.Name;
      tableHTML += `<tr><td>${item.Incident}</td><td>${displayName}</td><td>${item.FormattedDate}</td><td>${item.AgingInDays} Days</td></tr>`;
    });
    tableHTML += "</tbody></table>";

    const container = document.getElementById("agingIncidentsTable");
    container.innerHTML = tableHTML;
    copyHTMLToClipboard(tableHTML);
  } catch (e) {
    alert("Invalid JavaScript array. Please check the input.");
  }
}

function copyHTMLToClipboard(html) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  document.body.appendChild(tempDiv);

  const range = document.createRange();
  range.selectNode(tempDiv);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  try {
    document.execCommand("copy");
    alert(
      "HTML table copied to clipboard!"
    );
  } catch (err) {
    alert("Failed to copy.");
  }

  window.getSelection().removeAllRanges();
  document.body.removeChild(tempDiv);
}

function copyTopCode() {
  const codeToCopy = `
      actual code will be here
  `;

  navigator.clipboard.writeText(codeToCopy).then(() => {
    alert("Code snippet copied to clipboard!");
  }).catch(err => {
    alert("Failed to copy: " + err);
  });
}



function searchCards() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const cards = Array.from(document.querySelectorAll(".link-card"));
  const container = cards[0]?.parentElement; // Assuming all cards share the same parent

  if (!container) return;

  // Reset card content and collect matched/unmatched cards
  const matched = [];
  const unmatched = [];

  cards.forEach(card => {
    // Restore original content
    if (!card.getAttribute("data-original")) {
      card.setAttribute("data-original", card.innerHTML);
    }
    card.innerHTML = card.getAttribute("data-original");

    if (input === "") {
      unmatched.push(card); // No input — treat as unmatched
    } else {
      // Check for match
      const textContent = card.textContent.toLowerCase();
      if (textContent.includes(input)) {
        highlightText(card, input);
        matched.push(card);
      } else {
        unmatched.push(card);
      }
    }
  });

  // Reorder: matched cards first
  container.innerHTML = ""; // Clear container
  matched.concat(unmatched).forEach(card => container.appendChild(card));
}

function highlightText(element, searchTerm) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);

  const nodesToHighlight = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue.toLowerCase().includes(searchTerm)) {
      nodesToHighlight.push(node);
    }
  }

  nodesToHighlight.forEach(node => {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const span = document.createElement("span");
    span.innerHTML = node.nodeValue.replace(regex, "<mark>$1</mark>");
    node.parentNode.replaceChild(span, node);
  });
}

function searchCards2() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const left = document.getElementById("leftColumn");
  const right = document.getElementById("rightColumn");

  const allCards = [...left.children, ...right.children];

  allCards.forEach(card => {
    card.style.display = "none";
  });

  let matchFound = false;

  allCards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(input)) {
      card.style.display = "block";
      matchFound = true;
    }
  });

  if (input === "") {
    allCards.forEach(card => {
      card.style.display = "block";
    });
  }
}
