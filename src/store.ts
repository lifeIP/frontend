import axios from 'axios';
import { makeAutoObservable } from 'mobx';


class MainStore {
    visibleNavigationPanel: boolean = true;

    constructor() {
        makeAutoObservable(this); // Преобразуем объект в Observable
    }

    setVisibleNavigationPanel(flag: boolean){
        this.visibleNavigationPanel = flag;
    }
}

export default new MainStore(); // Экспортируем экземпляр класса