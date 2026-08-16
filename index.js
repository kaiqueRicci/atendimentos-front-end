const form = document.querySelector('form');
const response = document.querySelector('#response');

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pergunta = form.question.value;

    try {
        const resposta = await fetch("http://localhost:8080/atendimentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ pergunta: pergunta })
        });

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`);
        }

        // Lê o objeto JSON retornado pela controller
        const data = await resposta.json();
        
        // Exibe o campo 'resposta' retornado pela OpenAI
        response.innerText = data.resposta;
    } catch (err) {
        console.error("Erro no processamento:", err);
        response.innerText = "Falha ao obter resposta do servidor.";
    }
});