import { animate, animateChild, keyframes, query, group, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('progress-animation', [
      transition(":enter", [
        style({
          width: "0px"
        }),
        animate('9.4s')
      ])
    ]),

    trigger('titles-down', [
      // state('true', style({
      //   transform: 'translateY(-60px)',
      //   // opacity: 0
      // })),
      transition(":enter", [
        style({
          transform: 'translateY(-60px)',
          opacity: 0
        }),
        animate('1.3s 1.5s ease')
      ]),
      transition(":leave", [
        animate('0.2s ease', style({
          opacity: 0,
          transform: "translateY(-60px)"
        }))
      ])
    ]),

    trigger('subs-up-sub', [
      transition(":enter", [
        style({
          transform: 'translateY(20px)',
          opacity: 0
        }),
        animate('0.75s 2.25s ease')
      ]),
      transition(":leave", [
        animate('0.2s 0.35s ease', style({
          opacity: 0
        }))
      ])
    ]),

    trigger('subs-up-a', [
      transition(":enter", [
        style({
          transform: 'translateY(20px)',
          opacity: 0,
        }),
        animate('0.75s 2.65s ease')
      ]),
      transition(":leave", [
        animate('0.2s 0.35s ease', style({
          opacity: 0
        }))
      ])
    ]),

    trigger("slide-change", [
      state('void', style({
        position: 'absolute'
      })),
      transition(':leave', [
        group([
          query("@*", [animateChild()], {optional: true}),
          animate('1s', keyframes([
            style({
              "background-position": "{{backgroundPosition}}",
              offset: 0.9,
              position: 'absolute'
            }),
            style({
              opacity: 0,
              offset: 1,
              position: 'absolute'
            })
          ]))
        ])
      ])
    ]),
    trigger('vid-animation', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate('1ms 4s')
      ]),
    ])
  ]

})
export class SliderComponent implements OnInit {

  @ViewChild('slide') slide : ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  // subsUpReady: Boolean = false;
  slideBools: Array<number>;
  i : number = 0;

  innerWidth: number;

  timeOut: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    console.log('this.innerWidth', this.innerWidth);
  }

  ngOnInit(): void {
    this.slideBools = [this.i];
    this.timer();
  }

  timer() {
    this.timeOut = setTimeout(() => {
      this.nextSlide(false);
    }, 9400);
  }

  heighten() {
    this.renderer.setStyle(this.slide.nativeElement, 'z-index', 240);
  }

  nextSlide(clicked: Boolean) {
    this.heighten();
    clearTimeout(this.timeOut);
    if (clicked == true && this.i == 3) {
      this.i = 0;
    } else {
      this.i++;
    }
    this.slideBools.push(this.i);
    this.slideBools.splice(0,1);
    if (this.i < 3) {
      this.timer();
    }
  }

  prevSlide(clicked: Boolean) {
    this.heighten();
    clearTimeout(this.timeOut);
    if (clicked == true && this.i == 0) {
      this.i = 3;
    } else {
      this.i--;
    }
    this.slideBools.push(this.i);
    this.slideBools.splice(0,1);
    if (this.i !== 3) {
      this.timer();
    }
  }

  //if the slide that is leaving is higher then the animation will work

  //therefore when a slide enters it should have a z-index of 230

  //when a slide leaves it should have a z-index of 240

  //when next slide or prev slide is run, viewchild should be used to heighten

}
