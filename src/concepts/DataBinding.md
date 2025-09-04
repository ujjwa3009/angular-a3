### Data Binding

Data binding is the mechanism that keeps a component’s data (the model) and the browser’s DOM (the view) in sync, so that when one side changes the other updates automatically without manual document.querySelector() calls.
In Angular the compiler rewrites every binding you place in the template—double-curly braces, square brackets, round brackets, or banana-in-a-box—into low-level Ivy instructions that read or write specific slots in the component’s LView array during each change-detection pass. That means the cost of a binding is just an array lookup and a strict-equality check, no matter how many you have.


    1. One-way, component → view
        – Interpolation uses {{ expr }} to insert text or attribute values. When expr changes, Ivy looks up the target node in the LView and patches only that text node—no full DOM re-render.

        – Property (and attribute/class/style) binding uses [prop]="expr"; the right side is evaluated as JavaScript, and Angular assigns the result to the DOM property each time expr’s reference changes.



    2. View -> component .Parentheses wire browser events to class methods: (click)="increment()". Angular wraps the listener in Zone.js so that after the method runs it triggers exactly one change-detection tick, even if many events fired in the same frame 

    3. Two-way, view ⇄ component Combines an @Input() and matching @Output() under the hood. The shorthand [(ngModel)]="title" (banana-in-a-box) is just [ngModel]="title" (ngModelChange)="title=$event", giving you instantaneous model updates as the user types



### NgModel

    When you write [(ngModel)]="userName" on an input, Angular:
        – reads the current value of userName and puts it into the input (property binding)
        – listens to the element’s input/change events and writes the new value back into userName (event binding)

    That single line gives you live “echo” UI, instant model updates, and built-in validation states such as valid, dirty, touched, errors without any manual DOM code.

    During compilation the selector [ngModel] attaches an NgModel directive to the element.

    The directive constructs a FormControl object, wires it to the element’s ControlValueAccessor (e.g. the built-in DefaultValueAccessor for text inputs), and registers itself with any surrounding ngForm so the whole form can track validity.

    On every DOM event the accessor calls control.setValue(), which marks the control dirty and schedules one change-detection tick; Angular then runs the update block that re-sets the element’s value and fires (ngModelChange) if you are using the longhand [ngModel] (ngModelChange) combo.

    Because the directive exposes control, you can bind to #c="ngModel" and read c.valid, c.errors, etc., directly in the template.

    [ngModel]="expr" → model → view only.

    [ngModel]="expr" (ngModelChange)="expr = $event" → longhand, two-way.

    [(ngModel)]="expr" → banana-in-a-box sugar for the longhand.




