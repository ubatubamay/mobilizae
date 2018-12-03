import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SchoolRegisterComponent } from './components/school-register/school-register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BuscaComponent } from './components/busca/busca.component';

import { AcoesService } from './services/acoes.service';
import { LoginService } from './services/login.service';
import { NovaEscolaComponent } from './components/nova-escola/nova-escola.component';
import { CadastrarSeComponent } from './components/cadastrar-se/cadastrar-se.component';
import { LoginComponent } from './components/login/login.component';
import { HomeSchoolComponent } from './components/home-school/home-school.component';
import { SchoolCampaingsTableComponent } from './components/school-campaings-table/school-campaings-table.component';
import { CampanhaComponent } from './components/campanha/campanha.component';
import { ConfirmaAjudaVagaComponent } from './components/campanha/confirma-ajuda-vaga/confirma-ajuda-vaga.component';
import { ConfirmaAjudaMaterialComponent } from './components/campanha/confirma-ajuda-material/confirma-ajuda-material.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SchoolRegisterComponent,
    HomePageComponent,
    BuscaComponent,
    NovaEscolaComponent,
    FileSelectDirective,
    CadastrarSeComponent,
    LoginComponent,
    HomeSchoolComponent,
    SchoolCampaingsTableComponent,
    CampanhaComponent,
    ConfirmaAjudaVagaComponent,
    ConfirmaAjudaMaterialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomePageComponent},
      {path: 'busca', component: BuscaComponent},
      {path: 'sou-uma-escola', component: NovaEscolaComponent},
      {path: 'como-funciona', component: HomeSchoolComponent},
      {path: 'campanha/:id', component: CampanhaComponent},
      {path: 'tabela-campanhas-escola', component: SchoolCampaingsTableComponent, outlet: 'sidebar'}
    ])
  ],
  entryComponents: [
    CadastrarSeComponent,
    LoginComponent,
    ConfirmaAjudaVagaComponent,
    ConfirmaAjudaMaterialComponent
  ],
  providers: [AcoesService, CurrencyPipe, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
