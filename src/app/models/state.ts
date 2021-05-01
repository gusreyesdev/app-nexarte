export class State {

    public id: number;
    public name: string;

    setData(data: any): State {
        if (data) {
            Object.assign(this, data);
        }
        return this;
    }
}
