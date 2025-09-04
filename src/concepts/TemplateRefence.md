##  Template refrnece variables


A template reference variable is a nickname you give to something inside a template so that the rest of the template—or the component class via queries—can grab it without a DOM query.
You create one by prefixing a name with #:

```xml
<input #taskBox placeholder="Enter task">
<p>You typed: {{ taskBox.value }}</p> <!-- uses the variable in the same template -->
```
Angular assigns the variable to whatever sits on the element:

for native elements it is the underlying HTMLElement

for components or directives it is the component/directive instance

if the directive declares exportAs, the variable can be that exported API instead.

Because the variable only lives inside the template’s scope, you cannot read it directly in the component class. To reach it from TypeScript you use a query decorator:

Under the hood Angular stores the #variable’s element index in the component’s TView blueprint; at runtime the ViewChild query just dereferences that index in the LView array, so access is O(1) and change-detection-safe.

 -- Key points to remember

Declare with #name, read inside the same template immediately.

Query it in code with @ViewChild/@ViewChildren; only use it after ngAfterViewInit() because that is when Angular guarantees the view tree (and LView slots) are populated.

If you need the public API of a directive, the directive must expose exportAs: 'alias', and you reference it as #myVar="alias".