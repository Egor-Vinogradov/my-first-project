import {Component, OnInit} from '@angular/core';
import {Activity, AuthService, Profile, Sex, Target} from "../../../service/auth.service";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile: Profile = {}
  public user: any = {}
  public loading: boolean = false;
  public dateOfBirth: string | null = '2021-01-01'

  public profileTarget = [
    Target.LOSS_1KG,
    Target.LOSS_05KG,
    Target.MAINTAINING,
    Target.GAIN_025KG,
    Target.GAIN_05KG
  ]
  private profileTarget1: Target = Target.MAINTAINING

  public profileActivity = [
    Activity.SITTING,
    Activity.SEDENTARY,
    Activity.MOBILE,
    Activity.VERY_ACTIVE
  ]
  private activity1: Activity = Activity.SITTING

  public sex = [
    Sex.MAN,
    Sex.WOMAN
  ]
  private sexProfile: Sex = Sex.MAN

  constructor(private userService: AuthService,
              private datePipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    const login: any = localStorage.getItem('login')
    this.userService.getProfile(login)
      .subscribe({
        next: (profile: any) => {
          this.profile = profile
          this.user = this.profile.user
          localStorage.setItem('profile_id', profile.id)
          this.dateOfBirth = this.datePipe.transform(profile.dateOfBirth, 'yyyy-MM-dd')
          this.loading = false
        },
        error: err => {
          this.router.navigate(['/'])
        }
      })
  }

  public cleanForm(): void {}

  public dateUpdate(event: any) {
    this.profile.dateOfBirth = new Date(event)
  }

  public updateProfile(profile: Profile) {
    this.loading = true
    this.userService.updateProfile(profile)
      .subscribe({
        next: (profile) => {
          this.profile = profile
          this.dateOfBirth = this.datePipe.transform(profile.dateOfBirth, 'yyyy-MM-dd')
          this.loading = false
        },
        error: (err) => {
          console.log(err.message)
        }
      })
  }

  public selectTarget(profileTarget: Target) {
    this.profileTarget1 = profileTarget
  }

  public selectActivity(activity: Activity) {
    this.activity1 = activity
  }

  public selectSex(sex: Sex) {
    this.sexProfile = sex
  }
}
