import axios from 'axios';
import { makeAutoObservable } from 'mobx';


class MarkUpStore {
    poligon_points = [];
    edit = false;

    constructor() {
        makeAutoObservable(this); // Преобразуем объект в Observable
    }

    addPoligonPoint(x, y){
        this.poligon_points.push({
            x: x,
            y: y
        });
    }

    setEdit(edit){
        this.edit = edit;
    }
    
}

export default new MarkUpStore(); // Экспортируем экземпляр класса