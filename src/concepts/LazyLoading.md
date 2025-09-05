### Lazy loading

    -  Lazy Loading is a code-splitting technique that defers the loading of Angular modules until they are actually needed. Instead of loading all application code upfront, lazy loading downloads and executes code on-demand when users navigate to specific routes.

- Advantages 
    1. Resource utilzation
    2. TTI - Time to Interactive reduced.
    3. Scalability
    4. Better UX

    ``` 
        // Lazy loading (✅ loads on-demand)
        const routes: Routes = [
        { 
            path: 'admin', 
            loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
        },
        {
            path: 'dashboard',
            loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
        }
        ];

```

        - Angular's Lazy Loading Pipeline:


            1. Route Configuration → Router identifies loadChildren routes
            2. Bundle Analysis → Angular CLI creates separate chunks during build
            3. Runtime Detection → Router detects navigation to lazy route
            4. Dynamic Import → Browser downloads specific chunk via HTTP
            5. Module Loading → Angular loads and bootstraps the module
            6. Component Resolution → Module components become available
            7. Navigation Completion → Route renders with loaded components


Q10: What strategies would you use to debug lazy loading issues in production?
A:

    Implement comprehensive error boundaries with retry mechanisms

    Use performance monitoring to track chunk load times

    Add detailed logging for module loading failures

    Implement fallback strategies for critical features

    Use source maps for better error tracing

    Monitor network conditions and adjust loading strategy accordingly