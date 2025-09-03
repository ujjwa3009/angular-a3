### Angular boot strapping process

1. in main.ts we have `platformBrowserDynamic() ` which is responsible for 
    platform instance creation meaning platform based enviornment execution, initilaize browser specific services and polyfills. It also creates platform injector at top of the DI hierarchy.

2. Root Injectoer and Env. setup - during this process it creates and environment injcetor which we can call as root injector . Also it setup the 
DI hierarchy such as Platform injector -> Root Injector -> Component based.

    - Also register core anguler services like ApplicationRed, NgZone , etc.
    - Setup providers resolution mechanism including bloom filters for fast lookup. So in this algo there is array for 256 bits and each service is 
    hashed to a specific bit and that bit in array set to 1. When angular compoinent demands any services it use two operation first is `current-node-injector AND(&&) current-service` if that return true it will again do other opetation `parent-node-injector && current-service` if that al;so return true then angular go for resulotion of that servicee. If not present then no time waste.

3. Zone.js Integration - NgZone service wrapse the application in Zone.js and setup detection triggers for DOM events,promises etc.

4. Now `bootstarpModule(AppModule)` will run - 

    - `NgModule` decorator metadata is processed and aanaalyzed. Depenedency graph is processed. Module hieryachy is established for Lazy Loading.

    - Compomnent Creation  - it crteate two js obhject on eis Tview and one is Lview. Tview means template defintion and Lview means Logical View.
    -Tview is blueprint for dom nodes , directives etc. Lview is runtime instance of  that component. Store binding value and change detection state . 

    - Component constructir runs then depency heirarchy of that comoinent resolved then component properties are intiialized with default values.

    - Tview is renderedf and attached to `app-root` and childern component nstantiates recvusrively.

5. Router Initialization  - route definition converted to urltree , matching algo prepared , lazy loading infra established . 

    - Guard runs first to do some checks baseed  on that it return aan urltree. 

    - resolvers execute to preload-data require dfo r component 

    #### Lazy loadinfg splitting

    - Whenever angular application see lazy loading module it creates a separcte compiled for that  module.
    - It also created identidfier chunk for each lazy loading routes.
    - When any routes requested for these modules it just creates hhtp reuqest to load that modul;e and it instantiate that module.

    - The AOT pre compiles at build time not on run time so it save time.

7. Service Initialization 

    - Serviuce with @injectible: true is registered in enviuronent injector.
    - Singleton instance is created on first injection.
    - Service provide din moudle array are scoped to that module.

8. Channge detection Setup 

    - Each component gets a dedicated change detector generated at compile time

    - Detection functions compare current vs. previous property values

    - Binding expressions from templates are converted to comparison operations

    - Change Detection Tree
        - Tree structure mirrors the component hierarchy

        - Root-to-leaf traversal ensures consistent update order

        - OnPush optimization allows components to skip detection cycles




### What hepppens when user interacts

Runtime Operation Flow
Once bootstrapping completes, the application operates in this cycle:

User interaction or async operation occurs

Zone.js patches detect the operation and schedule change detection

ApplicationRef.tick() initiates detection cycle

Change detectors run recursively through component tree

DOM updates are applied where bindings have changed

Application returns to idle state awaiting next trigger