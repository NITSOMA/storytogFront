import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedChapter } from './requested-chapter';

describe('RequestedChapter', () => {
  let component: RequestedChapter;
  let fixture: ComponentFixture<RequestedChapter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestedChapter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedChapter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
