async function iniciarBusca() {
    const termo = document.getElementById("search-input").value.toLowerCase().trim();
    const section = document.querySelector("#main-content section");

    if (!termo) {
        section.innerHTML = "<p>Digite um termo para pesquisar.</p>";
        return;
    }

    const response = await fetch("data.json");
    const dados = await response.json();

    const resultados = dados.filter(item =>
        item.titulo.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo)
    );

    if (resultados.length === 0) {
        section.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    let html = "<ul>";
    resultados.forEach(item => {
        html += `
        <li>
            <h2>${item.titulo}</h2>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Acessar</a>
        </li>`;
    });
    html += "</ul>";

    section.innerHTML = html;
}
