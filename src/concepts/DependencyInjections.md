## DI

Dependency Injection (DI) in Angular is the built-in mechanism that supplies a class with the services, values, or functions it needs instead of letting that class create those objects itself.
By delegating object creation to Angular’s injector, DI keeps classes small, promotes loose coupling, and makes unit testing as simple as swapping real services for mocks.

How it works—step by step

You declare a dependency by listing it as a constructor parameter or by calling the inject() function inside the class body.

ts
constructor(private api: ApiService) {}
// or
private api = inject(ApiService);


Some injector in the component tree must know how to provide that dependency. You register it with a provider—typically @Injectable({providedIn:'root'}) on a service or the providers: array in a module/component.

When Angular creates an instance of the consumer class it asks the hierarchical injector chain for an ApiService.

If the current injector has an instance cached it returns it.

Otherwise it runs the provider’s factory, stores the result, and returns the new singleton.

The class receives a fully configured service without knowing how to build it—perfect for swapping implementations in tests or feature flags.

Why it matters

Modularity – components, services, pipes and even route guards simply declare what they need; DI wires everything together.

Testability – you can deliver a mock by overriding the provider in a test bed.

Scoping – because injectors are hierarchical, you can have one instance of AuthService for the whole app but a fresh FilterService per lazily loaded feature.

#### Q. How do you create and inject services
    Creating and using a service in Angular is a two-step process:
        1. declare the class as injectable so Angular’s DI system can build it, and

        2. ask the injector for an instance inside any consumer (component, directive, guard, pipe, or even another service).
    
    - providedIn: 'any' – one instance per lazy bundle; useful for feature isolation.

    - Drop providedIn and list the service in a specific module or component providers: array for a narrower scope


### Providers

1. What a “provider” really is (ground floor)
A provider is nothing more than a recipe that tells Angular’s injector how to obtain a value for a given token.

The token can be a class (AuthService), an InjectionToken (ENV_CONFIG), or any other unique identifier.

The recipe lives in a providers: array or inside @Injectable({providedIn: …}).

In code a provider is just a plain object:

ts
{ provide: TOKEN, useSomething: … }
The useSomething key decides the strategy.

2. Four core use… strategies (working level)
useClass (default) – “new this class once, cache it.”

ts
{ provide: Api, useClass: RestApi }      // or simply RestApi
Best when one concrete class suffices, or for swapping implementations at design time.

useExisting – “alias this token to an already-provided instance.”

ts
{ provide: Logger, useExisting: ConsoleLogger }
No extra memory; helpful for backward compatibility or exposing a narrower façade.

useValue – “return this literal as-is.”

ts
{ provide: API_URL, useValue: 'https://api.acme.com' }
Perfect for constants, feature flags, and test doubles.

useFactory – “call a function and use its return value.”

ts
{ 
  provide: Storage,
  deps: [PLATFORM_ID],
  useFactory: id => isPlatformBrowser(id) ? localStorage : new MemoryStore()
}
Reach for this when the instance depends on runtime data (env, locale, A/B variant).

Add multi:true to any of them to collect all provider results into an array—widely used by HTTP interceptors.

3. Scope control with providedIn (intermediate)
@Injectable({ providedIn: 'root' }) ties the recipe to the root injector:

ts
@Injectable({ providedIn: 'root' })
export class AuthService {}
One app-wide singleton.

Tree-shaken away if no class ever injects it.

Change the value to…

'any' → one instance per NgModule graph (lazy bundles get their own).

'platform' → one instance for all Angular apps sharing the same page (rare).
Or omit it entirely and list the provider in a specific component/module to scope it to that injector branch.

4. Advanced patterns (expert touches)
Runtime substitution – Replace a real service with a stub in tests or feature-flag modules:

ts
{ provide: PaymentService, useClass: MockPaymentService }
Opaque tokens for primitives – Avoid accidental string collisions:

ts
export const RETRY_COUNT = new InjectionToken<number>('retry');
{ provide: RETRY_COUNT, useValue: 3 }
Optional or fallback injection – Ask politely:

ts
constructor(@Optional() private logger?: Logger) {}
Self vs. SkipSelf – Force Angular to look only in the current injector or skip it, giving you fine-grained control in complex hierarchies.

