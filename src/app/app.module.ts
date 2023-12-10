import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routes';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListPhasesComponent } from './components/list-phases/list-phases.component';
import { SDLCComponent } from './pages/sdlc/sdlc.component';
import { CreateCriteriaComponent } from './components/create-criteria/create-criteria.component';
import { CreateInitPhaseComponent } from './components/create-init-phase/create-init-phase.component';
import { EditInitPhaseComponent } from './components/edit-init-phase/edit-init-phase.component';
import { CreateAnalysisPhaseComponent } from './components/create-analysis-phase/create-analysis-phase.component';
import { EditAnalysisPhaseComponent } from './components/edit-analysis-phase/edit-analysis-phase.component';
import { AllFilesComponent } from './pages/all-files/all-files.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { ShowDiagramComponent } from './components/show-diagram/show-diagram.component';
import { CreateDesignPhaseComponent } from './components/create-design-phase/create-design-phase.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateInitPhaseComponent,
    EditInitPhaseComponent,
    SDLCComponent,
    AllFilesComponent,
    ListPhasesComponent,
    CreateCriteriaComponent,
    ShowDiagramComponent,
    ListFilesComponent,
    HomeComponent,
    EditAnalysisPhaseComponent,
    CreateAnalysisPhaseComponent,
    CreateDesignPhaseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
