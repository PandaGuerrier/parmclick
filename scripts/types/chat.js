import {GROQ_API_KEY} from "../config.js";

export class Chat {
    constructor() {
        this.baseUrl = "https://api.groq.com/openai/v1/chat/completions"
        this.game = null
        this.messages = [] // {role: "user" | "assistant", content: string}
    }

    async send(message) {
        if (!GROQ_API_KEY) {
            console.error("GROQ_API_KEY is not set");
            return;
        }

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: "Tu es un assistant pour un cookies clicker game, mais avec du fromage nommé ParmClicker. Fournis des réponses courtes et pertinentes. Le dernier message est le dernier message que l'utilisateur a envoyé. Ne mets aucun format particulier dans tes réponses, pas de MarkDown, que du texte brut, et réponds en 2 ou 3 lignes max."
                    },
                    {
                        role: "system",
                        content: "Voici toutes les informations sur le jeu de l'utilisateur: " + JSON.stringify(this.game.toJson())
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                model: "openai/gpt-oss-120b",
                temperature: 1,
                max_completion_tokens: 8192,
                top_p: 1,
                stream: true,
                reasoning_effort: "medium",
                stop: null
            })
        });

// Pour gérer le streaming
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        this.messages.push({ role: "user", content: message });
        const assistantMessage = { role: "assistant", content: "" };
        this.messages.push(assistantMessage);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n").filter(line => line.trim() !== "");
            assistantMessage.content += lines.map(line => {
                if (line.startsWith("data: ")) {
                    const data = line.replace("data: ", "");
                    if (data === "[DONE]") {
                        return "";
                    }
                    try {
                        const parsed = JSON.parse(data);
                        return parsed.choices[0].delta.content || "";
                    } catch (e) {
                        console.error("Error parsing JSON:", e);
                        return "";
                    }
                }
                return "";
            }).join("");

            this.game.view.render();
        }
    }

    toJson() {
        return this.messages
    }

    fromJson(json) {
        this.messages = json
    }
}