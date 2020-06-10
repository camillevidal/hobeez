// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
//   },
//   {
//     path: 'tabs',
//     loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
//   },
//   {
//     path: 'details',
//     loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
//   },
//   {
//     path: 'home',
//     loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
//   }
 
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}