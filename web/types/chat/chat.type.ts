
export type ChatClient = {
  username: string;
  avatarUrl: string;
  user_id: string;
};

export type ChatMessage = {
  client: ChatClient;
  message: string;
  message_id: string;
};
