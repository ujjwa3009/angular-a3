### Observables

    - Stream of data over time tio handklew asyn ops and data flow.

    Q What is the need oof obsewrvables 
    A. promise is goo dto handle async operation burt modern aplicationb requireds some set of operations lik e continous stream of data , cancellable operations , complex transformations, reactive programming patterns.

    The problem  obsewrvable ssolve is 
        a. Stream data over time
        b. Multiple complex operation over coming data
        c. Lazy execution  - only execute when subscribes
        d. Error handling 
        e. cancellation 

    1. Observable Pipeline
        a. Obsewrvable constructor create a data source
        b. Observer subcribe execution begins
        c. Data is emitted though observer.next
        d. Operator transforms data ibn pipeline
        d. observer get processed data
        e. Strewms ends by complete() or error()
        f. Unsubscribe to resolve resourcees
    
    ## Cold vs Hot Observables

        1. Cold -> for every subscriuber new data source
        2. hot -> for every subscriber shared data asource

    Memory and Performance Implications:

        Subscription Management: Each subscription creates memory overhead

        Operator Chaining: Each operator creates a new Observable wrapper

        Hot vs Cold: Hot observables share resources, cold create new ones

        Unsubscription: Critical for preventing memory leaks

        Scheduler Integration: Observables can be scheduled on different execution contexts


# Operators

    1. map() -> tranform each emitted data and return new array
    2. map vs foreach -> foreach doesn't retrun new array , eturns undefined (just executes function for each element)
        - map() - Transform data (create new array from existing one)
        - forEach() - Side effects (logging, updating DOM, modifying external variables) 
    
    3. filter():  - Conditional Filtering 
    4. tap() : Perform side effects without modifying the stream
    5. switchMap : Prevent previous inner observables  , perfect for httop request , search ,  navigation
    6.  mergeMap() - Concurrent Execution , process eacvh reqiuest simulatnously
    7. concatmap() :  Process requests in order, wait for each to complete
    8. exhaustMap() - Ignore While Busy 
    9. forkJoin() - Wait for All to Complete
    10. retry() / retryWhen() - Retry Failed Operations11. 
    11. distinctUntilChanged() - Skip Duplicates
    12. take() / takeUntil() - Limit Emissions
    13.  share() : Share HTTP request among multiple subscribers

         ``` 
         // share() vs shareReplay()
        const shared$ = source$.pipe(share()); // No caching
        const cached$ = source$.pipe(shareReplay(1)); // Caches last emission

        ```

