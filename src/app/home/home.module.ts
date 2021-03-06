import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SliderComponent } from './slider/slider.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { OfferingComponent } from './offering/offering.component';
import { PopularComponent } from './popular/popular.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule],
  declarations: [HomeComponent, TopbarComponent, SliderComponent, CourseSearchComponent, OfferingComponent, PopularComponent],
})
export class HomeModule {}
