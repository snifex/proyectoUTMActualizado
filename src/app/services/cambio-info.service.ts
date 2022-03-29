import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class CambioInfoService {
    private messageSource = new BehaviorSubject<string>("");
    currentMsg$ = this.messageSource.asObservable();

    constructor() { }

    enviar(){
        this.messageSource.next("");
    }

    // changeMsg(msg: any): void {
    //     this.messageSource.next(msg);
    // }
}
