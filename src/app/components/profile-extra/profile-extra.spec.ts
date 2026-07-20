import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExtra } from './profile-extra';

describe('ProfileExtra', () => {
  let component: ProfileExtra;
  let fixture: ComponentFixture<ProfileExtra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileExtra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileExtra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
