import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosPage } from './pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPage
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./encuesta/encuesta.module').then( m => m.EncuestaPageModule)
  },
  {
    path: 'lista-producto',
    loadChildren: () => import('./lista-producto/lista-producto.module').then( m => m.ListaProductoPageModule)
  },
  {
    path: 'pedido-detalle',
    loadChildren: () => import('./pedido-detalle/pedido-detalle.module').then( m => m.PedidoDetallePageModule)
  },
  {
    path: 'producto-detalle',
    loadChildren: () => import('./producto-detalle/producto-detalle.module').then( m => m.ProductoDetallePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosPageRoutingModule {}
