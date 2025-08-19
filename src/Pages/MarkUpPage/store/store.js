import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import settings from '../../../settings.json'

class MarkUpStore {
    project_id = 1;

    stateShiftPressed = false;

    rect_list = [];
    poligon_points = [];
    classes_list = []; // список класов типа [{id, class_name, class_color}]


    mask_type = 0; // 0 - прямоугольник, 1 - полигон 
    canvasWidth = 0;
    canvasHeight = 0;

    class_id = 0;
    class_color = "";
    class_name = "";


    constructor() {
        makeAutoObservable(this); // Преобразуем объект в Observable
    }

    loadClassesFromServer() {
        if (this.project_id === 0) return
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(settings.server.addr + "/get_list_of_classes_in_project/" + this.project_id)
            .then(res => {
                this.classes_list = res.data;
                this.selectClassById(0);
            })
            .catch(err => {
                console.log(err);
            })
    }

    selectClassById(id) {
        this.class_id = this.classes_list.at(id).class_id;
        this.class_name = this.classes_list.at(id).class_name;
        this.class_color = this.classes_list.at(id).class_color;
    }

    // Нужно вызывать перед тем, как добавлять новую фигуру
    // initNewPoligon(mask_type, canvasWidth, canvasHeight, class_id, class_color, class_name) {
    //     this.mask_type = mask_type;
    //     this.canvasWidth = canvasWidth;
    //     this.canvasHeight = canvasHeight;
    //     this.class_id = class_id;
    //     this.class_color = class_color;
    //     this.class_name = class_name;
    // }



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

    clearPoligonPoints() {
        this.poligon_points = [];
    }

    setStateShiftPressed(state) {
        this.stateShiftPressed = state;
    }
}

export default new MarkUpStore(); // Экспортируем экземпляр класса