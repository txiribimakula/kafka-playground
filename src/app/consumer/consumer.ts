
export class Consumer {
  topics: string[];
  groupId: string;

  constructor(topics: string[], groupId: string) {
    this.topics = topics;
    this.groupId = groupId;
  }
}
