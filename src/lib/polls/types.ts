export type Poll = {
  id: string;
  createdAt: string;
  question: string;
  options: string[];
  closed: boolean;
  responseCount: number;
};

export type CreatePollInput = {
  question: string;
  options: string[];
};

export type PollResults = {
  poll: Poll;
  counts: number[];
};
