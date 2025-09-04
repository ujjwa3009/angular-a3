## Directives


A directive is an Angular class annotated with @Directive() (or @Component(), which is a directive with its own template). When the compiler sees the directive’s selector on an element it instantiates that class, giving the code a handle to the host node so it can add behavior, manipulate the DOM, or alter rendering logic.

  - Structural  and Attributes

       Structural directives (*ngIf, *ngFor, ngSwitch) change the shape of the DOM. They can create, move, or destroy host elements before the browser ever sees them. The * prefix is just syntactic sugar: *ngIf expands to an <ng-template> plus generated code that inserts or removes the template fragment at runtime.

       Attribute directives (ngClass, ngStyle, ngModel or a custom [highlight]) change the appearance or behaviour of an existing element without adding or removing it. They typically listen to host events via @HostListener or tweak properties through ElementRef and Renderer2


    ``` 

    import { Directive, ElementRef, HostListener } from '@angular/core';

    @Directive({ selector: '[appHighlight]' })
    export class HighlightDirective {
    constructor(private el: ElementRef) {}

    @HostListener('mouseover')
    onHover()   { this.el.nativeElement.style.color = 'green'; }

    @HostListener('mouseleave')
    onLeave()   { this.el.nativeElement.style.color = 'black'; }}




    

      
