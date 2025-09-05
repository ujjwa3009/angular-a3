### Routing 

    - Client side naviggation system enables SPA to show different component based on URL without full reload.

    Pros 
        - State preserved
        - No full page reload
        - Bookmarks
        - SEO compatible 
        - App like transititons

    Other Libraries 
        - React router is a third party library
        - Vue have built in like angular but simple
         


    ``` javascript
    // app-routing.module.ts
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { HomeComponent } from './home.component';
    import { AboutComponent } from './about.component';

    const routes: Routes = [
    { path: '', component: HomeComponent },        // Default route
    { path: 'about', component: AboutComponent },  // Named route
    { path: '**', redirectTo: '' }                // Wildcard route
    ];

    @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    })
    export class AppRoutingModule { }


    /// In componnent blueoprint 
    <!-- app.component.html -->
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>
<router-outlet></router-outlet> <!-- Component renders here -->


    ```


    - Components for Angular Routing

    1. Router Service - orchestrate the navigation
    2. ActivatedRoute - Give info about current Active Route
    3. RouterOutlet - PlaceHolder for routed components
    4. RouterModule - Module that provide routing functionality.


    - Steps for Routing

    1. User clicks on any links - Url changes
    2. Router intercepts the url change
    3. Router matches url against router configuration
    4. Route Guard executes 
    3. Component resolution - lazy loaded if needed
    4. Router resolver pre fetch data
    5. Component instantiations happens.
    6. ROuterOutlet render component 
    7. Navigation Completed - router events fire.


    - Why RouterModule.forRoot() vs forChild()?

    1. forRoot() : create Router service singleton and route config for root module
    2. forChild() : just return RouterMoudle wihtout RouterService.

    ``` javscript

    // Routes are matched in FIRST-MATCH-WINS order
    const routes: Routes = [
    { path: 'users/:id', component: UserDetailComponent }, // Specific first
    { path: 'users/new', component: CreateUserComponent }, // This would NEVER match!
    { path: '**', component: NotFoundComponent }           // Wildcard last
    ];


    ```


    Performance Implications:

    Bundle Size: Router adds ~15KB to initial bundle

    Memory Usage: Each route creates component instances

    Zone.js Integration: Router operations trigger change detection

    Route Resolution: Synchronous vs asynchronous route matching


Q. How to dynamic routing with paraamterss - Snapshot based or Observable based - ActivatedRoute.paramMap se data aajayega.

    ``` javascript
    // Route configuration
{ path: 'product/:category/:id', component: ProductComponent }

// ProductComponent
export class ProductComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    // Method 1: Snapshot (one-time read)
    const id = this.route.snapshot.paramMap.get('id');
    
    // Method 2: Observable (reactive to changes)
    this.route.paramMap.subscribe(params => {
      const category = params.get('category');
      const id = params.get('id');
      this.loadProduct(category, id);
    });
  }
}
```


    1. Nested Routes

``` javascript 

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'reports/:type', component: ReportsComponent }
    ]
  }
];

```

Q8: What happens internally if a route guard throws an error instead of returning false?
A: If a guard throws an error, navigation is cancelled and NavigationError event is fired. The error doesn't propagate to global error handlers automatically, so you need explicit error handling in the guard or router error handler.


Q10: How would you debug a situation where routes work in development but fail silently in production?
    A:

    Enable router tracing temporarily

    Check for environment-specific base href issues

    Verify lazy-loaded chunks are properly built

    Check for path case sensitivity in production servers

    Monitor browser network tab for failed chunk loading

    Implement comprehensive error handling and logging