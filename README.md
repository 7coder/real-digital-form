# vue-form-element
This solution contains more direct way to create flexible form component with form elements communication. I would say, this approach not so elegant that could be, but this approach more native and not includes additional libraries or modules. One of the negative points that I see, form elements should be lineal children with the form. It means, no component wrappers can be added over the children. For the more flexible way, I propose use one of the following variants: 
- Use additional module such as `Event Bus` instead of direct invocation of parent component functions
- Use Vuex
- Pass handlers(Emit data from children) and data(when onSubmit event happened) to childrens via props

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
