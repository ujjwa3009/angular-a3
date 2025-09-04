
### What is  Component ?

    - a fundamental building block of angular application. It basically contains three things - HTML template , Typescript class with @component decorator , css and tst file.

    - HTML template  describes what will appear on screen .
    - Class have data and methods driving that templatte
    - css selector  for other component can use rthis component as <></>.
    - @component decorator during the buildd Ivy tranforms the template into low - level DOM insturction and convert it to plain meta data objecvts.

## Component Lifecycle -= Hooks

    1. Consturctor - Object creatiion and service is injectyed here . View and @input are not ready yet

    2.ngOnChanges - Runs everytime the @Input value changes froom the parent and also fires first when component created.

    3. ngOnInit - Run after the first `ngOnChanges`. the view and input is ready so we can start fettching data.

    4. ngDocheck - called on every cvhange detection pass. We can impelment custiom diffing algo ads werll

    5.ngAfterContentInit/ ngAterContentchecked - It runs whenevver the `ng-content`  is projected or checked. 

    5. ngAfterViewInit() / ngAfterViewChecked()  - similar pair but for the component’s own template and child components; often used to call third-party chart or map libraries that need a real DOM node

    6. ngOnDestroy() – runs just before Angular removes the component; perfect for unsubscribe() calls, clearing intervals, and detaching observers so memory doesn’t leak.

