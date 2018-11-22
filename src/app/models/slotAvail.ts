import { Deserializable } from '../shared/interfaces/deserializable.interface';

export class SlotAvail{
    
    start_time: Date;
    // open: Boolean;
    

    constructor(slotAvail: any = {}) {
        this.start_time = slotAvail.start_time;
        // this.open = slotToSelect.open;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}