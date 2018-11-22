import { Deserializable } from '../shared/interfaces/deserializable.interface';

export class SlotAvail implements Deserializable {
    
    start_time: Date;
    open: Boolean;
    

    constructor(slotToSelect: any = {}) {
        this.start_time = slotToSelect.start_time;
        this.open = slotToSelect.open;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}