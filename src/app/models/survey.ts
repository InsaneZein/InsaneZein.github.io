import { User } from './user';

export class Data {
    question: string;
    answer: any;
}

export class Survey {
    id: number;
    token: string;
    data: Data[];
}