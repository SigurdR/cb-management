import { Deserializable } from '../shared/interfaces/deserializable.interface';

export class Event implements Deserializable{
    id: string;
    start_date: Date;
    end_date: Date;
    text: string;

    constructor(event: any = {}) {
        this.start_date = event.start_time;
        this.end_date = event.end_time;
        this.text = event.text;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}