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


### ProviudedIn vs providers

The key difference between providedIn: 'root' and the providers array is where you declare the service registration and how much control you get over its scope and lifecycle.

Location of Declaration
providedIn: 'root' – you write this inside the service class itself:

ts
@Injectable({ providedIn: 'root' })
export class UserService {
  // service stays self-contained
}
providers array – you list the service outside, in a module or component:

ts
@NgModule({
  providers: [UserService]  // manual registration
})
export class AppModule {}
The first approach keeps the service "self-registering"; the second gives you explicit control over where it lives.

Tree-shaking Behavior
providedIn: 'root' services are tree-shakable—if no class ever injects the service, the build process removes its code entirely, shrinking your bundle.

providers array services are eagerly loaded when their module loads, so they stay in the bundle even if unused. This can bloat your app if you're not careful.

Scoping Flexibility
Both create singletons when registered at the root level, but the providers array gives you granular control:

ts
// Component-scoped: fresh instance per component
@Component({
  providers: [CartService]  // isolated to this component tree
})

// Feature module-scoped: one instance for this lazy module
@NgModule({
  providers: [ReportsService]  // separate from root app
})
With providedIn you're limited to a few pre-defined scopes like 'root', 'any', or 'platform'.

When to Use Which
Choose providedIn: 'root' for:

Global, stateless services (API clients, utilities)

When you want automatic tree-shaking

Modern, clean code style

Choose providers array for:

Component-specific state (form services, local caches)

Feature-module isolation in lazy-loaded routes

When you need to swap implementations (useClass, useFactory)

Testing scenarios where you override services

Side-by-side Example
ts
// Modern approach - self-contained, tree-shakable
@Injectable({ providedIn: 'root' })
export class ApiService {}

// Traditional approach - explicit control
@NgModule({
  providers: [
    { provide: ApiService, useClass: MockApiService }  // easy to override
  ]
})
Bottom line: providedIn: 'root' is the recommended default for most services because it's simpler and more efficient. Use the providers array only when you need explicit scoping or advanced configuration.



### Injection heirarchy 


Two-Layer Hierarchy System
Angular maintains two separate injector trees that work together:

1. ElementInjector hierarchy – one injector per DOM element

Created automatically for every component and directive

Follows the DOM tree structure

Configured via providers: [] in @Component() or @Directive()

Empty by default unless you explicitly add providers

2. EnvironmentInjector hierarchy – application-level injectors

Root injector (from bootstrapApplication() or @Injectable({providedIn: 'root'}))

Platform injector (shared across multiple apps on same page)

NullInjector (top of chain, throws errors)

Module injectors in NgModule-based apps

Resolution Process Step-by-Step
When a component asks for a dependency, Angular follows this two-phase lookup:

Phase 1: ElementInjector chain

text
Child Component asks for UserService
     ↓
Does Child have UserService? No
     ↓  
Does Parent Component have UserService? No
     ↓
Does Root Component have UserService? Yes! → Return instance
Phase 2: EnvironmentInjector chain (if Phase 1 fails)

text
Go back to requesting component
     ↓
Check its EnvironmentInjector scope
     ↓
Root EnvironmentInjector → Platform → NullInjector (error)
Practical Example
ts
// root component
@Component({
  selector: 'app-root',
  providers: [GlobalService]  // ElementInjector provider
})
export class AppComponent {}

// child component  
@Component({
  selector: 'app-child',
  providers: [LocalService]   // Child's own ElementInjector
})
export class ChildComponent {
  constructor(
    private global: GlobalService,  // found in parent ElementInjector
    private local: LocalService     // found in own ElementInjector
  ) {}
}
The lookup process:

LocalService → found immediately in child's own injector

GlobalService → not in child, walks up to parent, found in root component

Advanced Control Options
You can fine-tune the lookup with decorators:

ts
constructor(
  @Self() private local: SomeService,        // only current injector
  @SkipSelf() private parent: SomeService,   // skip current, start from parent
  @Host() private host: SomeService,         // stop at host component
  @Optional() private maybe?: SomeService    // don't throw if missing
) {}
Or with the modern inject() function:

ts
private local = inject(SomeService, { self: true });
private parent = inject(SomeService, { skipSelf: true });
private optional = inject(SomeService, { optional: true });
Why This Matters
Scoping control – You can have a global AuthService but component-specific FormService instances:

ts
// One instance app-wide
@Injectable({ providedIn: 'root' })
export class AuthService {}

// Fresh instance per component
@Component({
  providers: [FormService]  // isolated to this component tree
})
export class UserFormComponent {}
Memory efficiency – Angular reuses singleton instances as you climb the tree, so multiple child components sharing the same parent service get the same object reference.

Testing flexibility – Override services at any level:

ts
TestBed.configureTestingModule({
  providers: [{ provide: ApiService, useClass: MockApiService }]
});




### Injection Token

An injection token is a unique identifier that represents a dependency in Angular's DI system when you can't use a class as the token. While classes work perfectly as tokens because they exist at runtime, primitives (strings, numbers), interfaces, or configuration objects don't have a runtime presence, so Angular needs a special key to find them in its provider map.

Why You Need Injection Tokens
Consider this problem: you want to inject a configuration object into a service.

❌ This won't work:

ts
interface ApiConfig { url: string; timeout: number; }

// Can't use interfaces as tokens - they disappear after TypeScript compilation
constructor(private config: ApiConfig) {}  // ERROR
❌ String tokens are fragile:

ts
{ provide: 'api-config', useValue: { url: '...', timeout: 5000 } }

// Easy to mistype, no IntelliSense, collision-prone
constructor(@Inject('api-confg') private config: any) {}  // Typo!
✅ InjectionToken solves this:

ts
export const API_CONFIG = new InjectionToken<ApiConfig>('api configuration');

{ provide: API_CONFIG, useValue: { url: 'https://api.com', timeout: 5000 } }

constructor(@Inject(API_CONFIG) private config: ApiConfig) {}  // Type-safe!
The InjectionToken creates a truly unique object reference that can't collide with anything else, even if two tokens have the same description string.

When to Use Injection Tokens
1. Configuration Objects

ts
interface AppSettings {
  theme: string;
  debugMode: boolean;
}

export const APP_SETTINGS = new InjectionToken<AppSettings>('app.settings');

// In main.ts or module
bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_SETTINGS, useValue: { theme: 'dark', debugMode: true } }
  ]
});
2. External Libraries or Browser APIs

ts
export const WINDOW = new InjectionToken<Window>('window');
export const LOCAL_STORAGE = new InjectionToken<Storage>('localStorage');

// Provide them
{ provide: WINDOW, useValue: window }
{ provide: LOCAL_STORAGE, useValue: localStorage }

// Easy to mock in tests
{ provide: WINDOW, useValue: mockWindow }
3. Multi-Provider Arrays (collect multiple implementations)

ts
export const HTTP_INTERCEPTOR = new InjectionToken<HttpInterceptor[]>('http.interceptor');

{
  provide: HTTP_INTERCEPTOR,
  useClass: AuthInterceptor,
  multi: true
},
{
  provide: HTTP_INTERCEPTOR,
  useClass: LoggingInterceptor,
  multi: true
}
// Angular injects an array: [AuthInterceptor, LoggingInterceptor]
4. Factory Functions with Dependencies

ts
export const API_CLIENT = new InjectionToken<ApiClient>('api.client');

{
  provide: API_CLIENT,
  useFactory: (config: ApiConfig, auth: AuthService) => new ApiClient(config, auth),
  deps: [API_CONFIG, AuthService]
}
Complete Working Example
ts
// tokens.ts
export interface LogLevel { level: 'debug' | 'info' | 'warn' | 'error'; }
export const LOG_LEVEL = new InjectionToken<LogLevel>('log.level');

// logger.service.ts
@Injectable()
export class LoggerService {
  constructor(@Inject(LOG_LEVEL) private config: LogLevel) {}
  
  log(msg: string) {
    if (this.config.level !== 'error') {
      console.log(msg);
    }
  }
}

// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOG_LEVEL, useValue: { level: 'debug' } },
    LoggerService
  ]
});

// app.component.ts
export class AppComponent {
  constructor(private logger: LoggerService) {
    this.logger.log('App started');  // Respects the injected log level
  }
}
Key benefits:

Type safety – full IntelliSense and compile-time checks

Uniqueness – impossible name collisions

Testability – easy to swap implementations

Documentation – the description string aids debugging

Use injection tokens whenever you need to inject non-class dependencies—configuration objects, primitives, external APIs, or when you want to collect multiple providers into an array. They turn Angular's DI from "classes only" into a flexible system that can manage any kind of dependency your application needs.



    

      
