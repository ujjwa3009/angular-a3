### Chnage Detection

ANGULAR CHANGE DETECTION
│
├── 🏗️ FOUNDATIONS
│   ├── Purpose: Sync Model ↔ DOM - Change detection is Angular's mechanism that automatically synchronizes your component's data model with the DOM. Javscipt doesnt have mechanims to notify the change . Angulaer solves it by 

        a. Monitoring the events that can trigger updates like DOM events , HTTP request , timer functyions, promises and observables , browser event like resize and scroll.

        b. Check component tree for systematically changes.
        c. Update teh DOm when needed.


│   ├── Triggers: DOM Events, HTTP, Timers
│   ├── Zone.js: Auto-detection via patching - Zone js monkey patches all async operartions. Create execution context for tracking async works.  Notify angular about async operations . Enables automagtic changes detction when task got completed.

         
│   └── Unidirectional: Top → Bottom traversal
│
├── 🏛️ ARCHITECTURE  
│   ├── Component Tree → Change Detection Tree m- At runtime for each compoennt create changedetcor  tree parallel to component trree structure.  


│   ├── Strategies
│   │   ├── Default: Check all components 
             a. Check all componnent in a tree
             b. Runs on every change detection cycle.
             c. Examins all bound properties for changes
             d. Perfromance Cost = O(n) n = nu of components.

│   │   └── OnPush: Check only on input changes
            a. Only check when @Input refrnece changes 
            b. Skip checkibng if input object are of same refence
            c. Requires Immutable dat apatterns.

        -- Async Pipe 
            a. automatically subscribe ot observables 
            b. class for markforCheck() on new emissions.
            c. unsubscribe on componenrt destruction.
            
        - ChangeDetectorRef
            constructor(private cdr: ChangeDetectorRef) {}

            // Manual methods
            detectChanges()    // Run detection for this component + children
            markForCheck()     // Mark path to root for next cycle
            detach()          // Remove from change detection tree  
            reattach()        // Add back to change detection tree
            checkNoChanges()  // Development mode verification

│   ├── Manual Control
│   │   ├── detectChanges() - Immediate
│   │   ├── markForCheck() - Next cycle
│   │   └── detach()/reattach() - Tree control
│   └── Ivy vs View Engine
│       ├── Template functions vs interpretation
│       └── Direct instructions vs complex logic
│
├── ⚙️ COMPILER LEVEL
│   ├── Template → JavaScript transformation
│   ├── Ivy Instructions: element(), text(), property()
│   ├── RenderFlags: Create vs Update modes
│   └── 9-Step Cycle: Template → Hooks → Children
│
├── 🛠️ PRACTICAL USAGE
│   ├── Pitfalls
│   │   ├── OnPush + Mutation = No detection
│   │   ├── Async outside Zone = No detection  
│   │   └── Memory leaks with manual CD
│   ├── Optimizations
│   │   ├── OnPush + Immutability
│   │   ├── TrackBy for lists
│   │   ├── Virtual scrolling
│   │   └── Memoization patterns
│   └── Real-world Scenarios
│       ├── WebSocket integration
│       ├── Canvas animations
│       └── Third-party library integration
│
└── 🎓 MASTERY LEVELS
    ├── Beginner: What & Why
    ├── Intermediate: Strategies & Manual control
    ├── Advanced: Zone.js & Ivy internals
    └── Expert: Custom implementations & debugging
