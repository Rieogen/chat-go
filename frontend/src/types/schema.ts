export type channel = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;

  name: string;
};

export type message = {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;

  channelId: number;
  user_name: string;
  content: string;
};
