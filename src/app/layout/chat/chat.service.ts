import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
// import { Message } from '../model/message';
// import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';
import * as io from 'socket.io-client';
@Injectable()
export class ChatService {
    private socket;

   private url = 'http://ionicteam.com:3004';
   

   constructor() {
        this.socket = io(this.url);
   }

   
    public roomJoin(message) {
        this.socket.emit('room join', message);
    }
   
   public roomLeave(message) {
        this.socket.emit('room leave', message);
    }

    public typeIn(message) {
        this.socket.emit('typeIn', message);
    }

    public typeOut(message) {
        this.socket.emit('typeOut', message);
    }

   

    public readMessage(message) {
        this.socket.emit('message read', message);
    }

   public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
                console.log(message)
            });
        });
  }
}
