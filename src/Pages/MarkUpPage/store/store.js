import axios from 'axios';
import { makeAutoObservable } from 'mobx';


class MarkUpStore {
    rect_list = [];
    poligon_points = [];


    mask_type = 0; // 0 - прямоугольник, 1 - полигон 
    canvasWidth = 0;
    canvasHeight = 0;
    class_id = 0;
    class_color = 0;
    class_name = 0;


    constructor() {
        makeAutoObservable(this); // Преобразуем объект в Observable
    }

    // Нужно вызывать перед тем, как добавлять новую фигуру
    initNewPoligon(mask_type, canvasWidth, canvasHeight, class_id, class_color, class_name) {
        this.mask_type = mask_type;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.class_id = class_id;
        this.class_color = class_color;
        this.class_name = class_name;
    }

    // Вызывается для добавления точек
    addPoligonPoint(x, y) {
        if (
            this.poligon_points.length > 2
            && Math.abs(this.poligon_points[0].x - x) < 3
            && Math.abs(this.poligon_points[0].y - y) < 3) {

            this.rect_list.push({
                mask_type: this.mask_type,
                canvasWidth: this.canvasWidth,
                canvasHeight: this.canvasHeight,
                class_id: this.class_id,
                class_color: this.class_color,
                class_name: this.class_name,
                points: this.poligon_points
            })
            this.poligon_points = []
            return;
        }
        this.poligon_points.push({
            id: this.poligon_points.length,
            x: x,
            y: y
        });
    }

    saveNewPoligon() {

    }

}

export default new MarkUpStore(); // Экспортируем экземпляр класса