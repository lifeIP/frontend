import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import settings from '../../../settings.json'

class MarkUpStore {
    project_id: number = 1;
    taskId: number = 1;

    stateShiftPressed: boolean = false;
    currentScale: number = 1.0;

    // Списковые параметры.
    rect_list: {
        mask_type: number;
        canvasWidth: number,
        canvasHeight: number,
        class_id: number,
        class_color: string,
        class_name: string,
        points: {
            id: number;
            x: number;
            y: number;
        }[]
    }[] = [];
    poligon_points: {
        id: number;
        x: number;
        y: number;
    }[] = [];

    classes_list: {
        class_id: number;
        class_name: string;
        class_color: string;
    }[] = []; // список класов типа [{id, class_name, class_color}]

    list_of_ids_images: number[] = [];


    mask_type: number = 0; // 0 - прямоугольник, 1 - полигон 

    canvasWidth: number = 0;
    canvasHeight: number = 0;


    // Параметры для работы с классами. 
    // Заполяются методом selectClassById 
    // после получения списка с сервера 
    // методом loadClassesFromServer
    class_id: number = 0;
    class_color: string = "";
    class_name: string = "";


    // Параметры для работы с фотографиями
    image_id: number = 33;
    image: string = "https://orthomoda.ru/bitrix/templates/.default/img/no-photo.jpg";
    image_is_loaded: boolean = false;
    image_last_index: number = 0;
    list_loading: boolean = false;
    marked: number = 2;

    constructor() {
        makeAutoObservable(this); // Преобразуем объект в Observable
    }

    setImageId(id: number) {
        this.image_id = id;
        this.loadImageFromServer();
    }

    setCurrentScale(scale: number) {
        this.currentScale = scale;
    }

    loadListOfImages(startIndex: number = 0, marked: number = this.marked) {
        // console.log("loadListOfImages: ", this.image_last_index, startIndex);

        if (this.list_loading) return;
        this.list_loading = true;
        let url = "/get_task_images_list/" + this.taskId + "/" + (this.image_last_index + startIndex);
        if (marked == 0) {
            url = "/get_task_images_not_marked_up_list/" + this.taskId + "/" + (this.image_last_index + startIndex);
        }
        else if (marked == 1) {
            url = "/get_task_images_marked_up_list/" + this.taskId + "/" + (this.image_last_index + startIndex);
        }

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}${url}`).then((res) => {

            if (res.status === 200 || res.status === 201) {
                if (res.data.ids.length != 0) {
                    this.list_of_ids_images = res.data.ids;
                    this.image_last_index += startIndex;
                    this.list_loading = false;
                }
            } else {
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    loadImageFromServer() {
        // Этото метод должен выполняться каждый раз,
        // когда нам нужна новая фотография.
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}/get-image-by-id/${this.image_id}?t=${Date.now()}`, {
            responseType: "arraybuffer"
        })
            .then(res => {
                const base64 = btoa(
                    new Uint8Array(res.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                )
                this.image = `data:image/jpeg;charset=utf-8;base64,${base64}`;
                this.image_is_loaded = true;

            })
            .catch(err => {
            })
    }

    loadClassesFromServer() {
        // Этот метод должен выполняться только 1 
        // раз при заходе на страницу для разметки фотографий.
        if (this.project_id === 0) return
        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(settings.server.addr + "/get_list_of_classes_in_project/" + this.project_id)
            .then(res => {
                this.classes_list = res.data;
                this.selectClassById(0);
            })
            .catch(err => {
            })
    }

    selectClassById(id: number) {
        // Эта функция должна выполняться при 
        // каждом выборе класса. Инкапсулируй мразь.
        const class_id = this?.classes_list?.at(id)?.class_id;
        const class_name = this?.classes_list?.at(id)?.class_name;
        const class_color = this?.classes_list?.at(id)?.class_color;

        if (class_id === undefined || class_name === undefined || class_color === undefined) return;

        this.class_id = class_id;
        this.class_name = class_name;
        this.class_color = class_color;
    }


    addPoligonPoint(x: number, y: number) {
        // Добавляет в новый полигон ещё одну точку. 
        // Эту функцию надо применять только для
        // работы в режиме полигона.


        if (
            this.poligon_points.length > 0
            && Math.abs(this.poligon_points[this.poligon_points.length - 1].x - x) < 10 / this.currentScale
            && Math.abs(this.poligon_points[this.poligon_points.length - 1].y - y) < 10 / this.currentScale) {
            return;
        }

        const inside_x = this.poligon_points[0]?.x;
        const inside_y = this.poligon_points[0]?.y;
        if (inside_x === undefined || inside_y === undefined) return;

        if (
            this.poligon_points.length > 2
            && Math.abs(inside_x - x) < 3 / this.currentScale
            && Math.abs(inside_y - y) < 3 / this.currentScale) {

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
        // Очищает список всех точек полигона
        this.poligon_points = [];
    }
    clearRectList() {
        // Очищает список всех точек полигона
        this.rect_list = [];
    }


    setStateShiftPressed(state: boolean) {
        // Устанавливает флаг зажатого шифта. 
        // Это нужно для правильной работы 
        // компонента zoom-pan-pinch.
        this.stateShiftPressed = state;
    }
}

export default new MarkUpStore(); // Экспортируем экземпляр класса