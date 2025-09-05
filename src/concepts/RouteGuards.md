## Route Guard

    - Angular Route Guards are interceptors that control navigation flow in your application. They act as security checkpoints and data preparation stations that execute before, during, or after route transitions. Think of them as bounchers at a club - they decide who gets in, who gets out, and what preparation is needed before entry.

    - Why ?

        1. Server round trip stopping
        2. Unauthorized access stop
        3. Data loading beforer component rerender
    
    - Types of Route Guards.

        1. CanActivate - Module is Looaded but it checks use is allowed on that route or not 

        2. canDeactivate - Before leaving this component and going ot new routes  /  Can user navigate AWAY from this route?

        3. canLoad - Check that module itself can be loaded or not

        4. Reoslve = Load Data before navigation completes.

    - Order of Execution 
        // Guards execute in this EXACT order:
        1. CanDeactivate (current component)
        2. CanLoad (target route's module)  
        3. CanActivateChild (parent routes)
        4. CanActivate (target route)
        5. Resolve (target route data)

    - Why observable /promise return type ?
        ``` javascript
                // Synchronous guards - immediate decision
        canActivate(): boolean {
        return this.auth.isLoggedIn();
        }

        // Asynchronous guards - wait for async operations
        canActivate(): Observable<boolean> {
        return this.auth.validateToken().pipe(
            map(valid => valid),
            catchError(() => of(false))
        );
        }

        // Promise-based guards - for HTTP calls
        canActivate(): Promise<boolean> {
        return this.http.get('/api/auth/check').toPromise()
            .then(response => response.valid)
            .catch(() => false);
        }



        ```