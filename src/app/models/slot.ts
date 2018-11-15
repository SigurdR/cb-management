import { Deserializable } from '../shared/interfaces/deserializable.interface';

export class Slot implements Deserializable {
    slot: string;
    start_time: Date;
    end_time: Date;

    constructor(slot: any = {}) {
        this.slot = slot.slot;
        this.start_time = slot.start_time;
        this.end_time = slot.end_time;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}