import axios from 'axios';
import { makeAutoObservable } from 'mobx';


class MainStore {
    visibleNavigationPanel = true;

    constructor() {
        makeAutoObservable(this); // Преобразуем объект в Observable
    }

    setVisibleNavigationPanel(flag){
        this.visibleNavigationPanel = flag;
    }
}

export default new MainStore(); // Экспортируем экземпляр класса