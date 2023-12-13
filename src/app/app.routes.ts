import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HistoryPageComponent } from './history-page/history-page.component'; // Import the HistoryComponent
import { LayoutComponent } from './layout/layout.component';
import AuthService from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
        { path: '', component: LoginComponent},
        { path: 'history', component: HistoryPageComponent },
        { path: 'layout', component: LayoutComponent},
        
        // Add other routes as needed
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
        
}