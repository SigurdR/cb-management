import { Deserializable } from '../shared/interfaces/deserializable.interface';

// export class Event implements Deserializable{
//     id: string;
//     start_date: Date;
//     end_date: Date;
//     text: string;

//     constructor(event: any = {}) {
//         this.start_date = event[1];
//         this.end_date = event[2];
//         this.text = event[3];
//     }

//     deserialize(input: any) {
//         Object.assign(this, input);
//         return this;
//     }
// }

export class Event {
    id: string;
    start_date: Date;
    end_date: Date;
    text: string;

    constructor(event: any = {}) {
        this.id = event[0];
        this.start_date = event[1];
        this.end_date = event[2];
        this.text = event[3];
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

// export class Event {
//     id: string;
//     start_date: Date;
//     end_date: Date;
//     text: string;
// }