export class City {

    public id: number;
    public name: string;
    public state_id: number;

    setData(data: any): City {
        if (data) {
            Object.assign(this, data);
        }
        return this;
    }
}
