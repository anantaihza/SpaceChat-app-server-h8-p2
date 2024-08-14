const { OpenAI } = require(`openai`);

const chatOpenAI = async (inputPrompt) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini-2024-07-18",
        messages: [
            { role: "system", content: "Anda adalah asisten yang sangat membantu." },
            {
                role: "user",
                content: `${inputPrompt}`,
            },
        ],
    });
    
    console.log(completion.choices[0].message.content);

    return completion.choices[0].message.content;
}

module.exports = chatOpenAI;