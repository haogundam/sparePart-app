import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { AuthGuard}  from './guards/auth.guard.service';
import { QuotationComponent } from './quotation/quotation.component';
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'history', component: HistoryPageComponent , canActivate: [AuthGuard] },
  { path: 'quotation', component: QuotationComponent},
  {
    path: 'quotation/:quoteId/:customerId',
    component: QuotationComponent
  },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
