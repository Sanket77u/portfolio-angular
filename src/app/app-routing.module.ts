import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home — Sanket Uphade' },
  { path: 'about', component: AboutComponent, title: 'About — Sanket Uphade' },
  { path: 'experience', component: ExperienceComponent, title: 'Experience — Sanket Uphade' },
  { path: 'skills', component: SkillsComponent, title: 'Skills — Sanket Uphade' },
  { path: 'projects', component: ProjectsComponent, title: 'Projects — Sanket Uphade' },
  { path: 'achievements', component: AchievementsComponent, title: 'Achievements — Sanket Uphade' },
  { path: 'contact', component: ContactComponent, title: 'Contact — Sanket Uphade' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    anchorScrolling: 'enabled', 
    scrollPositionRestoration: 'enabled' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }