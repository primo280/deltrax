// msg, chatd
const TELEGRAM_API_URL = `https://api.telegram.org/bot7699819387:AAGPwD3nrs_EZ1vtKlQI2bDtP9tmEwSEvqk`

export async function sendMessage(chatid, text) {
    const url = `${TELEGRAM_API_URL}/sendMessage`;
    try {
        const respose = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatid,
                text: text
            })
        })
        if (!respose.ok){
            console.log("Failed to send message to telegram user", await respose.text());
        }
    } catch (err) {
        console.log("Error occured while sending message to telegram user", err);
    }
}