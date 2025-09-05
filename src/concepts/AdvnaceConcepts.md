# Advanced Angular Interview Guide 🎯

## 1. Migrating AngularJS to Angular
**Q:** How would you migrate a large AngularJS application to Angular?  
**A:** This is one of the most challenging migrations you can face, and I always recommend a gradual, strategic approach rather than a big-bang rewrite.

### Migration Strategy (4 Phases):
1. **Assessment and Preparation**
   - Conduct audit of existing AngularJS app (components, services, directives, dependencies).
   - Assess team’s TypeScript knowledge.
   - Update AngularJS codebase to latest style guide & component-based architecture.

2. **Hybrid Setup**
   - Use Angular's **ngUpgrade** to run AngularJS + Angular together.
   - Bootstrap Angular alongside AngularJS.
   - Ensure shared services work across both frameworks.

3. **Incremental Migration**
   - Start from **leaf components upward** (smallest, least dependent).
   - Migrate services first (easier to share).
   - Prioritize high-value/frequently-used components.

4. **Cleanup & Optimization**
   - Remove AngularJS + ngUpgrade.
   - Optimize Angular app: lazy loading, best practices, performance tuning.

### Key Challenges:
- State management differences
- Template syntax changes
- Dependency injection differences
- Testing strategy overhaul

---

## 2. Third-Party Library Integration
**Q:** How do you handle third-party library integration in Angular?  
**A:** I evaluate libraries systematically: maintenance, TypeScript support, bundle size, Angular ecosystem alignment.

### Integration Strategies:
- **Angular-native libraries** → Import via `npm install` (e.g., Angular Material, NGX-Bootstrap).
- **JavaScript libraries**:
  - Utility libs (Lodash, etc.) → Use ES6 version for tree-shaking.
  - DOM manipulation libs (D3, Chart.js) → Create Angular wrappers/services.
- **Global scripts** → Add in `angular.json` scripts array + TypeScript interfaces.

### Key Considerations:
- Bundle size & tree-shaking compatibility
- TypeScript definitions (`@types`)
- Angular lifecycle integration
- Change detection compatibility

### Common Pitfalls:
- Avoid **direct DOM manipulation**.
- Always **clean up event listeners** on destroy.
- Beware of libs that modify global state.

---

## 3. Handling Large Datasets
**Q:** What strategies do you use for handling large datasets in Angular?  
**A:** I use multi-layered optimization (client + server side).

### Primary Strategies:
- **Virtual Scrolling** → Angular CDK (renders only visible + buffer elements).
- **Progressive Loading/Pagination** → Infinite scroll or chunk loading.
- **Caching** → Browser, service-level, component-level (with invalidation).
- **Server-side optimization** → Filtering, sorting, searching on backend.

### Performance Optimizations:
- `OnPush` change detection
- `trackBy` in `ngFor`
- Web Workers for heavy computations
- Lazy loading routes/modules
- Debounced search/filter

### Monitoring:
- Track initial load, scroll performance, memory usage.

---

## 4. Internationalization (i18n) Implementation
**Q:** How do you implement internationalization in Angular applications?  
**A:** Angular provides built-in i18n support + libraries like **ngx-translate**.

### Implementation Approach:
1. **Planning** → Identify texts, dates, numbers, formats, runtime vs build-time switching.
2. **Angular i18n**:
   - Use `i18n` attributes.
   - Extract messages → translation files.
   - Build separate apps for each locale.
3. **Runtime Libraries** (if dynamic switching needed) → `ngx-translate`, Transloco.

### Considerations:
- Text expansion (30-50%)
- RTL support
- Cultural formatting (dates, currencies)
- Asset localization (images, PDFs)
- Translation workflow with tools (Lokalise, Phrase)

### Testing:
- Automated + manual across locales.

---

## 5. Debugging Performance Issues in Production
**Q:** How would you debug performance issues in production Angular applications?  
**A:** I follow a systematic approach.

### Debugging Methodology:
- **Monitoring & Metrics** → RUM tools (GA, Sentry).
- **Profiling** → Use DevTools Performance tab (prefer staging envs).
- **Angular-specific bottlenecks**:
  - Change detection overhead
  - Memory leaks (unsubscribed Observables)
  - Large bundles
  - Lazy loading failures
- **Metrics Focus** → FCP, LCP, TTI.
- **Isolation** → Feature flags to narrow down issues.
- **Network checks** → API latency, CDN misconfigurations.
- **Collaboration** → Work with backend/DevOps for root cause.

---

## 6. Code Review & Quality Maintenance
**Q:** What is your approach to code review and maintaining code quality in Angular projects?  
**A:** I believe in **multi-level quality automation + strong review culture**.

### Code Review Philosophy:
- **Multi-level QA**: linting, formatting, pre-commit hooks, automated testing, human review.
- **Review Criteria**:
  - Architecture compliance
  - Performance impact
  - Security
  - Maintainability
  - Angular best practices
- **Automation**:
  - ESLint + Angular rules
  - Prettier
  - Husky (pre-commit)
  - SonarQube
- **Review Process**:
  - Small, frequent PRs
  - Clear purpose + tests
  - PR templates with checklists
- **Knowledge Sharing** → Reviews as learning opportunities.
- **Documentation Standards** → ADRs, API docs, inline explanations.
- **Continuous Improvement** → Review metrics, refine process.
- **Culture** → Collaborative, non-hierarchical, focus on code not person.

---
# Advanced Angular Concepts - Interview Guide 🎯

---

## 1. Angular Compiler: AOT vs JIT
**Q:** Explain the difference between AOT and JIT compilation in Angular.  
**A:** Angular provides two compilation strategies that determine when code is transformed into executable JavaScript.

### Ahead-of-Time (AOT)
- Happens **during build process** before app is served.
- Prepares optimized JS ahead of time.
- ✅ Faster startup (no runtime compilation).
- ✅ Smaller bundles (compiler excluded).
- ✅ Detects template/binding errors at build time.
- ✅ More secure (no client-side compilation).

### Just-in-Time (JIT)
- Happens **in the browser at runtime**.
- Compiler runs in client’s browser.
- ❌ Slower startup (compilation after load).
- ❌ Larger bundle (compiler included).
- ❌ Errors only appear at runtime.
- ❌ Less secure (templates compiled in browser).

👉 Since Angular 9, **AOT is default**. JIT is mostly used in specific development scenarios (dynamic template compilation).

---

## 2. Angular Module System Internals
**Q:** How does Angular's module system work internally?  
**A:** Angular modules are the **blueprints** for organizing and bootstrapping apps.

### Internals:
- **Bootstrap Process** → Starts with root module → builds hierarchy of modules/components/services.
- **Compilation Phase** → Angular generates *module definitions* (metadata: components, directives, pipes, services).
- **Injector Hierarchy** → Each module has its own injector.  
  - Services in parent module → available to child modules.  
  - Child → not available to parent.
- **Lazy Loading** → Angular creates separate bundles & injectors only when routes are activated.
- **Tree-Shaking** → Unused modules/services removed from bundle.
- **Standalone Components (Angular 14+)** → Can bypass NgModules, but DI + compilation mechanisms remain.

---

## 3. Zone.js and Angular Integration
**Q:** What is Zone.js and how does it work with Angular?  
**A:** Zone.js is the engine that makes **automatic change detection** possible.

### How it works:
- **Monkey-Patching** → Intercepts async APIs (setTimeout, Promises, events, XHR).
- **NgZone** → Wraps entire app. When async tasks complete, Angular triggers change detection.
- **Execution Context** → Each zone tracks its tasks & provides hooks (start/end) → Angular uses these hooks to refresh UI.

### Performance Considerations:
- Adds overhead (every async op intercepted).
- Use `NgZone.runOutsideAngular()` for performance-critical tasks → manually trigger detection.

### Future Direction:
- Angular is moving toward **Zoneless + Signals (fine-grained reactivity)** for more efficient rendering.

---

## 4. Custom Schematics Implementation
**Q:** How do you implement custom Angular schematics?  
**A:** Schematics are **automated code generators** that enforce consistency & patterns.

### Architecture:
- Operates on a **virtual file system** → transformations previewed before applying.
- Uses a **templating engine** with placeholders/params.
- **Rules** define transformations (create, modify, delete).
- Integrated into Angular CLI with dry-run & undo.

### Workflow:
1. Identify repetitive patterns (services, components, APIs).
2. Create templates with placeholders.
3. Write rules to apply transformations.
4. Register schematic → run via CLI.

### Example: Custom Service Generator
```ts
export function createCustomService(_options: ServiceOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({
        ..._options,
        ...strings
      })
    ]);
    return mergeWith(templateSource);
  };
}
