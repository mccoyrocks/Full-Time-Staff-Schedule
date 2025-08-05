const shiftData = {
  "2025-08-06": { shift: "A", names: ["John Smith", "Karen Blake", "Luke Dean"] },
  "2025-08-07": { shift: "B", names: ["Ella Watts", "Henry Cross", "Dana Cole"] },
  "2025-08-08": { shift: "C", names: ["Ryan Bell", "Jesse Park", "Molly Finn"] }
};

function buildCalendar(id, shiftLabel, startDate, colors) {
  const container = document.getElementById(id);
  const table = document.createElement("table");
  const header = document.createElement("tr");

  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
    const th = document.createElement("th");
    th.textContent = day;
    header.appendChild(th);
  });
  table.appendChild(header);

  let date = new Date(startDate);
  date.setDate(1);
  const firstDay = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  let currentRow = document.createElement("tr");
  for (let i = 0; i < firstDay; i++) {
    currentRow.appendChild(document.createElement("td"));
  }

  let day = 1;
  const shifts = ["A", "B", "C"];
  while (date.getMonth() === month) {
    const td = document.createElement("td");
    const dateStr = date.toISOString().split("T")[0];
    const shiftType = shifts[(day - 1) % 3];
    td.textContent = day;

    if (shiftType === "A") td.classList.add("green");
    else if (shiftType === "B") td.classList.add("blue");
    else td.classList.add("red");

    td.addEventListener("click", () => {
      const details = document.getElementById("shiftDetails");
      const info = shiftData[dateStr];
      details.innerHTML = info
        ? `<strong>${shiftType} Shift:</strong><ul>${info.names.map(n => `<li>${n}</li>`).join("")}</ul>`
        : `<strong>${shiftType} Shift:</strong><p>No data available</p>`;
    });

    currentRow.appendChild(td);

    if ((firstDay + day) % 7 === 0) {
      table.appendChild(currentRow);
      currentRow = document.createElement("tr");
    }

    date.setDate(++day);
  }

  if (currentRow.children.length) {
    table.appendChild(currentRow);
  }

  container.appendChild(table);
}

buildCalendar("calendarA", "Calendar A", "2025-08-01", ["green", "blue", "red"]);
buildCalendar("calendarB", "Calendar B", "2025-08-01", ["green", "blue", "red"]);