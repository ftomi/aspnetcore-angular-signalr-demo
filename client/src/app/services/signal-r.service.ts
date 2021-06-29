import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from '../models/chart.model';
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  public data: ChartModel[] = [];
  public bradcastedData: ChartModel[] = [];
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/chart')
      .build();
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };
  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  };

  public broadcastChartData = () => {
    const data = this.data.map((m) => {
      const temp = {
        data: m.data,
        label: m.label,
      };
      return temp;
    });

    this.hubConnection
      .invoke('broadcastchartdata', data)
      .catch((err) => console.error(err));
  };

  public addBroadcastChartDataListener = () => {
    this.hubConnection.on('broadcastchartdata', (data) => {
      this.bradcastedData = data;
    });
  };
}
