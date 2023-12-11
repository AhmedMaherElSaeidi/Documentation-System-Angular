import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './pages/home/home.component';
import { SDLCComponent } from './pages/sdlc/sdlc.component';
import { CreateInitPhaseComponent } from './components/create-init-phase/create-init-phase.component';
import { EditInitPhaseComponent } from './components/edit-init-phase/edit-init-phase.component';
import { CreateAnalysisPhaseComponent } from './components/create-analysis-phase/create-analysis-phase.component';
import { EditAnalysisPhaseComponent } from './components/edit-analysis-phase/edit-analysis-phase.component';
import { CreateDesignPhaseComponent } from './components/create-design-phase/create-design-phase.component';
import { AllFilesComponent } from './pages/all-files/all-files.component';
import { ShowDiagramComponent } from './components/show-diagram/show-diagram.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // http://localhost:4200
  { path: 'home', component: HomeComponent }, // http://localhost:4200/home
  {
    path: 'sdlc',
    component: SDLCComponent,
    children: [
      { path: 'init-phase', component: CreateInitPhaseComponent }, // http://localhost:4200/sdlc/init-phase
      { path: 'init-phase/:id', component: EditInitPhaseComponent }, // http://localhost:4200/sdlc/init-phase/:id
      { path: 'analysis-phase', component: CreateAnalysisPhaseComponent }, // http://localhost:4200/sdlc/analysis-phase
      { path: 'analysis-phase/:id', component: EditAnalysisPhaseComponent }, // http://localhost:4200/sdlc/analysis-phase/:id
      { path: 'design-phase', component: CreateDesignPhaseComponent }, // http://localhost:4200/sdlc/design-phase
    ],
  }, // http://localhost:4200/sdlc
  {
    path: 'all-files',
    component: AllFilesComponent,
    children: [
      { path: 'show-diagram/:type/:id', component: ShowDiagramComponent }, // http://localhost:4200/all-files/show-diagram/:id
    ],
  }, // http://localhost:4200/all-files
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
