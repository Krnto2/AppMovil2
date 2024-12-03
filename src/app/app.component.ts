import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  async ngOnInit() {
    // para el storage
    this._storage = await this.storage.create();
    console.log('Ionic Storage inicializado');

  
    await this.setData('exampleKey', 'Hello, Ionic Storage!');
    const value = await this.getData('exampleKey');
    console.log('Valor recuperado:', value);
  }

  // guardar datos en el almacenamiento
  async setData(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  // get datos del almacenamiento
  async getData(key: string): Promise<any> {
    return await this._storage?.get(key);
  }
}
