import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlideLoisirsPage } from './slide-loisirs.page';

describe('SlideLoisirsPage', () => {
  let component: SlideLoisirsPage;
  let fixture: ComponentFixture<SlideLoisirsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideLoisirsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlideLoisirsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
