document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const responsible = document.getElementById("responsible").value;

  if (!description || !responsible) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  localStorage.setItem("description", description);
  localStorage.setItem("responsible", responsible);

  addRowToTable(description, responsible);

  document.getElementById("description").value = "";
  document.getElementById("responsible").value = "";
});

function addRowToTable(description, responsible) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${description}</td>
    <td style="color: red;">Pendente</td>
    <td>${responsible}</td>
    <td>
      <button class="btn btn-concluir">Concluir</button>
      <button class="btn btn-editar-desc">Alterar Descrição</button>
      <button class="btn btn-editar-resp">Alterar Responsável</button>
      <button class="btn btn-cancelar">Cancelar</button>
    </td>
  `;

  row.querySelector(".btn-concluir").addEventListener("click", function () {
    row.querySelector("td:nth-child(2)").textContent = "Concluída";
    row.querySelector("td:nth-child(2)").style.color = "green";
  });

  row.querySelector(".btn-editar-desc").addEventListener("click", function () {
    const newDescription = prompt("Informe a nova descrição:", description);
    if (newDescription) {
      row.querySelector("td:nth-child(1)").textContent = newDescription;
      localStorage.setItem("description", newDescription);
    }
  });

  row.querySelector(".btn-editar-resp").addEventListener("click", function () {
    const newResponsible = prompt("Informe o novo responsável:", responsible);
    if (newResponsible) {
      row.querySelector("td:nth-child(3)").textContent = newResponsible;
      localStorage.setItem("responsible", newResponsible);
    }
  });

  row.querySelector(".btn-cancelar").addEventListener("click", function () {
    row.remove();
    localStorage.removeItem("description");
    localStorage.removeItem("responsible");
  });

  document.querySelector("table").appendChild(row);
}

window.addEventListener("load", function () {
  const savedDescription = localStorage.getItem("description");
  const savedResponsible = localStorage.getItem("responsible");

  if (savedDescription && savedResponsible) {
    addRowToTable(savedDescription, savedResponsible);
  }
});
