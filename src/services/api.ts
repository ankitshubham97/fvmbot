import axios from "axios";
import EnvService from "./env";

export const sendMessageToUser = async ({userId, text}: {userId:number, text: string}): Promise<void> => {
  const data = JSON.stringify({
    "chat_id": userId,
    text
  });
  const config = {
    method: 'post',
    url: `https://api.telegram.org/${EnvService.env().TG_BOT_TOKEN}/sendMessage`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  await axios(config);
}