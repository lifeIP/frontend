import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import settings from '../../../settings.json'

class MarkUpStore {
    project_id = 1;
    taskId = 1;

    stateShiftPressed = false;
    currentScale = 1.0;

    // Списковые параметры.
    rect_list = [];
    poligon_points = [];
    classes_list = []; // список класов типа [{id, class_name, class_color}]
    list_of_ids_images = [];


    mask_type = 0; // 0 - прямоугольник, 1 - полигон 

    canvasWidth = 0;
    canvasHeight = 0;


    // Параметры для работы с классами. 
    // Заполяются методом selectClassById 
    // после получения списка с сервера 
    // методом loadClassesFromServer
    class_id = 0;
    class_color = "";
    class_name = "";


    // Параметры для работы с фотографиями
    navigate_lock = false;
    image_list_index = 0;
    startIndex = 1;
    image_id = 0;
    image = "https://orthomoda.ru/bitrix/templates/.default/img/no-photo.jpg";
    image_is_loaded = false;
    list_loading = false;
    marked = 2;

    constructor() {
        makeAutoObservable(this); // Преобразуем объект в Observable
    }

    rightInImageList() {
        console.log(this.navigate_lock, this.image_list_index, this.list_of_ids_images.length, this.startIndex)
        if (this.navigate_lock) return;

        if (this.image_list_index >= this.list_of_ids_images.length - 1) {
            this.navigate_lock = true;

            localStorage.setItem("working-field-image-id", this.list_of_ids_images[this.image_list_index])
            localStorage.setItem('rect_list', JSON.stringify([]));
            localStorage.setItem('poligon_points_list', JSON.stringify([]));
            
            if (this.startIndex >= 1) {
                this.startIndex += 1;
            }
            this.loadListOfImages();
            this.clearPoligonPoints();
            this.clearRectList();
            return;
        }
        this.clearPoligonPoints();
        this.clearRectList();
        this.image_list_index += 1;
        this.setImageId(this.list_of_ids_images.at(this.image_list_index));
    }

    leftInImageList() {
        if (this.navigate_lock) return;
        if (this.startIndex <= 1 && this.image_list_index == 0) return;

        if (this.image_list_index <= 0) {
            this.navigate_lock = true;

            localStorage.setItem("working-field-image-id", this.list_of_ids_images[this.image_list_index])
            localStorage.setItem('rect_list', JSON.stringify([]));
            localStorage.setItem('poligon_points_list', JSON.stringify([]));

            if (this.startIndex > 1) {
                this.startIndex -= 1;
            }
            this.loadListOfImages();
            this.clearPoligonPoints();
            this.clearRectList();
            return;
        }
        this.clearPoligonPoints();
        this.clearRectList();
        this.image_list_index -= 1;
        this.setImageId(this.list_of_ids_images.at(this.image_list_index));
    }

    setImageId(id) {
        this.image_id = id;
        localStorage.setItem("working-field-image-id", this.list_of_ids_images[this.image_list_index])
        this.loadImageFromServer();
    }

    setCurrentScale(scale) {
        this.currentScale = scale;
    }

    loadListOfImages(marked = this.marked) {
        let url = "/get_task_images_list/" + this.taskId + "/" + this.startIndex;
        if (marked == 0) {
            url = "/get_task_images_not_marked_up_list/" + this.taskId + "/" + this.startIndex;
        }
        else if (marked == 1) {
            url = "/get_task_images_marked_up_list/" + this.taskId + "/" + this.startIndex;
        }

        axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization")
        axios.get(`${settings.server.addr}${url}`).then((res) => {

            if (res.status === 200 || res.status === 201) {
                if (res.data.ids.length != 0) {
                    this.list_of_ids_images = res.data.ids;
                    this.list_loading = false;
                    localStorage.setItem("list_of_ids_images", JSON.stringify({ startIndex: this.startIndex, ids: res.data.ids }));
                    
                    if(this.image_list_index < 1){
                        this.image_list_index = this.list_of_ids_images.length - 1;
                    }
                    else{
                        this.image_list_index = 0;
                    }
                }
            } else {
            }
            this.navigate_lock = false;
        }).catch((err) => {
            console.error(err);
            this.navigate_lock = false;
        });
        this.navigate_lock = false;
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

    selectClassById(id) {
        // Эта функция должна выполняться при 
        // каждом выборе класса. Инкапсулируй мразь.
        this.class_id = this.classes_list.at(id).class_id;
        this.class_name = this.classes_list.at(id).class_name;
        this.class_color = this.classes_list.at(id).class_color;
    }


    addPoligonPoint(x, y) {
        // Добавляет в новый полигон ещё одну точку. 
        // Эту функцию надо применять только для
        // работы в режиме полигона.

        if (
            this.poligon_points.length > 0
            && Math.abs(this.poligon_points[this.poligon_points.length - 1].x - x) < 10 / this.currentScale
            && Math.abs(this.poligon_points[this.poligon_points.length - 1].y - y) < 10 / this.currentScale) {
            return;
        }

        if (
            this.poligon_points.length > 2
            && Math.abs(this.poligon_points[0].x - x) < 3 / this.currentScale
            && Math.abs(this.poligon_points[0].y - y) < 3 / this.currentScale) {

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


    setStateShiftPressed(state) {
        // Устанавливает флаг зажатого шифта. 
        // Это нужно для правильной работы 
        // компонента zoom-pan-pinch.
        this.stateShiftPressed = state;
    }
}

export default new MarkUpStore(); // Экспортируем экземпляр класса